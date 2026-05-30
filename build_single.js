// Single-file build: renders the entire BARBM312 course as ONE self-contained
// HTML file with hash-based in-page navigation, so every link is clickable
// inside the chat artifact viewer (no separate files / no server needed).
const fs = require("fs");
const path = require("path");
const { COURSE, UNITS } = require("./barbm312_data.js");
const OUT = __dirname;
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const initials = (name) => esc(name.replace(/[^A-Za-z& ]/g,'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join(''));

// ---- glyphs (Thumbnail Thinking) ----
const A="var(--accent)",T="var(--teal)",I="var(--ink)",M="var(--muted)";
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
const glyph=(i)=>GLYPHS[i%GLYPHS.length];

// pull narrative content from the multi-file build's data tables by re-reading build.js exports
// (replicate the content tables here so this file is standalone)
const { CASES, PREREAD, PREREF } = require("./content_tables.js");

// ---------- view builders (return inner HTML strings) ----------
function vHome(){
  const totalFw=UNITS.reduce((s,u)=>s+u.sets.reduce((a,x)=>a+x.frameworks.length,0),0);
  const totalSets=UNITS.reduce((s,u)=>s+u.sets.length,0);
  const gn=new Set();UNITS.forEach(u=>u.giants.forEach(g=>gn.add(g.name)));
  const units=UNITS.map(u=>{
    const res=[
      {tag:"FG",cls:"fg",to:`#/unit/${u.n}`,t:"Framework Gallery",d:`${u.sets.length} Slibraries · ${u.sets.reduce((a,x)=>a+x.frameworks.length,0)} thumbnail frameworks`},
      {tag:u.pedagogyCode,cls:"gd",to:`#/session/${u.n}`,t:u.pedagogy,d:"7-phase experiential session guide"},
      {tag:"CS",cls:"",to:`#/case/${u.n}`,t:"Case Study",d:u.caseSub},
      {tag:"PR",cls:"",to:`#/pre/${u.n}`,t:"Pre-Reading",d:`Key framework: ${u.keyFramework}`},
      {tag:"RF",cls:"",to:`#/reflect/${u.n}`,t:"Reflection Prompt",d:"3 questions for independent study"},
      {tag:"CG",cls:"gd",to:`#/giants/${u.n}`,t:"Council of Giants",d:`${u.giants.length} thinkers behind this unit`},
    ].map(r=>`<a class="res" href="${r.to}"><span class="tag ${r.cls}">${r.tag}</span><span><span class="rt">${esc(r.t)}</span><span class="rd">${esc(r.d)}</span></span></a>`).join("");
    return `<div class="unit"><div class="unit-head" onclick="this.parentNode.classList.toggle('open')">
      <div class="unit-num">${u.n}</div>
      <div class="unit-meta"><div class="t">${esc(u.title)}</div><div class="ped">${esc(u.pedagogy)}</div></div>
      <svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div><div class="unit-body"><p class="sec-sub" style="margin:14px 0 0">${esc(u.blurb)}</p><div class="res-grid">${res}</div></div></div>`;
  }).join("");
  return `
  <header class="hero"><div class="wrap">
    <div class="eyebrow">${esc(COURSE.level)}</div>
    <h1 class="serif">AI in Investment <em>&</em> Business Growth</h1>
    <p class="sub">${esc(COURSE.tagline)} — built on framework galleries, a Council of Giants, and a clarified core message for every unit.</p>
    <div class="meta">EU BUSINESS SCHOOL · BARCELONA / MUNICH / GENEVA / DIGITAL · © ${COURSE.year}</div>
  </div></header>
  <div class="wrap"><div class="stats">
    <div class="stat"><div class="num">7</div><div class="lbl">Units</div></div>
    <div class="stat"><div class="num">${totalSets}</div><div class="lbl">Slibraries</div></div>
    <div class="stat"><div class="num">${totalFw}</div><div class="lbl">Frameworks</div></div>
    <div class="stat"><div class="num">${gn.size}+</div><div class="lbl">Giants</div></div>
    <div class="stat"><div class="num">5</div><div class="lbl">ECTS</div></div>
  </div></div>
  <section><div class="wrap">
    <div class="sec-head"><span class="kicker">How this course works</span></div>
    <p class="sec-sub">Every unit pairs an experiential session with a <strong>Framework Gallery</strong> (Thumbnail Thinking — a Slibrary of single-visual models), a <strong>Council of Giants</strong> (the thinkers behind those frameworks), a real case, a pre-reading anchored on one key visual, and a reflection. Each unit opens with a <strong>clarified core message</strong> — a WHY → WHAT distillation positioned on the Convince ↔ Clarify spectrum (Bostelaar).</p>
    <div class="sec-head" style="margin-top:30px"><span class="kicker">Course Units</span><h2 class="serif">Seven units, one strategy atlas — tap a unit to open</h2></div>
    ${units}
  </div></section>
  <section style="padding-top:0"><div class="wrap">
    <div class="sec-head"><span class="kicker">The thinkers</span><h2 class="serif">The Council of Giants</h2></div>
    <p class="sec-sub">A standing council of strategy, economics, finance and innovation thinkers whose frameworks anchor every Slibrary. <a class="lnk" href="#/giants">Open the full Giants Slibrary →</a></p>
  </div></section>`;
}

function giantCard(g){return `<div class="giant"><div class="av">${initials(g.name)}</div><div class="gn">${esc(g.name)}</div><div class="gr">${esc(g.role)}</div><div class="gl">${esc(g.lens)}</div></div>`;}

function vUnit(u){
  let gi=0;
  const sets=u.sets.map(set=>{
    const thumbs=set.frameworks.map(f=>{const g=glyph(gi++);return `<div class="thumb"><div class="canvas">${g}</div><div class="meta"><div class="t">${esc(f.t)}</div><div class="d">${esc(f.d)}</div><div class="s">${esc(set.name.split("—")[0].trim())}</div></div></div>`;}).join("");
    return `<div class="setblock"><div class="setname">${esc(set.name)} · ${set.frameworks.length} frameworks</div><div class="thumbs">${thumbs}</div></div>`;
  }).join("");
  const fwCount=u.sets.reduce((a,x)=>a+x.frameworks.length,0);
  return `
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
      <div class="spectrum"><div class="ends"><span>Convince · inspire</span><span>Clarify · instruct</span></div>
      <div class="track"><div class="dot" style="left:${u.spectrum}%"></div></div>
      <div class="note"><strong>Message strategy:</strong> ${esc(u.spectrumNote)}</div></div>
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
    <div class="giants">${u.giants.map(giantCard).join("")}</div>
    <p class="sec-sub" style="margin-top:18px"><a class="lnk" href="#/giants/${u.n}">See all Giants across the course →</a></p>
  </div></section>`;
}

const PHASES=["Open","Frame","Explore","Apply","Synthesise","Reflect","Close"];
const PHMIN=["0–10 min","10–25 min","25–50 min","50–95 min","95–120 min","120–135 min","135–150 min"];
function pedApply(u){switch(u.pedagogyCode){
  case"GD":return"Guided Discovery: groups reconstruct the decision pipeline for the case, choosing frameworks rather than being told which to use. Facilitator asks questions, never gives answers.";
  case"DL":return"Live Data Lab: hands-on with a no-code AI / spreadsheet model — audit the data, choose a metric, stress-test the result, and prepare a board-ready read-out.";
  case"HK":return"Mini-Hackathon: constraint cards force trade-offs. Teams assemble a Total-Cost-of-AI architecture and a risk matrix, then deliver a 5-minute board pitch.";
  case"MC":return"Moot Court: claimant, defendant and jury argue the IP case using the Authorship Decision Tree and Moat Ladder. Verdict by reasoned vote.";
  case"RP":return"Role Play: six stakeholder roles negotiate a disruption / rebrand decision across three escalating scenes with real tension and incomplete information.";
  case"BC":return"Business Challenge (Capstone): teams build a €10M AI-first growth & investment plan, integrating frameworks and Giants from all seven units into one mandate.";
  default:return"Apply the unit frameworks to the live case.";}}
function vSession(u){
  const ph=[
    {t:`Hook — ${u.short} in the wild`,d:`Open with a 90-second provocation tied to "${u.coreMessage}". Surface what students already believe before any framework is introduced.`},
    {t:`Frame the core message`,d:`Reveal the unit's WHY → WHAT core message and place it on the Convince ↔ Clarify spectrum. Students predict where today's decision should sit.`},
    {t:`Gallery walk — explore the Slibrary`,d:`In pairs, students browse the Unit ${u.n} Framework Gallery and pick the three thumbnails that best fit today's case. Thumbnail Thinking in practice.`},
    {t:`${u.pedagogy} — apply under pressure`,d:pedApply(u)},
    {t:`Convene the Council of Giants`,d:`Groups run their recommendation past the unit's five Giants. Where do the Giants disagree? That friction is the insight.`},
    {t:`Reflect — distinguish, don't conclude`,d:`Each student names one distinction the session sharpened and one testable assumption they will carry forward (not a final answer).`},
    {t:`Close & bridge to Unit ${u.n===7?"—":u.n+1}`,d:`One-sentence synthesis from each group, then a teaser and a single pre-reading task for next session.`},
  ].map((x,i)=>`<div class="phase"><div class="pn"><div class="ph">${PHASES[i]}</div><div class="mn">${PHMIN[i]}</div></div><div class="pc"><div class="t">${esc(x.t)}</div><div class="d">${esc(x.d)}</div></div></div>`).join("");
  return `
  <header class="hero"><div class="wrap"><div class="eyebrow">${COURSE.code} · Unit ${u.n} · ${esc(u.pedagogy)}</div>
    <h1 class="serif">Session Guide — Unit ${u.n}</h1>
    <p class="sub">${esc(u.title)} · a 150-minute experiential session (12 × 2.5h course rhythm).</p></div></header>
  <section><div class="wrap"><div class="doc" style="max-width:880px">
    <span class="badge">7-Phase Session · What to do today</span>
    <p class="lede">EU Business School pedagogy: hands-on, scaffolded, higher-order. The lecture is minimal; the room does the thinking. Frameworks come from the Unit ${u.n} Slibrary; pressure comes from the case.</p>
    <div class="keyfw">Pedagogy: ${esc(u.pedagogy)} &nbsp;·&nbsp; Core message anchor: "${esc(u.coreMessage)}"</div>
    <div class="phases" style="margin-top:8px">${ph}</div>
    <div class="task"><div class="h">Facilitator note</div>Keep students on the Convince ↔ Clarify spectrum: early phases build belief, later phases clarify mechanics. End on testable assumptions, never on a single "right" answer — clarity, not certainty.</div>
  </div></div></section>`;
}
function vCase(u){
  const paras=(CASES[u.slug]||[]).map(p=>`<p>${esc(p)}</p>`).join("");
  return `
  <header class="hero"><div class="wrap"><div class="eyebrow">${COURSE.code} · Unit ${u.n} · Case Study</div>
    <h1 class="serif">${esc(u.caseTitle)}</h1><p class="sub">${esc(u.caseSub)}</p></div></header>
  <section><div class="wrap"><div class="doc">
    <span class="badge">Case Study · ${esc(u.short)}</span>
    <h2 class="serif">${esc(u.caseTitle)}</h2><p class="lede">${esc(u.caseSub)}</p>
    <div class="keyfw">Core message under test: "${esc(u.coreMessage)}"</div>${paras}
    <div class="task"><div class="h">Your task</div>Acting as the external advisor, use frameworks from the Unit ${u.n} Slibrary to build a one-page visual argument. Run it past at least three of the unit's Giants and state the friction between their views. Your recommendation must rest on testable assumptions, not certainty.</div>
    <div class="refs"><p><strong>Source:</strong> Scenario developed for ${COURSE.code} teaching purposes. Fictional organisation; figures illustrative. Contextual framing adapted from McKinsey & Company (2025) <em>The State of AI in Business 2025</em> and MIT (2024) <em>The Connected Customer</em>.</p></div>
  </div></div></section>`;
}
function vPre(u){
  const paras=(PREREAD[u.slug]||[]).map(p=>`<p>${esc(p)}</p>`).join("");
  const refs=(PREREF[u.slug]||[]).map(r=>`<p>${esc(r)}</p>`).join("");
  return `
  <header class="hero"><div class="wrap"><div class="eyebrow">${COURSE.code} · Unit ${u.n} · Pre-Reading</div>
    <h1 class="serif">${esc(u.preReadTitle)}</h1><p class="sub">${esc(u.preReadSub)}</p></div></header>
  <section><div class="wrap"><div class="doc">
    <span class="badge">Pre-Reading · read before the session</span>
    <h2 class="serif">${esc(u.preReadTitle)}</h2><p class="lede">${esc(u.preReadSub)}</p>
    <div class="keyfw">Key framework: ${esc(u.keyFramework)}</div>${paras}
    <h3>References</h3><div class="refs">${refs}</div>
  </div></div></section>`;
}
function vReflect(u){
  const qs=[
    `Which framework from today's Unit ${u.n} Slibrary most changed how you see "${u.short.toLowerCase()}"? Describe the exact moment of insight — what did you understand differently once the visual clicked?`,
    `Take the unit's core message — "${u.coreMessage}" Do you agree? Argue the strongest case against it using at least one framework and one Giant from this unit.`,
    `Pick one framework you do not yet fully understand. Return to the gallery, study its thumbnail, and write a 200-word explanation in your own words — then state one testable assumption it would help you check in a real organisation.`,
  ].map((q,i)=>`<div class="refl"><div class="n">Reflection ${i+1}</div><p>${esc(q)}</p></div>`).join("");
  return `
  <header class="hero"><div class="wrap"><div class="eyebrow">${COURSE.code} · Unit ${u.n} · Reflection</div>
    <h1 class="serif">Reflection Prompt</h1><p class="sub">Unit ${u.n}: ${esc(u.title)}</p></div></header>
  <section><div class="wrap"><div class="doc">
    <span class="badge">Reflection · independent study</span>
    <p class="lede">Complete these before the next session. Bring written responses — they open our next discussion. The goal is clarity, not certainty: collect distinctions and testable assumptions, not final answers.</p>
    ${qs}
  </div></div></section>`;
}
function vGiants(focus){
  const nav=UNITS.map(u=>`<a class="pill" href="#/giants/${u.n}">Unit ${u.n} · ${esc(u.short)}</a>`).join(" ");
  const total=new Set();UNITS.forEach(u=>u.giants.forEach(g=>total.add(g.name)));
  const list=(focus?UNITS.filter(u=>u.n==focus):UNITS);
  const sections=list.map(u=>`<section style="padding-top:22px" id="giants-u${u.n}"><div class="wrap">
    <div class="sec-head"><span class="kicker">Unit ${u.n} · ${esc(u.pedagogy)}</span><h2 class="serif">${esc(u.title)}</h2></div>
    <p class="sec-sub">The thinkers anchoring Unit ${u.n}'s Slibrary. Convene them before you decide.</p>
    <div class="giants">${u.giants.map(giantCard).join("")}</div></div></section>`).join("");
  return `
  <header class="hero"><div class="wrap"><div class="eyebrow">${COURSE.code} · Framework Author Slibrary</div>
    <h1 class="serif">The <em>Council</em> of Giants</h1>
    <p class="sub">"If I have seen further, it is by standing on the shoulders of giants." The thinkers behind every framework in the course — run your challenge through their lenses.</p></div></header>
  <section style="padding-bottom:0"><div class="wrap">
    <p class="sec-sub">Each unit summons a panel of five. They are simulations of public logic, not the people themselves — an echo, not a conversation. Use them to find friction and better distinctions, never as a substitute for your own judgment.</p>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px">${nav}</div>
  </div></section>${sections}`;
}

// ---------- assemble single file ----------
const CSS = fs.readFileSync(path.join(OUT,"styles.css"),"utf8");
const EXTRA = `
.lnk{color:var(--accent-2);font-weight:600;text-decoration:none}
.pill{text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line);border-radius:999px;padding:7px 13px;color:var(--ink-2)}
.pill:hover{border-color:var(--accent)}
.topbar a.home{font-size:.82rem;text-decoration:none;opacity:.85;border:1px solid rgba(255,255,255,.18);padding:6px 12px;border-radius:999px}
.topbar a.home:hover{opacity:1;border-color:var(--accent)}
#app{animation:fade .25s ease}
`;
// Inline data needed at runtime
const DATA = `const COURSE=${JSON.stringify(COURSE)};const UNITS=${JSON.stringify(UNITS)};`;

// Precompute every view's HTML and embed as a routing table (so no heavy logic ships;
// but we DO ship functions for the gallery glyphs/giants). Simpler: ship rendered strings.
const VIEWS = {};
VIEWS["home"]=vHome();
VIEWS["giants"]=vGiants(null);
UNITS.forEach(u=>{
  VIEWS[`unit/${u.n}`]=vUnit(u);
  VIEWS[`session/${u.n}`]=vSession(u);
  VIEWS[`case/${u.n}`]=vCase(u);
  VIEWS[`pre/${u.n}`]=vPre(u);
  VIEWS[`reflect/${u.n}`]=vReflect(u);
  VIEWS[`giants/${u.n}`]=vGiants(u.n);
});

const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(COURSE.code)} — ${esc(COURSE.title)}</title>
<style>${CSS}${EXTRA}</style>
</head><body>
<div class="topbar"><div class="wrap">
  <div><span class="code">${esc(COURSE.code)}</span> &nbsp;<span class="nm" id="crumb">${esc(COURSE.title)}</span></div>
  <a class="home" href="#/">‹ Course Overview</a>
</div></div>
<div class="copybar"><div class="wrap">© Dr. Hildegard Haas ${COURSE.year} · EU Business School · ${esc(COURSE.code)} AI in Investment and Business Growth</div></div>
<div id="app"></div>
<footer><div class="wrap">
  <div><strong>© Dr. Hildegard Haas ${COURSE.year}</strong> · ${esc(COURSE.code)} ${esc(COURSE.title)} · EU Business School</div>
  <div>Applying <span class="acc">Thumbnail Thinking</span> & the <span class="acc">Council of Giants</span> (JD Meier) · Core message via <span class="acc">Bostelaar</span></div>
</div></footer>
<script>
const VIEWS=${JSON.stringify(VIEWS)};
const UNITS=${JSON.stringify(UNITS.map(u=>({n:u.n,title:u.title,short:u.short})))};
function crumbFor(route){
  if(route==="home"||route==="")return "${esc(COURSE.title)}";
  if(route==="giants")return "The Council of Giants";
  const m=route.split("/");const u=UNITS.find(x=>String(x.n)===m[1]);
  const map={unit:"Gallery",session:"Session",case:"Case",pre:"Pre-Reading",reflect:"Reflection",giants:"Giants"};
  return (u?("Unit "+u.n+" · "):"")+(map[m[0]]||"");
}
function render(){
  let h=location.hash.replace(/^#\\/?/,"");
  if(h==="")h="home";
  const view=VIEWS[h]||VIEWS["home"];
  document.getElementById("app").innerHTML=view;
  document.getElementById("crumb").textContent=crumbFor(h);
  document.getElementById("app").style.animation="none";void document.getElementById("app").offsetWidth;document.getElementById("app").style.animation="fade .25s ease";
  window.scrollTo({top:0,behavior:"instant"});
}
window.addEventListener("hashchange",render);
render();
// ---- content protection (deters casual copy/print/right-click) ----
(function(){
  var stop=function(e){e.preventDefault();e.stopPropagation();return false;};
  ['contextmenu','copy','cut','dragstart','selectstart'].forEach(function(ev){document.addEventListener(ev,stop,{capture:true});});
  document.addEventListener('copy',function(e){try{e.clipboardData.setData('text/plain','\\u00A9 Dr. Hildegard Haas 2026 \\u2014 EU Business School. Copying disabled.');}catch(_){}e.preventDefault();},true);
  document.addEventListener('keydown',function(e){var k=(e.key||'').toLowerCase(),m=e.ctrlKey||e.metaKey;if(e.key==='F12'){return stop(e);}if(m&&e.shiftKey&&(k==='i'||k==='j'||k==='c')){return stop(e);}if(m&&(k==='c'||k==='x'||k==='s'||k==='p'||k==='u'||k==='a')){return stop(e);}},true);
  function lockImgs(){document.querySelectorAll('img,svg').forEach(function(el){el.setAttribute('draggable','false');el.addEventListener('contextmenu',stop,true);});}
  document.addEventListener('DOMContentLoaded',lockImgs);
  var _r=render;render=function(){_r();lockImgs();};
})();
</script>
</body></html>`;

fs.writeFileSync(path.join(OUT,"BARBM312.html"),html);
console.log("Single-file site written:",(html.length/1024).toFixed(0)+"KB,",Object.keys(VIEWS).length,"views");
