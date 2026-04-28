const fs = require('fs');
const path = require('path');

const CLEAN_HEADER_MOBILE = `  <!-- HEADER -->
  <header class="header">
    <div class="container header-inner">
      <a href="index.html" class="logo-link">
        <img src="./images/logo.jpg" alt="Conversing AI Logo" class="logo-img">
        <span class="logo-text">Conversing AI</span>
      </a>

      <nav class="nav-pill">
        <a href="index.html" class="nav-link">Welcome</a>
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
      </nav>

      <div class="header-actions">
        <a href="get-quote.html" class="btn btn-outline btn-consultation"
          style="color:var(--blue-500);font-weight:700;">Free Consultation</a>
        <a href="get-started.html" class="btn btn-primary"
          style="border-radius:0.5rem;padding:0 1.5rem;font-weight:700;">Get started</a>
        <div class="mobile-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </header>

  <!-- MOBILE MENU -->
  <div class="mobile-menu">
    <a href="index.html" class="nav-link">Welcome</a>
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
  </div>
`;

function fixFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // Regex to match from <!-- HEADER --> (optional) or <header class="header">
    // all the way to the <main> tag.
    // The residue is always inside this block.
    const fullPattern = /<!-- HEADER -->[\s\S]*?<main>/;
    const fallbackPattern = /<header class="header">[\s\S]*?<main>/;

    let newContent = content;
    
    if (fullPattern.test(content)) {
        newContent = newContent.replace(fullPattern, `${CLEAN_HEADER_MOBILE}\n\n  <main>`);
    } else if (fallbackPattern.test(content)) {
        newContent = newContent.replace(fallbackPattern, `${CLEAN_HEADER_MOBILE}\n\n  <main>`);
    } else {
        console.log(`  Could not find header-to-main block in ${filepath}`);
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
            console.log(`Deep cleaned ${file}`);
            count++;
        }
    }
});
console.log(`Done. Deep cleaned ${count} files.`);
