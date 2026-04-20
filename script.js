/* ============================================================
   EyeRexUs – Global Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR: hide on scroll down, show on scroll up ── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (navbar) {
          if (current > lastScroll && current > 80) {
            navbar.classList.add('nav-hidden');
            // Close mobile menu on scroll
            closeMobileMenu();
          } else {
            navbar.classList.remove('nav-hidden');
          }
          navbar.classList.toggle('nav-scrolled', current > 20);
        }
        lastScroll = current <= 0 ? 0 : current;
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ── 2. MOBILE MENU ── */
  const menuBtn   = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay   = document.getElementById('menuOverlay');
  const menuIcon  = document.getElementById('menuIcon');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (menuIcon) {
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-times');
    }
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (menuIcon) {
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    }
  }

  menuBtn && menuBtn.addEventListener('click', () => {
    mobileMenu && mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });

  overlay && overlay.addEventListener('click', closeMobileMenu);

  // Close on mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMobileMenu();
  });

  /* ── 3. ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 4. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 5. BACK TO TOP ── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 6. CONTACT FORM ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const spinner = contactForm.querySelector('.spinner');
      if (btn) btn.disabled = true;
      if (spinner) spinner.style.display = 'block';
      setTimeout(() => {
        if (btn) { btn.disabled = false; btn.textContent = '✓ Message Sent!'; }
        if (spinner) spinner.style.display = 'none';
        contactForm.reset();
        setTimeout(() => { if (btn) btn.textContent = 'Send Inquiry'; }, 3000);
      }, 1500);
    });
  }

  /* ── 7. COUNTER ANIMATION ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }, 16);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  /* ── 8. PAGE ENTER ANIMATION ── */
  document.body.classList.add('page-enter');

});
