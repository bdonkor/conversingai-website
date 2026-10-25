#!/usr/bin/env node
/* Generates the niche landing pages from data/niches.json.
 *
 * Every page shares one template, taken from an existing page's shell so
 * the header, footer, nav and scripts stay identical site-wide. Adding a
 * niche means adding an object to data/niches.json and re-running:
 *
 *   node tools/build-pages.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

const niches = JSON.parse(read('data/niches.json'));
const portfolio = JSON.parse(read('data/portfolio.json'));
const byId = Object.fromEntries(portfolio.items.map(i => [i.id, i]));

const SHELL_SRC = 'custom-email-marketing.html';
const shell = read(SHELL_SRC);

const esc = s => String(s == null ? '' : s).replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;');
const escAttr = s => esc(s).replace(/"/g, '&quot;').replace(/<[^>]*>/g, '');

function chatHtml(lines) {
  return lines.map(([who, text]) =>
    `              <p class="chat-${who === 'in' ? 'in' : 'out'}">${esc(text)}</p>`).join('\n');
}

function exampleCards(ids) {
  const items = ids.map(id => byId[id]).filter(Boolean);
  if (!items.length) return '';
  return `
        <div class="section-header" style="margin-top:3.5rem;">
          <h2 class="section-title fade-up">Work We've Done <span class="highlight">Like This</span></h2>
        </div>
        <div class="pf-grid">
${items.map(i => `          <article class="pf-card fade-up">
            <div class="pf-shot">
              <img src="./${i.screenshot}" alt="Screenshot of ${escAttr(i.name)}, a site we designed and built" width="800" height="500" loading="lazy" decoding="async">
              <div class="pf-badges">
                <span class="pf-badge pf-badge--live"><span class="pf-pulse"></span>Live</span>${i.hasAiAgent ? '\n                <span class="pf-badge pf-badge--agent">&#128172; AI agent on site</span>' : ''}
              </div>
            </div>
            <div class="pf-body">
              <div class="pf-head"><h3>${esc(i.name)}</h3><span class="pf-niche">${esc(i.niche)}</span></div>
              <p class="pf-desc">${esc(i.summary)}</p>
              <div class="pf-foot">
                <span class="pf-url">${esc(i.displayUrl)}</span>
                <a class="pf-link" href="${i.url}" target="_blank" rel="noopener">Visit site <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </article>`).join('\n')}
        </div>`;
}

function faqHtml(pairs) {
  return pairs.map(([q, a]) =>
    `          <details class="fade-up"><summary>${esc(q)}</summary><div class="wdfaq-a">${esc(a)}</div></details>`).join('\n');
}

function faqSchema(pairs, title) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: title,
    mainEntity: pairs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }, null, 2);
}

function buildMain(p) {
  const url = 'https://conversingai.com/' + p.slug;
  return `  <main>
    <!-- HERO -->
    <section class="service-hero">
      <div class="service-hero-glow" style="top:0;right:0;background:rgba(37,99,235,0.1);opacity:0.5;"></div>
      <div class="container">
        <div style="max-width:50rem;margin:0 auto;text-align:center;">
          <div class="badge badge-blue hero-fade-in" style="margin-bottom:1.5rem;">${esc(p.badge)}</div>
          <h1 class="hero-fade-in" style="animation-delay:0.1s;font-size:clamp(1.75rem,3.4vw,2.6rem);font-weight:800;letter-spacing:-0.02em;line-height:1.22;margin-bottom:1.5rem;color:rgba(255,255,255,0.92);">${p.h1}</h1>
          <p class="hero-fade-in" style="animation-delay:0.2s;font-size:1.12rem;color:var(--muted);line-height:1.75;margin-bottom:1.75rem;">${esc(p.intro)}</p>
          <div class="hero-fade-in" style="animation-delay:0.3s;display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;">
            <a href="website-development-request" class="btn btn-primary btn-lg">Get a fixed quote &rarr;</a>
            <a href="index#see-it-working" class="btn btn-outline btn-lg">Try a live agent</a>
          </div>
        </div>
      </div>
    </section>

    <!-- PAIN + SAMPLE CHAT -->
    <section class="section" style="background:rgba(15,23,42,0.3);">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:2.5rem;max-width:62rem;margin:0 auto;align-items:start;">
          <div class="fade-up">
            <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:1.1rem;">What this usually looks like</h2>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.85rem;">
${p.pains.map(x => `              <li style="position:relative;padding-left:1.5rem;color:var(--muted);font-size:0.97rem;line-height:1.7;"><span style="position:absolute;left:0;color:#f87171;font-weight:800;">&times;</span>${esc(x)}</li>`).join('\n')}
            </ul>
          </div>
          <div class="fade-up">
            <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:1.1rem;">What the agent does instead</h2>
            <div class="chat">
${chatHtml(p.chat)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EXAMPLES -->
    <section class="section" id="examples">
      <div class="container">
${exampleCards(p.examples)}
      </div>
    </section>

    <!-- CHANNELS -->
    <section class="section" style="background:rgba(15,23,42,0.3);">
      <div class="container" style="max-width:34rem;text-align:center;">
        <h2 class="section-title fade-up" style="font-size:1.5rem;">Where It Can Run Today</h2>
        <div style="margin-top:1.5rem;">
          <!-- BUILD:channels --><!-- /BUILD:channels -->
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <div class="section-header"><h2 class="section-title fade-up">Questions</h2></div>
        <div class="wdfaq">
${faqHtml(p.faq)}
          <details class="fade-up"><summary>What does it cost?</summary><div class="wdfaq-a">You get a fixed written quote before any work starts. No meter, no surprise at the end. The agent is month to month and you can cancel.</div></details>
          <details class="fade-up"><summary>Do I own it?</summary><div class="wdfaq-a">Yes. The design, the code, the domain and your customer data are yours.</div></details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-box">
          <div class="cta-glow-1"></div><div class="cta-glow-2"></div>
          <div class="cta-content">
            <h2 class="cta-title fade-up">Let's Talk About <span class="highlight">Your Business</span></h2>
            <p class="cta-text fade-up">Tell us what you need. Fixed written quote, no obligation.</p>
            <div class="cta-buttons fade-up"><a href="website-development-request" class="btn btn-primary btn-lg">Get my fixed quote &rarr;</a></div>
          </div>
        </div>
      </div>
    </section>
  </main>`;
}

function build() {
  let n = 0;
  for (const p of niches.pages) {
    const url = 'https://conversingai.com/' + p.slug;
    let html = shell;

    // head
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)} &mdash; Conversing AI</title>`);
    html = html.replace(/<meta name="description"[\s\S]*?>/,
      `<meta name="description" content="${escAttr(p.metaDescription)}">`);
    html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
    html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
    html = html.replace(/<meta property="twitter:url" content="[^"]*">/, `<meta property="twitter:url" content="${url}">`);
    html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escAttr(p.title)}">`);
    html = html.replace(/<meta property="twitter:title" content="[^"]*">/, `<meta property="twitter:title" content="${escAttr(p.title)}">`);
    html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escAttr(p.metaDescription)}">`);
    html = html.replace(/<meta property="twitter:description" content="[^"]*">/, `<meta property="twitter:description" content="${escAttr(p.metaDescription)}">`);

    // drop the shell's Service schema, add FAQPage
    html = html.replace(/\s*<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "Service"[\s\S]*?<\/script>/, '');
    html = html.replace('</head>', '  <script type="application/ld+json">\n' + faqSchema(p.faq, p.title) + '\n  </script>\n</head>');

    // stylesheets
    if (!html.includes('css/portfolio.css')) {
      html = html.replace('<link rel="stylesheet" href="./css/pages.css">',
        '<link rel="stylesheet" href="./css/pages.css">\n  <link rel="stylesheet" href="./css/portfolio.css?v=20261025">\n  <link rel="stylesheet" href="./css/home.css?v=20261025">');
    }

    // body
    html = html.replace(/  <main>[\s\S]*?  <\/main>/, buildMain(p));

    fs.writeFileSync(path.join(ROOT, p.file), html);
    n++;
    console.log('  wrote ' + p.file.padEnd(44) + ' -> /' + p.slug);
  }
  console.log('generated ' + n + ' niche pages');
}

build();
