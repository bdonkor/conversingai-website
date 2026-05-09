// Adds a "Social Media" entry to the header Pricing dropdown
// (both desktop and mobile menus) right after the "AI Receptionist" entry.
// Idempotent: skips files where Social Media is already present.

const fs = require('fs');
const path = require('path');

const repoRoot = __dirname;

// Find every HTML file at the repo root (top-level only, like the existing menu lives)
const files = fs
  .readdirSync(repoRoot)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(repoRoot, f));

const DESKTOP_OLD =
  '<a href="ai-receptionist-plans" class="dropdown-item"><span>AI Receptionist</span><span class="arrow">&rarr;</span></a>';
const DESKTOP_NEW_LINE =
  '<a href="social-media-growth" class="dropdown-item"><span>Social Media</span><span class="arrow">&rarr;</span></a>';

const MOBILE_OLD =
  '<a href="ai-receptionist-plans" class="dropdown-item">AI Receptionist</a>';
const MOBILE_NEW_LINE =
  '<a href="social-media-growth" class="dropdown-item">Social Media</a>';

// Indentation (matches existing menu structure)
const DESKTOP_INDENT = ' '.repeat(14);
const MOBILE_INDENT = ' '.repeat(10);

let updated = 0;
let skipped = 0;
let untouched = 0;
const log = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const nl = original.includes('\r\n') ? '\r\n' : '\n';

  // Idempotency: if both already added, skip entirely
  const hasDesktopSocial = original.includes(
    '<a href="social-media-growth" class="dropdown-item"><span>Social Media</span>'
  );
  const hasMobileSocial =
    /<a href="social-media-growth" class="dropdown-item">Social Media<\/a>/.test(
      original
    );

  let content = original;
  let didDesktop = false;
  let didMobile = false;

  if (!hasDesktopSocial && content.includes(DESKTOP_OLD)) {
    const replacement = DESKTOP_OLD + nl + DESKTOP_INDENT + DESKTOP_NEW_LINE;
    content = content.replace(DESKTOP_OLD, replacement);
    didDesktop = true;
  }

  if (!hasMobileSocial && content.includes(MOBILE_OLD)) {
    const replacement = MOBILE_OLD + nl + MOBILE_INDENT + MOBILE_NEW_LINE;
    content = content.replace(MOBILE_OLD, replacement);
    didMobile = true;
  }

  if (didDesktop || didMobile) {
    fs.writeFileSync(file, content);
    updated++;
    log.push(
      `  updated: ${path.basename(file)} (${didDesktop ? 'desktop ' : ''}${didMobile ? 'mobile' : ''})`
    );
  } else if (hasDesktopSocial && hasMobileSocial) {
    skipped++;
    log.push(`  already present: ${path.basename(file)}`);
  } else {
    untouched++;
    log.push(`  no AI Receptionist menu found: ${path.basename(file)}`);
  }
}

console.log(`\nProcessed ${files.length} HTML files.`);
console.log(`  Updated:        ${updated}`);
console.log(`  Already had it: ${skipped}`);
console.log(`  No menu found:  ${untouched}\n`);
console.log(log.join('\n'));
