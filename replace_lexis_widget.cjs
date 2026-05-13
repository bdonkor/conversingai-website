// Replace the multi-line Lexis widget block (with comment) with the exact
// single-line snippet provided by ElevenLabs.

const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;

const NEW_SNIPPET =
  '<elevenlabs-convai agent-id="agent_6201kr2fe29bfj6az6tmrmdsrsm3"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>';

const files = fs
  .readdirSync(repoRoot)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(repoRoot, f));

let updated = 0;
let skipped = 0;
const log = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const name = path.basename(file);
  const nl = original.includes('\r\n') ? '\r\n' : '\n';

  // Match the previously inserted block (3 lines: comment, element, script)
  // Allow optional leading/trailing whitespace around the block.
  const pattern = new RegExp(
    '[ \\t]*<!-- Lexis AI chat widget \\(ElevenLabs Convai\\) -->' +
      '\\r?\\n[ \\t]*<elevenlabs-convai agent-id="agent_6201kr2fe29bfj6az6tmrmdsrsm3"></elevenlabs-convai>' +
      '\\r?\\n[ \\t]*<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>'
  );

  if (pattern.test(original)) {
    // Preserve a leading 2-space indent for cleanliness
    const replacement = '  ' + NEW_SNIPPET;
    const next = original.replace(pattern, replacement);
    fs.writeFileSync(file, next);
    updated++;
    log.push(`  updated: ${name}`);
  } else {
    skipped++;
    log.push(`  no match: ${name}`);
  }
}

console.log(`\nProcessed ${files.length} HTML files.`);
console.log(`  Updated:  ${updated}`);
console.log(`  No match: ${skipped}\n`);
console.log(log.join('\n'));
