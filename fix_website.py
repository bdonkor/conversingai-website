import os
import re

# The correct header navigation block
CORRECT_NAV = """        <a href="index.html" class="nav-link">Welcome</a>
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
"""

# The correct mobile menu block
CORRECT_MOBILE_MENU = """    <a href="index.html" class="nav-link">Welcome</a>
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
"""

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for broken nav: starts from the nav-pill and goes to the end of the nav
    # We use a broad regex to catch variations in whitespace
    nav_pattern = re.compile(r'<nav class="nav-pill">.*?</nav>', re.DOTALL)
    
    # Pattern for broken mobile menu: starts from mobile-menu and goes to the closing div
    mobile_pattern = re.compile(r'<div class="mobile-menu">.*?</div>', re.DOTALL)

    new_content = content
    
    if nav_pattern.search(content):
        new_content = nav_pattern.sub(f'<nav class="nav-pill">\n{CORRECT_NAV}      </nav>', new_content)
    
    if mobile_pattern.search(new_content):
        new_content = mobile_pattern.sub(f'<div class="mobile-menu">\n{CORRECT_MOBILE_MENU}  </div>', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    for filename in os.listdir('.'):
        if filename.endswith('.html') and filename != 'index.html':
            if fix_file(filename):
                print(f"Fixed {filename}")
                count += 1
    print(f"Done. Fixed {count} files.")
