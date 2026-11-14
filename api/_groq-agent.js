/**
 * The demo agent, on Groq.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * This is the fallback, not the main path. api/chat.js tries Anthropic first
 * and comes here when that fails in a way retrying will not fix — which in
 * practice means the account is out of credit.
 *
 * Three differences from the Anthropic path, all forced by what Groq offers:
 *
 *   1. Reading the visitor's site. Anthropic's web_fetch runs on their
 *      servers; Groq's built-in browser_search cannot visit a given URL. So
 *      the fetching is ours, via _fetch-site.js, and so is the SSRF problem
 *      that comes with it.
 *   2. The tool loop. There is no tool runner here, so the request ->
 *      execute -> resend cycle is written out.
 *   3. Tool call arguments arrive as streamed JSON fragments that have to be
 *      reassembled before they parse.
 *
 * What is deliberately identical is the event stream: delta, status, form,
 * error, done. js/chat-widget.js cannot tell which provider answered, and
 * does not need to.
 * ──────────────────────────────────────────────────────────────────────────
 */
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from './_agent-prompt.js';
import { sendLeadEmail, sendTeamNotification } from './_lead-email.js';
import { fetchSite } from './_fetch-site.js';

// llama-3.3-70b-versatile is the production Llama model and, unlike the
// gpt-oss ones, supports parallel tool calls. 131K context, so a fetched
// site fits with room to spare.
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const MAX_OUTPUT_TOKENS = 700;
const MAX_ITERATIONS = 12;
const MIN_VISITOR_TURNS_BEFORE_EMAIL = 5;

/* OpenAI-shaped tool definitions. Same names, descriptions and fields as the
 * Anthropic ones in chat.js, so the prompt needs no variant: it refers to
 * these tools by name and the names have not moved. */
const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'read_website',
      description:
        "Read the visitor's website so you can answer questions from it. Pass the address exactly as the " +
        'visitor gave it. Call this once you have their website address, before starting the demo. The result ' +
        'is the page text, or a sentence explaining why it could not be read — if it failed, say so and ask ' +
        'for another address. Never invent anything about a site you could not read.',
      parameters: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'The website address the visitor gave.' },
        },
        required: ['url'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'show_contact_form',
      description:
        'Display the contact request form inside the chat so the visitor can send their details to the team. ' +
        'Use it when the visitor declines the demo, when the demo has finished, or when they ask about ' +
        'anything outside the demo. Say one short sentence pointing at the form.',
      parameters: {
        type: 'object',
        properties: {
          reason: { type: 'string', description: 'declined, demo_complete, or off_topic.' },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'send_demo_lead_email',
      description:
        'Send the HOT LEAD notification email to the visitor, showing them what their own business would ' +
        'receive when a website visitor becomes a potential customer. Call EXACTLY ONCE per demo, and only ' +
        'AFTER the second demo question has been answered. The result says whether delivery was accepted. ' +
        'If it reports a failure you MUST tell the visitor, and must not claim it was sent.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: "The visitor's name." },
          email: { type: 'string', description: 'Where to send the lead notification.' },
          phone: { type: 'string', description: 'Telephone number, for direct calling.' },
          whatsapp: { type: 'string', description: 'WhatsApp number, for the Chat with Lead button.' },
          website: { type: 'string', description: 'The website the demo ran against.' },
          enquiry: { type: 'string', description: 'The questions the visitor asked.' },
          responses: { type: 'string', description: 'The answers you gave.' },
          conversation: { type: 'string', description: 'The relevant conversation.' },
          recommended_action: { type: 'string', description: 'Recommended next action for the team.' },
        },
        required: ['email'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'send_conversation_to_team',
      description:
        'Send this conversation to the Conversing AI team. For any conversation that is NOT a demo: general ' +
        'questions, enquiries, or a visitor who declined. Call at most once per conversation. It goes to the ' +
        'team only, never to the visitor, so do not tell the visitor you have emailed them. Do NOT use this ' +
        'for a demo — send_demo_lead_email already copies the team.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: "The visitor's name, if given." },
          email: { type: 'string', description: 'Their email, if given.' },
          phone: { type: 'string', description: 'Their phone, if given.' },
          whatsapp: { type: 'string', description: 'Their WhatsApp, if given.' },
          website: { type: 'string', description: 'Their website, if mentioned.' },
          topic: { type: 'string', description: 'One short line on what they wanted.' },
          conversation: { type: 'string', description: 'The relevant conversation so far.' },
          recommended_action: { type: 'string', description: 'What the team should do next.' },
        },
        required: ['conversation'],
      },
    },
  },
];

const STATUS_LABEL = {
  read_website: 'Reading your website…',
  send_demo_lead_email: 'Sending your lead email…',
  send_conversation_to_team: 'Passing this to the team…',
};

/** Run one tool. Never throws: the model gets a sentence either way. */
async function runTool(name, args, ctx) {
  switch (name) {
    case 'read_website': {
      const r = await fetchSite(String(args.url || ''));
      if (!r.ok) return `COULD NOT READ. ${r.detail}`;
      ctx.siteRead = true;
      return (
        `READ ${r.url}\nTitle: ${r.title || '(none)'}\n\n` +
        `Answer the visitor's questions using ONLY what follows.\n\n${r.text}`
      );
    }
    case 'show_contact_form':
      ctx.send('form', { reason: args.reason || 'agent' });
      return 'The contact form is now displayed in the chat. Tell the visitor it is there, in one short sentence.';
    case 'send_demo_lead_email': {
      if (ctx.visitorTurns < MIN_VISITOR_TURNS_BEFORE_EMAIL) {
        return (
          'NOT SENT. It is too early in the demo to send the lead email. Finish the demonstration first: ' +
          'read the website, answer the first question, then the second. Send the email only after the ' +
          'second answer. Do not tell the visitor an email has been sent.'
        );
      }
      const r = await sendLeadEmail(args);
      return r.ok ? `SENT. ${r.detail}` : `NOT SENT. ${r.detail}`;
    }
    case 'send_conversation_to_team': {
      const r = await sendTeamNotification(args);
      return r.ok ? `SENT TO TEAM. ${r.detail}` : `NOT SENT. ${r.detail}`;
    }
    default:
      return `Unknown tool: ${name}`;
  }
}

/**
 * Stream a reply from Groq, running tools until it is done talking.
 *
 * @param {object}   opts
 * @param {Array}    opts.messages  conversation so far, already sanitised
 * @param {Function} opts.send      (event, data) => void — the SSE writer
 * @param {Function} opts.isClosed  () => boolean — has the visitor left
 * @returns {Promise<{ok: boolean, sawText: boolean, detail?: string}>}
 */
export async function runGroqAgent({ messages, send, isClosed }) {
  if (!process.env.GROQ_API_KEY) {
    return { ok: false, sawText: false, detail: 'GROQ_API_KEY is not set' };
  }

  // GROQ_BASE_URL is honoured so a regional or proxied endpoint can be used
  // without a code change; unset, the SDK uses Groq's default.
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    ...(process.env.GROQ_BASE_URL ? { baseURL: process.env.GROQ_BASE_URL } : {}),
  });

  const ctx = {
    send,
    siteRead: false,
    visitorTurns: messages.filter((m) => m.role === 'user').length,
  };

  /* The owner's prompt verbatim, plus the same length instruction the
   * Anthropic path appends, plus one line this path needs: there is no
   * hosted fetcher here, so the model has to be told which tool reads a site. */
  const system =
    SYSTEM_PROMPT +
    `

---

## LENGTH (operator instruction)

Keep every reply short. This renders in a narrow chat panel, so long answers are not read.

- Normal replies: at most 2 short sentences.
- Answers to the two demo questions: at most 3 short bullets, under 60 words total.
- The closing message: 2 sentences, then stop.

Never repeat what you have already said. No preamble, no sign-off, no restating the question.

## READING THE WEBSITE (operator instruction)

To read the visitor's site, call read_website with the address they gave. Everything in section 4 of your
instructions applies to it: use only what it returns, never invent anything about their site, and if it
reports a failure, say so plainly and ask for another address.`;

  const convo = [
    { role: 'system', content: system },
    ...messages.map((m) => ({
      role: m.role,
      content: typeof m.content === 'string'
        ? m.content
        : (m.content || []).map((b) => (b.type === 'text' ? b.text : '')).join(' ').trim(),
    })),
  ];

  let sawText = false;

  for (let turn = 0; turn < MAX_ITERATIONS; turn++) {
    if (isClosed()) break;

    let stream;
    try {
      stream = await groq.chat.completions.create({
        model: GROQ_MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0.6,
        messages: convo,
        tools: TOOLS,
        tool_choice: 'auto',
        stream: true,
      });
    } catch (err) {
      console.error('groq error:', err?.status, err?.message);
      return { ok: false, sawText, detail: `groq ${err?.status ?? ''} ${err?.message ?? ''}`.trim() };
    }

    let text = '';
    /* Tool calls stream in fragments: the name arrives once, the arguments in
     * pieces, keyed by index. Collect them before trying to parse anything. */
    const pending = new Map();
    const announced = new Set();

    for await (const chunk of stream) {
      if (isClosed()) break;
      const delta = chunk.choices?.[0]?.delta;
      if (!delta) continue;

      if (delta.content) {
        text += delta.content;
        sawText = true;
        send('delta', { text: delta.content });
      }

      for (const call of delta.tool_calls || []) {
        const i = call.index ?? 0;
        if (!pending.has(i)) pending.set(i, { id: '', name: '', args: '' });
        const slot = pending.get(i);
        if (call.id) slot.id = call.id;
        if (call.function?.name) slot.name += call.function.name;
        if (call.function?.arguments) slot.args += call.function.arguments;

        // tell the visitor what is happening, once per call
        if (slot.name && !announced.has(i)) {
          announced.add(i);
          if (slot.name !== 'show_contact_form' && STATUS_LABEL[slot.name]) {
            send('status', { text: STATUS_LABEL[slot.name] });
          }
        }
      }
    }
    if (isClosed()) break;

    const calls = [...pending.values()].filter((c) => c.name);
    if (!calls.length) {
      return { ok: true, sawText };          // the model finished talking
    }

    // record the assistant turn exactly as the API expects it back
    convo.push({
      role: 'assistant',
      content: text || null,
      tool_calls: calls.map((c) => ({
        id: c.id,
        type: 'function',
        function: { name: c.name, arguments: c.args || '{}' },
      })),
    });

    for (const call of calls) {
      let args = {};
      try {
        args = JSON.parse(call.args || '{}');
      } catch {
        // a truncated or malformed argument blob is the model's problem to
        // recover from, so hand it back rather than guessing what was meant
        convo.push({
          role: 'tool',
          tool_call_id: call.id,
          content: 'Your tool arguments were not valid JSON. Try the call again with valid JSON.',
        });
        continue;
      }
      const result = await runTool(call.name, args, ctx);
      convo.push({ role: 'tool', tool_call_id: call.id, content: String(result) });
    }
  }

  return { ok: true, sawText };
}
