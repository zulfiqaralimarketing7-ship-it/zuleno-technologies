(function () {
  'use strict';

  /* ---------- Sticky navbar background on scroll ---------- */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    var closeMenu = function () {
      hamburger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Theme toggle (persisted in localStorage) ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var root = document.documentElement;
  var STORAGE_KEY = 'zuleno-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }

  if (saved) {
    applyTheme(saved);
  } else {
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isLight = root.getAttribute('data-theme') === 'light';
      var next = isLight ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- FAQ accordion ---------- */
  var triggers = document.querySelectorAll('.accordion__trigger');
  triggers.forEach(function (trigger) {
    var panel = trigger.nextElementSibling;
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';

      triggers.forEach(function (t) {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          t.nextElementSibling.style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + 'px';
    });
  });
})();
