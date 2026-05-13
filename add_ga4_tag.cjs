// Inserts the Google Analytics 4 (GA4) tag into every top-level HTML page,
// just before </head>. Idempotent: skips files where the tag is already present.

const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;
const GA4_ID = 'G-LQKGQXKE92';

const files = fs
  .readdirSync(repoRoot)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(repoRoot, f));

let updated = 0;
let skipped = 0;
let noHead = 0;
const log = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const name = path.basename(file);

  if (original.includes(GA4_ID)) {
    skipped++;
    log.push(`  already present: ${name}`);
    continue;
  }

  if (!original.includes('</head>')) {
    noHead++;
    log.push(`  no </head> tag: ${name}`);
    continue;
  }

  const nl = original.includes('\r\n') ? '\r\n' : '\n';
  const block =
    nl +
    '  <!-- Google tag (gtag.js) -->' +
    nl +
    `  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>` +
    nl +
    '  <script>' +
    nl +
    '    window.dataLayer = window.dataLayer || [];' +
    nl +
    '    function gtag(){dataLayer.push(arguments);}' +
    nl +
    "    gtag('js', new Date());" +
    nl +
    `    gtag('config', '${GA4_ID}');` +
    nl +
    '  </script>' +
    nl;

  // Replace only the first </head> occurrence (there should only ever be one)
  const updatedContent = original.replace('</head>', block + '</head>');
  fs.writeFileSync(file, updatedContent);
  updated++;
  log.push(`  updated: ${name}`);
}

console.log(`\nProcessed ${files.length} HTML files.`);
console.log(`  Updated:        ${updated}`);
console.log(`  Already had it: ${skipped}`);
console.log(`  No </head>:     ${noHead}\n`);
console.log(log.join('\n'));
