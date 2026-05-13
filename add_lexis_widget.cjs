// Embeds the Lexis ElevenLabs Convai widget just before </body> on every
// top-level HTML page. Idempotent: skips files where the agent is already present.

const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;
const AGENT_ID = 'agent_6201kr2fe29bfj6az6tmrmdsrsm3';

const files = fs
  .readdirSync(repoRoot)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(repoRoot, f));

let updated = 0;
let skipped = 0;
let noBody = 0;
const log = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const name = path.basename(file);

  if (original.includes(AGENT_ID)) {
    skipped++;
    log.push(`  already present: ${name}`);
    continue;
  }

  if (!original.includes('</body>')) {
    noBody++;
    log.push(`  no </body> tag: ${name}`);
    continue;
  }

  const nl = original.includes('\r\n') ? '\r\n' : '\n';
  const block =
    nl +
    '  <!-- Lexis AI chat widget (ElevenLabs Convai) -->' +
    nl +
    `  <elevenlabs-convai agent-id="${AGENT_ID}"></elevenlabs-convai>` +
    nl +
    '  <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>' +
    nl;

  // Replace only the first </body> occurrence (there should only ever be one)
  const updatedContent = original.replace('</body>', block + '</body>');
  fs.writeFileSync(file, updatedContent);
  updated++;
  log.push(`  updated: ${name}`);
}

console.log(`\nProcessed ${files.length} HTML files.`);
console.log(`  Updated:        ${updated}`);
console.log(`  Already had it: ${skipped}`);
console.log(`  No </body>:     ${noBody}\n`);
console.log(log.join('\n'));
