/* ===========================================================
   PPP Centre — interaction layer
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Sticky nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector('.nav__menu');
  const navLinks = document.querySelector('.nav__links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal on scroll ----------
     Auto-tag every section heading, theme card, init card,
     unit card, and phase card with the .reveal class so we
     don't have to mark them up by hand in HTML.            */

  const revealSelectors = [
    '.section__head',
    '.about__copy',
    '.about__pull',
    '.theme',
    '.init',
    '.unit',
    '.disha-card',
    '.phase',
    '.founder',
    '.team-divider',
    '.member',
    '.hero__title-wrap',
    '.hero__lede',
    '.hero__logo',
    '.hero__motto',
    '.hero__cta',
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // staggered delay within each section's group
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(c => c.matches(revealSelectors.join(',')));
      const idx = siblings.indexOf(el);
      if (idx >= 0 && idx < 8) el.setAttribute('data-delay', String(idx));
    }
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: just reveal everything immediately
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Smooth-scroll offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
