// Builds a print-ready HTML (A4 landscape) of all Slibraries + Council of Giants,
// styled to match the website: Arial, EUBS red/black/white, Dr. Haas copyright per page.
const fs=require("fs");const path=require("path");
const {COURSE,UNITS}=require("./barbm312_data.js");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const initials=n=>esc(n.replace(/[^A-Za-z& ]/g,'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join(''));

const A="#9e1b32",T="#9e1b32",I="#1a1a1a",M="#5e5e5e";
const GLYPHS=[
 `<svg viewBox="0 0 120 80"><polygon points="60,12 100,68 20,68" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="38" y1="49" x2="82" y2="49" stroke="${A}" stroke-width="2.4"/><line x1="48" y1="31" x2="72" y2="31" stroke="${T}" stroke-width="2.4"/></svg>`,
 `<svg viewBox="0 0 120 80"><circle cx="60" cy="40" r="26" fill="none" stroke="${I}" stroke-width="2.4" stroke-dasharray="4 5"/><polygon points="86,40 78,34 78,46" fill="${A}"/><circle cx="60" cy="40" r="6" fill="${T}"/></svg>`,
 `<svg viewBox="0 0 120 80"><rect x="26" y="12" width="68" height="56" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="60" y1="12" x2="60" y2="68" stroke="${I}" stroke-width="2"/><line x1="26" y1="40" x2="94" y2="40" stroke="${I}" stroke-width="2"/><rect x="62" y="14" width="30" height="24" fill="${A}" opacity=".7"/></svg>`,
 `<svg viewBox="0 0 120 80"><line x1="22" y1="66" x2="100" y2="66" stroke="${I}" stroke-width="2"/><rect x="30" y="46" width="12" height="20" fill="${T}"/><rect x="50" y="34" width="12" height="32" fill="${A}"/><rect x="70" y="22" width="12" height="44" fill="${I}"/></svg>`,
 `<svg viewBox="0 0 120 80"><polygon points="28,16 92,16 70,46 70,66 50,66 50,46" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="36" y1="26" x2="84" y2="26" stroke="${A}" stroke-width="2.4"/></svg>`,
 `<svg viewBox="0 0 120 80"><path d="M22,64 C46,64 50,18 98,16" fill="none" stroke="${A}" stroke-width="2.8"/><path d="M22,64 C56,64 60,40 98,40" fill="none" stroke="${T}" stroke-width="2.2" stroke-dasharray="4 4"/></svg>`,
 `<svg viewBox="0 0 120 80"><rect x="34" y="16" width="52" height="11" fill="none" stroke="${I}" stroke-width="2"/><rect x="34" y="32" width="52" height="11" fill="${T}" opacity=".55"/><rect x="34" y="48" width="52" height="11" fill="none" stroke="${I}" stroke-width="2"/><rect x="34" y="48" width="20" height="11" fill="${A}"/></svg>`,
 `<svg viewBox="0 0 120 80"><circle cx="60" cy="40" r="22" fill="none" stroke="${I}" stroke-width="2.4"/><circle cx="60" cy="18" r="4" fill="${A}"/><circle cx="79" cy="51" r="4" fill="${T}"/><circle cx="41" cy="51" r="4" fill="${I}"/></svg>`,
 `<svg viewBox="0 0 120 80"><circle cx="34" cy="26" r="6" fill="${T}"/><circle cx="86" cy="22" r="6" fill="${A}"/><circle cx="60" cy="58" r="6" fill="${I}"/><line x1="34" y1="26" x2="60" y2="58" stroke="${M}" stroke-width="1.8"/><line x1="86" y1="22" x2="60" y2="58" stroke="${M}" stroke-width="1.8"/><line x1="34" y1="26" x2="86" y2="22" stroke="${M}" stroke-width="1.8" stroke-dasharray="3 3"/></svg>`,
 `<svg viewBox="0 0 120 80"><rect x="24" y="16" width="72" height="48" fill="none" stroke="${I}" stroke-width="2.4"/><line x1="48" y1="16" x2="48" y2="64" stroke="${M}" stroke-width="1.6"/><line x1="72" y1="16" x2="72" y2="64" stroke="${M}" stroke-width="1.6"/><line x1="24" y1="40" x2="96" y2="40" stroke="${M}" stroke-width="1.6"/><rect x="24" y="16" width="24" height="24" fill="${A}" opacity=".5"/></svg>`,
 `<svg viewBox="0 0 120 80"><circle cx="60" cy="40" r="24" fill="none" stroke="${M}" stroke-width="1.4"/><circle cx="60" cy="40" r="14" fill="none" stroke="${M}" stroke-width="1.4"/><polygon points="60,20 78,46 44,52" fill="${A}" opacity=".55" stroke="${A}" stroke-width="1.6"/></svg>`,
 `<svg viewBox="0 0 120 80"><line x1="24" y1="66" x2="24" y2="14" stroke="${I}" stroke-width="2"/><line x1="24" y1="66" x2="100" y2="66" stroke="${I}" stroke-width="2"/><path d="M28,60 Q40,24 96,20" fill="none" stroke="${A}" stroke-width="2.8"/><circle cx="60" cy="33" r="4" fill="${T}"/></svg>`,
];
const glyph=i=>GLYPHS[i%GLYPHS.length];

const foot=(label)=>`<div class="pfoot"><span>© Dr. Hildegard Haas ${COURSE.year} · EU Business School</span><span>${esc(COURSE.code)} · AI in Investment and Business Growth</span><span>${esc(label)}</span></div>`;

// Cover
let pages=[];
pages.push(`<section class="page cover">
  <div class="cbg"></div>
  <div class="cband"></div>
  <div class="cinner">
    <div class="ckick">EU BUSINESS SCHOOL · BACHELOR · FHEQ LEVEL 6 · 5 ECTS</div>
    <h1>${esc(COURSE.code)}<br>AI in Investment <span class="rd">&amp;</span> Business Growth</h1>
    <div class="csub">The Slibrary — Visual Framework Galleries</div>
    <p class="cnote">A complete catalogue of the 28 Slibraries and 140 single-visual frameworks used across the course, with the Council of Giants behind them. Built in the JD Meier <em>Thumbnail Thinking</em> tradition; core messages clarified after Kurt Bostelaar.</p>
    <div class="cmeta">Prepared by <strong>Dr. Hildegard Haas</strong> · © ${COURSE.year}</div>
  </div>
  ${foot("Cover")}
</section>`);

// Contents
pages.push(`<section class="page">
  <div class="phead"><div class="pk">Contents</div><h2>The Slibrary at a glance</h2></div>
  <table class="toc"><thead><tr><th>Unit</th><th>Title</th><th>Pedagogy</th><th>Slibraries</th><th>Frameworks</th><th>Giants</th></tr></thead><tbody>
  ${UNITS.map(u=>`<tr><td class="num">${u.n}</td><td>${esc(u.title)}</td><td>${esc(u.pedagogy)}</td><td>${u.sets.length}</td><td>${u.sets.reduce((a,x)=>a+x.frameworks.length,0)}</td><td>${u.giants.length}</td></tr>`).join("")}
  </tbody></table>
  <p class="lead" style="margin-top:18px">Each unit contributes four Slibraries (sets of five frameworks). A framework is shown as a <strong>thumbnail</strong> — a single visual you can recall under pressure — with a one-line definition. The closing pages present the <strong>Council of Giants</strong>: the thinkers whose work anchors each unit.</p>
  ${foot("Contents")}
</section>`);

// Unit pages: core message + the 4 slibraries (2 sets per page to keep it clean)
UNITS.forEach(u=>{
  let gi=0;
  // page A: unit intro + core message + set 1 & 2
  const setHTML=(set)=>{
    const cards=set.frameworks.map(f=>{const g=glyph(gi++);return `<div class="card"><div class="cv">${g}</div><div class="cm"><div class="t">${esc(f.t)}</div><div class="d">${esc(f.d)}</div></div></div>`;}).join("");
    return `<div class="setwrap"><div class="setname">${esc(set.name)}</div><div class="cards">${cards}</div></div>`;
  };
  pages.push(`<section class="page">
    <div class="phead"><div class="pk">Unit ${u.n} · ${esc(u.pedagogy)}</div><h2>${esc(u.title)}</h2></div>
    <div class="core">
      <div class="corelab">Core message · Bostelaar</div>
      <div class="coremsg">"${esc(u.coreMessage)}"</div>
      <div class="wyw"><div class="wb"><b>Why it matters.</b> ${esc(u.why)}</div><div class="wb"><b>What it covers.</b> ${esc(u.what)}</div></div>
      <div class="spec"><span>Convince · inspire</span><div class="track"><div class="dot" style="left:${u.spectrum}%"></div></div><span>Clarify · instruct</span></div>
    </div>
    ${setHTML(u.sets[0])}
    ${setHTML(u.sets[1])}
    ${foot(`Unit ${u.n} · Slibraries (1–2)`)}
  </section>`);
  // page B: set 3 & 4 + giants
  pages.push(`<section class="page">
    <div class="phead"><div class="pk">Unit ${u.n} · Framework Gallery</div><h2>${esc(u.title)} — continued</h2></div>
    ${setHTML(u.sets[2])}
    ${setHTML(u.sets[3])}
    <div class="giantsrow">
      <div class="gtitle">Council of Giants — the minds behind Unit ${u.n}</div>
      <div class="grow">${u.giants.map(g=>`<div class="g"><div class="av">${initials(g.name)}</div><div class="gn">${esc(g.name)}</div><div class="gr">${esc(g.role)}</div><div class="gl">${esc(g.lens)}</div></div>`).join("")}</div>
    </div>
    ${foot(`Unit ${u.n} · Slibraries (3–4) + Giants`)}
  </section>`);
});

// Closing note
pages.push(`<section class="page">
  <div class="phead"><div class="pk">Grounding the Council</div><h2>How to use these Slibraries</h2></div>
  <div class="grid3">
    <div class="note"><h3>Think in thumbnails</h3><p>Under pressure you won't reason from scratch — you'll pattern-match. Build a mental catalogue of these visuals so the right one surfaces when a decision lands.</p></div>
    <div class="note"><h3>Convene the Giants</h3><p>The Giants are simulations of public logic, not the people themselves — an echo, not a conversation. Use them to find friction and sharper distinctions, never as a substitute for your own judgment.</p></div>
    <div class="note"><h3>Clarity, not certainty</h3><p>A Slibrary doesn't hand you the answer. It strips away the average until a high-resolution view of your challenge remains. Leave with testable assumptions, not conclusions.</p></div>
  </div>
  <p class="lead" style="margin-top:20px"><strong>Sources & method.</strong> Framework galleries apply JD Meier's <em>Thumbnail Thinking</em>; the author panels apply his <em>Council of Giants</em>; each unit's core message is clarified after Kurt Bostelaar's <em>Clarify your core message</em>. Pedagogy follows the EU Business School experiential model. Contextual data adapted from McKinsey &amp; Company (2025) and MIT (2024).</p>
  ${foot("Closing")}
</section>`);

const CSS=`
@page{size:A4 landscape;margin:0}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a}
.page{position:relative;width:297mm;height:210mm;padding:14mm 16mm 16mm;overflow:hidden;page-break-after:always;background:#fff}
.page:last-child{page-break-after:auto}
h1,h2,h3{margin:0;font-weight:700;letter-spacing:-.01em}
.rd{color:#9e1b32}
/* cover */
.cover{padding:0;background:#1a1a1a}
.cbg{position:absolute;left:0;top:0;width:297mm;height:210mm;background:#1a1a1a;z-index:0}
.cband{position:absolute;left:0;top:0;width:100%;height:100%;background:transparent;z-index:1}
.cband:after{content:"";position:absolute;left:0;bottom:0;width:100%;height:14mm;background:#9e1b32;z-index:2}
.cinner{position:absolute;left:18mm;top:34mm;right:18mm;color:#fff;z-index:3}
.ckick{color:#e88aa0;font-size:10pt;letter-spacing:.18em}
.cover h1{font-size:40pt;line-height:1.04;margin:10mm 0 6mm;color:#fff}
.csub{font-size:17pt;color:#fff}
.cnote{max-width:170mm;color:rgba(255,255,255,.82);font-size:11pt;line-height:1.5;margin-top:8mm}
.cmeta{margin-top:10mm;color:rgba(255,255,255,.9);font-size:11pt}
/* headers */
.phead{border-bottom:2px solid #9e1b32;padding-bottom:6px;margin-bottom:12px}
.phead .pk{color:#9e1b32;font-size:9pt;letter-spacing:.14em;text-transform:uppercase}
.phead h2{font-size:19pt;margin-top:3px}
.lead{font-size:10.5pt;line-height:1.5;color:#333;max-width:230mm}
/* toc */
.toc{width:100%;border-collapse:collapse;font-size:10.5pt}
.toc th{text-align:left;background:#1a1a1a;color:#fff;padding:8px 10px;font-size:9pt;letter-spacing:.06em;text-transform:uppercase}
.toc td{padding:8px 10px;border-bottom:1px solid #e3dede}
.toc td.num{font-weight:700;color:#9e1b32;width:40px}
.toc tr:nth-child(even) td{background:#faf7f7}
/* core message */
.core{border:1px solid #e0d9d9;border-left:4px solid #9e1b32;border-radius:8px;padding:10px 14px;margin-bottom:12px;background:#fdfbfb}
.corelab{color:#9e1b32;font-size:8.5pt;letter-spacing:.12em;text-transform:uppercase}
.coremsg{font-style:italic;font-size:13pt;margin:4px 0 8px}
.wyw{display:flex;gap:12px;font-size:9.5pt;line-height:1.4}
.wyw .wb{flex:1;border-top:2px solid #9e1b32;padding-top:5px;color:#333}
.spec{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:7.5pt;letter-spacing:.08em;text-transform:uppercase;color:#5e5e5e}
.spec .track{position:relative;flex:1;height:6px;border-radius:99px;background:linear-gradient(90deg,#d99,#9e1b32)}
.spec .dot{position:absolute;top:50%;width:13px;height:13px;border-radius:50%;background:#fff;border:3px solid #1a1a1a;transform:translate(-50%,-50%)}
/* slibrary sets */
.setwrap{margin-bottom:9px}
.setname{font-size:9pt;letter-spacing:.08em;text-transform:uppercase;color:#9e1b32;border-bottom:1px solid #ece7e7;padding-bottom:3px;margin-bottom:7px}
.cards{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.card{border:1px solid #e3dede;border-radius:7px;overflow:hidden;background:#fff}
.card .cv{height:46px;background:#f4f1f1;border-bottom:1px solid #e3dede;display:flex;align-items:center;justify-content:center;padding:5px}
.card .cv svg{height:100%}
.card .cm{padding:6px 8px}
.card .cm .t{font-size:9pt;font-weight:700;line-height:1.12}
.card .cm .d{font-size:7.6pt;color:#5e5e5e;line-height:1.25;margin-top:2px}
/* giants */
.giantsrow{margin-top:6px}
.gtitle{font-size:9pt;letter-spacing:.08em;text-transform:uppercase;color:#9e1b32;margin-bottom:7px}
.grow{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.g{background:#1a1a1a;color:#fff;border-radius:7px;padding:9px 10px}
.g .av{width:26px;height:26px;border-radius:50%;background:#9e1b32;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:9pt;margin-bottom:5px}
.g .gn{font-size:9.5pt;font-weight:700;line-height:1.1}
.g .gr{font-size:7.2pt;letter-spacing:.05em;text-transform:uppercase;color:#e88aa0;margin-top:2px}
.g .gl{font-size:8pt;font-style:italic;color:rgba(255,255,255,.85);margin-top:5px;line-height:1.3}
/* closing grid */
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:6px}
.note{border:1px solid #e3dede;border-top:3px solid #9e1b32;border-radius:8px;padding:12px 14px;background:#fdfbfb}
.note h3{font-size:12pt;color:#9e1b32}
.note p{font-size:9.5pt;line-height:1.45;color:#333;margin:6px 0 0}
/* footer */
.pfoot{position:absolute;left:16mm;right:16mm;bottom:8mm;display:flex;justify-content:space-between;font-size:7.5pt;color:#8a8a8a;border-top:1px solid #ece7e7;padding-top:5px}
.cover .pfoot{color:rgba(255,255,255,.7);border-top:1px solid rgba(255,255,255,.2);left:18mm;right:18mm}
`;

const html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${esc(COURSE.code)} — The Slibrary</title><style>${CSS}</style></head><body>${pages.join("\n")}</body></html>`;
fs.writeFileSync(path.join(__dirname,"slibrary_pdf.html"),html);
console.log("Slibrary PDF source written:",pages.length,"pages");
