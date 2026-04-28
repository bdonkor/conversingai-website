const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Benjamin\\Desktop\\ConversingAI-Website';

function processFile(filePath) {
  if (!filePath.endsWith('.html')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Remove old blog link and get its exact spaces
  const blogRegex = /^([ \t]*)<a href="blog\.html" class="nav-link">Blog<\/a>\r?\n/gm;
  let blogMatch1 = content.match(blogRegex);

  // Replace it entirely
  content = content.replace(blogRegex, '');

  // Insert <a href="blog.html"...> before <a href="contact.html"...>
  const contactRegex = /^([ \t]*)(<a href="contact\.html" class="nav-link">Contact<\/a>)/gm;
  content = content.replace(contactRegex, '$1<a href="blog.html" class="nav-link">Blog</a>\n$1$2');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

fs.readdirSync(dir).forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.statSync(filePath).isFile()) {
    processFile(filePath);
  }
});

console.log('Done.');
