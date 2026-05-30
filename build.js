const fs = require("fs");
const path = require("path");
const { COURSE, UNITS } = require("./barbm312_data.js");

const OUT = __dirname;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- Shared design system ----------
// Aesthetic: editorial "strategy atlas" — deep ink navy + warm parchment + a single
// electric-amber accent. Display serif (Fraunces) over a clean grotesque (Familjen Grotesk).
const HEAD = (title, depth) => {
  const root = depth === 0 ? "" : "../";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<link rel="stylesheet" href="${root}styles.css">
<script src="${root}protect.js" defer></script>
</head>`;
};

const CSS = `
:root{
  /* EU Business School brand identity: deep crimson red, black, white.
     NB: exact hex from the official Frontify portal could not be machine-verified
     (the portal blocks automated access); these match the EUBS logo/website crimson. */
  --ink:#1a1a1a;          /* EUBS black */
  --ink-2:#3a3a3a;
  --paper:#ffffff;        /* white */
  --paper-2:#f4f1f1;      /* light warm grey */
  --card:#ffffff;
  --accent:#9e1b32;       /* EUBS crimson red */
  --accent-2:#7d1426;     /* darker crimson */
  --teal:#9e1b32;         /* unify secondary accent to brand red */
  --line:rgba(26,26,26,.16);
  --muted:#5e5e5e;
  --shadow:0 1px 2px rgba(26,26,26,.06),0 12px 32px -16px rgba(26,26,26,.30);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;background:var(--paper);color:var(--ink);
  font-family:Arial,Helvetica,sans-serif;
  font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;
  background-image:radial-gradient(circle at 12% 8%,rgba(158,27,50,.05),transparent 42%),radial-gradient(circle at 88% 0%,rgba(158,27,50,.04),transparent 38%);
}
.wrap{max-width:1140px;margin:0 auto;padding:0 28px}
.serif{font-family:Arial,Helvetica,sans-serif}
.mono{font-family:Arial,Helvetica,sans-serif;font-size:.72em;letter-spacing:.06em}
a{color:inherit}
h1,h2,h3{font-family:Arial,Helvetica,sans-serif;font-weight:900;line-height:1.04;letter-spacing:-.01em;margin:0}

/* ---- top bar ---- */
.topbar{position:sticky;top:0;z-index:40;background:rgba(22,32,46,.96);color:var(--paper);
  backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,.08)}
.topbar .wrap{display:flex;align-items:center;justify-content:space-between;min-height:56px;gap:10px}
.topbar .nm{font-family:Arial,Helvetica,sans-serif;font-weight:600;font-size:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.topbar .tb-left{display:flex;align-items:center;gap:8px;min-width:0;overflow:hidden}
.topbar .code{font-family:Arial,Helvetica,sans-serif;font-size:.72rem;letter-spacing:.16em;color:var(--accent);text-transform:uppercase;flex:0 0 auto}
.topbar a.back{font-size:.82rem;text-decoration:none;opacity:.85;border:1px solid rgba(255,255,255,.18);padding:6px 12px;border-radius:999px;white-space:nowrap;flex:0 0 auto}
.topbar a.back:hover{opacity:1;border-color:var(--accent)}

/* ---- hero ---- */
.hero{background:var(--ink);color:var(--paper);position:relative;overflow:hidden;padding:64px 0 56px}
.hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:42px 42px;mask-image:radial-gradient(circle at 70% 30%,#000,transparent 75%);opacity:.5}
.hero .wrap{position:relative}
.eyebrow{font-family:Arial,Helvetica,sans-serif;font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:18px}
.hero h1{font-size:clamp(2rem,5.2vw,4.4rem);line-height:1.05;max-width:18ch;overflow-wrap:break-word}
.hero h1 em{font-style:italic;font-weight:500;color:var(--accent)}
.hero .sub{margin-top:18px;font-size:1.12rem;max-width:46ch;color:rgba(255,255,255,.82)}
.hero .meta{margin-top:22px;font-family:Arial,Helvetica,sans-serif;font-size:.74rem;letter-spacing:.08em;color:rgba(255,255,255,.6)}

/* ---- stat strip ---- */
.stats{display:flex;flex-wrap:wrap;gap:0;border:1px solid var(--line);border-radius:16px;background:var(--card);box-shadow:var(--shadow);margin:-34px auto 0;position:relative;z-index:5;overflow:hidden}
.stat{flex:1 1 0;min-width:120px;padding:20px 22px;border-right:1px solid var(--line)}
.stat:last-child{border-right:0}
.stat .num{font-family:Arial,Helvetica,sans-serif;font-weight:900;font-size:2rem;line-height:1}
.stat .lbl{font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:6px}

/* ---- section ---- */
section{padding:46px 0}
.sec-head{display:flex;align-items:baseline;gap:14px;margin-bottom:8px}
.sec-head .kicker{font-family:Arial,Helvetica,sans-serif;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent-2)}
.sec-head h2{font-size:clamp(1.5rem,3vw,2rem)}
.sec-sub{color:var(--muted);max-width:60ch;margin:4px 0 26px}

/* ---- unit accordion (index) ---- */
.unit{border:1px solid var(--line);border-radius:16px;background:var(--card);box-shadow:var(--shadow);margin-bottom:16px;overflow:hidden}
.unit-head{display:flex;align-items:center;gap:18px;padding:20px 24px;cursor:pointer;user-select:none}
.unit-head:hover{background:var(--paper-2)}
.unit-num{font-family:Arial,Helvetica,sans-serif;font-weight:900;font-size:1.7rem;width:46px;height:46px;flex:0 0 46px;display:grid;place-items:center;border-radius:12px;background:var(--ink);color:var(--paper)}
.unit-meta{flex:1}
.unit-meta .t{font-family:Arial,Helvetica,sans-serif;font-weight:600;font-size:1.16rem}
.unit-meta .ped{font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);margin-top:3px}
.chev{transition:transform .25s;color:var(--muted)}
.unit.open .chev{transform:rotate(180deg)}
.unit-body{display:none;padding:6px 24px 22px;border-top:1px solid var(--line)}
.unit.open .unit-body{display:block;animation:fade .3s ease}
@keyframes fade{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.res-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;margin-top:14px}
.res{display:flex;gap:12px;padding:13px 15px;border:1px solid var(--line);border-radius:11px;text-decoration:none;background:var(--paper);transition:.18s}
.res:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:var(--shadow)}
.res .tag{font-family:Arial,Helvetica,sans-serif;font-size:.66rem;font-weight:600;letter-spacing:.05em;background:var(--ink);color:var(--paper);width:30px;height:30px;flex:0 0 30px;display:grid;place-items:center;border-radius:8px}
.res .tag.gd{background:var(--teal)} .res .tag.fg{background:var(--accent-2)}
.res .rt{font-weight:600;font-size:.92rem;line-height:1.2}
.res .rd{font-size:.76rem;color:var(--muted);margin-top:2px;line-height:1.35}

/* ---- core message banner (Bostelaar) ---- */
.core{border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:12px;background:var(--card);padding:20px 24px;box-shadow:var(--shadow)}
.core .lab{font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-2)}
.core .msg{font-family:Arial,Helvetica,sans-serif;font-style:italic;font-weight:500;font-size:1.34rem;line-height:1.3;margin-top:8px}
.wyw{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}
.wyw .b{border:1px solid var(--line);border-radius:10px;padding:14px 16px;background:var(--paper)}
.wyw .b .h{font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);margin-bottom:6px}
.wyw .b.why{border-top:3px solid var(--teal)} .wyw .b.what{border-top:3px solid var(--accent)}
/* spectrum bar */
.spectrum{margin-top:18px}
.spectrum .ends{display:flex;justify-content:space-between;font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.spectrum .track{position:relative;height:10px;border-radius:999px;background:linear-gradient(90deg,var(--teal),var(--accent))}
.spectrum .dot{position:absolute;top:50%;width:20px;height:20px;border-radius:50%;background:var(--card);border:3px solid var(--ink);transform:translate(-50%,-50%);box-shadow:var(--shadow)}
.spectrum .note{font-size:.82rem;color:var(--muted);margin-top:10px;line-height:1.4}

/* ---- thumbnail gallery (Thumbnail Thinking) ---- */
.setblock{margin-bottom:30px}
.setname{display:flex;align-items:center;gap:12px;font-family:Arial,Helvetica,sans-serif;font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-2);margin-bottom:14px}
.setname:after{content:"";flex:1;height:1px;background:var(--line)}
.thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
.thumb{border:1px solid var(--line);border-radius:13px;background:var(--card);box-shadow:var(--shadow);overflow:hidden;transition:.2s;cursor:default}
.thumb:hover{transform:translateY(-3px);border-color:var(--accent)}
.thumb .canvas{aspect-ratio:16/10;background:var(--paper-2);border-bottom:1px solid var(--line);display:grid;place-items:center;padding:14px}
.thumb .canvas svg{width:100%;height:100%}
.thumb .meta{padding:12px 14px}
.thumb .meta .t{font-family:Arial,Helvetica,sans-serif;font-weight:600;font-size:.98rem;line-height:1.15}
.thumb .meta .d{font-size:.78rem;color:var(--muted);margin-top:4px;line-height:1.35}
.thumb .meta .s{font-family:Arial,Helvetica,sans-serif;font-size:.62rem;letter-spacing:.08em;color:var(--teal);margin-top:8px;text-transform:uppercase}

/* ---- giants (Council of Giants) ---- */
.giants{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
.giant{border:1px solid var(--line);border-radius:13px;background:var(--ink);color:var(--paper);padding:20px;box-shadow:var(--shadow);position:relative;overflow:hidden}
.giant:before{content:"";position:absolute;right:-30px;top:-30px;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,rgba(224,118,42,.22),transparent 70%)}
.giant .av{width:42px;height:42px;border-radius:50%;background:var(--accent);color:var(--ink);display:grid;place-items:center;font-family:Arial,Helvetica,sans-serif;font-weight:900;font-size:1.1rem;margin-bottom:12px}
.giant .gn{font-family:Arial,Helvetica,sans-serif;font-weight:600;font-size:1.08rem}
.giant .gr{font-family:Arial,Helvetica,sans-serif;font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin-top:3px}
.giant .gl{font-style:italic;font-size:.9rem;color:rgba(255,255,255,.84);margin-top:12px;line-height:1.4}

/* ---- generic content (case/prereading/reflection) ---- */
.doc{background:var(--card);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);padding:38px 44px;max-width:780px;margin:0 auto}
.doc .badge{display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-2);border:1px solid var(--line);border-radius:999px;padding:5px 12px;margin-bottom:18px}
.doc h2{font-size:clamp(1.6rem,3.4vw,2.3rem);margin-bottom:6px}
.doc .lede{color:var(--muted);font-size:1.05rem;margin-bottom:8px}
.doc .keyfw{font-family:Arial,Helvetica,sans-serif;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--teal);background:var(--paper-2);border-radius:8px;padding:8px 12px;display:inline-block;margin:14px 0 22px}
.doc p{margin:0 0 16px}
.doc h3{font-family:Arial,Helvetica,sans-serif;font-size:1.25rem;margin:26px 0 10px}
.doc .refs{font-size:.82rem;color:var(--muted);border-top:1px solid var(--line);margin-top:28px;padding-top:18px}
.doc .refs p{margin-bottom:8px}
.task{border-left:4px solid var(--accent);background:var(--paper-2);border-radius:0 10px 10px 0;padding:16px 20px;margin:22px 0}
.task .h{font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent-2);margin-bottom:6px}

/* 7-phase session */
.phases{counter-reset:ph;display:grid;gap:12px}
.phase{display:flex;gap:18px;border:1px solid var(--line);border-radius:13px;background:var(--card);box-shadow:var(--shadow);padding:18px 20px}
.phase .pn{flex:0 0 92px}
.phase .pn .ph{font-family:Arial,Helvetica,sans-serif;font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent-2)}
.phase .pn .mn{font-family:Arial,Helvetica,sans-serif;font-weight:600;color:var(--muted);font-size:.8rem;margin-top:2px}
.phase .pc .t{font-family:Arial,Helvetica,sans-serif;font-weight:600;font-size:1.05rem}
.phase .pc .d{font-size:.88rem;color:var(--muted);margin-top:4px;line-height:1.45}

/* reflection */
.refl{border:1px solid var(--line);border-radius:13px;background:var(--card);box-shadow:var(--shadow);padding:20px 22px;margin-bottom:14px}
.refl .n{font-family:Arial,Helvetica,sans-serif;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent-2);margin-bottom:8px}
.refl p{margin:0;font-size:1.02rem}

/* footer */
footer{background:var(--ink);color:rgba(255,255,255,.7);padding:34px 0;margin-top:30px;font-size:.85rem}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px}
footer strong{color:var(--paper)}
footer .acc{color:var(--accent)}

@media(max-width:640px){
  .wyw{grid-template-columns:1fr}
  .doc{padding:26px 22px}
  .stat{flex-basis:50%;border-bottom:1px solid var(--line)}
  .hero{padding:36px 0 32px}
  .hero h1{font-size:clamp(1.9rem,8.5vw,2.8rem);max-width:100%}
  .hero .sub{font-size:1rem;margin-top:14px}
  .wrap{padding:0 20px}
  .topbar .wrap{gap:8px}
  .topbar .nm{font-size:.88rem}
  .copybar .wrap{font-size:.6rem;line-height:1.3}
}

/* EUBS brand persistent copyright bar */
.copybar{background:var(--accent);color:#fff;font-size:.7rem;letter-spacing:.04em}
.copybar .wrap{padding-top:6px;padding-bottom:6px}

/* ---- content protection: disable selection ---- */
body,.wrap,.doc,.thumb,.giant,.core,.phase,.refl,.res,.unit{
  -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;
  -webkit-touch-callout:none;
}
/* allow selection only where genuinely needed (none for students) */
input,textarea{-webkit-user-select:text;user-select:text}
/* print protection: hide everything, show a notice */
@media print{
  body *{visibility:hidden !important}
  body:before{
    visibility:visible !important;content:"\\00A9 Dr. Hildegard Haas 2026 \\2014 EU Business School. Printing of this material is disabled.";
    position:fixed;top:40%;left:0;right:0;text-align:center;font-family:Arial,Helvetica,sans-serif;
    font-size:16pt;color:#9e1b32;padding:0 10%;
  }
  html,body{background:#fff !important}
}
`;

// ---------- tiny inline framework thumbnails (Thumbnail Thinking) ----------
// A small set of abstract SVG "thumbnails" assigned by index so every framework
// shows a distinct visual glyph — the essence of Thumbnail Thinking.
const A = "var(--accent)", T = "var(--teal)", I = "var(--ink)", M = "var(--muted)";
const GLYPHS = [
  // pyramid
  `<svg viewBox="0 0 120 80"><polygon points="60,12 100,68 20,68" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="38" y1="49" x2="82" y2="49" stroke="${A}" stroke-width="2.4"/><line x1="48" y1="31" x2="72" y2="31" stroke="${T}" stroke-width="2.4"/></svg>`,
  // loop / cycle
  `<svg viewBox="0 0 120 80"><circle cx="60" cy="40" r="26" fill="none" stroke="${I}" stroke-width="2.4" stroke-dasharray="4 5"/><polygon points="86,40 78,34 78,46" fill="${A}"/><circle cx="60" cy="40" r="6" fill="${T}"/></svg>`,
  // 2x2 matrix
  `<svg viewBox="0 0 120 80"><rect x="26" y="12" width="68" height="56" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="60" y1="12" x2="60" y2="68" stroke="${I}" stroke-width="2"/><line x1="26" y1="40" x2="94" y2="40" stroke="${I}" stroke-width="2"/><rect x="62" y="14" width="30" height="24" fill="${A}" opacity=".7"/></svg>`,
  // bars / curve
  `<svg viewBox="0 0 120 80"><line x1="22" y1="66" x2="100" y2="66" stroke="${I}" stroke-width="2"/><rect x="30" y="46" width="12" height="20" fill="${T}"/><rect x="50" y="34" width="12" height="32" fill="${A}"/><rect x="70" y="22" width="12" height="44" fill="${I}"/></svg>`,
  // funnel
  `<svg viewBox="0 0 120 80"><polygon points="28,16 92,16 70,46 70,66 50,66 50,46" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="36" y1="26" x2="84" y2="26" stroke="${A}" stroke-width="2.4"/></svg>`,
  // s-curve
  `<svg viewBox="0 0 120 80"><path d="M22,64 C46,64 50,18 98,16" fill="none" stroke="${A}" stroke-width="2.8"/><path d="M22,64 C56,64 60,40 98,40" fill="none" stroke="${T}" stroke-width="2.2" stroke-dasharray="4 4"/></svg>`,
  // pyramid stack / ladder
  `<svg viewBox="0 0 120 80"><rect x="34" y="16" width="52" height="11" fill="none" stroke="${I}" stroke-width="2"/><rect x="34" y="32" width="52" height="11" fill="${T}" opacity=".55"/><rect x="34" y="48" width="52" height="11" fill="none" stroke="${I}" stroke-width="2"/><rect x="34" y="48" width="20" height="11" fill="${A}"/></svg>`,
  // flywheel
  `<svg viewBox="0 0 120 80"><circle cx="60" cy="40" r="22" fill="none" stroke="${I}" stroke-width="2.4"/><circle cx="60" cy="18" r="4" fill="${A}"/><circle cx="79" cy="51" r="4" fill="${T}"/><circle cx="41" cy="51" r="4" fill="${I}"/></svg>`,
  // map / nodes
  `<svg viewBox="0 0 120 80"><circle cx="34" cy="26" r="6" fill="${T}"/><circle cx="86" cy="22" r="6" fill="${A}"/><circle cx="60" cy="58" r="6" fill="${I}"/><line x1="34" y1="26" x2="60" y2="58" stroke="${M}" stroke-width="1.8"/><line x1="86" y1="22" x2="60" y2="58" stroke="${M}" stroke-width="1.8"/><line x1="34" y1="26" x2="86" y2="22" stroke="${M}" stroke-width="1.8" stroke-dasharray="3 3"/></svg>`,
  // canvas grid
  `<svg viewBox="0 0 120 80"><rect x="24" y="16" width="72" height="48" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="48" y1="16" x2="48" y2="64" stroke="${M}" stroke-width="1.6"/><line x1="72" y1="16" x2="72" y2="64" stroke="${M}" stroke-width="1.6"/><line x1="24" y1="40" x2="96" y2="40" stroke="${M}" stroke-width="1.6"/><rect x="24" y="16" width="24" height="24" fill="${A}" opacity=".5"/></svg>`,
  // radar
  `<svg viewBox="0 0 120 80"><circle cx="60" cy="40" r="24" fill="none" stroke="${M}" stroke-width="1.4"/><circle cx="60" cy="40" r="14" fill="none" stroke="${M}" stroke-width="1.4"/><polygon points="60,20 78,46 44,52" fill="${A}" opacity=".55" stroke="${A}" stroke-width="1.6"/></svg>`,
  // frontier
  `<svg viewBox="0 0 120 80"><line x1="24" y1="66" x2="24" y2="14" stroke="${I}" stroke-width="2"/><line x1="24" y1="66" x2="100" y2="66" stroke="${I}" stroke-width="2"/><path d="M28,60 Q40,24 96,20" fill="none" stroke="${A}" stroke-width="2.8"/><circle cx="60" cy="33" r="4" fill="${T}"/></svg>`,
];
const glyph = (i) => GLYPHS[i % GLYPHS.length];

const topbar = (depth, label) => {
  const root = depth === 0 ? "" : "../";
  return `<div class="topbar"><div class="wrap">
    <div class="tb-left"><span class="code">${COURSE.code}</span> &nbsp;<span class="nm">${esc(label || COURSE.title)}</span></div>
    <a class="back" href="${root}index.html">‹ Course Overview</a>
  </div></div>
  <div class="copybar"><div class="wrap">© Dr. Hildegard Haas ${COURSE.year} · EU Business School · ${COURSE.code} AI in Investment and Business Growth</div></div>`;
};
const footer = (extra) => `<footer><div class="wrap">
  <div><strong>© Dr. Hildegard Haas ${COURSE.year}</strong> · ${COURSE.code} ${esc(COURSE.title)} · EU Business School</div>
  <div>Applying <span class="acc">Thumbnail Thinking</span> & the <span class="acc">Council of Giants</span> (JD Meier) · Core message via <span class="acc">Bostelaar</span></div>
</div>${extra || ""}</footer>`;

// ---------- INDEX ----------
function buildIndex() {
  const totalFw = UNITS.reduce((s, u) => s + u.sets.reduce((a, x) => a + x.frameworks.length, 0), 0);
  const totalSets = UNITS.reduce((s, u) => s + u.sets.length, 0);
  const giantNames = new Set();
  UNITS.forEach(u => u.giants.forEach(g => giantNames.add(g.name)));

  const units = UNITS.map(u => {
    const res = [
      { tag: "FG", cls: "fg", href: `${u.slug}.html`, t: "Framework Gallery", d: `${u.sets.length} Slibraries · ${u.sets.reduce((a,x)=>a+x.frameworks.length,0)} thumbnail frameworks` },
      { tag: u.pedagogyCode, cls: "gd", href: `activities/${u.slug}_Activities.html`, t: `${u.pedagogy}`, d: "7-phase experiential session guide" },
      { tag: "CS", cls: "", href: `cases/${u.slug}_Case.html`, t: "Case Study", d: u.caseSub },
      { tag: "PR", cls: "", href: `prereading/${u.slug}_PreReading.html`, t: "Pre-Reading", d: `Key framework: ${u.keyFramework}` },
      { tag: "RF", cls: "", href: `reflections/${u.slug}_Reflection.html`, t: "Reflection Prompt", d: "3 questions for independent study" },
      { tag: "CG", cls: "gd", href: `slibrary.html#${u.slug}`, t: "Council of Giants", d: `${u.giants.length} thinkers behind this unit's frameworks` },
    ].map(r => `<a class="res" href="${r.href}"><span class="tag ${r.cls}">${r.tag}</span><span><span class="rt">${esc(r.t)}</span><span class="rd">${esc(r.d)}</span></span></a>`).join("");
    return `<div class="unit"><div class="unit-head" onclick="this.parentNode.classList.toggle('open')">
      <div class="unit-num">${u.n}</div>
      <div class="unit-meta"><div class="t">${esc(u.title)}</div><div class="ped">${esc(u.pedagogy)}</div></div>
      <svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div><div class="unit-body"><p class="sec-sub" style="margin:14px 0 0">${esc(u.blurb)}</p><div class="res-grid">${res}</div></div></div>`;
  }).join("");

  const html = `${HEAD(`${COURSE.code} — ${COURSE.title}`, 0)}
<body>
${topbar(0)}
<header class="hero"><div class="wrap">
  <div class="eyebrow">${esc(COURSE.level)}</div>
  <h1 class="serif">AI in Investment <em>&</em> Business Growth</h1>
  <p class="sub">${esc(COURSE.tagline)} — built on framework galleries, a Council of Giants, and a clarified core message for every unit.</p>
  <div class="meta">EU BUSINESS SCHOOL · BARCELONA / MUNICH / GENEVA / DIGITAL · © ${COURSE.year}</div>
</div></header>

<div class="wrap">
  <div class="stats">
    <div class="stat"><div class="num">7</div><div class="lbl">Units</div></div>
    <div class="stat"><div class="num">${totalSets}</div><div class="lbl">Slibraries</div></div>
    <div class="stat"><div class="num">${totalFw}</div><div class="lbl">Frameworks</div></div>
    <div class="stat"><div class="num">${giantNames.size}+</div><div class="lbl">Giants</div></div>
    <div class="stat"><div class="num">5</div><div class="lbl">ECTS</div></div>
  </div>
</div>

<section><div class="wrap">
  <div class="sec-head"><span class="kicker">How this course works</span></div>
  <p class="sec-sub">Every unit pairs an experiential session with a <strong>Framework Gallery</strong> (Thumbnail Thinking — a Slibrary of single-visual models), a <strong>Council of Giants</strong> (the thinkers behind those frameworks), a real case, a pre-reading anchored on one key visual, and a reflection. Each unit opens with a <strong>clarified core message</strong> — a WHY → WHAT distillation positioned on the Convince ↔ Clarify spectrum (Bostelaar).</p>
  <div class="sec-head" style="margin-top:30px"><span class="kicker">Course Units</span><h2 class="serif">Seven units, one strategy atlas</h2></div>
  ${units}
</div></section>

<section style="padding-top:0"><div class="wrap">
  <div class="sec-head"><span class="kicker">The thinkers</span><h2 class="serif">The Council of Giants</h2></div>
  <p class="sec-sub">A standing council of strategy, economics, finance and innovation thinkers whose frameworks anchor every Slibrary. <a href="slibrary.html" style="color:var(--accent-2);font-weight:600">Open the full Giants Slibrary →</a></p>
</div></section>

${footer()}
</body></html>`;
  fs.writeFileSync(path.join(OUT, "index.html"), html);
}

// ---------- UNIT GALLERY ----------
function buildUnit(u) {
  let gi = 0;
  const sets = u.sets.map(set => {
    const thumbs = set.frameworks.map((f) => {
      const g = glyph(gi++);
      return `<div class="thumb"><div class="canvas">${g}</div><div class="meta">
        <div class="t">${esc(f.t)}</div><div class="d">${esc(f.d)}</div>
        <div class="s">${esc(set.name.split("—")[0].trim())}</div></div></div>`;
    }).join("");
    return `<div class="setblock"><div class="setname">${esc(set.name)} · ${set.frameworks.length} frameworks</div><div class="thumbs">${thumbs}</div></div>`;
  }).join("");

  const fwCount = u.sets.reduce((a,x)=>a+x.frameworks.length,0);
  const dotPos = u.spectrum;

  const html = `${HEAD(`${COURSE.code} Unit ${u.n} — ${u.title}`, 0)}
<body>
${topbar(0, `Unit ${u.n}`)}
<header class="hero"><div class="wrap">
  <div class="eyebrow">${COURSE.code} · Unit ${u.n} · ${esc(u.pedagogy)}</div>
  <h1 class="serif">${esc(u.title)}</h1>
  <p class="sub">Select any framework to explore it. ${esc(u.blurb)}</p>
</div></header>

<div class="wrap"><div class="stats">
  <div class="stat"><div class="num">${u.sets.length}</div><div class="lbl">Slibraries</div></div>
  <div class="stat"><div class="num">${fwCount}</div><div class="lbl">Frameworks</div></div>
  <div class="stat"><div class="num">${u.giants.length}</div><div class="lbl">Giants</div></div>
  <div class="stat"><div class="num">${u.n}</div><div class="lbl">Unit</div></div>
</div></div>

<section><div class="wrap">
  <div class="sec-head"><span class="kicker">Core message · Bostelaar</span></div>
  <div class="core">
    <div class="lab">The one thing to remember</div>
    <div class="msg">"${esc(u.coreMessage)}"</div>
    <div class="wyw">
      <div class="b why"><div class="h">Why it matters</div>${esc(u.why)}</div>
      <div class="b what"><div class="h">What it covers</div>${esc(u.what)}</div>
    </div>
    <div class="spectrum">
      <div class="ends"><span>Convince · inspire</span><span>Clarify · instruct</span></div>
      <div class="track"><div class="dot" style="left:${dotPos}%"></div></div>
      <div class="note"><strong>Message strategy:</strong> ${esc(u.spectrumNote)}</div>
    </div>
  </div>
</div></section>

<section style="padding-top:8px"><div class="wrap">
  <div class="sec-head"><span class="kicker">Framework Gallery · Thumbnail Thinking</span><h2 class="serif">The Slibrary</h2></div>
  <p class="sec-sub">Each card is a single-visual framework — a thumbnail you can recall under pressure. Build the catalogue; think in pictures.</p>
  ${sets}
</div></section>

<section style="padding-top:0"><div class="wrap">
  <div class="sec-head"><span class="kicker">Council of Giants</span><h2 class="serif">The minds behind Unit ${u.n}</h2></div>
  <p class="sec-sub">Run your Unit ${u.n} challenge through these five lenses before you decide.</p>
  <div class="giants">
    ${u.giants.map(g => `<div class="giant"><div class="av">${esc(g.name.replace(/[^A-Za-z& ]/g,'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join(''))}</div>
      <div class="gn">${esc(g.name)}</div><div class="gr">${esc(g.role)}</div><div class="gl">${esc(g.lens)}</div></div>`).join("")}
  </div>
  <p class="sec-sub" style="margin-top:18px"><a href="slibrary.html#${u.slug}" style="color:var(--accent-2);font-weight:600">See all Giants across the course →</a></p>
</div></section>

${footer()}
</body></html>`;
  fs.writeFileSync(path.join(OUT, `${u.slug}.html`), html);
}

// ---------- ACTIVITIES (7-phase) ----------
const PHASES = ["Open","Frame","Explore","Apply","Synthesise","Reflect","Close"];
const PHMIN = ["0–10 min","10–25 min","25–50 min","50–95 min","95–120 min","120–135 min","135–150 min"];
function activityPhases(u) {
  // Tailor phase content by pedagogy type
  const p = u.pedagogy;
  return [
    { t: `Hook — ${u.short} in the wild`, d: `Open with a 90-second provocation tied to "${u.coreMessage}". Surface what students already believe before any framework is introduced.` },
    { t: `Frame the core message`, d: `Reveal the unit's WHY → WHAT core message and place it on the Convince ↔ Clarify spectrum. Students predict where today's decision should sit.` },
    { t: `Gallery walk — explore the Slibrary`, d: `In pairs, students browse the Unit ${u.n} Framework Gallery and pick the three thumbnails that best fit today's case. Thumbnail Thinking in practice.` },
    { t: `${p} — apply under pressure`, d: pedagogyApply(u) },
    { t: `Convene the Council of Giants`, d: `Groups run their recommendation past the unit's five Giants. Where do the Giants disagree? That friction is the insight.` },
    { t: `Reflect — distinguish, don't conclude`, d: `Each student names one distinction the session sharpened and one testable assumption they will carry forward (not a final answer).` },
    { t: `Close & bridge to Unit ${u.n === 7 ? "—" : u.n + 1}`, d: `One-sentence synthesis from each group, then a teaser and a single pre-reading task for next session.` },
  ];
}
function pedagogyApply(u) {
  switch (u.pedagogyCode) {
    case "GD": return `Guided Discovery: groups reconstruct the decision pipeline for the case, choosing frameworks rather than being told which to use. Facilitator asks questions, never gives answers.`;
    case "DL": return `Live Data Lab: hands-on with a no-code AI / spreadsheet model — audit the data, choose a metric, stress-test the result, and prepare a board-ready read-out.`;
    case "HK": return `Mini-Hackathon: constraint cards force trade-offs. Teams assemble a Total-Cost-of-AI architecture and a risk matrix, then deliver a 5-minute board pitch.`;
    case "MC": return `Moot Court: claimant, defendant and jury argue the IP case using the Authorship Decision Tree and Moat Ladder. Verdict by reasoned vote.`;
    case "RP": return `Role Play: six stakeholder roles negotiate a disruption / rebrand decision across three escalating scenes with real tension and incomplete information.`;
    case "BC": return `Business Challenge (Capstone): teams build a €10M AI-first growth & investment plan, integrating frameworks and Giants from all seven units into one mandate.`;
    default: return `Apply the unit frameworks to the live case.`;
  }
}
function buildActivities(u) {
  const ph = activityPhases(u).map((x, i) => `<div class="phase">
    <div class="pn"><div class="ph">${PHASES[i]}</div><div class="mn">${PHMIN[i]}</div></div>
    <div class="pc"><div class="t">${esc(x.t)}</div><div class="d">${esc(x.d)}</div></div></div>`).join("");
  const html = `${HEAD(`Session Guide — Unit ${u.n}`, 1)}
<body>
${topbar(1, `Unit ${u.n} · Session`)}
<header class="hero"><div class="wrap">
  <div class="eyebrow">${COURSE.code} · Unit ${u.n} · ${esc(u.pedagogy)}</div>
  <h1 class="serif">Session Guide — Unit ${u.n}</h1>
  <p class="sub">${esc(u.title)} · a 150-minute experiential session (12 × 2.5h course rhythm).</p>
</div></header>
<section><div class="wrap">
  <div class="doc" style="max-width:880px">
    <span class="badge">7-Phase Session · What to do today</span>
    <p class="lede">EU Business School pedagogy: hands-on, scaffolded, higher-order. The lecture is minimal; the room does the thinking. Frameworks come from the Unit ${u.n} Slibrary; pressure comes from the case.</p>
    <div class="keyfw">Pedagogy: ${esc(u.pedagogy)} &nbsp;·&nbsp; Core message anchor: "${esc(u.coreMessage)}"</div>
    <div class="phases" style="margin-top:8px">${ph}</div>
    <div class="task"><div class="h">Facilitator note</div>Keep students on the Convince ↔ Clarify spectrum: early phases build belief, later phases clarify mechanics. End on testable assumptions, never on a single "right" answer — clarity, not certainty.</div>
  </div>
</div></section>
${footer()}
</body></html>`;
  fs.writeFileSync(path.join(OUT, "activities", `${u.slug}_Activities.html`), html);
}

// ---------- CASE ----------
const CASES = {
  unit1: [
    `LumaCart is a mid-market European home-goods retailer with €420M revenue and 1.8 million active customers. After two flat years, the new Chief Growth Officer has bet the 2026 budget on "hyper-personalisation": an AI recommendation engine, dynamic pricing, and AI-written product copy across every channel.`,
    `Six months in, the numbers are ambiguous. Click-through on recommendations is up 34%, but overall conversion is flat and repeat-purchase rate has slipped two points. The CFO notes that customer-service complaints about "creepy" targeting have tripled, and the brand team warns the AI-generated copy is eroding LumaCart's distinctive voice.`,
    `The CGO insists the data shows progress; the Head of CX argues the company optimised the wrong moments of truth and confused activity with value. The CEO wants a recommendation before the board meeting: double down on personalisation, re-scope it around genuine customer jobs, or pause and rebuild the data foundation first.`,
  ],
  unit2: [
    `Vantix Logistics, a €900M freight and warehousing group, began an enterprise AI programme two years ago: route optimisation, demand forecasting, and predictive maintenance. Leadership expected a clear margin lift by now. Instead, EBIT is essentially flat and the board is openly skeptical.`,
    `Closer analysis is more encouraging. Fuel cost per route is down 9%, unplanned downtime has fallen, and forecast accuracy has improved — but the gains are masked by one-off integration costs, a parallel-run period where humans and AI both did the work, and savings reinvested into new service lines rather than dropping to the bottom line.`,
    `The CFO believes Vantix is exactly where the productivity J-curve predicts: in the dip before the climb. A vocal board member wants to cut the programme. The CEO needs a defensible read on whether the benefits are real but lagging, or simply not there.`,
  ],
  unit3: [
    `Helios Health operates 40 outpatient clinics. Last year it licensed a clinical-documentation AI for €3M, projecting fast payback through clinician time saved. The model works well in demos.`,
    `In production, the true cost ballooned. Integrating with three legacy record systems, building a private hosting environment for patient-data compliance, fine-tuning on local terminology, hiring two MLOps engineers in a scarce market, and standing up a bias-and-error monitoring process pushed the all-in figure past €11M before the first full year closed.`,
    `The board feels misled — yet the clinical benefits are genuine. The question is no longer "is the model good?" but "did anyone cost the iceberg beneath it?" The CEO asks the team to rebuild the business case using a true Total-Cost-of-AI-Ownership view and decide whether to continue, renegotiate, or switch approaches.`,
  ],
  unit4: [
    `SynthVerse is a 30-person startup whose generative platform produces marketing images, copy and code for SME clients. It raised a seed round on impressive growth, branding itself "the creative engine for small business."`,
    `Three issues land in the same week. A client discovers competitor logos echoed in generated images and demands indemnity. SynthVerse's own investors ask what, exactly, the company owns — the platform is largely a wrapper over a third-party foundation model. And a developer realises the AI-generated code shipped to clients may carry copyleft obligations from its training data.`,
    `The founders must answer the questions every serious investor now asks: who owns the AI's output, is there any defensible moat beneath the wrapper, and is the proprietary client data the company's most valuable — and most exposed — asset?`,
  ],
  unit5: [
    `Aurelia & Co. is a 90-year-old premium kitchenware brand with fierce customer loyalty and slowing growth. AI-native competitors are winning younger buyers with conversational shopping, instant personalisation and viral, machine-assisted marketing.`,
    `The founder's granddaughter, now CEO, faces a fork. One camp wants an aggressive rebrand and an AI-first commerce model. Another fears that moving too fast will shatter the heritage equity that makes Aurelia worth more than its competitors. A third argues the real problem is organisational slowness, not the brand itself.`,
    `The board wants a strategic recommendation: how should Aurelia use AI to respond to disruption and — if at all — rebrand, without losing the soul that is its actual moat?`,
  ],
  unit6: [
    `Meridian Capital, a €6B asset manager, built an in-house ML strategy that backtested spectacularly: high returns, low drawdown, an apparently uncorrelated edge. The investment committee is ready to allocate €400M of client money to it.`,
    `A new quantitative analyst raises uncomfortable questions. The backtest may suffer from overfitting and look-ahead bias; the "edge" rests on a short, benign market regime; and the model has never traded through a real liquidity shock. The portfolio managers counter that the data is the data and competitors are already moving.`,
    `The CIO must decide whether the strategy is genuine alpha or a false discovery — applying timeless principles of risk, diversification and rigorous backtesting to a tool that is genuinely new only in its speed and inputs.`,
  ],
  unit7: [
    `This is the capstone. You are the founding team — or the lead investor — behind an AI-first venture preparing a €10M growth-and-investment mandate. Across one integrated plan you must show how the company creates value, defends it, and scales.`,
    `Your mandate must draw on every unit: a data-to-decision growth engine (Unit 1), a credible benefits case on the J-curve (Unit 2), an honest Total-Cost-of-AI view (Unit 3), a defensible IP and moat thesis (Unit 4), an agility-and-rebranding stance for disruption (Unit 5), an investment strategy grounded in sound principles (Unit 6), and a vertical-vs-platform scaling path toward — and beyond — unicorn status (Unit 7).`,
    `The deliverable is a board-ready plan that survives scrutiny from the full Council of Giants. Unicorn valuation is not the objective; a defensible, scalable wedge that widens is.`,
  ],
};
function buildCase(u) {
  const paras = (CASES[u.slug] || []).map(p => `<p>${esc(p)}</p>`).join("");
  const html = `${HEAD(`${COURSE.code} Unit ${u.n} — ${u.caseTitle}`, 1)}
<body>
${topbar(1, `Unit ${u.n} · Case`)}
<header class="hero"><div class="wrap">
  <div class="eyebrow">${COURSE.code} · Unit ${u.n} · Case Study</div>
  <h1 class="serif">${esc(u.caseTitle)}</h1>
  <p class="sub">${esc(u.caseSub)}</p>
</div></header>
<section><div class="wrap"><div class="doc">
  <span class="badge">Case Study · ${esc(u.short)}</span>
  <h2 class="serif">${esc(u.caseTitle)}</h2>
  <p class="lede">${esc(u.caseSub)}</p>
  <div class="keyfw">Core message under test: "${esc(u.coreMessage)}"</div>
  ${paras}
  <div class="task"><div class="h">Your task</div>
    Acting as the external advisor, use frameworks from the Unit ${u.n} Slibrary to build a one-page visual argument. Run it past at least three of the unit's Giants and state the friction between their views. Your recommendation must rest on testable assumptions, not certainty.</div>
  <div class="refs"><p><strong>Source:</strong> Scenario developed for ${COURSE.code} teaching purposes. Fictional organisation; figures illustrative. Contextual framing adapted from McKinsey & Company (2025) <em>The State of AI in Business 2025</em> and MIT (2024) <em>The Connected Customer</em>.</p></div>
</div></div></section>
${footer()}
</body></html>`;
  fs.writeFileSync(path.join(OUT, "cases", `${u.slug}_Case.html`), html);
}

// ---------- PRE-READING ----------
const PREREAD = {
  unit1: [
    `Most organisations are rich in data and poor in decisions. Surveys repeatedly find that the majority of collected customer data is never used to change a single action — it becomes "data exhaust," logged and forgotten. The strategic question is not how much data a firm holds, but how quickly that data becomes a decision a customer can feel.`,
    `Ackoff's DIKW pyramid — Data, Information, Knowledge, Wisdom — explains why. Raw data only becomes valuable as it climbs toward judgment and action. AI accelerates the lower rungs (turning data into information and pattern), but the leap to wisdom — deciding what to do — still depends on human framing of the right question.`,
    `The practical model for this unit is the DIKW → Decision Ladder: every customer signal should be traceable to a decision and an outcome. Where signals do not connect to action, the firm is paying to store noise. Personalisation, customer-experience design and opportunity sensing are all, at root, machinery for turning signals into decisions faster than competitors.`,
    `This is also where the embedded-vs-AI-native choice matters. Bolting AI onto a legacy product can lift information quality; designing a product around AI changes what decisions are even possible. The growth advantage accrues to firms that shorten the distance from signal to decision — and that distance, not data volume, is the metric to manage.`,
  ],
  unit2: [
    `Economists have a name for the frustration boards feel two years into an AI programme: the productivity paradox. In the 1980s, Robert Solow quipped that the computer age was visible everywhere except in the productivity statistics. The same pattern is recurring with AI.`,
    `Erik Brynjolfsson's explanation is the productivity J-curve. When a general-purpose technology arrives, organisations must invest heavily in complementary intangibles — new processes, skills, data pipelines, restructured workflows — before benefits appear. During this build-out, measured productivity can fall. The payoff comes later, and steeply, once the complements are in place.`,
    `This has a direct managerial implication: the dip is not failure, it is the cost of building the slope. Killing an AI programme at the bottom of the J-curve destroys value precisely when it is about to be created. Conversely, a programme that never shows complementary investment — no process change, no upskilling — may have no slope to climb at all.`,
    `The benefits, when they come, show up in two places: internal productivity (cost-to-serve, cycle efficiency, freed capacity redeployed to higher-value work) and customer impact (acquisition cost, retention, net revenue retention). The discipline is to measure both, attribute carefully, and distinguish a genuine lag from a genuine absence.`,
  ],
  unit3: [
    `Every AI business case has an iceberg problem. The visible tip — the model licence or API fee — is often the smallest line item. Beneath the waterline sit integration with legacy systems, data preparation and governance, hosting and compute, scarce specialist talent, change management, and the ongoing cost of monitoring for bias and failure.`,
    `A Total Cost of AI Ownership (TCO-AI) view makes the iceberg visible. It traces cost across the AI economy stack — semiconductors, cloud, models, applications — and across the project lifecycle, from build through to the perpetual operating cost of keeping a model safe, current and compliant. Inference at scale, not training, is frequently the cost that surprises.`,
    `Strategic choices shape the curve. Private, hybrid and hyperscaler hosting trade control against cost. Open-source models offer control and lower marginal cost but demand more in-house capability; proprietary models offer speed and capability at a usage price and some lock-in. Talent scarcity adds a wage premium that can dwarf software spend.`,
    `Costs cannot be read without risk. Taleb's lesson on tail risk and O'Neil's on algorithmic bias both point the same way: the rare, severe failure — a regulatory breach, a discriminatory model, an outage — can erase years of efficiency gains. A mature cost-benefit analysis is therefore risk-adjusted, and accepts that de-risking shows diminishing returns: past a point, more mitigation costs more than the risk it removes.`,
  ],
  unit4: [
    `Investors increasingly ask AI startups a blunt question: "Is there anything here you actually own?" In a market where powerful foundation models are available to everyone via API, a thin application layer — a "wrapper" — is a feature, not a moat. The strategic task is to identify what makes AI value durable.`,
    `Intellectual property under AI is unsettled. Most jurisdictions still require a human author for copyright and a human inventor for patents, which leaves the status of purely AI-generated content and code genuinely uncertain. The Authorship Decision Tree helps classify whether an output is human-authored, machine-generated, or jointly created — with different ownership consequences for each.`,
    `Defensibility is best understood through frameworks like Helmer's 7 Powers and the wrapper-to-moat ladder: durable advantage comes from proprietary data flywheels, switching costs, network effects, scale economics and brand — not from access to a model anyone can call. Peter Thiel's distinction is the sharp one: is your product merely better, or is it genuinely different?`,
    `Data is often the real asset — and the real exposure. Owned, unique, fresh data can compound into a moat, but it carries privacy, licensing and provenance obligations. AI-generated code may inherit licence terms from training data. The unit's lesson: treat IP, data rights and defensibility as a single design problem, decided early, not patched after a demo goes viral.`,
  ],
  unit5: [
    `Clayton Christensen's Innovator's Dilemma showed that well-run incumbents fail not through incompetence but through competence aimed at the wrong target — serving existing customers so well they miss the disruptive entrant rising from below. AI sharpens this dilemma by collapsing the time available to respond.`,
    `John Boyd's OODA loop — Observe, Orient, Decide, Act — offers the counter-strategy. The firm that completes the loop fastest, and re-decides as conditions change, can stay inside a faster rival's decision cycle. In an AI era, agility — the speed of re-decision — becomes a more reliable moat than scale.`,
    `Snowden's Cynefin framework adds discipline: not every situation calls for the same response. Disruption is usually a "complex" environment where the right move is to probe with small bets, sense what works, and amplify — not to plan exhaustively as if the world were merely "complicated."`,
    `Rebranding is where agility becomes visible to customers. Using the Brand Pyramid, brand archetypes and the StoryBrand framework, strategic rebranding is a deliberate motor of change rather than a cosmetic refresh. The risk, as Sara Blakely warns, is moving so fast that the organisation never builds the resilience — or keeps the equity — that made it worth saving. The art is changing fast enough to survive without discarding the soul of the brand.`,
  ],
  unit6: [
    `Artificial intelligence changes how investing is done; it does not repeal the laws of risk and return. Markowitz's Modern Portfolio Theory still holds: diversification across imperfectly correlated assets remains, in his phrase, the closest thing to a free lunch. What AI changes is the speed of analysis and the breadth of inputs — not the underlying trade-off between risk and reward.`,
    `Machine learning is genuinely disrupting parts of finance. Robo-advisors automate profiling and allocation; alternative data (satellite imagery, card transactions, web traffic) feeds new signals; blockchain enables tokenised and programmable instruments. Muldowney's adoption curve describes how investment managers move from experimentation to integration of these tools.`,
    `Agrawal, Gans and Goldfarb's "prediction machines" lens is the clarifying one: AI dramatically lowers the cost of prediction, but prediction is not judgment. Deciding how much risk to bear, for whom, and under what objective remains a human responsibility. Fama-French factors and risk-profiling matrices still frame where returns come from and who should hold which risk.`,
    `The most important caution is methodological. López de Prado argues that most quantitative backtests are false discoveries — products of overfitting, look-ahead bias and multiple testing. AI makes it easier than ever to find patterns that are not real. The disciplined investor treats a spectacular backtest as a hypothesis to be stress-tested, not a result to be trusted.`,
  ],
  unit7: [
    `The unicorn — a privately held startup valued above $1 billion — has become shorthand for success. But valuation is an output, not a strategy. Most AI startups never scale, and many that reach a billion-dollar valuation prove fragile. The durable question is what makes an AI-first company genuinely worth scaling.`,
    `Valuing an AI-first firm means looking past revenue multiples to strategic assets: a proprietary data flywheel, a defensible IP position, real switching costs, and a cost structure whose gross margin survives contact with inference costs. The Rule of 40 and the cost-structure lens keep founders honest about whether growth is profitable or merely fast.`,
    `Strategy diverges along the vertical-versus-platform axis. Vertical AI wins by going deep in one industry — owning the data, the workflow and the trust of a specific sector. Platform AI wins by going broad — orchestrating value across sectors and capturing network effects. Geoffrey Moore's chasm and Thiel's monopoly logic both argue the same first move: win a narrow beachhead before reaching for the mainstream.`,
    `Scaling itself is a funnel with brutal survival rates. Hoffman's blitzscaling prioritises speed over efficiency when winner-takes-most dynamics apply — but speed without a widening wedge produces a unicorn that cannot hold its valuation. The capstone lesson, echoing the Council of Giants, is that lasting advantage comes from a sharp wedge that compounds into a defensible, scalable system — with unicorn status as the by-product, never the goal.`,
  ],
};
const PREREF = {
  unit1: ["Ackoff, R.L. (1989) ‘From data to wisdom’, Journal of Applied Systems Analysis, 16, pp. 3–9.","Christensen, C.M. et al. (2016) ‘Know your customers’ jobs to be done’, Harvard Business Review.","MIT (2024) The Connected Customer Report."],
  unit2: ["Brynjolfsson, E., Rock, D. and Syverson, C. (2021) ‘The Productivity J-Curve’, American Economic Journal: Macroeconomics, 13(1).","Solow, R. (1987) ‘We’d better watch out’, New York Times Book Review.","McKinsey & Company (2025) The State of AI in Business 2025."],
  unit3: ["Taleb, N.N. (2007) The Black Swan. London: Penguin.","O’Neil, C. (2016) Weapons of Math Destruction. New York: Crown.","Schwartz, R. et al. (2020) ‘Green AI’, Communications of the ACM, 63(12)."],
  unit4: ["Helmer, H. (2016) 7 Powers: The Foundations of Business Strategy. Deep Strategy.","Thiel, P. (2014) Zero to One. New York: Crown Business.","Lee, J.-A. et al. (eds.) (2021) Artificial Intelligence and Intellectual Property. Oxford University Press."],
  unit5: ["Christensen, C.M. (1997) The Innovator’s Dilemma. Boston: HBS Press.","Boyd, J. (1986) ‘Patterns of Conflict’ (briefing).","Snowden, D. and Boone, M. (2007) ‘A leader’s framework for decision making’, Harvard Business Review."],
  unit6: ["Markowitz, H. (1952) ‘Portfolio selection’, The Journal of Finance, 7(1).","Agrawal, A., Gans, J. and Goldfarb, A. (2018) Prediction Machines. Boston: HBR Press.","López de Prado, M. (2018) Advances in Financial Machine Learning. Hoboken: Wiley."],
  unit7: ["Moore, G. (1991) Crossing the Chasm. New York: HarperBusiness.","Hoffman, R. and Yeh, C. (2018) Blitzscaling. New York: Currency.","Thiel, P. (2014) Zero to One. New York: Crown Business."],
};
function buildPreReading(u) {
  const paras = (PREREAD[u.slug] || []).map(p => `<p>${esc(p)}</p>`).join("");
  const refs = (PREREF[u.slug] || []).map(r => `<p>${esc(r)}</p>`).join("");
  const html = `${HEAD(`${COURSE.code} Unit ${u.n} — ${u.preReadTitle}`, 1)}
<body>
${topbar(1, `Unit ${u.n} · Pre-Reading`)}
<header class="hero"><div class="wrap">
  <div class="eyebrow">${COURSE.code} · Unit ${u.n} · Pre-Reading</div>
  <h1 class="serif">${esc(u.preReadTitle)}</h1>
  <p class="sub">${esc(u.preReadSub)}</p>
</div></header>
<section><div class="wrap"><div class="doc">
  <span class="badge">Pre-Reading · read before the session</span>
  <h2 class="serif">${esc(u.preReadTitle)}</h2>
  <p class="lede">${esc(u.preReadSub)}</p>
  <div class="keyfw">Key framework: ${esc(u.keyFramework)}</div>
  ${paras}
  <h3>References</h3>
  <div class="refs">${refs}</div>
</div></div></section>
${footer()}
</body></html>`;
  fs.writeFileSync(path.join(OUT, "prereading", `${u.slug}_PreReading.html`), html);
}

// ---------- REFLECTION ----------
function buildReflection(u) {
  const qs = [
    `Which framework from today's Unit ${u.n} Slibrary most changed how you see "${u.short.toLowerCase()}"? Describe the exact moment of insight — what did you understand differently once the visual clicked?`,
    `Take the unit's core message — "${u.coreMessage}" Do you agree? Argue the strongest case against it using at least one framework and one Giant from this unit.`,
    `Pick one framework you do not yet fully understand. Return to the gallery, study its thumbnail, and write a 200-word explanation in your own words — then state one testable assumption it would help you check in a real organisation.`,
  ];
  const cards = qs.map((q, i) => `<div class="refl"><div class="n">Reflection ${i+1}</div><p>${esc(q)}</p></div>`).join("");
  const html = `${HEAD(`${COURSE.code} Unit ${u.n} — Reflection`, 1)}
<body>
${topbar(1, `Unit ${u.n} · Reflection`)}
<header class="hero"><div class="wrap">
  <div class="eyebrow">${COURSE.code} · Unit ${u.n} · Reflection</div>
  <h1 class="serif">Reflection Prompt</h1>
  <p class="sub">Unit ${u.n}: ${esc(u.title)}</p>
</div></header>
<section><div class="wrap"><div class="doc">
  <span class="badge">Reflection · independent study</span>
  <p class="lede">Complete these before the next session. Bring written responses — they open our next discussion. The goal is clarity, not certainty: collect distinctions and testable assumptions, not final answers.</p>
  ${cards}
</div></div></section>
${footer()}
</body></html>`;
  fs.writeFileSync(path.join(OUT, "reflections", `${u.slug}_Reflection.html`), html);
}

// ---------- GIANTS SLIBRARY ----------
function buildSlibrary() {
  const sections = UNITS.map(u => `
  <section id="${u.slug}" style="padding-top:22px"><div class="wrap">
    <div class="sec-head"><span class="kicker">Unit ${u.n} · ${esc(u.pedagogy)}</span><h2 class="serif">${esc(u.title)}</h2></div>
    <p class="sec-sub">The thinkers anchoring Unit ${u.n}'s Slibrary. Convene them before you decide.</p>
    <div class="giants">
      ${u.giants.map(g => `<div class="giant"><div class="av">${esc(g.name.replace(/[^A-Za-z& ]/g,'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join(''))}</div>
        <div class="gn">${esc(g.name)}</div><div class="gr">${esc(g.role)}</div><div class="gl">${esc(g.lens)}</div></div>`).join("")}
    </div>
  </div></section>`).join("");

  const nav = UNITS.map(u => `<a href="#${u.slug}" style="text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line);border-radius:999px;padding:7px 13px;color:var(--ink-2)">Unit ${u.n} · ${esc(u.short)}</a>`).join(" ");
  const total = new Set(); UNITS.forEach(u=>u.giants.forEach(g=>total.add(g.name)));

  const html = `${HEAD(`${COURSE.code} · The Council of Giants`, 0)}
<body>
${topbar(0, "The Council of Giants")}
<header class="hero"><div class="wrap">
  <div class="eyebrow">${COURSE.code} · Framework Author Slibrary</div>
  <h1 class="serif">The <em>Council</em> of Giants</h1>
  <p class="sub">"If I have seen further, it is by standing on the shoulders of giants." The thinkers behind every framework in the course — run your challenge through their lenses.</p>
</div></header>
<div class="wrap"><div class="stats">
  <div class="stat"><div class="num">${total.size}+</div><div class="lbl">Giants</div></div>
  <div class="stat"><div class="num">7</div><div class="lbl">Units</div></div>
  <div class="stat"><div class="num">${UNITS.reduce((s,u)=>s+u.sets.reduce((a,x)=>a+x.frameworks.length,0),0)}</div><div class="lbl">Frameworks</div></div>
  <div class="stat"><div class="num">5</div><div class="lbl">Lenses / unit</div></div>
</div></div>
<section style="padding-bottom:0"><div class="wrap">
  <p class="sec-sub">Each unit summons a panel of five. They are simulations of public logic, not the people themselves — an echo, not a conversation. Use them to find friction and better distinctions, never as a substitute for your own judgment.</p>
  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px">${nav}</div>
</div></section>
${sections}
${footer()}
</body></html>`;
  fs.writeFileSync(path.join(OUT, "slibrary.html"), html);
}

// ---------- content protection script ----------
const PROTECT = `// BARBM312 content protection. Deters casual copying, printing, saving.
// Note: client-side protection cannot be absolute, but blocks normal copy/print/right-click.
(function(){
  var stop=function(e){e.preventDefault();e.stopPropagation();return false;};
  // disable context menu, copy, cut, drag, and text selection start
  ['contextmenu','copy','cut','dragstart','selectstart'].forEach(function(ev){
    document.addEventListener(ev, stop, {capture:true});
  });
  // blank the clipboard if a copy somehow fires
  document.addEventListener('copy', function(e){
    try{ e.clipboardData.setData('text/plain', '\\u00A9 Dr. Hildegard Haas 2026 \\u2014 EU Business School. Copying disabled.'); }catch(_){}
    e.preventDefault();
  }, true);
  // block common shortcuts: Ctrl/Cmd + C, X, S, P, U, A ; F12 ; Ctrl+Shift+I/J/C
  document.addEventListener('keydown', function(e){
    var k=(e.key||'').toLowerCase(), m=e.ctrlKey||e.metaKey;
    if(e.key==='F12'){return stop(e);}
    if(m && e.shiftKey && (k==='i'||k==='j'||k==='c')){return stop(e);}
    if(m && (k==='c'||k==='x'||k==='s'||k==='p'||k==='u'||k==='a')){return stop(e);}
  }, true);
  // discourage image dragging/saving
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('img,svg').forEach(function(el){
      el.setAttribute('draggable','false');
      el.addEventListener('contextmenu', stop, true);
    });
  });
})();`;

// ---------- build all ----------
fs.writeFileSync(path.join(OUT, "protect.js"), PROTECT);
fs.writeFileSync(path.join(OUT, "styles.css"), CSS);
buildIndex();
buildSlibrary();
UNITS.forEach(u => { buildUnit(u); buildActivities(u); buildCase(u); buildPreReading(u); buildReflection(u); });
console.log("Generated:");
console.log(" - index.html, styles.css, slibrary.html");
UNITS.forEach(u => console.log(`   unit${u.n}: ${u.slug}.html + activities/cases/prereading/reflections`));
