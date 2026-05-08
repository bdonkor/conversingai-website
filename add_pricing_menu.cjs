const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0, skipped = 0, warnings = [];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;

  if (html.includes('Pricing <span class="dropdown-arrow">')) {
    skipped++;
    return;
  }

  // Detect line ending used in this file
  const NL = html.includes('\r\n') ? '\r\n' : '\n';

  const desktopAnchor = [
    '        <a href="blog" class="nav-link">Blog</a>',
    '        <a href="contact" class="nav-link">Contact</a>',
  ].join(NL);

  const desktopBlock = [
    '        <div class="dropdown">',
    '          <a href="#" class="dropdown-trigger nav-link">Pricing <span class="dropdown-arrow">&#9660;</span></a><div class="dropdown-menu">',
    '            <div class="dropdown-menu-inner">',
    '              <a href="ai-receptionist-plans" class="dropdown-item"><span>AI Receptionist</span><span class="arrow">&rarr;</span></a>',
    '            </div>',
    '          </div>',
    '        </div>',
    '        <a href="blog" class="nav-link">Blog</a>',
    '        <a href="contact" class="nav-link">Contact</a>',
  ].join(NL);

  const mobileAnchor = [
    '    <a href="blog" class="nav-link">Blog</a>',
    '    <a href="contact" class="nav-link">Contact</a>',
  ].join(NL);

  const mobileBlock = [
    '    <div class="dropdown">',
    '      <a href="#" class="dropdown-trigger nav-link">Pricing <span class="dropdown-arrow">&#9660;</span></a><div class="dropdown-menu">',
    '        <div class="dropdown-menu-inner">',
    '          <a href="ai-receptionist-plans" class="dropdown-item">AI Receptionist</a>',
    '        </div>',
    '      </div>',
    '    </div>',
    '    <a href="blog" class="nav-link">Blog</a>',
    '    <a href="contact" class="nav-link">Contact</a>',
  ].join(NL);

  if (html.includes(desktopAnchor)) {
    html = html.replace(desktopAnchor, desktopBlock);
  } else {
    warnings.push(`${file}: desktop anchor not found`);
  }

  if (html.includes(mobileAnchor)) {
    html = html.replace(mobileAnchor, mobileBlock);
  } else {
    warnings.push(`${file}: mobile anchor not found`);
  }

  if (html !== before) {
    fs.writeFileSync(filePath, html);
    updated++;
  }
});

console.log(`Updated: ${updated} files, Skipped: ${skipped}`);
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach(w => console.log('  ' + w));
}
