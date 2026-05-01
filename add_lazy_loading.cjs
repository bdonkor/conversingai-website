const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let totalImages = 0;
let lazyAdded = 0;
let priorityStripped = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;
  let imgIndex = 0;

  html = html.replace(/<img\b([^>]*?)>/g, (match, attrs) => {
    totalImages++;
    imgIndex++;

    if (/\bfetchpriority\s*=\s*["']high["']/i.test(attrs)) {
      attrs = attrs.replace(/\s*fetchpriority\s*=\s*["']high["']/i, '');
      priorityStripped++;
    }

    if (imgIndex === 1) {
      return `<img${attrs}>`;
    }

    if (/\bloading\s*=/i.test(attrs)) return `<img${attrs}>`;
    if (/\bdecoding\s*=/i.test(attrs)) {
      attrs = ` loading="lazy"${attrs}`;
    } else {
      attrs = ` loading="lazy" decoding="async"${attrs}`;
    }
    lazyAdded++;
    return `<img${attrs}>`;
  });

  if (html !== before) {
    fs.writeFileSync(filePath, html);
    console.log(`updated ${file}`);
  }
});

console.log(`\nImages: ${totalImages} | lazy added: ${lazyAdded} | fetchpriority stripped: ${priorityStripped}`);
