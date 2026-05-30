// Builds the BARBM312 Framework Sheet Library: one full A4 (portrait) sheet per
// framework, nine-section layout modelled on MARTI301, EUBS crimson + Arial,
// bespoke Figure 1 per framework, Dr. Hildegard Haas © on every page.
const fs=require("fs");const path=require("path");
const {COURSE,UNITS}=require("./barbm312_data.js");
const {diagramFor}=require("./diagrams.js");
const C={...require("./sheets_content_1.js"),...require("./sheets_content_2.js"),...require("./sheets_content_3.js")};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

// Build an index of frameworks with slibrary + sheet numbering
let slibNo=0; const sheets=[]; const slibIndex=[];
UNITS.forEach(u=>{
  u.sets.forEach(set=>{
    slibNo++;
    const setShort=set.name.replace(/^Set\s*\d+\s*—\s*/,'').trim();
    slibIndex.push({slibNo, unit:u.n, name:setShort, count:set.frameworks.length, pedagogy:u.pedagogy});
    set.frameworks.forEach((f,i)=>{
      sheets.push({title:f.t, sub:f.d, slibNo, sheetInSlib:i+1, slibCount:set.frameworks.length, unit:u.n, setShort});
    });
  });
});
// related frameworks: other titles in the same slibrary (up to 4)
function relatedFor(s){
  const sib=sheets.filter(x=>x.slibNo===s.slibNo && x.title!==s.title).slice(0,4);
  return sib.map(x=>({t:x.title, slib:x.slibNo}));
}

const foot=(label)=>`<div class="pfoot"><span>${esc(COURSE.code)} · Framework Sheet · ${esc(label)}</span><span>Dr. Hildegard Haas · EU Business School · © ${COURSE.year}</span></div>`;

let pages=[];

// ---- Cover ----
pages.push(`<section class="page cover">
  <div class="cheadband">
    <div class="chk">${esc(COURSE.code)} · BACHELOR · FHEQ LEVEL 6 · 5 ECTS · EU BUSINESS SCHOOL</div>
    <div class="chtitle">${esc(COURSE.code)}</div>
    <div class="chcourse">AI in Investment and Business Growth</div>
  </div>
  <div class="cbody">
    <h1>Framework Sheet Library</h1>
    <div class="cmeta2">Master Index · ${slibIndex.length} Slibraries · ${sheets.length} Reference Sheets</div>
    <div class="cstat">
      <div class="cs"><b>7</b><span>Course Units<br><i>strategy, data, costs, IP, agility, finance, scaling</i></span></div>
      <div class="cs"><b>${slibIndex.length}</b><span>Slibraries<br><i>thematic clusters, 4–5 per unit</i></span></div>
      <div class="cs"><b>${sheets.length}</b><span>Framework Reference Sheets<br><i>print-ready A4, nine-section layout</i></span></div>
      <div class="cs"><b>280+</b><span>Harvard-referenced sources<br><i>peer-reviewed and practitioner</i></span></div>
    </div>
    <div class="cphil"><b>Design philosophy.</b> Each sheet follows a consistent nine-section layout: professional definition; who developed it; why it was developed; a bespoke illustrative figure; how, when and by whom it is used; the innovation relative to the predecessor tool; related frameworks in this course; and Harvard-referenced sources. The library is built in the JD Meier "Thumbnail Thinking" tradition (Meier, 2025) — treat the ${sheets.length} sheets as a mental Slibrary that scales from single-framework lookup to full strategic reasoning across connected tools. Core messages are clarified after Bostelaar.</div>
    <div class="cby"><b>Dr. Hildegard Haas</b> · EU Business School · ${esc(COURSE.code)}<span>© ${COURSE.year} · All rights reserved</span></div>
  </div>
  ${foot("Cover")}
</section>`);

// ---- Master index (split: Units 1-4 on page A, Units 5-7 on page B) ----
function idxRows(unitList){
  return unitList.map(u=>{
    const rows=slibIndex.filter(s=>s.unit===u.n).map(s=>`<tr><td class="sn">Slibrary ${s.slibNo}</td><td>${esc(s.name)}</td><td class="ct">${s.count} sheets</td></tr>`).join("");
    return `<tr class="uhead"><td colspan="3">Unit ${u.n} · ${esc(u.title)} · <span class="ped">${esc(u.pedagogy)}</span></td></tr>${rows}`;
  }).join("");
}
pages.push(`<section class="page">
  <div class="phead"><div class="pk">Master Index</div><h2>The ${slibIndex.length} Slibraries</h2></div>
  <table class="idx"><tbody>${idxRows(UNITS.filter(u=>u.n<=4))}</tbody></table>
  ${foot("Master Index (1/2)")}
</section>`);
pages.push(`<section class="page">
  <div class="phead"><div class="pk">Master Index · continued</div><h2>The ${slibIndex.length} Slibraries</h2></div>
  <table class="idx"><tbody>${idxRows(UNITS.filter(u=>u.n>=5))}</tbody></table>
  ${foot("Master Index (2/2)")}
</section>`);

// ---- one sheet per framework ----
function sheetHTML(s){
  const c=C[s.title];
  const rel=relatedFor(s);
  const relPills=rel.map(r=>`<span class="pill"><b>${esc(r.t)}</b> · Slibrary ${r.slib}</span>`).join("");
  const srcs=(c.sources||[]).map(x=>`<p>${esc(x)}</p>`).join("");
  return `<section class="page">
    <div class="shead">
      <div><h2>${esc(s.title)}</h2><div class="ssub">${esc(s.sub)}</div></div>
      <div class="sright">SLIBRARY ${String(s.slibNo).padStart(2,'0')} · SHEET ${s.sheetInSlib} / ${s.slibCount}</div>
    </div>
    <div class="def"><div class="lab">Professional Definition</div><p>${esc(c.def)}</p></div>
    <div class="cols2">
      <div class="lcol">
        <div class="sec"><h3>Who developed it</h3><p>${esc(c.who)}</p></div>
        <div class="sec"><h3>Why it was developed</h3><p>${esc(c.why)}</p></div>
      </div>
      <div class="rcol">
        <div class="figlab">Figure 1 · ${esc(s.title)}</div>
        <div class="fig">${diagramFor(s.title)}</div>
        <div class="figcap">Figure 1. A schematic of the ${esc(s.title)} as applied in ${esc(COURSE.code)} (illustrative).</div>
      </div>
    </div>
    <div class="cols3">
      <div class="sec"><h3>How it is used</h3><p>${esc(c.how)}</p></div>
      <div class="sec"><h3>When it is used</h3><p>${esc(c.when)}</p></div>
      <div class="sec"><h3>By whom it is used</h3><p>${esc(c.whom)}</p></div>
    </div>
    <div class="innov"><div class="lab">Innovation relative to the predecessor tool</div><p>${esc(c.innov)}</p></div>
    <div class="related"><div class="rlab">Related frameworks in this course</div><div class="pills">${relPills}</div></div>
    <div class="sources"><div class="rlab">Sources (Harvard referencing style)</div>${srcs}</div>
    ${foot(`Slibrary ${s.slibNo} · ${esc(s.title)}`)}
  </section>`;
}
sheets.forEach(s=>pages.push(sheetHTML(s)));

const RED="#9e1b32",RED2="#7d1426",INK="#1a1a1a";
const CSS=`
@page{size:A4 portrait;margin:0}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;font-size:10pt;line-height:1.42}
.page{position:relative;width:210mm;height:297mm;padding:14mm 15mm 15mm;overflow:hidden;page-break-after:always;background:#fff}
.page:last-child{page-break-after:auto}
h1,h2,h3{margin:0;font-weight:700}
/* cover */
.cover{padding:0}
.cheadband{background:#9e1b32;color:#fff;padding:18mm 16mm 12mm}
.cheadband .chk{font-size:9pt;letter-spacing:.14em;color:rgba(255,255,255,.85)}
.cheadband .chtitle{font-size:34pt;font-weight:700;margin-top:6mm;line-height:1}
.cheadband .chcourse{font-size:14pt;margin-top:2mm;color:rgba(255,255,255,.95)}
.cbody{padding:14mm 16mm 0}
.cbody h1{font-size:30pt;color:#1a1a1a}
.cmeta2{font-size:11pt;color:#5e5e5e;margin-top:3mm}
.cstat{display:grid;grid-template-columns:1fr 1fr;gap:6mm 12mm;margin:12mm 0 10mm}
.cs{display:flex;gap:5mm;align-items:baseline}
.cs b{font-size:22pt;color:#9e1b32;min-width:20mm;font-weight:700}
.cs span{font-size:9.5pt;color:#1a1a1a}
.cs i{color:#8a8a8a;font-style:italic;font-size:8.2pt}
.cphil{font-size:9.5pt;line-height:1.5;color:#3a3a3a;border-top:1px solid #e3dede;padding-top:6mm;max-width:165mm}
.cby{margin-top:9mm;font-size:10pt;color:#1a1a1a;display:flex;justify-content:space-between;border-top:1px solid #e3dede;padding-top:5mm}
.cby span{color:#8a8a8a}
/* page header */
.phead{border-bottom:2px solid #9e1b32;padding-bottom:6px;margin-bottom:12px}
.phead .pk{color:#9e1b32;font-size:9pt;letter-spacing:.14em;text-transform:uppercase}
.phead h2{font-size:20pt;margin-top:3px}
/* master index */
.idx{width:100%;border-collapse:collapse;font-size:10pt}
.idx td{padding:5px 8px;border-bottom:1px solid #ece7e7}
.idx tr.uhead td{background:#1a1a1a;color:#fff;font-weight:700;font-size:9.5pt;padding:7px 8px;border:0}
.idx tr.uhead .ped{color:#e88aa0;font-weight:400;font-style:italic}
.idx td.sn{color:#9e1b32;font-weight:700;width:30mm}
.idx td.ct{text-align:right;color:#5e5e5e;width:24mm}
/* framework sheet */
.shead{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #9e1b32;padding-bottom:8px;margin-bottom:11px}
.shead h2{font-size:20pt;line-height:1.04;color:#1a1a1a}
.ssub{font-style:italic;color:#5e5e5e;font-size:10.5pt;margin-top:3px}
.sright{font-size:8.5pt;letter-spacing:.06em;color:#9e1b32;font-weight:700;text-align:right;white-space:nowrap;padding-top:4px}
.def{background:#f4f1f1;border-left:4px solid #9e1b32;border-radius:0 6px 6px 0;padding:9px 13px;margin-bottom:11px}
.lab{font-size:8.5pt;letter-spacing:.1em;text-transform:uppercase;color:#7d1426;font-weight:700;margin-bottom:3px}
.def p{margin:0;font-size:10pt;line-height:1.45}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:11px}
.sec h3{font-size:9pt;letter-spacing:.06em;text-transform:uppercase;color:#1a1a1a;border-bottom:1px solid #e3dede;padding-bottom:3px;margin-bottom:5px}
.sec p{margin:0;font-size:9.5pt;line-height:1.4}
.lcol .sec{margin-bottom:10px}
.rcol{background:#fff;border:1px solid #e3dede;border-radius:8px;padding:9px}
.figlab{font-size:8.5pt;letter-spacing:.06em;text-transform:uppercase;color:#1a1a1a;font-weight:700;margin-bottom:5px}
.fig{background:#f4f1f1;border-radius:5px;padding:6px;height:42mm;display:flex;align-items:center;justify-content:center}
.fig svg{max-height:100%;max-width:100%}
.figcap{font-size:7.6pt;color:#5e5e5e;font-style:italic;margin-top:5px;line-height:1.3}
.cols3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:11px}
.innov{background:#f4f1f1;border-left:4px solid #9e1b32;border-radius:0 6px 6px 0;padding:9px 13px;margin-bottom:11px}
.innov p{margin:0;font-size:9.5pt;line-height:1.45}
.rlab{font-size:8.5pt;letter-spacing:.08em;text-transform:uppercase;color:#9e1b32;font-weight:700;margin-bottom:5px}
.related{margin-bottom:10px}
.pills{display:flex;flex-wrap:wrap;gap:6px}
.pill{border:1px solid #d8d0d0;border-radius:999px;padding:3px 10px;font-size:8.2pt;color:#1a1a1a}
.pill b{font-weight:700}
.sources p{margin:0 0 3px;font-size:8.2pt;color:#3a3a3a;line-height:1.35;padding-left:10px;text-indent:-10px}
/* footer */
.pfoot{position:absolute;left:15mm;right:15mm;bottom:8mm;display:flex;justify-content:space-between;font-size:7.6pt;color:#8a8a8a;border-top:1px solid #ece7e7;padding-top:5px}
`;
const html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${esc(COURSE.code)} — Framework Sheet Library</title><style>${CSS}</style></head><body>${pages.join("\n")}</body></html>`;
fs.writeFileSync(path.join(__dirname,"sheet_library.html"),html);
console.log("Sheet library HTML written:",pages.length,"pages ("+sheets.length+" framework sheets + cover + index)");
