const fs = require('fs');
const path = require('path');

const directory = __dirname;
const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

let filesUpdated = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Ensure <html lang="en">
  content = content.replace(/<html[^>]*>/i, match => {
    if (!match.includes('lang=')) {
      return match.replace('<html', '<html lang="en"');
    }
    return match;
  });

  // 2. Ensure viewport meta tag exists
  if (!content.includes('name="viewport"')) {
    content = content.replace(/<head>/i, '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
  }

  // 3. Optimize Images for Speed (lazy loading & async decoding)
  content = content.replace(/<img([^>]*)>/gi, (match, p1) => {
    let newImg = `<img${p1}>`;
    
    // Skip lazy loading for the logo (critical LCP element)
    if (p1.includes('logo') || p1.includes('conversing AI official logo')) {
      if (!p1.includes('fetchpriority=')) {
         // Optionally add fetchpriority="high" to logo
         newImg = newImg.replace('<img', '<img fetchpriority="high"');
      }
      return newImg;
    }

    if (!p1.includes('loading=')) {
      newImg = newImg.replace('<img', '<img loading="lazy"');
    }
    if (!p1.includes('decoding=')) {
      newImg = newImg.replace('<img', '<img decoding="async"');
    }
    
    // SEO: Ensure alt attribute
    if (!p1.includes('alt=')) {
      newImg = newImg.replace('<img', '<img alt="Conversing AI Service"');
    }

    return newImg;
  });

  // 4. Ensure scripts are deferred
  content = content.replace(/<script src=".\/js\/main.js"([^>]*)>/gi, (match, p1) => {
    if (!p1.includes('defer')) {
      return `<script src="./js/main.js" defer${p1}>`;
    }
    return match;
  });

  // 5. Ensure favicon is present
  if (!content.includes('rel="icon"')) {
     content = content.replace(/<head>/i, '<head>\n  <link rel="icon" type="image/jpeg" href="./images/conversing AI official logo.png">');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Optimized: ${file}`);
    filesUpdated++;
  }
});

console.log(`\nOptimization complete! Updated ${filesUpdated} files.`);
