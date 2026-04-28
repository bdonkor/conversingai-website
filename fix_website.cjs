const fs = require('fs');
const path = require('path');

const CORRECT_NAV = `        <a href="index.html" class="nav-link">Welcome</a>
        <div class="dropdown">
          <div class="dropdown-trigger nav-link">Services <span class="dropdown-arrow">&#9660;</span></div>
          <div class="dropdown-menu">
            <div class="dropdown-menu-inner">
              <a href="ai-solutions.html" class="dropdown-item"><span>AI Solutions Suite</span><span class="arrow">&rarr;</span></a>
              <a href="website-design.html" class="dropdown-item"><span>Website Design</span><span class="arrow">&rarr;</span></a>
              <a href="lead-generation.html" class="dropdown-item"><span>Lead Generation</span><span class="arrow">&rarr;</span></a>
              <a href="blog-writing-seo.html" class="dropdown-item"><span>Blog Writing &amp; SEO</span><span class="arrow">&rarr;</span></a>
            </div>
          </div>
        </div>
        <a href="about.html" class="nav-link">About Us</a>
        <div class="dropdown">
          <div class="dropdown-trigger nav-link">Training <span class="dropdown-arrow">&#9660;</span></div>
          <div class="dropdown-menu">
            <div class="dropdown-menu-inner">
              <a href="ai-courses.html" class="dropdown-item"><span>AI Courses</span><span class="arrow">&rarr;</span></a>
              <a href="live-training.html" class="dropdown-item"><span>Live 1-on-1 Training</span><span class="arrow">&rarr;</span></a>
            </div>
          </div>
        </div>
        <a href="blog.html" class="nav-link">Blog</a>
        <a href="contact.html" class="nav-link">Contact</a>
`;

const CORRECT_MOBILE_MENU = `    <a href="index.html" class="nav-link">Welcome</a>
    <div class="dropdown">
      <a href="#" class="dropdown-trigger nav-link">Services <span class="dropdown-arrow">&#9660;</span></a>
      <div class="dropdown-menu" style="display:none;">
        <div class="dropdown-menu-inner">
          <a href="ai-solutions.html" class="dropdown-item">AI Solutions Suite</a>
          <a href="website-design.html" class="dropdown-item">Website Design</a>
          <a href="lead-generation.html" class="dropdown-item">Lead Generation</a>
          <a href="blog-writing-seo.html" class="dropdown-item">Blog Writing &amp; SEO</a>
        </div>
      </div>
    </div>
    <a href="about.html" class="nav-link">About Us</a>

    <div class="dropdown">
      <div class="dropdown-trigger nav-link">Training <span class="dropdown-arrow">▼</span></div>
      <div class="dropdown-menu">
        <div class="dropdown-menu-inner">
          <a href="ai-courses.html" class="dropdown-item"><span>AI Courses</span><span class="arrow">&rarr;</span></a>
          <a href="live-training.html" class="dropdown-item"><span>Live 1-on-1 Training</span><span class="arrow">&rarr;</span></a>
        </div>
      </div>
    </div>
    <a href="blog.html" class="nav-link">Blog</a>
    <a href="contact.html" class="nav-link">Contact</a>
    <a href="get-quote.html" class="btn btn-outline btn-full" style="margin-top:1rem;">Free Consultation</a>
    <a href="get-started.html" class="btn btn-primary btn-full">Get started</a>
`;

function fixFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    const navPattern = /<nav class="nav-pill">[\s\S]*?<\/nav>/;
    const mobilePattern = /<div class="mobile-menu">[\s\S]*?<\/div>/;

    let newContent = content;
    
    if (navPattern.test(content)) {
        newContent = newContent.replace(navPattern, `<nav class="nav-pill">\n${CORRECT_NAV}      </nav>`);
    } else {
        console.log(`  No nav pattern found in ${filepath}`);
    }
    
    if (mobilePattern.test(newContent)) {
        newContent = newContent.replace(mobilePattern, `<div class="mobile-menu">\n${CORRECT_MOBILE_MENU}  </div>`);
    } else {
        console.log(`  No mobile pattern found in ${filepath}`);
    }

    if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        return true;
    }
    return false;
}

const files = fs.readdirSync('.');
let count = 0;
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html') {
        if (fixFile(file)) {
            console.log(`Fixed ${file}`);
            count++;
        }
    }
});
console.log(`Done. Fixed ${count} files.`);
