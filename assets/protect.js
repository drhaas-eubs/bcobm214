/* BCOBM214 — content protection + Slibrary modal + client-side PDF
 * © 2026 Dr. Hildegard Haas · EU Business School
 *
 * Slibrary sheet design adapted from JD Meier's Thumbnail Thinking
 * (Author Distilled / Framework Distilled patterns) and Kurt Bostellaar's
 * Core Message playbook.
 */
(function () {
  'use strict';

  /* ---------- Dynamic data loading ---------- */
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

  /* ---------- Reference data: unit titles, slibrary names ---------- */

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

  /* ---------- Modal scaffolding ---------- */

  function ensureModal() {
    var existing = document.getElementById('fw-modal');
    if (existing) return existing;
    var m = document.createElement('div');
    m.id = 'fw-modal';
    m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true');
    m.innerHTML =
      '<div class="fw-sheet">' +
        '<button class="fw-close" type="button" aria-label="Close">×</button>' +
        '<div id="fw-rendered-sheet" class="fw-renderable"></div>' +
        '<div class="fw-actions">' +
          '<button class="fw-btn" data-action="close" type="button">Close</button>' +
          '<button class="fw-btn primary" data-action="pdf" type="button">Download as PDF</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) { if (e.target === m) closeModal(); });
    m.querySelector('.fw-close').addEventListener('click', closeModal);
    m.querySelector('[data-action="close"]').addEventListener('click', closeModal);
    m.querySelector('[data-action="pdf"]').addEventListener('click', downloadPdf);
    return m;
  }

  var currentItem = null;

  function closeModal() {
    var m = document.getElementById('fw-modal');
    if (!m) return;
    m.classList.remove('open');
    document.body.style.overflow = '';
    currentItem = null;
  }

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
  function relatedFrameworks(fw) {
    if (!window.BCOBM214_FRAMEWORKS) return [];
    var related = [];
    for (var i = 0; i < window.BCOBM214_FRAMEWORKS.length; i++) {
      var x = window.BCOBM214_FRAMEWORKS[i];
      if (x.num === fw.num) continue;
      if (x.slibrary === fw.slibrary || x.unit === fw.unit) {
        related.push(x);
        if (related.length >= 4) break;
      }
    }
    return related;
  }

  /* ---------- Rendering: framework Slibrary sheet ---------- */

  function renderFrameworkSheet(fw) {
    currentItem = fw;
    var slibTitle = SLIBRARY_TITLES[fw.slibrary] || '';
    var sheetIndex = ((parseInt(String(fw.num).replace(/[^0-9]/g,''), 10) - 1) % 4) + 1;
    var slibPad = ('0' + fw.slibrary).slice(-2);

    // Pull from enriched fields with sensible fallbacks for backward compatibility
    var profDef    = fw.professionalDefinition || fw.coreIdea || '';
    var whoDev     = fw.whoDeveloped || fw.author || '—';
    var whyDev     = fw.whyDeveloped || fw.whenToUse || '';
    var byWhom     = fw.byWhom || 'Founders, intrapreneurs, BD professionals, and BCOBM214 students.';
    var innovation = fw.innovation || fw.limitations || '';
    var figCap     = fw.figureCaption || 'Visual signature — replace with a bespoke diagram in a future revision of this Slibrary sheet.';

    var howList = (fw.howToApply || []).map(function (s) {
      return '<li>' + escapeHtml(s) + '</li>';
    }).join('');

    // Related frameworks: prefer explicit fw.related (array of "F12" refs); fall back to computed peers
    var relatedItems;
    if (fw.related && fw.related.length) {
      relatedItems = fw.related.map(function (n) { return findFramework(n); }).filter(Boolean);
    } else {
      relatedItems = relatedFrameworks(fw);
    }
    var pillsHtml = relatedItems.map(function (r) {
      return '<span class="fw-pill">' + escapeHtml(r.num) + ' ' + escapeHtml(r.title) +
             ' <em>· Slibrary ' + r.slibrary + '</em></span>';
    }).join('');

    // Sources: array (Harvard) preferred; fall back to single source string
    var sourceList = fw.sourcesHarvard && fw.sourcesHarvard.length
      ? fw.sourcesHarvard
      : (fw.source ? [fw.source] : []);
    var sourcesHtml = sourceList.map(function (s) {
      return '<p>' + escapeHtml(s) + '</p>';
    }).join('') || '<p>—</p>';

    var sheet = document.getElementById('fw-rendered-sheet');
    sheet.innerHTML =
      '<div class="fw-bar">' +
        '<span class="left">BCOBM214 · Entrepreneurship &amp; Business Development</span>' +
        '<span class="right">Unit ' + fw.unit + ' · Slibrary ' + fw.slibrary + ' — ' + escapeHtml(slibTitle) + '</span>' +
      '</div>' +

      '<div class="fw-title-row">' +
        '<h2>' + escapeHtml(fw.title) + '</h2>' +
        '<span class="fw-sheet-num">Slibrary ' + slibPad + ' · Sheet ' + sheetIndex + ' / 4</span>' +
      '</div>' +
      '<p class="fw-subtitle">' + escapeHtml(fw.summary || '') + '</p>' +

      '<div class="fw-body">' +

        '<div class="fw-box">' +
          '<div class="fw-h3">Professional Definition</div>' +
          '<p>' + escapeHtml(profDef) + '</p>' +
        '</div>' +

        '<div class="fw-2col">' +
          '<div>' +
            '<h4>Who developed it</h4>' +
            '<p>' + escapeHtml(whoDev) + '</p>' +
            '<h4>Why it was developed</h4>' +
            '<p>' + escapeHtml(whyDev) + '</p>' +
          '</div>' +
          '<div class="fw-figure">' +
            '<div class="fw-h3">Figure 1 · ' + escapeHtml(fw.title) + '</div>' +
            renderFrameworkIcon(fw) +
            '<p class="caption">' + escapeHtml(figCap) + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="fw-3col">' +
          '<div><h4>How it is used</h4><ol style="padding-left:18px;margin:0;font-size:.85rem;line-height:1.5;color:var(--ink-soft)">' + howList + '</ol></div>' +
          '<div><h4>When it is used</h4><p>' + escapeHtml(fw.whenToUse || '—') + '</p></div>' +
          '<div><h4>By whom it is used</h4><p>' + escapeHtml(byWhom) + '</p></div>' +
        '</div>' +

        '<div class="fw-box">' +
          '<div class="fw-h3">Innovation relative to the predecessor tool</div>' +
          '<p>' + escapeHtml(innovation) + '</p>' +
        '</div>' +

        '<div class="fw-h3">Related frameworks in this course</div>' +
        '<div class="fw-pills">' + (pillsHtml || '<span class="fw-pill">—</span>') + '</div>' +

        '<div class="fw-h3">Sources (Harvard Referencing Style)</div>' +
        '<div class="fw-sources">' + sourcesHtml + '</div>' +

      '</div>' +

      '<div class="fw-footer-bar">' +
        '<span>BCOBM214 · Framework Sheet · Slibrary ' + slibPad + ' · ' + escapeHtml(fw.title) + '</span>' +
        '<span>Dr. Hildegard Haas · EU Business School · © 2026</span>' +
      '</div>';

    var modal = ensureModal();
    modal.querySelector('.fw-sheet').classList.remove('author-sheet');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ---------- Rendering: author Slibrary sheet ---------- */

  function renderAuthorSheet(a) {
    currentItem = a;

    var fwPills = (a.frameworks || []).map(function (f) {
      return '<span class="fw-pill">' + escapeHtml(f) + '</span>';
    }).join('');

    var sheet = document.getElementById('fw-rendered-sheet');
    sheet.innerHTML =
      '<div class="fw-bar">' +
        '<span class="left">BCOBM214 · Entrepreneurship &amp; Business Development</span>' +
        '<span class="right">Author Slibrary · ' + escapeHtml(a.discipline || '') + '</span>' +
      '</div>' +

      '<div class="fw-title-row">' +
        '<h2>' + escapeHtml(a.name) + '</h2>' +
        '<span class="fw-sheet-num">' + escapeHtml(a.years || '') + '</span>' +
      '</div>' +
      '<p class="fw-subtitle">' + escapeHtml(a.role || '') + '</p>' +

      '<div class="fw-body">' +

        '<p class="author-cm" style="margin-left:0;margin-right:0">' + escapeHtml(a.coreMessage || '') + '</p>' +

        '<div class="fw-box">' +
          '<div class="fw-h3">Why this thinker matters</div>' +
          '<p>' + escapeHtml(a.why || '') + '</p>' +
        '</div>' +

        '<div class="fw-2col">' +
          '<div>' +
            '<h4>Foundation</h4>' +
            '<p>' + escapeHtml(a.foundation || '') + '</p>' +
            '<h4>Operationalisation</h4>' +
            '<p>' + escapeHtml(a.operationalisation || '') + '</p>' +
          '</div>' +
          '<div class="fw-figure">' +
            '<div class="fw-h3">Thumbnail · ' + escapeHtml(a.name) + '</div>' +
            (a.thumbnailSvg || renderAuthorIcon(a)) +
            '<p class="caption">' + escapeHtml(a.thumbnailCaption || 'Visual signature in the JD Meier Thumbnail Thinking tradition.') + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="fw-3col">' +
          '<div><h4>Frameworks they anchor</h4><div style="font-size:.85rem">' + fwPills + '</div></div>' +
          '<div><h4>Limitations</h4><p>' + escapeHtml(a.limitations || '—') + '</p></div>' +
          '<div><h4>Enduring impact</h4><p>' + escapeHtml(a.enduring || '') + '</p></div>' +
        '</div>' +

        '<div class="fw-box">' +
          '<div class="fw-h3">Where their thinking shows up in BCOBM214</div>' +
          '<p>' + escapeHtml(a.unitContext || ('Unit ' + (a.units || []).join(', ') + '.')) + '</p>' +
        '</div>' +

        '<div class="fw-h3">Sources (Harvard Referencing Style)</div>' +
        '<div class="fw-sources">' +
          (a.sources || []).map(function (s) { return '<p>' + escapeHtml(s) + '</p>'; }).join('') +
        '</div>' +

      '</div>' +

      '<div class="fw-footer-bar">' +
        '<span>BCOBM214 · Author Slibrary · ' + escapeHtml(a.name) + '</span>' +
        '<span>Dr. Hildegard Haas · EU Business School · © 2026</span>' +
      '</div>';

    var modal = ensureModal();
    modal.querySelector('.fw-sheet').classList.add('author-sheet');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ---------- SVG fallback icons ---------- */

  function renderFrameworkIcon(fw) {
    // A simple geometric placeholder coloured by unit. The user can later
    // replace with bespoke SVGs per framework.
    var palette = ['#155e4a','#1e7a60','#2d9377','#b8893a','#7a5a14','#1f5563','#3a5a2e','#6b264c','#7a3329','#0f1a17'];
    var c = palette[(fw.unit - 1) % palette.length];
    return (
      '<svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="background:#fbfaf6;border-radius:6px">' +
        '<rect x="0" y="0" width="220" height="130" fill="#fbfaf6"/>' +
        '<rect x="14" y="14" width="192" height="102" fill="none" stroke="' + c + '" stroke-width="1.4" rx="6"/>' +
        '<text x="110" y="58" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="' + c + '">' + escapeHtml(fw.num) + '</text>' +
        '<text x="110" y="82" text-anchor="middle" font-family="Arial" font-size="10" fill="' + c + '">Slibrary ' + fw.slibrary + ' · Unit ' + fw.unit + '</text>' +
      '</svg>'
    );
  }
  function renderAuthorIcon(a) {
    return (
      '<svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" style="background:#fbfaf6;border-radius:6px">' +
        '<rect x="0" y="0" width="220" height="130" fill="#fbfaf6"/>' +
        '<text x="110" y="68" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#155e4a">' + escapeHtml((a.name || '').split(/\s+/).pop()) + '</text>' +
        '<text x="110" y="90" text-anchor="middle" font-family="Arial" font-size="9" fill="#155e4a">' + escapeHtml(a.discipline || '') + '</text>' +
      '</svg>'
    );
  }

  /* ---------- PDF download via html2pdf.js (CDN, on demand) ---------- */

  var html2pdfLoading = false, html2pdfQueue = [];
  function ensureHtml2Pdf(cb) {
    if (window.html2pdf) { cb(); return; }
    html2pdfQueue.push(cb);
    if (html2pdfLoading) return;
    html2pdfLoading = true;
    injectScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js', function () {
      html2pdfLoading = false;
      while (html2pdfQueue.length) (html2pdfQueue.shift())();
    });
  }
  function sanitise(s) {
    return (s || 'sheet').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'').slice(0,60);
  }
  function downloadPdf() {
    if (!currentItem) return;
    var btn = document.querySelector('#fw-modal [data-action="pdf"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Generating PDF…'; }

    ensureHtml2Pdf(function () {
      var el = document.getElementById('fw-rendered-sheet');
      var name;
      if (currentItem.num) {
        name = sanitise(currentItem.num + '_' + currentItem.title);
      } else {
        name = sanitise('author_' + (currentItem.id || currentItem.name));
      }
      var opt = {
        margin:       [8, 8, 8, 8],
        filename:     name + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all','css','legacy'] }
      };
      window.html2pdf().set(opt).from(el).save().then(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Download as PDF'; }
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Download as PDF'; }
      });
    });
  }

  /* ---------- Click delegation ---------- */

  document.addEventListener('click', function (e) {
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
