const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Benjamin\\Desktop\\ConversingAI-Website';

function processFile(filePath) {
  if (!filePath.endsWith('.html') && !filePath.endsWith('.tsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (filePath.endsWith('.html')) {
    // Replace in desktop and mobile menus
    const regex = /<a href="index\.html" class="nav-link">Home<\/a>/g;
    content = content.replace(regex, '<a href="index.html" class="nav-link">Welcome</a>');
  } else if (filePath.endsWith('Navbar.tsx')) {
    // Replace in Navbar component
    const regex = /<Link to="\/" className="(.*?)">Home<\/Link>/g;
    content = content.replace(regex, '<Link to="/" className="$1">Welcome</Link>');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

// Read all HTML files in root
fs.readdirSync(dir).forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.statSync(filePath).isFile()) {
    processFile(filePath);
  }
});

// also process Navbar.tsx
const navbarPath = path.join(dir, 'src', 'components', 'layout', 'Navbar.tsx');
if (fs.existsSync(navbarPath)) {
  processFile(navbarPath);
}

console.log('Done.');
