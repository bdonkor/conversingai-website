/* Conversing AI — DEMO agent widget.
 *
 * Opens from the demo button (anything carrying data-opens-demo), not as a
 * floating site-wide launcher. This is the demo agent only; the
 * customer-service agent for the whole site is separate work.
 *
 * Talks to /api/chat, which holds the API key server-side and streams the
 * reply over Server-Sent Events.
 *
 * The agent speaks first. Per the prompt it must ask "Are you in for a demo?"
 * the moment it opens, so opening posts a hidden opener turn and renders only
 * the agent's reply.
 */
(function () {
  'use strict';

  var ENDPOINT = '/api/chat';
  var STORAGE_KEY = 'cai_demo_v1';
  var MAX_STORED = 30;
  var OPENER = '[The visitor has just opened the demo agent.]';

  var state = { open: false, busy: false, built: false, messages: [] };
  var el = {};

  /* ------------------------------------------------------------- helpers */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function format(text) {
    var out = esc(text);
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|\s)(\/[a-z0-9\-\/]+)/g, '$1<a href="$2">$2</a>');
    out = out.replace(/\b((?:https?:\/\/|www\.)[^\s<]+)/g, function (m) {
      var href = m.indexOf('http') === 0 ? m : 'https://' + m;
      return '<a href="' + href + '" target="_blank" rel="noopener">' + esc(m) + '</a>';
    });
    return out.replace(/\n/g, '<br>');
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages.slice(-MAX_STORED)));
    } catch (e) {}
  }

  function restore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      state.messages = raw ? (JSON.parse(raw) || []) : [];
    } catch (e) { state.messages = []; }
  }

  function scrollDown() { if (el.log) el.log.scrollTop = el.log.scrollHeight; }

  function track(name, params) {
    if (typeof window.caiTrack === 'function') window.caiTrack(name, params || {});
  }

  /** What actually goes to the API: role + content only. */
  function wireFormat() {
    return state.messages.map(function (m) {
      return { role: m.role, content: m.content };
    });
  }

  /* --------------------------------------------------------------- render */
  function bubble(role, html, isError) {
    var wrap = document.createElement('div');
    wrap.className = 'cw-msg cw-msg--' + role + (isError ? ' cw-msg--error' : '');
    wrap.innerHTML = '<div class="cw-bubble">' + html + '</div>';
    el.log.appendChild(wrap);
    scrollDown();
    return wrap.querySelector('.cw-bubble');
  }

  function renderHistory() {
    el.log.innerHTML = '';
    state.messages.forEach(function (m) {
      if (m.hidden) return;                       // the synthetic opener
      bubble(m.role === 'user' ? 'user' : 'agent', format(m.content));
    });
  }

  /* ------------------------------------------------------------ streaming */
  async function send(userText, opts) {
    opts = opts || {};
    if (state.busy) return;

    state.busy = true;
    if (el.send) el.send.disabled = true;

    if (userText) {
      state.messages.push({ role: 'user', content: userText, hidden: !!opts.hidden });
      if (!opts.hidden) bubble('user', format(userText));
      save();
    }

    var typing = bubble('agent', '<span class="cw-dots"><i></i><i></i><i></i></span>');
    var answer = '';
    var started = false;

    function fail(msg) {
      typing.parentElement.classList.add('cw-msg--error');
      typing.innerHTML = format(msg);
      started = true;
    }

    try {
      var res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: wireFormat().slice(-MAX_STORED) }),
      });

      if (!res.ok || !res.body) {
        var info = {};
        try { info = await res.json(); } catch (e) {}
        fail(info.error || 'The demo agent is unavailable right now. Email info@conversingai.com and a person will reply.');
        return;
      }

      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });

        var parts = buffer.split('\n\n');
        buffer = parts.pop();

        for (var i = 0; i < parts.length; i++) {
          var evt = 'message', data = '';
          parts[i].split('\n').forEach(function (l) {
            if (l.indexOf('event: ') === 0) evt = l.slice(7).trim();
            else if (l.indexOf('data: ') === 0) data += l.slice(6);
          });
          if (!data) continue;

          var payload;
          try { payload = JSON.parse(data); } catch (e) { continue; }

          if (evt === 'status' && !started) {
            // tool is running; keep the visitor informed rather than idle
            typing.innerHTML = '<span class="cw-status">' + esc(payload.text) +
              '</span><span class="cw-dots"><i></i><i></i><i></i></span>';
            scrollDown();
          } else if (evt === 'delta' && payload.text) {
            if (!started) { typing.innerHTML = ''; started = true; }
            answer += payload.text;
            typing.innerHTML = format(answer);
            scrollDown();
          } else if (evt === 'refusal' || evt === 'error') {
            if (!started) typing.innerHTML = '';
            typing.parentElement.classList.add('cw-msg--error');
            typing.innerHTML = format((answer ? answer + '\n\n' : '') + payload.text);
            started = true;
          }
        }
      }

      if (!started) {
        fail('No reply came back. Try again, or email info@conversingai.com.');
      } else if (answer) {
        state.messages.push({ role: 'assistant', content: answer });
        save();
        if (/\b[\w.+-]+@[\w-]+\.[\w.]+\b/.test(userText || '')) track('chat_lead_captured');
      }
    } catch (err) {
      fail('Connection lost. Check your network and try again.');
    } finally {
      state.busy = false;
      if (el.send) el.send.disabled = false;
      if (el.input) el.input.focus();
      scrollDown();
    }
  }

  function submit(text) {
    text = (text || '').trim();
    if (!text || state.busy) return;
    el.input.value = '';
    el.input.style.height = '';
    send(text);
  }

  /* ------------------------------------------------------------ open/close */
  function open() {
    if (!state.built) build();
    if (state.open) return;
    state.open = true;
    el.panel.hidden = false;
    document.body.classList.add('cw-open');
    setTimeout(function () { el.input.focus(); }, 60);
    track('chat_widget_open', { agent: 'demo' });

    // The agent speaks first. Hidden opener turn, so its reply is the
    // "Are you in for a demo?" the prompt requires.
    if (!state.messages.length) send(OPENER, { hidden: true });
  }

  function close() {
    state.open = false;
    if (el.panel) el.panel.hidden = true;
    document.body.classList.remove('cw-open');
  }

  function reset() {
    state.messages = [];
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    renderHistory();
    send(OPENER, { hidden: true });
  }

  /* ------------------------------------------------------------------ build */
  function build() {
    if (state.built) return;
    state.built = true;

    var root = document.createElement('div');
    root.className = 'cw-root';
    root.innerHTML =
      '<section class="cw-panel" id="cw-panel" hidden aria-label="Conversing AI demo agent">' +
        '<header class="cw-head">' +
          '<div>' +
            '<p class="cw-title">Demo agent</p>' +
            '<p class="cw-sub"><span class="cw-dot"></span>A live demo on your own website</p>' +
          '</div>' +
          '<div class="cw-head-actions">' +
            '<button type="button" class="cw-restart" aria-label="Start a new demo" title="Start a new demo">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>' +
            '</button>' +
            '<button type="button" class="cw-close" aria-label="Close the demo">&times;</button>' +
          '</div>' +
        '</header>' +
        '<div class="cw-log" role="log" aria-live="polite"></div>' +
        '<form class="cw-form">' +
          '<textarea class="cw-input" rows="1" maxlength="2000" placeholder="Type your answer…" aria-label="Your message"></textarea>' +
          '<button type="submit" class="cw-send" aria-label="Send">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>' +
          '</button>' +
        '</form>' +
        '<p class="cw-foot">This is a demo agent. It runs a short demonstration, then ends.</p>' +
      '</section>';

    document.body.appendChild(root);

    el.panel = root.querySelector('.cw-panel');
    el.log = root.querySelector('.cw-log');
    el.input = root.querySelector('.cw-input');
    el.send = root.querySelector('.cw-send');

    root.querySelector('.cw-close').addEventListener('click', close);
    root.querySelector('.cw-restart').addEventListener('click', function () {
      if (!state.busy) reset();
    });

    root.querySelector('.cw-form').addEventListener('submit', function (e) {
      e.preventDefault();
      submit(el.input.value);
    });

    el.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(el.input.value); }
    });

    el.input.addEventListener('input', function () {
      el.input.style.height = 'auto';
      el.input.style.height = Math.min(el.input.scrollHeight, 110) + 'px';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.open) close();
    });

    restore();
    renderHistory();
  }

  /* --------------------------------------------------------------- start up */
  // Opens only from an explicit demo trigger.
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-opens-demo]');
    if (!t) return;
    e.preventDefault();
    open();
  });

  window.CAIDemoAgent = { open: open, close: close, reset: reset };
})();
