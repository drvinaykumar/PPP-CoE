/* PPP Centre — interaction layer */
(function () {
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    var yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();

    /* nav: solid once the hero is scrolled past; mobile menu */
    var nav = document.getElementById('nav');
    var onScroll = function () { nav.classList.toggle('is-solid', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    var menu = document.querySelector('.nav__menu');
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); });
    });

    /* ticker: duplicate the track so the loop is seamless */
    var track = document.querySelector('.tick__track');
    if (track) track.innerHTML += track.innerHTML.replace(/<span class="tick__item">/g, '<span class="tick__item" aria-hidden="true">');

    /* theme explorer: tabs */
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.xtab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.xpanel'));
    function activate(id, focusTab) {
      var found = false;
      tabs.forEach(function (t) {
        var on = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (on) { found = true; if (focusTab) t.focus({ preventScroll: true }); var rail = t.parentElement; if (rail.scrollWidth > rail.clientWidth) rail.scrollTo({ left: t.offsetLeft - rail.offsetLeft - 16, behavior: 'smooth' }); }
      });
      panels.forEach(function (p) { p.classList.toggle('is-active', p.id === id); });
      return found;
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        activate(t.getAttribute('aria-controls'));
        history.replaceState(null, '', '#' + t.getAttribute('aria-controls'));
      });
      t.addEventListener('keydown', function (e) {
        var k = e.key, j = null;
        if (k === 'ArrowDown' || k === 'ArrowRight') j = (i + 1) % tabs.length;
        if (k === 'ArrowUp' || k === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        if (j !== null) { e.preventDefault(); activate(tabs[j].getAttribute('aria-controls'), true); }
      });
    });
    activate(panels.length ? panels[0].id : '');

    function goToTheme(id) {
      if (!activate(id)) return false;
      var sec = document.getElementById('themes');
      var top = sec.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
      return true;
    }
    /* deep links: #t-03 opens theme 03; #p-07-4 opens that project */
    function fromHash() {
      var h = location.hash.slice(1);
      if (/^t-\d\d$/.test(h)) goToTheme(h);
      var m = /^p-(\d\d)-\d$/.exec(h);
      if (m) {
        activate('t-' + m[1]);
        var d = document.getElementById(h);
        if (d) { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60); }
      }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);

    /* hero network: nodes open their theme; hovering lights the spoke */
    document.querySelectorAll('.net__node').forEach(function (n) {
      var id = n.getAttribute('data-t');
      var spoke = document.querySelector('.net__spoke[data-t="' + id + '"]');
      n.addEventListener('mouseenter', function () { spoke && spoke.classList.add('is-hot'); });
      n.addEventListener('mouseleave', function () { spoke && spoke.classList.remove('is-hot'); });
      n.addEventListener('focus', function () { spoke && spoke.classList.add('is-hot'); });
      n.addEventListener('blur', function () { spoke && spoke.classList.remove('is-hot'); });
      n.addEventListener('click', function (e) { e.preventDefault(); goToTheme('t-' + id); history.replaceState(null, '', '#t-' + id); });
    });

    /* roadmap: place the "we are here" marker from today's date */
    var tl = document.querySelector('.tl');
    var now = document.querySelector('.tl__now');
    if (tl && now) {
      var s = +tl.getAttribute('data-start'), e = +tl.getAttribute('data-end');
      var d = new Date(), y = d.getFullYear() + d.getMonth() / 12;
      if (y >= s && y <= e) { now.style.setProperty('--now', ((y - s) / (e - s) * 100).toFixed(2) + '%'); now.hidden = false; }
    }

    /* reveal on scroll */
    var rv = document.querySelectorAll('.big, .sec__sub, .fed__text, .path__stage, .rule-ug, .xp__wrap, .unit, .disha__text, .dletters li, .tl, .founder, .person');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      rv.forEach(function (el, i) { el.classList.add('rv'); el.style.transitionDelay = ((i % 5) * 0.06) + 's'; io.observe(el); });
    }
  });
})();