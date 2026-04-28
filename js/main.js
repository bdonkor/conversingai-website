/* ============================================
   CONVERSING AI — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MOBILE MENU ---------- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link (but not if it's a dropdown trigger)
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (link.classList.contains('dropdown-trigger')) return;
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- STICKY HEADER SHADOW (throttled via rAF) ---------- */
  const header = document.querySelector('.header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
          } else {
            header.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- INTERSECTION OBSERVER FOR ANIMATIONS ---------- */
  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length > 0) {
    if (prefersReducedMotion) {
      // Skip animation, just make visible immediately
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '-30px 0px' });

      fadeEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ---------- MOBILE DROPDOWN TOGGLE ---------- */
  const mobileDropdowns = document.querySelectorAll('.mobile-menu .dropdown-trigger');
  mobileDropdowns.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const dropdown = trigger.closest('.dropdown');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        const isOpen = menu.style.display === 'block';
        // Close all other open dropdowns
        document.querySelectorAll('.mobile-menu .dropdown-menu').forEach(function (m) {
          m.style.display = 'none';
        });
        menu.style.display = isOpen ? 'none' : 'block';
      }
    });
  });

  /* ---------- SMOOTH SCROLL FOR SUITE NAV ---------- */
  document.querySelectorAll('.suite-nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------- FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  /* ---------- TESTIMONIALS MARQUEE PAUSE ON TOUCH ---------- */
  const track = document.querySelector('.testimonials-track');
  if (track) {
    track.addEventListener('touchstart', function () {
      track.style.animationPlayState = 'paused';
    }, { passive: true });
    track.addEventListener('touchend', function () {
      track.style.animationPlayState = 'running';
    }, { passive: true });
  }

});
