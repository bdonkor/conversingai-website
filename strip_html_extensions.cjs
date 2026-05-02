const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let totalReplacements = 0;
let modifiedFiles = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;

  html = html.replace(/(\bhref\s*=\s*["'])([^"'#?]+?)\.html(["'#?])/g, (match, prefix, basename, suffix) => {
    if (basename.startsWith('http')) return match;
    if (basename.startsWith('//')) return match;
    totalReplacements++;
    return `${prefix}${basename}${suffix}`;
  });

  if (html !== before) {
    fs.writeFileSync(filePath, html);
    modifiedFiles++;
    console.log(`updated ${file}`);
  }
});

console.log(`\nFiles modified: ${modifiedFiles}, total href replacements: ${totalReplacements}`);
