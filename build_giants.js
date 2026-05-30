// Builds the BARBM312 Council of Giants — one full A4 profile per thinker, in the
// JD Meier "Author Distilled" tradition, matching the Framework Sheet Library style:
// Arial, EUBS crimson + black + white, Dr. Hildegard Haas © on every page.
const fs=require("fs");const path=require("path");
const {COURSE,UNITS}=require("./barbm312_data.js");
const G=require("./giants_content.js");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const initials=n=>esc(n.replace(/[^A-Za-z& ]/g,'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join(''));

// Build a unique, ordered roster with the units each giant appears in + their role/lens per unit.
const order=[]; const meta={};
UNITS.forEach(u=>u.giants.forEach(g=>{
  if(!meta[g.name]){meta[g.name]={name:g.name, units:[], roles:[], lenses:[]}; order.push(g.name);}
  meta[g.name].units.push(u.n);
  if(!meta[g.name].roles.includes(g.role)) meta[g.name].roles.push(g.role);
  meta[g.name].lenses.push({unit:u.n, lens:g.lens});
}));
const giantNo={}; order.forEach((n,i)=>giantNo[n]=i+1);

const foot=(label)=>`<div class="pfoot"><span>${esc(COURSE.code)} · Council of Giants · ${esc(label)}</span><span>Dr. Hildegard Haas · EU Business School · © ${COURSE.year}</span></div>`;

let pages=[];

// ---- Cover ----
pages.push(`<section class="page cover">
  <div class="cheadband">
    <div class="chk">${esc(COURSE.code)} · BACHELOR · FHEQ LEVEL 6 · 5 ECTS · EU BUSINESS SCHOOL</div>
    <div class="chtitle">The Council of Giants</div>
    <div class="chcourse">AI in Investment and Business Growth · Framework Author Library</div>
  </div>
  <div class="cbody">
    <div class="epi">"If I have seen further, it is by standing on the shoulders of giants."<span>— Sir Isaac Newton</span></div>
    <div class="cmeta2">${order.length} thinkers · 7 units · the minds behind all 140 frameworks</div>
    <div class="cstat">
      <div class="cs"><b>${order.length}</b><span>Framework authors<br><i>one distilled profile per thinker</i></span></div>
      <div class="cs"><b>7</b><span>Course units<br><i>a five-member panel convenes for each</i></span></div>
      <div class="cs"><b>140</b><span>Frameworks anchored<br><i>every Slibrary traces to a Giant</i></span></div>
      <div class="cs"><b>6</b><span>Profile dimensions<br><i>why · foundation · frameworks · use · limits · impact</i></span></div>
    </div>
    <div class="cphil"><b>How to use the Council.</b> Each profile distils one thinker in the JD Meier "Author Distilled" tradition: the why that drove their work, its intellectual foundation, the frameworks they anchor in this course, how those ideas operationalise, their limitations, and their enduring impact. The Giants are simulations of public logic, not the people themselves — an echo, not a conversation. Convene a unit's panel of five to find friction and sharper distinctions before you decide; never treat them as a substitute for your own judgment.</div>
    <div class="cby"><b>Dr. Hildegard Haas</b> · EU Business School · ${esc(COURSE.code)}<span>© ${COURSE.year} · All rights reserved</span></div>
  </div>
  ${foot("Cover")}
</section>`);

// ---- Panels index: which five convene per unit ----
const panelRows=UNITS.map(u=>{
  const cells=u.giants.map(g=>`<span class="gp"><b>${initials(g.name)}</b> ${esc(g.name)}</span>`).join("");
  return `<tr class="uhead"><td>Unit ${u.n} · ${esc(u.title)}</td><td class="pedc">${esc(u.pedagogy)}</td></tr><tr><td colspan="2" class="panelcell">${cells}</td></tr>`;
}).join("");
pages.push(`<section class="page">
  <div class="phead"><div class="pk">Panels</div><h2>Who convenes for each unit</h2></div>
  <p class="lead">Each unit summons a panel of five Giants whose frameworks anchor its Slibraries. Three thinkers — Boyd, Christensen and Thiel — sit on two panels. The profiles that follow are ordered by first appearance.</p>
  <table class="panels"><tbody>${panelRows}</tbody></table>
  ${foot("Panels index")}
</section>`);

// ---- one profile per giant ----
function profileHTML(name){
  const c=G[name]; const m=meta[name];
  const unitsTxt = m.units.length>1 ? `Units ${m.units.join(" & ")}` : `Unit ${m.units[0]}`;
  // pick a signature lens (first)
  const lens=m.lenses[0].lens;
  const srcs=(c.sources||[]).map(x=>`<p>${esc(x)}</p>`).join("");
  // related: panel-mates from the giant's first unit
  const firstUnit=UNITS.find(u=>u.n===m.units[0]);
  const mates=firstUnit.giants.filter(g=>g.name!==name).slice(0,4).map(g=>`<span class="pill"><b>${esc(g.name)}</b> · Giant ${giantNo[g.name]}</span>`).join("");
  return `<section class="page">
    <div class="ghead">
      <div class="av">${initials(name)}</div>
      <div class="gh-mid"><h2>${esc(name)}</h2><div class="gsub">${esc(c.disc)}</div></div>
      <div class="gright">GIANT ${String(giantNo[name]).padStart(2,'0')} / ${order.length}<br>${esc(unitsTxt)}</div>
    </div>
    <div class="lifespan">${esc(c.lifespan)}</div>
    <div class="lens">${esc(lens)}</div>
    <div class="cols2g">
      <div class="sec"><h3>The why that drove the work</h3><p>${esc(c.the_why)}</p></div>
      <div class="sec"><h3>Intellectual foundation</h3><p>${esc(c.foundation)}</p></div>
    </div>
    <div class="frbox"><div class="lab">Frameworks anchored in this course</div><p>${esc(c.frameworks)}</p></div>
    <div class="cols2g">
      <div class="sec"><h3>How the ideas operationalise</h3><p>${esc(c.operational)}</p></div>
      <div class="sec"><h3>Limitations &amp; critique</h3><p>${esc(c.limits)}</p></div>
    </div>
    <div class="impbox"><div class="lab">Enduring impact</div><p>${esc(c.impact)}</p></div>
    <div class="related"><div class="rlab">On the same panel (Unit ${m.units[0]})</div><div class="pills">${mates}</div></div>
    <div class="sources"><div class="rlab">Sources (Harvard referencing style)</div>${srcs}</div>
    ${foot(`Giant ${giantNo[name]} · ${esc(name)}`)}
  </section>`;
}
order.forEach(n=>pages.push(profileHTML(n)));

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
.cheadband .chtitle{font-size:32pt;font-weight:700;margin-top:6mm;line-height:1}
.cheadband .chcourse{font-size:13pt;margin-top:2mm;color:rgba(255,255,255,.95)}
.cbody{padding:13mm 16mm 0}
.epi{font-size:15pt;font-style:italic;color:#1a1a1a;line-height:1.4;max-width:150mm}
.epi span{display:block;font-size:10.5pt;font-style:normal;color:#9e1b32;margin-top:3mm;font-weight:700}
.cmeta2{font-size:11pt;color:#5e5e5e;margin-top:8mm}
.cstat{display:grid;grid-template-columns:1fr 1fr;gap:6mm 12mm;margin:10mm 0 9mm}
.cs{display:flex;gap:5mm;align-items:baseline}
.cs b{font-size:22pt;color:#9e1b32;min-width:20mm;font-weight:700}
.cs span{font-size:9.5pt;color:#1a1a1a}
.cs i{color:#8a8a8a;font-style:italic;font-size:8.2pt}
.cphil{font-size:9.5pt;line-height:1.5;color:#3a3a3a;border-top:1px solid #e3dede;padding-top:6mm;max-width:165mm}
.cby{margin-top:8mm;font-size:10pt;color:#1a1a1a;display:flex;justify-content:space-between;border-top:1px solid #e3dede;padding-top:5mm}
.cby span{color:#8a8a8a}
/* page header */
.phead{border-bottom:2px solid #9e1b32;padding-bottom:6px;margin-bottom:12px}
.phead .pk{color:#9e1b32;font-size:9pt;letter-spacing:.14em;text-transform:uppercase}
.phead h2{font-size:20pt;margin-top:3px}
.lead{font-size:10pt;line-height:1.5;color:#3a3a3a;margin:0 0 12px}
/* panels index */
.panels{width:100%;border-collapse:collapse}
.panels tr.uhead td{background:#1a1a1a;color:#fff;font-weight:700;font-size:10pt;padding:7px 9px}
.panels tr.uhead .pedc{color:#e88aa0;font-weight:400;font-style:italic;text-align:right}
.panels .panelcell{padding:8px 9px;border-bottom:1px solid #ece7e7}
.gp{display:inline-block;border:1px solid #d8d0d0;border-radius:999px;padding:3px 11px;margin:3px 5px 3px 0;font-size:9pt}
.gp b{display:inline-block;background:#9e1b32;color:#fff;border-radius:50%;width:16px;height:16px;text-align:center;font-size:7.5pt;line-height:16px;margin-right:5px}
/* giant profile */
.ghead{display:flex;align-items:center;gap:14px;border-bottom:2px solid #9e1b32;padding-bottom:9px;margin-bottom:10px}
.ghead .av{width:46px;height:46px;flex:0 0 46px;border-radius:50%;background:#9e1b32;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:700}
.gh-mid{flex:1}
.gh-mid h2{font-size:19pt;line-height:1.04}
.gsub{font-style:italic;color:#5e5e5e;font-size:10pt;margin-top:2px}
.gright{font-size:8.5pt;letter-spacing:.05em;color:#9e1b32;font-weight:700;text-align:right;white-space:nowrap;line-height:1.5}
.lifespan{font-size:9pt;color:#5e5e5e;margin-bottom:9px}
.lens{font-size:13pt;font-style:italic;color:#1a1a1a;background:#f4f1f1;border-left:4px solid #9e1b32;border-radius:0 6px 6px 0;padding:9px 14px;margin-bottom:11px}
.cols2g{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:11px}
.sec h3{font-size:9pt;letter-spacing:.05em;text-transform:uppercase;color:#1a1a1a;border-bottom:1px solid #e3dede;padding-bottom:3px;margin-bottom:5px}
.sec p{margin:0;font-size:9.5pt;line-height:1.45}
.lab{font-size:8.5pt;letter-spacing:.1em;text-transform:uppercase;color:#7d1426;font-weight:700;margin-bottom:3px}
.frbox,.impbox{background:#f4f1f1;border-left:4px solid #9e1b32;border-radius:0 6px 6px 0;padding:9px 14px;margin-bottom:11px}
.frbox p,.impbox p{margin:0;font-size:9.5pt;line-height:1.45}
.rlab{font-size:8.5pt;letter-spacing:.08em;text-transform:uppercase;color:#9e1b32;font-weight:700;margin-bottom:5px}
.related{margin-bottom:10px}
.pills{display:flex;flex-wrap:wrap;gap:6px}
.pill{border:1px solid #d8d0d0;border-radius:999px;padding:3px 10px;font-size:8.2pt;color:#1a1a1a}
.sources p{margin:0 0 3px;font-size:8.2pt;color:#3a3a3a;line-height:1.35;padding-left:10px;text-indent:-10px}
.pfoot{position:absolute;left:15mm;right:15mm;bottom:8mm;display:flex;justify-content:space-between;font-size:7.6pt;color:#8a8a8a;border-top:1px solid #ece7e7;padding-top:5px}
`;
const html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${esc(COURSE.code)} — The Council of Giants</title><style>${CSS}</style></head><body>${pages.join("\n")}</body></html>`;
fs.writeFileSync(path.join(__dirname,"giants_library.html"),html);
console.log("Giants library HTML written:",pages.length,"pages ("+order.length+" profiles + cover + panels index)");
