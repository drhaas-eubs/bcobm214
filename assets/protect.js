/* BCOBM214 — content protection + short Slibrary modal
 * © 2026 Dr. Hildegard Haas · EU Business School
 *
 * Modal design adapted from JD Meier's Thumbnail Thinking (short preview)
 * and marti301's "View Full A4 Reference Sheet" pattern (rich content lives
 * in sheet.html, accessed via a button at the bottom of the preview modal).
 */
(function () {
  'use strict';

  /* ---------- Dynamic data loading (fallback if pages don't load explicitly) ---------- */
  function injectScript(url, onload) {
    var s = document.createElement('script');
    s.src = url; s.async = false;
    if (onload) s.onload = onload;
    document.head.appendChild(s);
    return s;
  }

  function dataBaseUrl() {
    var here = document.currentScript && document.currentScript.src;
    if (!here) {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.indexOf('protect.js') !== -1) {
          here = scripts[i].src; break;
        }
      }
    }
    return here ? here.replace(/protect\.js(\?.*)?$/, '') : '';
  }

  (function loadData() {
    var base = dataBaseUrl();
    if (!base) return;
    if (!window.BCOBM214_FRAMEWORKS) injectScript(base + 'frameworks.js');
    if (!window.BCOBM214_AUTHORS)    injectScript(base + 'authors.js');
  })();

  /* ---------- sheet.html path (relative to current page) ---------- */
  function sheetPath() {
    // From a page in a subfolder (activities/, cases/, prereading/, reflections/), the
    // sheet is at ../sheet.html. From root pages, it's sheet.html.
    var p = location.pathname;
    if (p.indexOf('/activities/') !== -1 ||
        p.indexOf('/cases/') !== -1 ||
        p.indexOf('/prereading/') !== -1 ||
        p.indexOf('/reflections/') !== -1) {
      return '../sheet.html';
    }
    return 'sheet.html';
  }

  /* ---------- Protection deterrents ---------- */
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);

  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    var mod = e.ctrlKey || e.metaKey;
    if (mod && ['s','p','u','a','c','x'].indexOf(k) !== -1) { e.preventDefault(); }
    if (mod && e.shiftKey && ['i','j','c'].indexOf(k) !== -1) { e.preventDefault(); }
    if (e.key === 'F12') { e.preventDefault(); }
  }, false);

  ['selectstart','dragstart','copy','cut'].forEach(function (evt) {
    document.addEventListener(evt, function (e) { e.preventDefault(); }, false);
  });

  /* ---------- Reference data ---------- */
  var UNIT_TITLES = {
    1:"Introduction to Entrepreneurship & Business Development",
    2:"Identifying & Testing a Business Idea",
    3:"Market Research & Opportunity Identification",
    4:"Business Planning & Strategy",
    5:"Developing the Business Plan",
    6:"Intrapreneurship & Corporate Business Development",
    7:"Growth Management & Strategies",
    8:"Funding & Financial Strategies",
    9:"Pitching & Presentation Skills",
    10:"Finalizing & Presenting the Business Plan"
  };
  var SLIBRARY_TITLES = {
    1:"Defining Entrepreneurship & BD", 2:"Vision, Mission, Purpose & Goals",
    3:"Idea Viability & Proof of Concept", 4:"Product Development & Lifecycle",
    5:"Market Research Methods", 6:"Opportunity Identification",
    7:"Business Plan Components", 8:"Go-to-Market & Roadmap",
    9:"Plan Architecture", 10:"Pitfalls & Plan Quality",
    11:"Intrapreneurship", 12:"Innovation, BD & Leadership",
    13:"Growth Lifecycle", 14:"Growth Strategies",
    15:"Sources of Capital", 16:"Investment Stages & Terms",
    17:"Pitch Architecture", 18:"Delivery Craft",
    19:"Plan Evaluation", 20:"Iteration & Closing"
  };

  /* ---------- Helpers ---------- */
  function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function findFramework(num) {
    if (!window.BCOBM214_FRAMEWORKS) return null;
    var n = (num || '').trim().toUpperCase();
    for (var i = 0; i < window.BCOBM214_FRAMEWORKS.length; i++) {
      if (window.BCOBM214_FRAMEWORKS[i].num === n) return window.BCOBM214_FRAMEWORKS[i];
    }
    return null;
  }
  function findAuthor(id) {
    if (!window.BCOBM214_AUTHORS) return null;
    var i = (id || '').toLowerCase();
    for (var j = 0; j < window.BCOBM214_AUTHORS.length; j++) {
      if (window.BCOBM214_AUTHORS[j].id === i) return window.BCOBM214_AUTHORS[j];
    }
    return null;
  }

  /* Take the first sentence of a paragraph (up to first period followed by space). */
  function firstSentence(text, maxLen) {
    if (!text) return '';
    text = String(text);
    var m = text.match(/^[^.]+\.(?=\s|$)/);
    var s = m ? m[0] : text;
    if (maxLen && s.length > maxLen) s = s.slice(0, maxLen - 1) + '…';
    return s;
  }

  /* ---------- Modal scaffolding ---------- */
  function ensureModal() {
    var existing = document.getElementById('fw-modal');
    if (existing) return existing;
    var m = document.createElement('div');
    m.id = 'fw-modal';
    m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true');
    m.innerHTML =
      '<div class="fw-sheet fw-sheet-short">' +
        '<button class="fw-close" type="button" aria-label="Close">×</button>' +
        '<div id="fw-rendered-sheet" class="fw-renderable"></div>' +
        '<div class="fw-actions">' +
          '<a class="fw-btn primary fw-btn-wide" id="fw-view-sheet" href="#" target="_blank" rel="noopener">' +
            '<span class="fw-btn-icon">📄</span> View Full A4 Reference Sheet →' +
          '</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) { if (e.target === m) closeModal(); });
    m.querySelector('.fw-close').addEventListener('click', closeModal);
    return m;
  }

  function closeModal() {
    var m = document.getElementById('fw-modal');
    if (!m) return;
    m.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- SVG fallback icons ---------- */
  function renderFrameworkIcon(fw) {
    var palette = ['#155e4a','#1e7a60','#2d9377','#b8893a','#7a5a14','#1f5563','#3a5a2e','#6b264c','#7a3329','#0f1a17'];
    var c = palette[(fw.unit - 1) % palette.length];
    return (
      '<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="background:#fbfaf6;border-radius:6px;display:block">' +
        '<rect x="0" y="0" width="320" height="150" fill="#fbfaf6"/>' +
        '<rect x="20" y="20" width="280" height="110" fill="none" stroke="' + c + '" stroke-width="1.5" rx="8"/>' +
        '<text x="160" y="80" text-anchor="middle" font-family="Arial" font-size="32" font-weight="700" fill="' + c + '">' + escapeHtml(fw.num) + '</text>' +
        '<text x="160" y="108" text-anchor="middle" font-family="Arial" font-size="11" fill="' + c + '">Slibrary ' + fw.slibrary + ' · Unit ' + fw.unit + '</text>' +
      '</svg>'
    );
  }
  function renderAuthorIcon(a) {
    return (
      '<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg" style="background:#fbfaf6;border-radius:6px;display:block">' +
        '<rect x="0" y="0" width="320" height="150" fill="#fbfaf6"/>' +
        '<text x="160" y="80" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#155e4a">' + escapeHtml((a.name || '').split(/\s+/).pop()) + '</text>' +
        '<text x="160" y="105" text-anchor="middle" font-family="Arial" font-size="10" fill="#155e4a">' + escapeHtml(a.discipline || '') + '</text>' +
      '</svg>'
    );
  }

  /* ---------- Render short framework modal ---------- */
  function renderFrameworkSheet(fw) {
    var slibTitle = SLIBRARY_TITLES[fw.slibrary] || '';
    var unitTitle = UNIT_TITLES[fw.unit] || '';

    // Short definition: first sentence of professionalDefinition (or fallback chain)
    var defSource = fw.professionalDefinition || fw.coreIdea || fw.summary || '';
    var shortDef = firstSentence(defSource, 280);

    // 4 bullets from howToApply (or fall back to nothing)
    var bullets = (fw.howToApply || []).slice(0, 4).map(function (s) {
      return '<li>' + escapeHtml(s) + '</li>';
    }).join('');

    // Reference: first source from sourcesHarvard or fall back to source string
    var sourceList = fw.sourcesHarvard && fw.sourcesHarvard.length
      ? fw.sourcesHarvard
      : (fw.source ? [fw.source] : []);
    var firstSource = sourceList[0] || '—';

    var iconSvg = renderFrameworkIcon(fw);

    var sheet = document.getElementById('fw-rendered-sheet');
    sheet.innerHTML =
      '<div class="fw-breadcrumb">' +
        'Slibrary ' + fw.slibrary + ' — ' + escapeHtml(slibTitle) +
      '</div>' +
      '<h2 class="fw-modal-title">' + escapeHtml(fw.title) + '</h2>' +

      '<div class="fw-definition-box">' +
        '<p>' + escapeHtml(shortDef) + '</p>' +
      '</div>' +

      '<p class="fw-modal-subtitle">' + escapeHtml(fw.summary || '') + '</p>' +

      '<div class="fw-modal-figure">' + iconSvg + '</div>' +

      (bullets ? '<ul class="fw-modal-bullets">' + bullets + '</ul>' : '') +

      '<div class="fw-reference-box">' +
        '<div class="fw-h3">Reference</div>' +
        '<p>' + escapeHtml(firstSource) + '</p>' +
      '</div>';

    // Wire the "View Full A4 Reference Sheet" button to sheet.html#FX
    var modal = ensureModal();
    var viewBtn = modal.querySelector('#fw-view-sheet');
    if (viewBtn) viewBtn.setAttribute('href', sheetPath() + '#' + fw.num);
    modal.querySelector('.fw-sheet').classList.remove('author-sheet');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ---------- Render short author modal ---------- */
  function renderAuthorSheet(a) {
    var coreMessage = a.coreMessage || '';
    var bullets = (a.frameworks || []).slice(0, 4).map(function (f) {
      return '<li>' + escapeHtml(f) + '</li>';
    }).join('');
    var firstSource = (a.sources && a.sources[0]) || '—';

    var iconSvg = a.thumbnailSvg || renderAuthorIcon(a);

    var sheet = document.getElementById('fw-rendered-sheet');
    sheet.innerHTML =
      '<div class="fw-breadcrumb">' +
        'Author Slibrary — ' + escapeHtml(a.discipline || '') +
      '</div>' +
      '<h2 class="fw-modal-title">' + escapeHtml(a.name) + '</h2>' +

      '<div class="fw-definition-box">' +
        '<p>' + escapeHtml(firstSentence(a.why || '', 280)) + '</p>' +
      '</div>' +

      '<p class="fw-modal-subtitle"><em>' + escapeHtml(a.coreMessage || a.role || '') + '</em></p>' +

      '<div class="fw-modal-figure">' + iconSvg + '</div>' +

      (bullets ? '<ul class="fw-modal-bullets"><li><b>Frameworks anchored:</b></li>' + bullets + '</ul>' : '') +

      '<div class="fw-reference-box">' +
        '<div class="fw-h3">Reference</div>' +
        '<p>' + escapeHtml(firstSource) + '</p>' +
      '</div>';

    // Wire the button to sheet.html#A-<id>
    var modal = ensureModal();
    var viewBtn = modal.querySelector('#fw-view-sheet');
    if (viewBtn) viewBtn.setAttribute('href', sheetPath() + '#A-' + a.id);
    modal.querySelector('.fw-sheet').classList.add('author-sheet');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ---------- Click delegation ---------- */
  document.addEventListener('click', function (e) {
    // Skip if user clicked on the explicit "PDF →" badge link
    if (e.target.tagName === 'A' && e.target.getAttribute('href') &&
        e.target.getAttribute('href').indexOf('sheet.html') !== -1) {
      return; // let the link navigate normally
    }

    var fwCard = e.target.closest && e.target.closest('.framework-card');
    if (fwCard) {
      var num = fwCard.getAttribute('data-fw') ||
                (fwCard.querySelector('.num') && fwCard.querySelector('.num').textContent);
      if (!num) return;
      var fw = findFramework(num);
      if (fw) renderFrameworkSheet(fw);
      return;
    }
    var thumb = e.target.closest && e.target.closest('.author-thumb');
    if (thumb) {
      var id = thumb.getAttribute('data-author');
      if (!id) return;
      var a = findAuthor(id);
      if (a) renderAuthorSheet(a);
    }
  }, false);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  }, false);
})();
