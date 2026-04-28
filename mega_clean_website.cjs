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
              <a href="ai-chat-voice-agents.html" class="dropdown-item"><span>AI Chat &amp; Voice Agents</span><span class="arrow">&rarr;</span></a>
              <a href="ai-receptionist.html" class="dropdown-item"><span>AI Receptionist</span><span class="arrow">&rarr;</span></a>
              <a href="ai-automation.html" class="dropdown-item"><span>AI Automation</span><span class="arrow">&rarr;</span></a>
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
          <a href="ai-chat-voice-agents.html" class="dropdown-item">AI Chat &amp; Voice Agents</a>
          <a href="ai-receptionist.html" class="dropdown-item">AI Receptionist</a>
          <a href="ai-automation.html" class="dropdown-item">AI Automation</a>
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

const CLEAN_FOOTER = `  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-glow-line"></div>
    <div class="footer-glow-orb"></div>
    <div class="container">
      <div class="footer-grid">
        <div class="fade-up">
          <a href="index.html" class="logo-link" style="margin-bottom:1.5rem;">
            <img src="./images/logo.jpg" alt="Conversing AI Logo" style="height:3rem;border-radius:0.125rem;object-fit:contain;">
            <span class="logo-text" style="font-size:1.5rem;letter-spacing:-0.05em;">Conversing AI</span>
          </a>
          <p class="footer-brand-text">Done-for-you AI, automation &amp; digital growth services. We design, build, deploy, and manage AI systems end-to-end.</p>
          <ul class="footer-contact-list" style="margin-top:1.5rem;">
            <li class="footer-contact-item">
              <div class="footer-contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg></div>
              <a href="mailto:info@conversingai.com">info@conversingai.com</a>
            </li>
            <li class="footer-contact-item">
              <div class="footer-contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div>
              <span>Chat With Us</span>
            </li>
            <li class="footer-contact-item">
              <div class="footer-contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg></div>
              <span>Global Remote Team</span>
            </li>
          </ul>
        </div>
        <div></div>
        <div class="footer-menus fade-up">
          <div>
            <h3 class="footer-menu-title">Services</h3>
            <ul class="footer-menu-list">
              <li><a href="ai-solutions.html">AI Solutions Suite</a></li>
              <li><a href="ai-chat-voice-agents.html">AI Chat &amp; Voice Agents</a></li>
              <li><a href="ai-receptionist.html">AI Receptionist</a></li>
              <li><a href="ai-automation.html">AI Automation</a></li>
              <li><a href="website-design.html">Website Design</a></li>
              <li><a href="lead-generation.html">Lead Generation</a></li>
              <li><a href="blog-writing-seo.html">Blog Writing &amp; SEO</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-menu-title">Company</h3>
            <ul class="footer-menu-list">
              <li><a href="about.html">About Us</a></li>
              <li><a href="how-it-works.html">How It Works</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="ai-courses.html">AI Courses</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-menu-title">Legal</h3>
            <ul class="footer-menu-list">
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms of Service</a></li>
              <li><a href="cookies.html">Cookie Policy</a></li>
              <li><a href="refund.html">Refund Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom fade-up">
        <p class="footer-copyright">&copy; Conversing AI. All rights reserved.</p>
        <div class="footer-socials">
          <a href="#" class="footer-social-link" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></a>
          <a href="#" class="footer-social-link" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg></a>
          <a href="#" class="footer-social-link" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
          <a href="#" class="footer-social-link" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></a>
        </div>
      </div>
    </div>
  </footer>
`;

function fixFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // Header pattern
    const fullHeaderPattern = /<!-- HEADER -->[\s\S]*?<main>/;
    const fallbackHeaderPattern = /<header class="header">[\s\S]*?<main>/;

    // Footer pattern
    const footerPattern = /<!-- FOOTER -->[\s\S]*?<\/footer>/;
    const fallbackFooterPattern = /<footer class="footer">[\s\S]*?<\/footer>/;

    let newContent = content;
    
    if (fullHeaderPattern.test(content)) {
        newContent = newContent.replace(fullHeaderPattern, `${CLEAN_HEADER_MOBILE}\n\n  <main>`);
    } else if (fallbackHeaderPattern.test(content)) {
        newContent = newContent.replace(fallbackHeaderPattern, `${CLEAN_HEADER_MOBILE}\n\n  <main>`);
    }

    if (footerPattern.test(newContent)) {
        newContent = newContent.replace(footerPattern, CLEAN_FOOTER);
    } else if (fallbackFooterPattern.test(newContent)) {
        newContent = newContent.replace(fallbackFooterPattern, CLEAN_FOOTER);
    }

    // Fix leading slashes in relative links
    newContent = newContent.replace(/href="\/ai-chat-voice-agents.html"/g, 'href="ai-chat-voice-agents.html"');
    newContent = newContent.replace(/href="\/ai-receptionist.html"/g, 'href="ai-receptionist.html"');

    if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        return true;
    }
    return false;
}

const files = fs.readdirSync('.');
let count = 0;
files.forEach(file => {
    if (file.endsWith('.html')) { // Clean EVERYTHING including index.html now
        if (fixFile(file)) {
            console.log(`Mega cleaned ${file}`);
            count++;
        }
    }
});
console.log(`Done. Mega cleaned ${count} files.`);
