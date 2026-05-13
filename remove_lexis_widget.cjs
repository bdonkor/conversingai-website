// Removes the Lexis ElevenLabs Convai widget snippet from every top-level HTML page.
// Strips the single-line snippet (plus its leading indentation and trailing newline).
// Idempotent: skips files where the snippet isn't present.

const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;

const files = fs
  .readdirSync(repoRoot)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(repoRoot, f));

let updated = 0;
let skipped = 0;
const log = [];

// Match the snippet (with any leading whitespace + trailing newline)
// Also strip an optional preceding HTML comment line ("<!-- Lexis ... -->") in case
// it survived from an older multi-line install.
const SNIPPET_RE = new RegExp(
  '(?:[ \\t]*<!-- Lexis AI chat widget \\(ElevenLabs Convai\\) -->\\r?\\n)?' +
    '[ \\t]*<elevenlabs-convai agent-id="agent_6201kr2fe29bfj6az6tmrmdsrsm3"></elevenlabs-convai>' +
    '<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>' +
    '\\r?\\n?',
  'g'
);

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const name = path.basename(file);

  if (!SNIPPET_RE.test(original)) {
    skipped++;
    log.push(`  not present: ${name}`);
    continue;
  }

  // Reset regex state (test() advances lastIndex on /g regexes)
  SNIPPET_RE.lastIndex = 0;
  const next = original.replace(SNIPPET_RE, '');
  fs.writeFileSync(file, next);
  updated++;
  log.push(`  removed:     ${name}`);
}

console.log(`\nProcessed ${files.length} HTML files.`);
console.log(`  Removed:     ${updated}`);
console.log(`  Not present: ${skipped}\n`);
console.log(log.join('\n'));
