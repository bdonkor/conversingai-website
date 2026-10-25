#!/usr/bin/env node
/* Generates /pricing and /thank-you from the shared page shell, so they
 * carry the same header, footer and scripts as every other page.
 *
 *   node tools/build-pricing.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const shell = read('custom-email-marketing.html');
const pricing = JSON.parse(read('data/pricing.json'));

const esc = s => String(s == null ? '' : s).replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;');

function priceLine(value, suffix) {
  if (!value) return '<span class="pr-quote">Quoted per project</span>';
  return '<span class="pr-from">from</span> ' + esc(pricing.currency) + ' ' + esc(value) +
    (suffix ? '<span class="pr-suffix">' + suffix + '</span>' : '');
}

function tier(t, kind) {
  const price = kind === 'agent'
    ? (t.setup || t.monthly
        ? `${t.setup ? `<div class="pr-price">${priceLine(t.setup, ' setup')}</div>` : ''}${t.monthly ? `<div class="pr-price pr-price--sub">${priceLine(t.monthly, ' / month')}</div>` : ''}`
        : '<div class="pr-price"><span class="pr-quote">Quoted per business</span></div>')
    : `<div class="pr-price">${priceLine(t.from)}</div>`;

  return `          <div class="pr-card${t.featured ? ' is-featured' : ''} fade-up">
${t.featured ? '            <span class="pr-flag">Recommended</span>\n' : ''}            <h3>${esc(t.name)}</h3>
            <p class="pr-blurb">${esc(t.blurb)}</p>
${price}
            <ul class="pr-list">
${t.includes.map(i => `              <li>${esc(i)}</li>`).join('\n')}
            </ul>
            <a href="website-development-request" class="btn btn-${t.featured ? 'primary' : 'outline'}">Get a fixed quote</a>
          </div>`;
}

const CHANNEL_NOTE = `        <div style="max-width:34rem;margin:2.5rem auto 0;text-align:center;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem;">Channels included</h3>
          <!-- BUILD:channels --><!-- /BUILD:channels -->
        </div>`;

const pricingMain = `  <main>
    <section class="service-hero">
      <div class="service-hero-glow" style="top:0;right:0;background:rgba(37,99,235,0.1);opacity:0.5;"></div>
      <div class="container">
        <div style="max-width:48rem;margin:0 auto;text-align:center;">
          <div class="badge badge-blue hero-fade-in" style="margin-bottom:1.5rem;">Pricing</div>
          <h1 class="hero-fade-in" style="animation-delay:0.1s;font-size:clamp(1.9rem,3.6vw,2.75rem);font-weight:800;letter-spacing:-0.02em;line-height:1.2;margin-bottom:1.5rem;color:rgba(255,255,255,0.92);">
            Fixed Written Quotes. <span class="highlight text-glow">No Meter.</span></h1>
          <p class="hero-fade-in" style="animation-delay:0.2s;font-size:1.12rem;color:var(--muted);line-height:1.75;margin-bottom:0;">
            We price the job, not the hours. You get the number in writing before any work starts, so there is no
            surprise at the end. The ranges below are a starting point, not a bill.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header"><h2 class="section-title fade-up">Websites &amp; <span class="highlight">Web Apps</span></h2></div>
        <div class="pr-grid">
${pricing.websites.map(t => tier(t, 'web')).join('\n')}
        </div>
      </div>
    </section>

    <section class="section" style="background:rgba(15,23,42,0.3);">
      <div class="container">
        <div class="section-header"><h2 class="section-title fade-up">AI Chat <span class="highlight">Agent Plans</span></h2></div>
        <div class="pr-grid pr-grid--two">
${pricing.agents.map(t => tier(t, 'agent')).join('\n')}
        </div>
${CHANNEL_NOTE}
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="pr-bundle fade-up">
          <span class="pr-flag">Recommended</span>
          <h2>${esc(pricing.bundle.name)}</h2>
          <p>${esc(pricing.bundle.blurb)}</p>
          <div class="pr-price">${priceLine(pricing.bundle.from)}</div>
          <ul class="pr-list pr-list--inline">
${pricing.bundle.includes.map(i => `            <li>${esc(i)}</li>`).join('\n')}
          </ul>
          <a href="website-development-request" class="btn btn-primary btn-lg">Get a quote for both &rarr;</a>
        </div>
        <p class="pr-currency fade-up">${esc(pricing.currencyNote)}</p>
      </div>
    </section>

    <!-- ROI CALCULATOR -->
    <section class="section" id="roi-section" style="background:rgba(15,23,42,0.3);">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title fade-up">What an Agent <span class="highlight">Is Worth to You</span></h2>
          <p class="fade-up" style="max-width:40rem;margin:1rem auto 0;color:var(--muted);text-align:center;line-height:1.7;">
            Your numbers, not ours. The assumptions are shown underneath so you can argue with them.</p>
        </div>

        <form class="roi-box fade-up" id="roi" onsubmit="return false;">
          <div class="roi-inputs">
            <label>Customer messages a month
              <input type="number" id="roi-msgs" value="300" min="0" step="10" inputmode="numeric"></label>
            <label>Minutes to answer one
              <input type="number" id="roi-mins" value="4" min="0" step="1" inputmode="numeric"></label>
            <label>Staff cost per hour
              <input type="number" id="roi-rate" value="30" min="0" step="1" inputmode="numeric"></label>
            <label>Enquiries missed after hours (%)
              <input type="number" id="roi-missed" value="25" min="0" max="100" step="5" inputmode="numeric"></label>
          </div>
          <div class="roi-outputs">
            <div class="roi-out"><span class="roi-num" id="roi-hours">0</span><span class="roi-lbl">staff hours saved a month</span></div>
            <div class="roi-out"><span class="roi-num" id="roi-cost">0</span><span class="roi-lbl">${esc(pricing.currency)} of staff time saved</span></div>
            <div class="roi-out"><span class="roi-num" id="roi-leads">0</span><span class="roi-lbl">extra enquiries captured</span></div>
          </div>
          <p class="roi-summary" id="roi-summary"></p>
        </form>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header"><h2 class="section-title fade-up">Pricing <span class="highlight">Questions</span></h2></div>
        <div class="wdfaq">
          <details class="fade-up"><summary>Why are there no fixed prices on everything?</summary><div class="wdfaq-a">Because a five page marketing site and a system with logins, payments and dashboards are not the same job, and pretending otherwise would mean either overcharging the small one or underquoting the big one. You get a written number before work starts, which is the part that actually protects you.</div></details>
          <details class="fade-up"><summary>What is included in the monthly agent fee?</summary><div class="wdfaq-a">Hosting of the agent, a monthly conversation allowance, retraining when your business changes, and support. It is month to month, so you can cancel.</div></details>
          <details class="fade-up"><summary>Are there contracts?</summary><div class="wdfaq-a">The agent is month to month. Website projects are a fixed scope with a fixed price, agreed in writing.</div></details>
          <details class="fade-up"><summary>Do I own the code and the data?</summary><div class="wdfaq-a">Yes. The design, the code, the domain and your customer data are yours, and you can take them elsewhere whenever you like.</div></details>
          <details class="fade-up"><summary>Which channels are included?</summary><div class="wdfaq-a"><span data-channels-sentence>Available today on your website. WhatsApp, Facebook Messenger and Instagram are coming soon, and you can join the waitlist.</span></div></details>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-box"><div class="cta-glow-1"></div><div class="cta-glow-2"></div>
          <div class="cta-content">
            <h2 class="cta-title fade-up">Get the <span class="highlight">Actual Number</span></h2>
            <p class="cta-text fade-up">Tell us what the business needs. Fixed written quote, no obligation.</p>
            <div class="cta-buttons fade-up"><a href="website-development-request" class="btn btn-primary btn-lg">Get my fixed quote &rarr;</a></div>
          </div>
        </div>
      </div>
    </section>
  </main>`;

const thankYouMain = `  <main>
    <section class="service-hero" style="min-height:60vh;display:flex;align-items:center;">
      <div class="container">
        <div style="max-width:40rem;margin:0 auto;text-align:center;">
          <div style="width:4rem;height:4rem;border-radius:50%;background:rgba(74,222,128,0.15);color:#4ade80;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h1 style="font-size:clamp(1.9rem,3.6vw,2.6rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:1rem;color:rgba(255,255,255,0.95);">Thanks. We have it.</h1>
          <p style="font-size:1.08rem;color:var(--muted);line-height:1.75;margin-bottom:2rem;">
            We read every enquiry ourselves. You will hear back from a person, usually within one working day.</p>

          <div style="text-align:left;background:rgba(15,23,42,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:1.25rem;padding:1.75rem;">
            <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:1rem;">While you wait</h2>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.9rem;">
              <li><a href="index#see-it-working" style="color:var(--blue-400);font-weight:600;">Try a live AI agent &rarr;</a><br><span style="color:var(--muted);font-size:0.9rem;">Four of the sites we built run one. Ask one a hard question.</span></li>
              <li><a href="website-design#our-work" style="color:var(--blue-400);font-weight:600;">See everything we have built &rarr;</a><br><span style="color:var(--muted);font-size:0.9rem;">Eight websites and web apps, all live.</span></li>
              <li data-site-wrap hidden><a data-site="book-call" href="get-started" style="color:var(--blue-400);font-weight:600;">Book a call &rarr;</a><br><span style="color:var(--muted);font-size:0.9rem;">Pick a time that suits you.</span></li>
              <li><a data-social="facebook" href="https://www.facebook.com/profile.php?id=61590293817209" target="_blank" rel="noopener" style="color:var(--blue-400);font-weight:600;">Follow us on Facebook &rarr;</a></li>
            </ul>
          </div>

          <p style="margin-top:2rem;"><a href="index" class="btn btn-outline">Back to the homepage</a></p>
        </div>
      </div>
    </section>
  </main>`;

function page(file, title, desc, slug, main, extraHead) {
  let html = shell;
  const url = 'https://conversingai.com/' + slug;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="description"[\s\S]*?>/, `<meta name="description" content="${desc}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  html = html.replace(/<meta property="twitter:url" content="[^"]*">/, `<meta property="twitter:url" content="${url}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="twitter:title" content="[^"]*">/, `<meta property="twitter:title" content="${title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`);
  html = html.replace(/<meta property="twitter:description" content="[^"]*">/, `<meta property="twitter:description" content="${desc}">`);
  html = html.replace(/\s*<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "Service"[\s\S]*?<\/script>/, '');
  if (!html.includes('css/portfolio.css')) {
    html = html.replace('<link rel="stylesheet" href="./css/pages.css">',
      '<link rel="stylesheet" href="./css/pages.css">\n  <link rel="stylesheet" href="./css/portfolio.css?v=20261025">\n  <link rel="stylesheet" href="./css/home.css?v=20261025">');
  }
  if (extraHead) html = html.replace('</head>', extraHead + '\n</head>');
  html = html.replace(/  <main>[\s\S]*?  <\/main>/, main);
  fs.writeFileSync(path.join(ROOT, file), html);
  console.log('  wrote ' + file + ' -> /' + slug);
}

page('pricing.html',
  'Pricing &mdash; Website Design &amp; AI Chat Agents | Conversing AI',
  'Fixed written quotes for websites and web apps, plus monthly AI chat agent plans. See what is included and work out what an agent is worth to your business.',
  'pricing', pricingMain,
  '  <script src="./js/roi.js?v=20261025" defer></script>');

page('thank-you.html',
  'Thank you &mdash; Conversing AI',
  'Thanks for getting in touch. We read every enquiry ourselves and reply within one working day.',
  'thank-you', thankYouMain,
  '  <meta name="robots" content="noindex, follow">');

console.log('done');
