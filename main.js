/* ===== 敗走録 - Main JS ===== */

(function () {
  'use strict';

  /* ===== POSTS DATABASE (for related posts) ===== */
  var POSTS = [
    { slug: '2026-03-25-git-push', title: '納品前夜にgit pushしたら、本番環境が真っ白になった話', tags: ['failure','learning'], date: '2026.03.25' },
    { slug: '2026-03-23-baton', title: '体育祭のリレーでバトンを落として、拾おうとして転んで、バトンが風で転がっていった話', tags: ['failure'], date: '2026.03.23' },
    { slug: '2026-03-21-muryo-taiken', title: '「無料体験」を7つ同時に始めて、全部解約し忘れた月の請求額', tags: ['failure','learning'], date: '2026.03.21' },
    { slug: '2026-03-19-line-group', title: 'LINEグループを間違えて、仕事の愚痴を家族グループに送った結果', tags: ['failure','life'], date: '2026.03.19' },
    { slug: '2026-03-17-localhost', title: '徹夜で作ったポートフォリオサイトを面接官に開いたら、localhost:3000だった話', tags: ['failure','learning'], date: '2026.03.17' },
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

  // ===== Table of Contents =====
  function initTOC() {
    var body = document.querySelector('.post-body');
    if (!body) return;
    var headings = body.querySelectorAll('h2');
    if (headings.length < 2) return;

    headings.forEach(function (h, i) { if (!h.id) h.id = 'section-' + (i + 1); });

    var html = '<nav class="toc" aria-label="\u76EE\u6B21">';
    html += '<button class="toc__toggle" aria-expanded="true"><span class="toc__icon">\uD83D\uDCD1</span> \u76EE\u6B21 <span class="toc__count">' + headings.length + '</span><span class="toc__arrow">\u25BE</span></button>';
    html += '<ol class="toc__list">';
    headings.forEach(function (h) {
      html += '<li class="toc__item"><a href="#' + h.id + '" class="toc__link">' + h.textContent.replace(/#$/, '') + '</a></li>';
    });
    html += '</ol></nav>';

    var postHeader = document.querySelector('.post-header');
    if (postHeader) postHeader.insertAdjacentHTML('afterend', html);

    var toggle = document.querySelector('.toc__toggle');
    var list = document.querySelector('.toc__list');
    if (toggle && list) {
      toggle.addEventListener('click', function () {
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        list.classList.toggle('collapsed');
        toggle.querySelector('.toc__arrow').textContent = expanded ? '\u25B8' : '\u25BE';
      });
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            document.querySelectorAll('.toc__link').forEach(function (l) { l.classList.remove('active'); });
            var a = document.querySelector('.toc__link[href="#' + entry.target.id + '"]');
            if (a) a.classList.add('active');
          }
        });
      }, { rootMargin: '-80px 0px -80% 0px' });
      headings.forEach(function (h) { obs.observe(h); });
    }
  }

  // ===== Summary / Key Takeaway Box =====
  function initSummaryBox() {
    var body = document.querySelector('.post-body');
    if (!body) return;
    var bq = body.querySelector('blockquote');
    if (!bq) return;
    var text = bq.textContent.trim();
    if (!text) return;

    var html = '<div class="summary-box">';
    html += '<div class="summary-box__header"><span class="summary-box__icon">\uD83D\uDCA1</span> \u3053\u306E\u8A18\u4E8B\u306E\u30DD\u30A4\u30F3\u30C8</div>';
    html += '<p class="summary-box__text">' + text + '</p>';
    html += '</div>';
    body.insertAdjacentHTML('afterbegin', html);
  }

  // ===== Share Buttons =====
  function initShareButtons() {
    var postNav = document.querySelector('.post-nav');
    if (!postNav) return;
    var title = document.title;
    var url = window.location.href;

    var html = '<div class="share-buttons">';
    html += '<span class="share-buttons__label">\u3053\u306E\u8A18\u4E8B\u3092\u30B7\u30A7\u30A2</span>';
    html += '<div class="share-buttons__group">';
    html += '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url) + '" target="_blank" rel="noopener" class="share-btn share-btn--x" aria-label="X\u3067\u30B7\u30A7\u30A2">\uD835\uDD4F</a>';
    html += '<a href="https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url) + '" target="_blank" rel="noopener" class="share-btn share-btn--line" aria-label="LINE\u3067\u30B7\u30A7\u30A2">LINE</a>';
    html += '<button class="share-btn share-btn--copy" aria-label="\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC">\uD83D\uDD17 \u30B3\u30D4\u30FC</button>';
    html += '</div></div>';

    var related = document.querySelector('.related-posts');
    (related || postNav).insertAdjacentHTML('beforebegin', html);

    var copyBtn = document.querySelector('.share-btn--copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(url).then(function () {
          copyBtn.textContent = '\u2713 \u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F';
          setTimeout(function () { copyBtn.textContent = '\uD83D\uDD17 \u30B3\u30D4\u30FC'; }, 2000);
        });
      });
    }
  }

  // ===== Reaction Buttons =====
  function initReactions() {
    var postBody = document.querySelector('.post-body');
    if (!postBody) return;
    var slug = window.location.pathname.replace(/.*\//, '').replace('.html', '');
    var storageKey = 'haisouroku-react-' + slug;
    var saved = JSON.parse(localStorage.getItem(storageKey) || '{}');

    var reactions = [
      { key: 'empathy', emoji: '\uD83D\uDE22', label: '\u5171\u611F\u3057\u305F' },
      { key: 'learned', emoji: '\uD83D\uDCDD', label: '\u5B66\u3073\u306B\u306A\u3063\u305F' },
      { key: 'laughed', emoji: '\uD83D\uDE02', label: '\u7B11\u3063\u305F' }
    ];

    var html = '<div class="reactions">';
    html += '<span class="reactions__label">\u3053\u306E\u8A18\u4E8B\u3069\u3046\u3060\u3063\u305F\uFF1F</span>';
    html += '<div class="reactions__group">';
    reactions.forEach(function (r) {
      var active = saved[r.key] ? ' active' : '';
      html += '<button class="reaction-btn' + active + '" data-key="' + r.key + '">';
      html += '<span class="reaction-btn__emoji">' + r.emoji + '</span>';
      html += '<span class="reaction-btn__label">' + r.label + '</span></button>';
    });
    html += '</div></div>';
    postBody.insertAdjacentHTML('afterend', html);

    document.querySelectorAll('.reaction-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-key');
        saved[key] = !saved[key];
        localStorage.setItem(storageKey, JSON.stringify(saved));
        btn.classList.toggle('active');
        btn.style.transform = 'scale(1.15)';
        setTimeout(function () { btn.style.transform = ''; }, 200);
      });
    });
  }

  // ===== Author Card =====
  function initAuthorCard() {
    var postNav = document.querySelector('.post-nav');
    if (!postNav) return;
    var html = '<div class="author-card">';
    html += '<div class="author-card__avatar">\u6557</div>';
    html += '<div class="author-card__info">';
    html += '<span class="author-card__name">\u6557\u8D70\u9332\u306E\u4E2D\u306E\u4EBA</span>';
    html += '<p class="author-card__bio">\u5931\u6557\u3092\u8A18\u9332\u3057\u3001\u540C\u3058\u8F4D\u3092\u8E0F\u307E\u306A\u3044\u305F\u3081\u306B\u66F8\u3044\u3066\u3044\u307E\u3059\u3002\u8EE2\u3093\u3060\u6570\u3060\u3051\u3001\u5F37\u304F\u306A\u308C\u308B\u3068\u4FE1\u3058\u3066\u3002</p>';
    html += '</div></div>';
    postNav.insertAdjacentHTML('beforebegin', html);
  }

  // ===== Breadcrumbs =====
  function initBreadcrumbs() {
    var banner = document.querySelector('.post-header-banner');
    if (!banner || !document.querySelector('.post-body')) return;
    var html = '<nav class="breadcrumbs" aria-label="\u30D1\u30F3\u304F\u305A\u30EA\u30B9\u30C8">';
    html += '<a href="../index.html">\u30C8\u30C3\u30D7</a>';
    html += '<span class="breadcrumbs__sep">\u203A</span>';
    html += '<a href="../archive.html">\u30A2\u30FC\u30AB\u30A4\u30D6</a>';
    html += '<span class="breadcrumbs__sep">\u203A</span>';
    html += '<span class="breadcrumbs__current">\u3053\u306E\u8A18\u4E8B</span></nav>';
    banner.insertAdjacentHTML('beforebegin', html);
  }

  // ===== Heading Anchor Links =====
  function initHeadingAnchors() {
    var headings = document.querySelectorAll('.post-body h2, .post-body h3');
    headings.forEach(function (h, i) {
      if (!h.id) h.id = 'section-' + (i + 1);
      var a = document.createElement('a');
      a.className = 'heading-anchor';
      a.href = '#' + h.id;
      a.textContent = '#';
      a.setAttribute('aria-label', '\u30BB\u30AF\u30B7\u30E7\u30F3\u30EA\u30F3\u30AF');
      h.appendChild(a);
    });
  }

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    initReadingTime();
    initScrollToTop();
    initScrollAnimations();
    initBreadcrumbs();
    initSummaryBox();
    initTOC();
    initHeadingAnchors();
    initReactions();
    initShareButtons();
    initAuthorCard();
    initRelatedPosts();
  });
})();
