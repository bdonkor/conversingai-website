const fs = require('fs');
const path = require('path');
const dir = '.';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace icon link
    content = content.replace(/href="\.\/images\/logo\.jpg"/g, 'href="./images/Conversing AI Logo.png"');
    
    // Replace img tags
    content = content.replace(/src="\.\/images\/logo\.jpg"/g, 'src="./images/Conversing AI Logo.png"');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Done!');
