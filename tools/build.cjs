#!/usr/bin/env node
/* Conversing AI static builder.
 *
 * Renders content from data/*.json and config/site.json into the HTML
 * pages, between marker comments. Output is plain static HTML, so the
 * portfolio and channel badges are visible to search engines and do not
 * depend on JavaScript.
 *
 * Usage:  node tools/build.cjs
 *
 * Markers in a page look like:
 *   <!-- BUILD:portfolio -->   ... generated ...   <!-- /BUILD:portfolio -->
 * Anything between them is replaced. Edit the data file, re-run, commit.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const readJSON = p => JSON.parse(read(p));

const portfolio = readJSON('data/portfolio.json');
const site = readJSON('config/site.json');

const esc = s => String(s == null ? '' : s)
  .replace(/&(?!(amp|lt|gt|quot|#\d+|rsquo|mdash|rarr|ldquo|rdquo);)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

const CHECK = '<svg class="pf-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';

/* ------------------------------------------------------------------ cards */
function card(item, opts) {
  opts = opts || {};
  const agentBadge = item.hasAiAgent
    ? '\n              <span class="pf-badge pf-badge--agent">&#128172; AI agent on site</span>'
    : '';
  const clientBadge = item.label === 'client'
    ? '\n              <span class="pf-badge pf-badge--client">Client work</span>'
    : '';
  const agentHint = item.hasAiAgent && item.agentPrompt
    ? '\n              <p class="pf-try"><strong>Try its AI agent.</strong> ' + esc(item.agentPrompt) + '</p>'
    : '';
  const bullets = (item.highlights || []).map(
    h => '\n                <li>' + CHECK + '<span>' + esc(h) + '</span></li>'
  ).join('');

  return `          <article class="pf-card fade-up" data-category="${esc(item.category)}" data-agent="${item.hasAiAgent ? 'yes' : 'no'}">
            <div class="pf-shot">
              <img src="./${esc(item.screenshot)}" alt="Screenshot of the ${esc(item.name)} website we designed and built"
                   width="800" height="500" loading="lazy" decoding="async">
              <div class="pf-badges">
                <span class="pf-badge pf-badge--live"><span class="pf-pulse"></span>Live</span>${agentBadge}${clientBadge}
              </div>
            </div>
            <div class="pf-body">
              <div class="pf-head">
                <h3>${esc(item.name)}</h3>
                <span class="pf-niche">${esc(item.niche)}</span>
              </div>
              <p class="pf-desc">${esc(item.summary)}</p>
              <ul class="pf-list">${bullets}
              </ul>${agentHint}
              <div class="pf-foot">
                <span class="pf-url">${esc(item.displayUrl)}</span>
                <a class="pf-link" href="${esc(item.url)}" target="_blank" rel="noopener">Visit site <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </article>`;
}

/* -------------------------------------------------------- full portfolio */
function renderPortfolio() {
  const items = portfolio.items;
  const agents = items.filter(i => i.hasAiAgent).length;
  const websites = items.filter(i => i.category === 'website').length;
  const apps = items.filter(i => i.category === 'web-app').length;

  return `
        <div class="pf-filters" role="tablist" aria-label="Filter the portfolio">
          <button class="pf-filter is-active" data-filter="all" role="tab" aria-selected="true">All <span>${items.length}</span></button>
          <button class="pf-filter" data-filter="website" role="tab" aria-selected="false">Websites <span>${websites}</span></button>
          <button class="pf-filter" data-filter="web-app" role="tab" aria-selected="false">Web apps <span>${apps}</span></button>
          <button class="pf-filter" data-filter="agent" role="tab" aria-selected="false">With an AI agent <span>${agents}</span></button>
        </div>

        <div class="pf-grid" id="pf-grid">
${items.map(i => card(i)).join('\n')}
        </div>

        <p class="pf-note fade-up">Some of this is client work. The rest we built for ourselves and still run every
          day, which means we live with the consequences of our own design decisions. That is a very different
          discipline from handing a site over and walking away.</p>
`;
}

/* ------------------------------------------------- "see it working" strip */
function renderAgentStrip() {
  const agents = portfolio.items.filter(i => i.hasAiAgent);
  const cards = agents.map(i => `            <a class="ag-card fade-up" href="${esc(i.url)}" target="_blank" rel="noopener">
              <span class="ag-live"><span class="pf-pulse"></span>Agent live</span>
              <span class="ag-name">${esc(i.name)}</span>
              <span class="ag-niche">${esc(i.niche)}</span>
              <span class="ag-prompt">${esc(i.agentPrompt || 'Ask it a question.')}</span>
              <span class="ag-go">Open and ask <span aria-hidden="true">&rarr;</span></span>
            </a>`).join('\n');

  return `
          <div class="ag-grid">
${cards}
          </div>
          <p class="ag-caption fade-up">Each of these runs its own AI chat agent, trained on that business. Visit one
            and ask it a question. <a href="website-design#our-work">See all ${portfolio.items.length} websites and web apps we have built &rarr;</a></p>
`;
}

/* ------------------------------------------------------- channel badges */
function renderChannels() {
  const ch = site.channels || {};
  const labels = site.channelLabels || {};
  const rows = Object.keys(ch).map(k => {
    const live = ch[k] === 'live';
    return `            <li class="ch-item" data-channel="${k}" data-channel-state="${ch[k]}">
              <span class="ch-dot"></span>
              <span data-channel-name>${esc(labels[k] || k)}</span>
              <span class="ch-state" data-channel-state-label>${live ? 'Live' : 'Coming soon'}</span>
            </li>`;
  }).join('\n');

  const soon = Object.keys(ch).filter(k => ch[k] !== 'live').map(k => labels[k] || k);
  const waitlist = soon.length
    ? `\n          <p class="ch-waitlist">Want one of these the moment it launches?
            <a href="website-development-request?need=whatsapp-social-agent">Join the waitlist &rarr;</a></p>`
    : '';

  return `
          <ul class="ch-list">
${rows}
          </ul>${waitlist}
`;
}

/* ------------------------------------------------------------- stats bar */
function renderStats() {
  return '\n' + (site.stats || []).map(s => `          <a class="stat-card fade-up" href="${esc(s.href)}">
            <div class="stat-number">${s.value}</div>
            <div class="stat-label">${s.label}</div>
          </a>`).join('\n') + '\n        ';
}

/* ------------------------------------------------------------------ apply */
const BLOCKS = {
  portfolio: renderPortfolio,
  'agent-strip': renderAgentStrip,
  channels: renderChannels,
  stats: renderStats,
};

function build() {
  const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  let touched = 0;
  const summary = {};

  for (const f of files) {
    const p = path.join(ROOT, f);
    let html = fs.readFileSync(p, 'utf8');
    const before = html;

    for (const [name, fn] of Object.entries(BLOCKS)) {
      const re = new RegExp(
        '(<!--\\s*BUILD:' + name + '\\s*-->)[\\s\\S]*?(<!--\\s*/BUILD:' + name + '\\s*-->)', 'g');
      if (re.test(html)) {
        html = html.replace(re, (m, open, close) => open + fn() + '        ' + close);
        summary[name] = (summary[name] || 0) + 1;
      }
    }

    if (html !== before) {
      fs.writeFileSync(p, html);
      touched++;
    }
  }

  console.log('build complete');
  console.log('  pages rewritten : ' + touched);
  for (const [k, v] of Object.entries(summary)) {
    console.log('  ' + k.padEnd(16) + ' rendered into ' + v + ' page(s)');
  }
  const agents = portfolio.items.filter(i => i.hasAiAgent).length;
  console.log('  portfolio       : ' + portfolio.items.length + ' items, ' + agents + ' with a live AI agent');
}

build();
