const fs = require('fs');

const pages = {
  'privacy.html':  'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.04))',
  'terms.html':    'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.04))',
  'cookies.html':  'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(217,119,6,0.04))',
  'refund.html':   'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.04))',
};

Object.entries(pages).forEach(([file, gradient]) => {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  const re = /(<main>\s*\n\s*)(<section class="section" style="padding-top:2rem;">\s*\n\s*<div class="container">\s*\n\s*<div class="legal-content">\s*\n\s*)(<h1[\s\S]*?<\/h1>)\s*\n\s*(<p style="margin-bottom:3rem;">[^<]*<\/p>)/;

  html = html.replace(re, (match, mainOpen, sectionOpen, h1, lastUpdatedP) => {
    const newDateP = lastUpdatedP
      .replace('style="margin-bottom:3rem;"', 'style="margin:0;color:var(--slate-400);font-size:0.9375rem;"');
    const banner = `<section style="background:${gradient};padding:4rem 0 3rem;border-bottom:1px solid rgba(255,255,255,0.08);">
      <div class="container">
        ${h1}
        ${newDateP}
      </div>
    </section>

    <section class="section" style="padding-top:3rem;">
      <div class="container">
        <div class="legal-content">
`;
    return mainOpen + banner;
  });

  if (html !== before) {
    fs.writeFileSync(file, html);
    console.log('updated', file);
  } else {
    console.log('NO MATCH', file);
  }
});
