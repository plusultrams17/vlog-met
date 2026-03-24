/* ===== 敗走録 - Main JS ===== */

(function () {
  'use strict';

  /* ===== POSTS DATABASE (for related posts) ===== */
  var POSTS = [
    { slug: '2026-03-24-jikoshoukai', title: '初日の自己紹介で名前を噛んで、そのあだ名が3年続いた', tags: ['failure','life'], date: '2026.03.24' },
    { slug: '2026-03-22-gijiroku', title: '議事録を全社に送ったつもりが、愚痴メモを全社に送っていた', tags: ['failure'], date: '2026.03.22' },
    { slug: '2026-03-20-joushi-namae', title: '上司の名前を半年間ずっと間違えて呼んでいた', tags: ['failure'], date: '2026.03.20' },
    { slug: '2026-03-18-yuukyuu', title: '有給を取った日に限って、自分しか知らないトラブルが起きる法則', tags: ['failure','learning'], date: '2026.03.18' },
    { slug: '2026-03-16-presentation', title: 'プレゼンのスライドが全部前回の案件のまま、10分気づかなかった', tags: ['failure'], date: '2026.03.16' },
    { slug: '2026-03-14-taishoku-senpai', title: '退職する先輩に「あなたの仕事、誰でもできますよ」と言って泣かせた話', tags: ['failure','thought'], date: '2026.03.14' },
    { slug: '2026-03-12-juken', title: '受験当日に会場を間違えて、タクシーの中で泣いた', tags: ['failure'], date: '2026.03.12' },
    { slug: '2026-03-10-kokuhaku', title: '好きだった子に告白する手紙を、本人じゃなくて担任に渡した', tags: ['failure','life'], date: '2026.03.10' },
    { slug: '2026-03-08-bunkasai', title: '文化祭の模擬店で原価計算を間違えて、売れば売るほど赤字だった', tags: ['failure','learning'], date: '2026.03.08' },
    { slug: '2026-03-06-kouhai', title: '部活の後輩に偉そうに教えたら、翌月その後輩にレギュラーを奪われた', tags: ['failure','thought'], date: '2026.03.06' },
    { slug: '2026-03-04-sotsugyoushiki', title: '卒業式で泣かなかったことを20年後悔している', tags: ['thought'], date: '2026.03.04' },
    { slug: '2026-03-02-shuuryokou', title: '修学旅行の自由行動で迷子になり、班のメンバーの思い出を全部消した', tags: ['failure','thought'], date: '2026.03.02' },
    { slug: '2026-02-28-hikkoshi', title: '引っ越し当日に鍵を旧居に忘れて、新居の前で一晩過ごした', tags: ['failure','life'], date: '2026.02.28' },
    { slug: '2026-02-26-biyouin', title: '美容院で「お任せします」と言って、別人になって帰ってきた', tags: ['failure','life'], date: '2026.02.26' },
    { slug: '2026-02-24-jisui', title: '自炊で節約するつもりが、調味料を一通り揃えたら外食より高くなった', tags: ['learning','life'], date: '2026.02.24' },
    { slug: '2026-02-22-seki', title: '電車で席を譲ったら「そんなに老けて見えますか」と怒られた', tags: ['thought','life'], date: '2026.02.22' },
    { slug: '2026-02-20-kekkonshiki', title: '友人の結婚式のスピーチで、新郎のエピソードを新婦のエピソードと間違えた', tags: ['failure'], date: '2026.02.20' },
    { slug: '2026-02-18-gohoubi', title: '「自分へのご褒美」が月8回あった年の年末残高', tags: ['failure','learning'], date: '2026.02.18' },
    { slug: '2026-02-16-hoken', title: '保険を全部断った翌月に入院した話', tags: ['failure','learning'], date: '2026.02.16' },
    { slug: '2026-02-14-fukugyou', title: '先輩に勧められた副業に50万払って、学んだのは「断る力」だけだった', tags: ['failure','learning'], date: '2026.02.14' },
    { slug: '2026-02-12-yachin', title: '家賃を半年滞納して、大家さんから手紙じゃなくておにぎりが届いた話', tags: ['failure','thought'], date: '2026.02.12' },
    { slug: '2026-02-10-tanjoubi', title: '彼女の誕生日を2回連続で忘れて、3回目に覚えていたら逆に怒られた', tags: ['failure','life'], date: '2026.02.10' },
    { slug: '2026-02-08-nomikai', title: '飲み会で上司の悪口を言ったら、後ろに本人がいた', tags: ['failure'], date: '2026.02.08' },
    { slug: '2026-02-06-shinpai', title: '親に「心配しないで」と言い続けた結果、本当に心配されなくなった', tags: ['thought','life'], date: '2026.02.06' },
    { slug: '2026-02-04-itsudemo', title: '「いつでも連絡してね」と言った相手から本当に連絡が来て、逃げた話', tags: ['thought','failure'], date: '2026.02.04' }
  ];

  var TAG_ICONS = { failure: '\u26A1', learning: '\uD83D\uDCD6', thought: '\uD83D\uDCAD', life: '\uD83C\uDFE0', tech: '\u2699\uFE0F' };

  // --- Dark / Light mode toggle ---
  var THEME_KEY = 'haisouroku-theme';

  function getPreferredTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '\u2600' : '\u263E';
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

  // ===== NEW: Reading Progress Bar =====
  function initProgressBar() {
    var body = document.querySelector('.post-body');
    if (!body) return;

    var bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', function () {
      var rect = body.getBoundingClientRect();
      var total = body.offsetHeight - window.innerHeight;
      var progress = Math.min(1, Math.max(0, -rect.top / total));
      bar.style.transform = 'scaleX(' + progress + ')';
    }, { passive: true });
  }

  // ===== NEW: Reading Time =====
  function initReadingTime() {
    var body = document.querySelector('.post-body');
    if (!body) return;

    var text = body.textContent || '';
    var chars = text.replace(/\s/g, '').length;
    var minutes = Math.max(1, Math.ceil(chars / 500));

    var badge = document.createElement('span');
    badge.className = 'reading-time';
    badge.textContent = '\u23F1 \u7D04' + minutes + '\u5206\u3067\u8AAD\u3081\u308B';

    var meta = document.querySelector('.post-header__meta');
    if (meta) meta.appendChild(badge);
  }

  // ===== NEW: Scroll to Top =====
  function initScrollToTop() {
    var btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
    btn.setAttribute('aria-label', '\u30DA\u30FC\u30B8\u4E0A\u90E8\u3078');
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== NEW: Scroll Animations =====
  function initScrollAnimations() {
    var targets = document.querySelectorAll('.post-card--compact, .post-card--featured, .archive-item, .section__title');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(function (el, i) {
      el.classList.add('animate-in');
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
      observer.observe(el);
    });
  }

  // ===== NEW: Related Posts =====
  function initRelatedPosts() {
    var postNav = document.querySelector('.post-nav');
    if (!postNav) return;

    var currentTagEls = document.querySelectorAll('.post-header__tags .tag');
    var currentTags = [];
    currentTagEls.forEach(function (t) {
      var classes = t.className.split(/\s+/);
      classes.forEach(function (c) {
        if (c.indexOf('tag--') === 0) currentTags.push(c.replace('tag--', ''));
      });
    });

    var currentPath = window.location.pathname.replace(/\\/g, '/');

    var scored = POSTS.map(function (p) {
      if (currentPath.indexOf(p.slug) !== -1) return null;
      var score = 0;
      p.tags.forEach(function (t) {
        if (currentTags.indexOf(t) !== -1) score++;
      });
      return score > 0 ? { post: p, score: score } : null;
    }).filter(Boolean);

    scored.sort(function (a, b) { return b.score - a.score; });
    var related = scored.slice(0, 3);

    if (!related.length) return;

    var html = '<section class="related-posts"><h2 class="related-posts__heading">関連する記事</h2><div class="related-posts__grid">';
    related.forEach(function (r) {
      var p = r.post;
      var icon = TAG_ICONS[p.tags[0]] || '\u25C6';
      var tagClass = p.tags[0] || 'failure';
      html += '<a href="' + p.slug + '.html" class="related-posts__card">';
      html += '<div class="related-posts__visual related-posts__visual--' + tagClass + '"><span class="related-posts__icon">' + icon + '</span></div>';
      html += '<div class="related-posts__body"><time class="related-posts__date">' + p.date + '</time>';
      html += '<span class="related-posts__title">' + p.title + '</span></div></a>';
    });
    html += '</div></section>';

    postNav.insertAdjacentHTML('beforebegin', html);
  }

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    initReadingTime();
    initScrollToTop();
    initScrollAnimations();
    initRelatedPosts();
  });
})();
