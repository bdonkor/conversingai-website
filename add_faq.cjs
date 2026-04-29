const fs = require('fs');
const path = require('path');
const dir = '.';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const searchStr = '<li><a href="how-it-works.html">How It Works</a></li>';
    const replaceStr = '<li><a href="how-it-works.html">How It Works</a></li>\n              <li><a href="faq.html">FAQ</a></li>';
    if (content.includes(searchStr) && !content.includes('<a href="faq.html">FAQ</a>')) {
      content = content.replace(searchStr, replaceStr);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + file);
    }
  }
});
