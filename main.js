/* ===== 敗走録 - Main JS ===== */

(function () {
  'use strict';

  // --- Dark / Light mode toggle ---
  const THEME_KEY = 'haisouroku-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('click', function (e) {
    if (e.target.closest('.theme-toggle')) {
      var current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    }
  });

  // --- Header scroll effect ---
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // --- Mobile menu toggle ---
  document.addEventListener('click', function (e) {
    var menuBtn = e.target.closest('.menu-btn');
    if (menuBtn) {
      menuBtn.classList.toggle('open');
      var nav = document.querySelector('.site-header__nav');
      if (nav) nav.classList.toggle('open');
    }
  });

  // --- Archive tag filter ---
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    document.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    var tag = btn.getAttribute('data-filter');
    var items = document.querySelectorAll('.archive-item');

    items.forEach(function (item) {
      if (tag === 'all') {
        item.style.display = '';
      } else {
        var itemTags = item.getAttribute('data-tags') || '';
        item.style.display = itemTags.includes(tag) ? '' : 'none';
      }
    });
  });
})();
