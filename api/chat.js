/**
 * Conversing AI — DEMO agent endpoint.
 *
 * Vercel serverless function. The browser never sees the API key: it calls
 * this endpoint, which holds ANTHROPIC_API_KEY server-side and streams the
 * reply back as Server-Sent Events.
 *
 * Two tools back the demo prompt:
 *   web_fetch        Anthropic-hosted. Reads the visitor's public website.
 *                    Running it server-side at Anthropic means OUR server
 *                    never fetches a visitor-supplied URL, which removes the
 *                    request-forgery risk a homemade crawler would carry.
 *   send_lead_email  Ours (api/_lead-email.js), over your own cPanel SMTP.
 *                    Returns an honest ok/failed result, because the prompt
 *                    forbids claiming delivery that did not happen.
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY   required
 *   SMTP_HOST/USER/PASS required for the lead email (your cPanel mailbox)
 *   LEAD_EMAIL_FROM     optional, defaults to SMTP_USER
 *   LEAD_EMAIL_BCC      optional, copies each demo lead to your own inbox
 *   AGENT_MODEL         defaults to claude-opus-5-5
 *   AGENT_RATE_PER_MIN  defaults to 10 requests per IP per minute
 */

import Anthropic from '@anthropic-ai/sdk';
import { betaTool } from '@anthropic-ai/sdk/helpers/beta/json-schema';
import { SYSTEM_PROMPT } from './_agent-prompt.js';
import { sendLeadEmail } from './_lead-email.js';

const MODEL = process.env.AGENT_MODEL || 'claude-opus-5-5';
const RATE_PER_MIN = Number(process.env.AGENT_RATE_PER_MIN || 10);

const MAX_TURNS = 40;
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_OUTPUT_TOKENS = 2048;
const MAX_ITERATIONS = 12;

/* ------------------------------------------------------------------ limits */
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const windowStart = now - 60_000;
  const list = (hits.get(ip) || []).filter((t) => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.length || v[v.length - 1] < windowStart) hits.delete(k);
    }
  }
  return list.length > RATE_PER_MIN;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

/* --------------------------------------------------------------- validation */
function sanitise(messages) {
  if (!Array.isArray(messages)) return null;
  const out = [];
  for (const m of messages.slice(-MAX_TURNS)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return null;
    if (typeof m.content !== 'string') return null;
    const content = m.content.trim().slice(0, MAX_CHARS_PER_MESSAGE);
    if (!content) continue;
    if (out.length && out[out.length - 1].role === m.role) {
      out[out.length - 1].content += '\n\n' + content;
    } else {
      out.push({ role: m.role, content });
    }
  }
  if (!out.length || out[0].role !== 'user' || out[out.length - 1].role !== 'user') return null;
  return out;
}

/* -------------------------------------------------------------------- tools */
const leadEmailTool = betaTool({
  name: 'send_lead_email',
  description:
    'Send the HOT LEAD notification email to the visitor, showing them what their own business would receive ' +
    'when a website visitor becomes a potential customer. Call this once, after the second demo question. ' +
    'The result tells you whether delivery was actually accepted. If it reports a failure you MUST tell the ' +
    'visitor the email could not be sent, and you must not claim it was.',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: "The visitor's name." },
      email: { type: 'string', description: 'Where to send the lead notification.' },
      phone: { type: 'string', description: 'Telephone number, for direct calling.' },
      whatsapp: { type: 'string', description: 'WhatsApp number, used for the Chat with Lead button.' },
      website: { type: 'string', description: 'The website address the demo ran against.' },
      enquiry: { type: 'string', description: 'The important questions the visitor asked during the demo.' },
      responses: { type: 'string', description: 'The answers you gave during the demo.' },
      conversation: { type: 'string', description: 'The relevant conversation between visitor and agent.' },
      recommended_action: { type: 'string', description: 'The recommended next action for the sales team.' },
    },
    required: ['email'],
    additionalProperties: false,
  },
  run: async (input) => {
    const result = await sendLeadEmail(input);
    return result.ok
      ? `SENT. ${result.detail}`
      : `NOT SENT. ${result.detail}`;
  },
});

// Anthropic-hosted. Only fetches URLs already present in the conversation,
// which is exactly the visitor's pasted address.
const webFetchTool = {
  type: 'web_fetch_20260209',
  name: 'web_fetch',
  max_uses: 8,
  max_content_tokens: 60000,
};

/* ------------------------------------------------------------------ handler */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Use POST.' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set on this deployment.');
    return res.status(503).json({ error: 'The demo agent is not configured yet.', code: 'not_configured' });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return res.status(429).json({
      error: 'That is a lot of messages in a short time. Give it a minute, then carry on.',
      code: 'rate_limited',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }

  const messages = sanitise(body?.messages);
  if (!messages) {
    return res.status(400).json({ error: 'Send a messages array ending in a user turn.' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  const send = (event, data) => {
    try { res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`); } catch { /* client gone */ }
  };

  let closed = false;
  req.on('close', () => { closed = true; });

  try {
    const runner = client.beta.messages.toolRunner({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          // Identical on every request, so cache it: the first call writes
          // the cache and every later message reads it cheaply.
          cache_control: { type: 'ephemeral' },
        },
      ],
      // The demo is a scripted flow, not a hard reasoning problem, and it is
      // latency-sensitive. Low effort keeps replies quick.
      output_config: { effort: 'low' },
      tools: [webFetchTool, leadEmailTool],
      messages,
      max_iterations: MAX_ITERATIONS,
      stream: true,
    });

    let sawText = false;

    // Outer loop: one iteration per model turn. Inner loop: stream events.
    for await (const messageStream of runner) {
      for await (const event of messageStream) {
        if (closed) break;
        if (event.type === 'content_block_start') {
          const b = event.content_block;
          if (b?.type === 'server_tool_use' || b?.type === 'tool_use') {
            // Reading a website takes a few seconds; tell the visitor why.
            send('status', {
              text: b.name === 'web_fetch' ? 'Reading your website…' : 'Preparing your lead email…',
            });
          }
        } else if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          sawText = true;
          send('delta', { text: event.delta.text });
        }
      }
      if (closed) break;

      const message = await messageStream.finalMessage();

      // The runner does not auto-resume a paused server-tool turn, so a long
      // web_fetch would otherwise end the reply silently mid-sentence.
      if (message.stop_reason === 'pause_turn') {
        runner.pushMessages({ role: 'assistant', content: message.content });
        continue;
      }
      if (message.stop_reason === 'refusal') {
        send('refusal', {
          text: 'I am not able to help with that one. If you would like a demo, share your website address and we can carry on.',
        });
        break;
      }
    }

    if (!closed) {
      const finalMsg = await runner.done().catch(() => null);
      if (!sawText) {
        send('error', { text: 'No reply came back. Try again, or email info@conversingai.com.' });
      }
      send('done', { stop_reason: finalMsg?.stop_reason ?? null });
      res.end();
    }
  } catch (err) {
    console.error('demo agent error:', err?.status, err?.message);
    let text = 'Something went wrong at our end. Try again, or email info@conversingai.com.';
    if (err?.status === 429) text = 'The agent is busy right now. Give it a few seconds and try again.';
    else if (err?.status === 401 || err?.status === 403) text = 'The demo agent is not configured correctly. We have been alerted.';
    send('error', { text });
    try { res.end(); } catch { /* already closed */ }
  }
}
