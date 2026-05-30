// Bespoke Figure-1 diagrams for BARBM312 Framework Sheets.
// EUBS palette. Each returns a labelled, framework-specific SVG (viewBox 0 0 460 300).
// Keyed by exact framework title; a typed fallback covers any not individually drawn.
const RED="#9e1b32", RED2="#7d1426", INK="#1a1a1a", GREY="#5e5e5e", LINE="#c9c2c2", BG="#f4f1f1", GREEN="#2e7d52", AMBER="#c98a1a", PINK="#e88aa0";

const S=(inner,extra="")=>`<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" font-family="Arial, Helvetica, sans-serif" ${extra}>${inner}</svg>`;
const txt=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||12}" fill="${o.c||INK}" text-anchor="${o.a||'start'}" font-weight="${o.w||'normal'}" font-style="${o.i||'normal'}" letter-spacing="${o.ls||0}">${t}</text>`;

// ---- reusable archetype builders (used for fallback + many sheets) ----
function pyramid(tiers){ // tiers: [{label, sub, color}] top->bottom
  const n=tiers.length, cx=230, top=40, bottom=250, H=bottom-top, baseW=300;
  let out=`${txt(60,30,'regulatory / value intensity',{s:9,c:GREY})}`;
  out+=`<line x1="70" y1="255" x2="70" y2="45" stroke="${INK}" stroke-width="1.5" marker-end="url(#ar)"/>`;
  for(let i=0;i<n;i++){
    const y0=top+H*i/n, y1=top+H*(i+1)/n;
    const w0=baseW*i/n, w1=baseW*(i+1)/n;
    const pts=`${cx-w0/2},${y0} ${cx+w0/2},${y0} ${cx+w1/2},${y1} ${cx-w1/2},${y1}`;
    out+=`<polygon points="${pts}" fill="${tiers[i].color}" stroke="#fff" stroke-width="1.5"/>`;
    out+=txt(cx,(y0+y1)/2-1,tiers[i].label,{s:11,c:'#fff',a:'middle',w:'bold'});
    if(tiers[i].sub) out+=txt(cx,(y0+y1)/2+12,tiers[i].sub,{s:8,c:'#fff',a:'middle'});
  }
  return S(`<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${INK}"/></marker></defs>`+out);
}
function loop(nodes){ // nodes around a circle
  const cx=230,cy=150,r=92,n=nodes.length;let out="";
  out+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${LINE}" stroke-width="2" stroke-dasharray="3 6"/>`;
  for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n;const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
    out+=`<circle cx="${x}" cy="${y}" r="26" fill="${i%2?RED:INK}"/>`;
    out+=txt(x,y+4,String(i+1),{s:13,c:'#fff',a:'middle',w:'bold'});
    const lx=cx+(r+44)*Math.cos(a),ly=cy+(r+44)*Math.sin(a);
    out+=txt(lx,ly+4,nodes[i],{s:10,c:INK,a:'middle',w:'bold'});
    const a2=a+2*Math.PI/n*0.5;const ax=cx+r*Math.cos(a2),ay=cy+r*Math.sin(a2);
    out+=`<circle cx="${ax}" cy="${ay}" r="3" fill="${RED}"/>`;
  }
  return S(out);
}
function matrix(xl,xr,yb,yt,quad){ // quad: [TL,TR,BL,BR] {t,c}
  const x0=110,x1=400,y0=50,y1=240;const mx=(x0+x1)/2,my=(y0+y1)/2;let out="";
  out+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  out+=`<line x1="${mx}" y1="${y0}" x2="${mx}" y2="${y1}" stroke="${INK}" stroke-width="1"/>`;
  out+=`<line x1="${x0}" y1="${my}" x2="${x1}" y2="${my}" stroke="${INK}" stroke-width="1"/>`;
  const cells=[[x0,y0,mx,my],[mx,y0,x1,my],[x0,my,mx,y1],[mx,my,x1,y1]];
  const fills=['none',RED,'none',INK];const tc=[INK,'#fff',INK,'#fff'];
  quad.forEach((q,i)=>{const[a,b,c,d]=cells[i];if(q.c)out+=`<rect x="${a}" y="${b}" width="${c-a}" height="${d-b}" fill="${q.c}" opacity="${q.c==='none'?0:0.92}"/>`;
    out+=txt((a+c)/2,(b+d)/2,q.t,{s:10,c:q.c&&q.c!=='none'?'#fff':INK,a:'middle',w:'bold'});});
  out+=txt(x0,y1+18,xl,{s:9,c:GREY});out+=txt(x1,y1+18,xr,{s:9,c:GREY,a:'end'});
  out+=`<text x="${x0-8}" y="${y1}" font-size="9" fill="${GREY}" text-anchor="end" transform="rotate(-90 ${x0-8} ${y1})">${yb}</text>`;
  out+=`<text x="${x0-8}" y="${y0+8}" font-size="9" fill="${GREY}" text-anchor="start" transform="rotate(-90 ${x0-8} ${y0+8})">${yt}</text>`;
  return S(out);
}
function scurve(){
  let out=`<line x1="60" y1="250" x2="430" y2="250" stroke="${INK}" stroke-width="1.5"/><line x1="60" y1="250" x2="60" y2="40" stroke="${INK}" stroke-width="1.5"/>`;
  out+=`<path d="M70,240 C200,238 210,70 420,55" fill="none" stroke="${RED}" stroke-width="3"/>`;
  out+=`<path d="M70,240 C230,238 240,150 420,140" fill="none" stroke="${GREY}" stroke-width="2" stroke-dasharray="5 5"/>`;
  out+=txt(60,30,'performance',{s:9,c:GREY});out+=txt(430,268,'time',{s:9,c:GREY,a:'end'});
  out+=txt(360,48,'entrant',{s:10,c:RED,w:'bold'});out+=txt(360,135,'incumbent',{s:10,c:GREY,w:'bold'});
  return S(out);
}
function funnel(stages){ // stages top->bottom narrowing
  const n=stages.length,top=45,h=42,cx=230;let out="";
  for(let i=0;i<n;i++){const w0=300-(260*i/n),w1=300-(260*(i+1)/n),y0=top+i*h,y1=y0+h-8;
    out+=`<polygon points="${cx-w0/2},${y0} ${cx+w0/2},${y0} ${cx+w1/2},${y1} ${cx-w1/2},${y1}" fill="${i===n-1?RED:INK}" opacity="${0.45+0.55*i/n}"/>`;
    out+=txt(cx,(y0+y1)/2+4,stages[i],{s:10,c:'#fff',a:'middle',w:'bold'});}
  return S(out);
}
function bars(items){ // items:[{l,v}] v 0..1
  const x0=80,base=240,bw=46,gap=22,maxH=180;let out=`<line x1="${x0-15}" y1="${base}" x2="420" y2="${base}" stroke="${INK}" stroke-width="1.5"/>`;
  items.forEach((it,i)=>{const x=x0+i*(bw+gap),h=maxH*it.v;out+=`<rect x="${x}" y="${base-h}" width="${bw}" height="${h}" fill="${i%2?RED:INK}"/>`;
    out+=txt(x+bw/2,base+16,it.l,{s:9,c:GREY,a:'middle'});out+=txt(x+bw/2,base-h-6,it.t||'',{s:9,c:INK,a:'middle',w:'bold'});});
  return S(out);
}
function ladder(rungs){ // rungs bottom->top
  const n=rungs.length,x0=140,w=200,h=34,base=250;let out="";
  for(let i=0;i<n;i++){const y=base-(i+1)*h;out+=`<rect x="${x0}" y="${y}" width="${w}" height="${h-6}" fill="${i===n-1?RED:'#fff'}" stroke="${INK}" stroke-width="1.5"/>`;
    out+=txt(x0+w/2,y+(h-6)/2+4,rungs[i],{s:10,c:i===n-1?'#fff':INK,a:'middle',w:'bold'});}
  out+=`<path d="M${x0-20},${base} L${x0+w+20},${base-n*h}" stroke="${GREY}" stroke-width="1" stroke-dasharray="4 4"/>`;
  return S(out);
}
function frontier(){
  let out=`<line x1="70" y1="250" x2="430" y2="250" stroke="${INK}" stroke-width="1.5"/><line x1="70" y1="250" x2="70" y2="40" stroke="${INK}" stroke-width="1.5"/>`;
  out+=`<path d="M75,245 Q110,80 420,60" fill="none" stroke="${RED}" stroke-width="3"/>`;
  out+=`<circle cx="200" cy="120" r="5" fill="${INK}"/><circle cx="300" cy="80" r="5" fill="${INK}"/>`;
  out+=txt(60,30,'return',{s:9,c:GREY});out+=txt(430,268,'risk',{s:9,c:GREY,a:'end'});out+=txt(330,52,'efficient frontier',{s:10,c:RED,w:'bold',a:'end'});
  return S(out);
}
function nodes(){ // network
  const pts=[[120,90],[330,70],[230,160],[150,230],[340,210]];let out="";
  const E=[[0,2],[1,2],[2,3],[2,4],[0,1],[3,4]];
  E.forEach(([a,b])=>out+=`<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="${LINE}" stroke-width="1.5"/>`);
  pts.forEach((p,i)=>out+=`<circle cx="${p[0]}" cy="${p[1]}" r="${i===2?20:14}" fill="${i===2?RED:INK}"/>`);
  return S(out);
}
function iceberg(){
  let out=`<line x1="40" y1="150" x2="420" y2="150" stroke="${RED}" stroke-width="2" stroke-dasharray="6 4"/>`;
  out+=txt(48,144,'visible cost (licence)',{s:9,c:GREY});
  out+=`<polygon points="230,55 300,150 160,150" fill="${PINK}"/>`;
  out+=`<polygon points="160,150 300,150 350,255 110,255" fill="${INK}"/>`;
  out+=txt(230,120,'fee',{s:11,c:INK,a:'middle',w:'bold'});
  out+=txt(230,185,'integration',{s:10,c:'#fff',a:'middle'});out+=txt(230,205,'data · talent',{s:10,c:'#fff',a:'middle'});
  out+=txt(230,225,'risk · monitoring',{s:10,c:'#fff',a:'middle'});
  return S(out);
}
function waterfall(){
  const base=240,x0=70,bw=44,gap=10;const vals=[1,-0.25,-0.2,-0.15,0.4];let out=`<line x1="55" y1="${base}" x2="430" y2="${base}" stroke="${INK}" stroke-width="1.2"/>`;
  let run=0;vals.forEach((v,i)=>{const x=x0+i*(bw+gap);const h=Math.abs(v)*150;const y=base-(run+ (v>0?v:0))*150 - (v>0?0:0);
    const top=base-(run+Math.max(v,0))*150;out+=`<rect x="${x}" y="${top}" width="${bw}" height="${Math.abs(v)*150}" fill="${i===0?INK:(v<0?RED:GREEN)}"/>`;run+=v;});
  out+=txt(70,base+16,'licence',{s:8,c:GREY});out+=txt(380,base+16,'true cost',{s:8,c:GREY});
  return S(out);
}

// ---- specific bespoke diagrams (selected high-value frameworks) ----
const SPECIFIC = {
 "DIKW Pyramid": ()=>pyramid([{label:'WISDOM',sub:'why / judgment',color:RED2},{label:'KNOWLEDGE',sub:'how',color:RED},{label:'INFORMATION',sub:'who/what/where',color:AMBER},{label:'DATA',sub:'raw signals',color:GREEN}]),
 "OODA Loop": ()=>loop(['Observe','Orient','Decide','Act']),
 "FinOps Loop": ()=>loop(['Inform','Optimise','Operate']),
 "Engagement Flywheel": ()=>loop(['Attract','Engage','Delight']),
 "Growth Loop": ()=>loop(['Acquire','Activate','Refer']),
 "Flywheel Model": ()=>loop(['Invest','Grow','Compound']),
 "Sense-Respond Loop": ()=>loop(['Sense','Interpret','Respond']),
 "Human-in-the-Loop Feedback": ()=>loop(['Output','Review','Correct','Learn']),
 "Compute Cost Pyramid": ()=>pyramid([{label:'TRAINING',sub:'rare, huge',color:RED2},{label:'FINE-TUNE',sub:'periodic',color:RED},{label:'INFERENCE',sub:'continuous, scales',color:AMBER}]),
 "Brand Pyramid": ()=>pyramid([{label:'PURPOSE',sub:'why we exist',color:RED2},{label:'STORY',sub:'aspiration',color:RED},{label:'TRUTHS',sub:'values',color:AMBER},{label:'OFFERING',sub:'what we sell',color:GREEN}]),
 "AI Value Stack": ()=>pyramid([{label:'APPLICATIONS',sub:'',color:RED2},{label:'MODELS',sub:'',color:RED},{label:'CLOUD',sub:'',color:AMBER},{label:'SEMICONDUCTORS',sub:'',color:GREEN}]),
 "Alt-Data Pyramid": ()=>pyramid([{label:'ALPHA SIGNAL',sub:'',color:RED2},{label:'PROCESSED DATA',sub:'',color:RED},{label:'RAW ALT-DATA',sub:'satellite·card·web',color:AMBER}]),
 "Embedded vs. AI-Native 2×2": ()=>matrix('low AI depth','high AI depth','bolt-on','built-in',[{t:'Embedded add-on',c:'none'},{t:'AI-native',c:RED},{t:'Legacy',c:'none'},{t:'Augmented',c:'none'}]),
 "Private · Hybrid · Hyperscaler 2×2": ()=>matrix('low control','high control','low cost','high cost',[{t:'Hyperscaler',c:'none'},{t:'Private',c:RED},{t:'Public mix',c:'none'},{t:'Hybrid',c:'none'}]),
 "Open vs. Proprietary LLM 2×2": ()=>matrix('less capable','more capable','more control','less control',[{t:'Open / self-host',c:RED},{t:'Frontier API',c:'none'},{t:'Small open',c:'none'},{t:'Hosted open',c:'none'}]),
 "Build vs. Buy 2×2": ()=>matrix('commodity','strategic','low capability','high capability',[{t:'Buy',c:'none'},{t:'Build',c:RED},{t:'Buy',c:'none'},{t:'Partner',c:'none'}]),
 "Vertical vs. Platform 2×2": ()=>matrix('narrow','broad','shallow','deep',[{t:'Vertical AI',c:RED},{t:'Platform AI',c:INK},{t:'Point tool',c:'none'},{t:'Suite',c:'none'}]),
 "Defensibility Matrix": ()=>matrix('low differentiation','high differentiation','low switching cost','high switching cost',[{t:'Commodity',c:'none'},{t:'Feature',c:'none'},{t:'Sticky',c:'none'},{t:'Moat',c:RED}]),
 "Automation Potential Grid": ()=>matrix('low value','high value','low automatability','high automatability',[{t:'Ignore',c:'none'},{t:'Augment',c:'none'},{t:'Quick win',c:'none'},{t:'Automate',c:RED}]),
 "AI Use-Case Portfolio": ()=>matrix('low value','high value','low effort','high effort',[{t:'Fill-in',c:'none'},{t:'Strategic bet',c:RED},{t:'Quick win',c:GREEN},{t:'Avoid',c:'none'}]),
 "Function Benefit Matrix": ()=>matrix('low impact','high impact','cost','revenue',[{t:'HR',c:'none'},{t:'Marketing',c:RED},{t:'Finance',c:'none'},{t:'Operations',c:'none'}]),
 "Rebrand Decision Matrix": ()=>matrix('low change','high change','equity intact','equity eroded',[{t:'Refresh',c:'none'},{t:'Reposition',c:RED},{t:'Hold',c:'none'},{t:'Rebuild',c:INK}]),
 "Risk-Profiling Matrix": ()=>matrix('low capacity','high capacity','low tolerance','high tolerance',[{t:'Conservative',c:'none'},{t:'Balanced',c:'none'},{t:'Cautious',c:'none'},{t:'Aggressive',c:RED}]),
 "AI Risk Register": ()=>matrix('low likelihood','high likelihood','low impact','high impact',[{t:'Monitor',c:'none'},{t:'Manage',c:AMBER},{t:'Accept',c:'none'},{t:'Mitigate now',c:RED}]),
 "Diffusion S-Curve": ()=>scurve(),
 "Disruption S-Curves": ()=>scurve(),
 "Disruption Vulnerability Audit": ()=>scurve(),
 "Innovator's Dilemma": ()=>scurve(),
 "Productivity J-Curve": ()=>{let o=`<line x1="60" y1="250" x2="430" y2="250" stroke="${INK}" stroke-width="1.5"/><line x1="60" y1="250" x2="60" y2="40" stroke="${INK}" stroke-width="1.5"/>`;o+=`<path d="M70,150 C120,250 180,250 250,180 C320,110 380,70 420,55" fill="none" stroke="${RED}" stroke-width="3"/>`;o+=txt(60,30,'measured productivity',{s:9,c:GREY});o+=txt(430,268,'time / investment',{s:9,c:GREY,a:'end'});o+=txt(150,235,'the dip',{s:10,c:RED2,w:'bold'});o+=txt(380,48,'payoff',{s:10,c:GREEN,w:'bold',a:'end'});return S(o);},
 "Cost-to-Serve Curve": ()=>{let o=`<line x1="60" y1="250" x2="430" y2="250" stroke="${INK}" stroke-width="1.5"/><line x1="60" y1="250" x2="60" y2="40" stroke="${INK}" stroke-width="1.5"/>`;o+=`<path d="M70,70 C160,90 260,210 420,235" fill="none" stroke="${RED}" stroke-width="3"/>`;o+=txt(60,30,'unit cost',{s:9,c:GREY});o+=txt(430,268,'volume automated',{s:9,c:GREY,a:'end'});return S(o);},
 "Latency-Cost Frontier": ()=>frontier(),
 "Execution Cost Frontier": ()=>frontier(),
 "Efficient frontier": ()=>frontier(),
 "Modern Portfolio Theory": ()=>frontier(),
 "Privacy-Value Frontier": ()=>frontier(),
 "Intangible Capital Iceberg": ()=>iceberg(),
 "Total Cost of AI Ownership": ()=>iceberg(),
 "Cloud Cost Waterfall": ()=>waterfall(),
 "AI Failure Funnel": ()=>funnel(['Idea','Pilot','Integration','Production']),
 "Trend → Opportunity Funnel": ()=>funnel(['Signal','Trend','Concept','Validated bet']),
 "TAM-SAM-SOM Funnel": ()=>funnel(['TAM','SAM','SOM']),
 "Pirate Metrics (AARRR)": ()=>funnel(['Acquisition','Activation','Retention','Revenue']),
 "The Scaling Funnel": ()=>funnel(['Seed','Series A','Scale','Survivor']),
 "Personalisation Ladder": ()=>ladder(['Segment','Recommend','Predict','1-to-1']),
 "Data Readiness Ladder": ()=>ladder(['Band D','Band C','Band B','Band A']),
 "MLOps Maturity Ladder": ()=>ladder(['Ad hoc','Repeatable','Automated','Self-healing']),
 "AI Maturity Staircase": ()=>ladder(['Ad hoc','Experimental','Operational','Transformational']),
 "Wrapper vs. Moat Ladder": ()=>ladder(['Wrapper','Workflow','Data','Moat']),
 "Data Moat Strength": ()=>ladder(['Public','Shared','Unique','Compounding']),
 "Three Horizons": ()=>{let o=`<line x1="60" y1="250" x2="430" y2="250" stroke="${INK}" stroke-width="1.5"/><line x1="60" y1="250" x2="60" y2="40" stroke="${INK}" stroke-width="1.5"/>`;
   o+=`<path d="M70,240 C120,150 160,120 230,120" fill="none" stroke="${GREEN}" stroke-width="2.5"/>`;
   o+=`<path d="M120,245 C200,220 230,160 320,150" fill="none" stroke="${AMBER}" stroke-width="2.5"/>`;
   o+=`<path d="M200,248 C300,240 340,180 420,150" fill="none" stroke="${RED}" stroke-width="2.5"/>`;
   o+=txt(150,110,'H1 core',{s:9,c:GREEN,w:'bold'});o+=txt(300,140,'H2 emerging',{s:9,c:AMBER,w:'bold'});o+=txt(360,140,'H3 future',{s:9,c:RED,w:'bold',a:'end'});return S(o);},
 "Demand-Signal Radar": ()=>{const cx=230,cy=150;let o=`<circle cx="${cx}" cy="${cy}" r="95" fill="none" stroke="${LINE}"/><circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="${LINE}"/><circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="${LINE}"/>`;
   o+=`<polygon points="${cx},55 ${cx+80},170 ${cx-60},190" fill="${RED}" opacity="0.5" stroke="${RED}" stroke-width="1.5"/>`;
   for(let i=0;i<6;i++){const a=i*Math.PI/3;o+=`<line x1="${cx}" y1="${cy}" x2="${cx+95*Math.cos(a)}" y2="${cy+95*Math.sin(a)}" stroke="${LINE}"/>`;}return S(o);},
 "Black Swan Radar": ()=>{const cx=230,cy=150;let o=`<circle cx="${cx}" cy="${cy}" r="95" fill="none" stroke="${LINE}"/><circle cx="${cx}" cy="${cy}" r="50" fill="none" stroke="${LINE}"/>`;
   o+=`<circle cx="${cx+70}" cy="${cy-55}" r="9" fill="${RED}"/>`;o+=txt(cx+70,cy-68,'tail event',{s:9,c:RED2,a:'middle',w:'bold'});
   o+=`<line x1="${cx}" y1="${cy}" x2="${cx+70}" y2="${cy-55}" stroke="${RED}" stroke-width="1.5"/>`;return S(o);},
 "Brand Equity Bridge": ()=>{let o="";o+=`<rect x="60" y="120" width="90" height="80" fill="${INK}"/>`;o+=txt(105,165,'old',{s:11,c:'#fff',a:'middle',w:'bold'});
   o+=`<rect x="310" y="120" width="90" height="80" fill="${RED}"/>`;o+=txt(355,165,'new',{s:11,c:'#fff',a:'middle',w:'bold'});
   o+=`<path d="M150,140 C220,90 240,90 310,140" fill="none" stroke="${AMBER}" stroke-width="3"/>`;o+=txt(230,95,'equity carried across',{s:9,c:GREY,a:'middle'});return S(o);},
 "12 Brand Archetypes": ()=>{const cx=230,cy=150,r=95;let o=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${LINE}" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="40" fill="${BG}" stroke="${LINE}"/>`;
   for(let i=0;i<12;i++){const a=i*Math.PI/6;o+=`<line x1="${cx+40*Math.cos(a)}" y1="${cy+40*Math.sin(a)}" x2="${cx+r*Math.cos(a)}" y2="${cy+r*Math.sin(a)}" stroke="${LINE}"/>`;
     o+=`<circle cx="${cx+r*Math.cos(a)}" cy="${cy+r*Math.sin(a)}" r="6" fill="${i%2?RED:INK}"/>`;}o+=txt(cx,cy+4,'12 types',{s:10,c:INK,a:'middle',w:'bold'});return S(o);},
 "StoryBrand Framework": ()=>{const y=150;let o=`<line x1="50" y1="${y}" x2="410" y2="${y}" stroke="${LINE}" stroke-width="2"/>`;const labs=['Hero','Problem','Guide','Plan','Action','Success'];
   labs.forEach((l,i)=>{const x=60+i*68;o+=`<circle cx="${x}" cy="${y}" r="12" fill="${i===5?GREEN:(i===2?RED:INK)}"/>`;o+=txt(x,y+(i%2?-22:30),l,{s:9,c:INK,a:'middle',w:'bold'});});return S(o);},
 "CAC : LTV Ratio": ()=>bars([{l:'CAC',v:0.35,t:'1×'},{l:'LTV',v:0.95,t:'3×+'}]),
 "Rule of 40": ()=>bars([{l:'growth',v:0.55,t:'25%'},{l:'margin',v:0.4,t:'15%'},{l:'sum',v:0.9,t:'40'}]),
 "Net Revenue Retention": ()=>bars([{l:'churn',v:0.25,t:'−8'},{l:'base',v:0.7,t:'100'},{l:'expand',v:0.95,t:'+18'}]),
 "Function-Benefit Matrix": ()=>bars([{l:'mktg',v:0.8},{l:'ops',v:0.6},{l:'fin',v:0.4},{l:'hr',v:0.3}]),
 "Cynefin Framework": ()=>matrix('ordered','unordered','','',[{t:'Complicated',c:'none'},{t:'Complex',c:RED},{t:'Clear',c:'none'},{t:'Chaotic',c:INK}]),
 "Data Network Effects": ()=>nodes(),
 "Network Effects Map": ()=>nodes(),
 "Hyperscaler Dependency Map": ()=>nodes(),
 "Data Gravity Map": ()=>nodes(),
 "White-Space Map": ()=>matrix('need A','need B','segment 1','segment 2',[{t:'Served',c:'none'},{t:'White space',c:RED},{t:'Served',c:'none'},{t:'Served',c:'none'}]),
};

// ---- type inference for fallback ----
function inferType(t){
  const s=t.toLowerCase();
  if(/pyramid|stack/.test(s))return"pyramid";
  if(/loop|flywheel|cycle|ooda/.test(s))return"loop";
  if(/2×2|2x2|matrix|grid|quadrant/.test(s))return"matrix";
  if(/s-curve|j-curve|curve|diffusion|dilemma/.test(s))return"scurve";
  if(/funnel/.test(s))return"funnel";
  if(/ladder|staircase|maturity|stages|horizons/.test(s))return"ladder";
  if(/frontier/.test(s))return"frontier";
  if(/map|network|effects|microstructure/.test(s))return"nodes";
  if(/radar/.test(s))return"radar";
  if(/ratio|metrics|accounting|cohort|retention|valuation|t2d3/.test(s))return"bars";
  return"generic";
}
function fallback(t){
  switch(inferType(t)){
    case"pyramid":return pyramid([{label:'TIER 1',color:RED2},{label:'TIER 2',color:RED},{label:'TIER 3',color:AMBER},{label:'BASE',color:GREEN}]);
    case"loop":return loop(['Step 1','Step 2','Step 3','Step 4']);
    case"matrix":return matrix('low','high','low','high',[{t:'',c:'none'},{t:'High-priority',c:RED},{t:'',c:'none'},{t:'',c:'none'}]);
    case"scurve":return scurve();
    case"funnel":return funnel(['Stage 1','Stage 2','Stage 3','Stage 4']);
    case"ladder":return ladder(['Level 1','Level 2','Level 3','Level 4']);
    case"frontier":return frontier();
    case"nodes":return nodes();
    case"radar":return SPECIFIC["Demand-Signal Radar"]();
    case"bars":return bars([{l:'A',v:0.5},{l:'B',v:0.8},{l:'C',v:0.35}]);
    default:{ // generic labelled block diagram
      let o=`<rect x="80" y="110" width="120" height="80" rx="8" fill="${INK}"/><rect x="260" y="110" width="120" height="80" rx="8" fill="${RED}"/>`;
      o+=`<line x1="200" y1="150" x2="260" y2="150" stroke="${GREY}" stroke-width="2" marker-end="url(#a2)"/>`;
      o+=txt(140,155,'input',{s:11,c:'#fff',a:'middle',w:'bold'});o+=txt(320,155,'outcome',{s:11,c:'#fff',a:'middle',w:'bold'});
      return S(`<defs><marker id="a2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${GREY}"/></marker></defs>`+o);
    }
  }
}
function diagramFor(title){ return (SPECIFIC[title]||(()=>fallback(title)))(); }

module.exports={diagramFor};
