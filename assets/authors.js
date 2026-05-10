/* BCOBM214 — Author Slibrary data (25 thinkers)
 * © 2026 Dr. Hildegard Haas · EU Business School
 *
 * Author Distilled pattern adapted from JD Meier's Thumbnail Thinking.
 * Core Message phrasing adapted from Kurt Bostellaar's Core Message Playbook.
 *
 * Each entry contains a compact inline SVG thumbnail. Replace these with
 * bespoke artwork at your convenience — the modal will pick up new SVGs
 * automatically.
 */

/* Reusable SVG factory — keeps the file compact while giving each author
 * a distinctive coloured panel + iconic geometry + name + discipline. */
function _svg(color, surname, discipline, glyph) {
  return (
    '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">' +
      '<rect x="0" y="0" width="220" height="120" fill="' + color + '"/>' +
      '<rect x="0" y="120" width="220" height="40" fill="#ffffff"/>' +
      '<line x1="0" y1="120" x2="220" y2="120" stroke="#0f1a17" stroke-opacity=".06"/>' +
      glyph +
      '<text x="110" y="142" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#0f1a17">' +
         surname.toUpperCase() + '</text>' +
      '<text x="110" y="154" text-anchor="middle" font-family="Arial" font-size="8" fill="#6b7c78">' +
         discipline + '</text>' +
    '</svg>'
  );
}
/* Glyph factories — small reusable iconic shapes drawn in the upper coloured panel */
var G = {
  wave:    '<path d="M 28 80 Q 60 40, 110 70 T 192 55" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>',
  curve:   '<path d="M 28 90 C 60 90, 70 35, 110 35 S 160 90, 192 90" fill="none" stroke="#fff" stroke-width="3.5"/>',
  loop:    '<circle cx="110" cy="60" r="32" fill="none" stroke="#fff" stroke-width="3.5"/><polygon points="142,60 132,55 132,65" fill="#fff"/>',
  rings:   '<circle cx="110" cy="60" r="38" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="110" cy="60" r="24" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="110" cy="60" r="10" fill="#fff"/>',
  pyramid: '<polygon points="110,28 64,90 156,90" fill="none" stroke="#fff" stroke-width="3"/><line x1="80" y1="68" x2="140" y2="68" stroke="#fff" stroke-width="1.5"/>',
  matrix:  '<rect x="60" y="30" width="100" height="60" fill="none" stroke="#fff" stroke-width="2.5"/><line x1="60" y1="60" x2="160" y2="60" stroke="#fff" stroke-width="2"/><line x1="110" y1="30" x2="110" y2="90" stroke="#fff" stroke-width="2"/>',
  stairs:  '<polyline points="40,90 70,90 70,75 100,75 100,60 130,60 130,45 160,45 160,30 180,30" fill="none" stroke="#fff" stroke-width="3"/>',
  diamond: '<polygon points="110,28 156,60 110,92 64,60" fill="none" stroke="#fff" stroke-width="3"/>',
  cards:   '<rect x="40" y="38" width="40" height="60" fill="none" stroke="#fff" stroke-width="2"/><rect x="90" y="38" width="40" height="60" fill="none" stroke="#fff" stroke-width="2"/><rect x="140" y="38" width="40" height="60" fill="none" stroke="#fff" stroke-width="2"/>',
  bridge:  '<path d="M 28 70 Q 110 25, 192 70" fill="none" stroke="#fff" stroke-width="3"/><line x1="40" y1="90" x2="180" y2="90" stroke="#fff" stroke-width="2"/>',
  tree:    '<polygon points="110,28 90,60 130,60" fill="none" stroke="#fff" stroke-width="2.5"/><polygon points="110,55 80,90 140,90" fill="none" stroke="#fff" stroke-width="2.5"/>',
  funnel:  '<polygon points="40,30 180,30 130,75 130,95 90,95 90,75" fill="none" stroke="#fff" stroke-width="2.5"/>',
  scales:  '<line x1="110" y1="30" x2="110" y2="90" stroke="#fff" stroke-width="2.5"/><line x1="60" y1="50" x2="160" y2="50" stroke="#fff" stroke-width="2.5"/><circle cx="60" cy="75" r="14" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="160" cy="75" r="14" fill="none" stroke="#fff" stroke-width="2.5"/>',
  star:    '<polygon points="110,30 122,60 154,60 128,80 138,110 110,92 82,110 92,80 66,60 98,60" fill="none" stroke="#fff" stroke-width="2"/>',
  arrow:   '<polyline points="40,80 80,80 80,55 130,55 130,80 170,80" fill="none" stroke="#fff" stroke-width="3"/><polygon points="170,72 184,80 170,88" fill="#fff"/>',
  text:    '<text x="110" y="78" text-anchor="middle" font-family="Arial" font-size="36" font-weight="700" fill="#fff">∮</text>'
};

window.BCOBM214_AUTHORS = [
  {
    id:"schumpeter", name:"Joseph Schumpeter", years:"1883–1950",
    role:"Austrian-American economist", discipline:"Economics of innovation",
    units:[1], frameworks:["F1 Creative Destruction"],
    why:"Reframed capitalism's core engine as continuous disruption by entrepreneurs introducing 'new combinations'. Without him, our entire vocabulary for thinking about disruption is missing.",
    foundation:"Innovation as the primary force of economic change. New combinations of products, methods, organisations and markets destroy yesterday's value to create greater value tomorrow.",
    operationalisation:"Diagnose whether a sector is in equilibrium (ripe for entry) or recently disrupted. Test if your venture genuinely introduces a new combination or only an incremental tweak.",
    limitations:"Descriptive, not predictive — cannot tell you which entrepreneur or technology will win. Romanticises destruction, glossing over its human costs.",
    enduring:"Every modern theory of disruption — from Christensen to platform economics — sits on Schumpeter's foundation. The phrase 'creative destruction' is now part of policy and boardroom vocabulary.",
    coreMessage:"We measure progress not by what we preserve but by what we replace.",
    sources:[
      "Schumpeter, J. A. (1942) Capitalism, Socialism and Democracy. Harper & Brothers.",
      "Schumpeter, J. A. (1934) The Theory of Economic Development. Harvard University Press."
    ],
    unitContext:"Anchors Unit 1's framing of the entrepreneur as economic disruptor.",
    thumbnailSvg: _svg("#155e4a","Schumpeter","Economics of Innovation",G.wave)
  },
  {
    id:"drucker", name:"Peter F. Drucker", years:"1909–2005",
    role:"Father of modern management", discipline:"Management discipline",
    units:[1,6], frameworks:["F3 Seven Sources","F45 Innovation vs Invention"],
    why:"Made entrepreneurship and innovation a discipline rather than a personality trait — and gave us the language to teach both.",
    foundation:"Innovation is purposeful, systematic and learnable. Most successful innovation comes not from genius flashes but from methodical search across seven well-known sources of opportunity.",
    operationalisation:"Scan the seven sources methodically. Distinguish invention from innovation by asking whether a willing customer pays. Apply Drucker's tests for innovation discipline.",
    limitations:"His new-knowledge source is the slowest and riskiest yet attracts the most attention. Drucker's frameworks are most useful for opportunity search, less so for execution.",
    enduring:"Drucker's books remain essential reading for every executive. His concepts — knowledge worker, MBO, theory of the business — are managerial common sense, but he had to invent them.",
    coreMessage:"We make innovation a daily discipline, not a once-in-a-decade miracle.",
    sources:[
      "Drucker, P. F. (1985) Innovation and Entrepreneurship. Harper & Row.",
      "Drucker, P. F. (1999) Management Challenges for the 21st Century. HarperBusiness."
    ],
    unitContext:"Anchors Unit 1 (entrepreneurship as discipline) and Unit 6 (corporate innovation).",
    thumbnailSvg: _svg("#155e4a","Drucker","Management Discipline",G.cards)
  },
  {
    id:"sarasvathy", name:"Saras D. Sarasvathy", years:"b. 1959",
    role:"Darden School of Business · UVA", discipline:"Effectuation theory",
    units:[1,10], frameworks:["F4 Effectuation","F80 Pilot-in-the-Plane"],
    why:"By interviewing 27 expert entrepreneurs, she empirically discovered the logic they actually use under uncertainty — overturning the prediction-and-planning paradigm of standard MBA training.",
    foundation:"Five principles describe how expert entrepreneurs decide: bird-in-hand, affordable loss, lemonade, crazy quilt, pilot-in-the-plane. Goals emerge from means, not the other way round.",
    operationalisation:"Inventory means before goals. Cap downside (affordable loss) before optimising upside. Treat surprise as material, not failure. Build with whoever commits, not whom you wished would.",
    limitations:"Effectuation works for genuine uncertainty. Once an opportunity is well-defined and forecasts are reliable, causal logic resumes its place.",
    enduring:"The single most important advance in entrepreneurship theory of the last 25 years. Reshapes how accelerators, incubators and universities now teach venture creation.",
    coreMessage:"We don't predict the future — we co-create it with whoever shows up willing to build.",
    sources:[
      "Sarasvathy, S. D. (2001) Causation and Effectuation. Academy of Management Review, 26(2).",
      "Read, S., Sarasvathy, S., Dew, N. & Wiltbank, R. (2017) Effectual Entrepreneurship. Routledge."
    ],
    unitContext:"Course pedagogical spine — Unit 1 framing and Unit 10 closing principle.",
    thumbnailSvg: _svg("#155e4a","Sarasvathy","Effectuation",G.rings)
  },
  {
    id:"sinek", name:"Simon Sinek", years:"b. 1973",
    role:"Author and speaker", discipline:"Leadership communication",
    units:[1], frameworks:["F5 Golden Circle"],
    why:"Distilled inspirational leadership into one of the most-shared models of the 21st century: people don't buy what you do, they buy why you do it.",
    foundation:"Three concentric circles — Why, How, What. Most communicate from outside in (what we do, then how, then why). Inspirational leaders communicate inside out — Why first.",
    operationalisation:"Articulate Why before How and What. Test whether the Why predates the business. Order all communication WHY → HOW → WHAT.",
    limitations:"Easy to fake — many 'whys' are post-hoc rationalisations. The model's popularity has produced a flood of synthetic Whys.",
    enduring:"Nearly every TED-style founder pitch deck of the past decade owes Sinek a citation. The Golden Circle is an instant teaching tool that survives the journey from boardroom to family business.",
    coreMessage:"We start with why — and let what and how follow honestly.",
    sources:[
      "Sinek, S. (2009) Start With Why. Portfolio.",
      "Sinek, S. (2017) Find Your Why. Portfolio."
    ],
    unitContext:"Unit 1 vision pitch — every student writes their own Golden Circle.",
    thumbnailSvg: _svg("#1e7a60","Sinek","Leadership Communication",G.rings)
  },
  {
    id:"collins", name:"Jim Collins", years:"b. 1958",
    role:"Stanford GSB / independent researcher", discipline:"Long-cycle company performance",
    units:[1,7], frameworks:["F6 BHAG","F52 Good to Great"],
    why:"Studied long-running outperformers (Built to Last, Good to Great) and produced the most empirically rigorous popular books on what makes companies great.",
    foundation:"Visionary companies set Big Hairy Audacious Goals. Great companies have Level 5 Leadership, get the right people on the bus first, find their Hedgehog Concept, and build a Flywheel of compounding actions.",
    operationalisation:"Articulate a BHAG with the four properties (clear, compelling, &gt;50% chance, energising). Audit leadership for Level 5. Find the Hedgehog (passion × best-at × economic engine).",
    limitations:"Selection bias: some of his 'great' companies later declined. The frameworks describe past success better than they predict future outperformance.",
    enduring:"His vocabulary — BHAG, Level 5, Hedgehog, Flywheel — is now part of the strategic conversation. His research method has been widely emulated.",
    coreMessage:"We pick goals so audacious they reorganise us — and then we keep showing up for the flywheel.",
    sources:[
      "Collins, J. & Porras, J. (1994) Built to Last. HarperBusiness.",
      "Collins, J. (2001) Good to Great. HarperBusiness."
    ],
    unitContext:"Unit 1 (BHAG / vision) and Unit 7 (great-companies analysis in growth case).",
    thumbnailSvg: _svg("#1e7a60","Collins","Long-cycle Performance",G.star)
  },
  {
    id:"hamel-prahalad", name:"Gary Hamel & C. K. Prahalad", years:"published 1989–1996",
    role:"Strategy scholars", discipline:"Strategic intent and core competencies",
    units:[1,7], frameworks:["F7 Strategic Intent","F56 Stretch & Leverage"],
    why:"Reframed strategy as ambition that deliberately exceeds resources, then leverages what exists to close the gap. Their HBR articles (1989, 1993) are still some of the most-cited strategy pieces ever.",
    foundation:"Strategic Intent is a stable obsession with leadership beyond current means. Stretch creates the obsession; Leverage closes the gap by concentrating, accumulating, complementing, conserving and recovering resources.",
    operationalisation:"Set ambition explicitly above current resources. Audit each resource for under-utilisation. Apply the five leverage modes to close the gap.",
    limitations:"Prolonged stretch without progress breeds cynicism. Stretch without leverage is just over-promising.",
    enduring:"Reframed how we think about resource allocation in fast-moving sectors. The vocabulary survives in every modern OKR / OGSM framework.",
    coreMessage:"We aim above what we own — then we leverage everything we have to close the gap.",
    sources:[
      "Hamel, G. & Prahalad, C. K. (1989) Strategic Intent. HBR May–June.",
      "Hamel, G. & Prahalad, C. K. (1993) Strategy as Stretch and Leverage. HBR Mar–Apr."
    ],
    unitContext:"Unit 1 (strategic intent in vision) and Unit 7 (growth resource leverage).",
    thumbnailSvg: _svg("#1e7a60","Hamel & Prahalad","Strategic Intent",G.arrow)
  },
  {
    id:"ries", name:"Eric Ries", years:"b. 1978",
    role:"Author / entrepreneur", discipline:"Startup methodology",
    units:[2,10], frameworks:["F9 MVP Loop","F77 Build-Measure-Learn (recap)"],
    why:"Distilled a generation of Silicon Valley experience into a teachable method: a startup is not a small big-company; it is an organisation searching for a repeatable business model under conditions of extreme uncertainty.",
    foundation:"Build → Measure → Learn. The fundamental activity of a startup is validated learning. Minimum Viable Products are not low-quality; they are the smallest possible vehicle for learning.",
    operationalisation:"Identify the riskiest assumption. Design the smallest experiment. Build the minimum product. Measure customer behaviour, not opinion. Decide: persevere, pivot or kill.",
    limitations:"MVP can be invoked as an excuse for low-quality work. The discipline is in the learning, not the smallness.",
    enduring:"Every accelerator and incubator now teaches Build-Measure-Learn. The vocabulary — MVP, pivot, validated learning — has crossed into mainstream business language.",
    coreMessage:"We build the smallest thing that lets a customer surprise us.",
    sources:[
      "Ries, E. (2011) The Lean Startup. Crown.",
      "Ries, E. (2017) The Startup Way. Currency."
    ],
    unitContext:"Unit 2 (MVP and idea triage) and Unit 10 (capstone — plan as hypothesis).",
    thumbnailSvg: _svg("#2d9377","Ries","Lean Startup",G.loop)
  },
  {
    id:"blank", name:"Steve Blank", years:"b. 1953",
    role:"Stanford / Berkeley adjunct · entrepreneur", discipline:"Customer development",
    units:[2], frameworks:["F10 Customer Development"],
    why:"While product development happens inside the building, Blank insisted that customer development must happen outside it — and built the methodology that the modern Lean Startup is built on.",
    foundation:"Four-step process: Customer Discovery → Customer Validation → Customer Creation → Company Building. Run parallel to product development from day one.",
    operationalisation:"Phase 1: dozens of discovery interviews to find the problem. Phase 2: sell to early adopters to validate willingness to pay. Phase 3: scale demand creation. Phase 4: build operations.",
    limitations:"Highly time-intensive. Many founders skip Phase 1 to their cost.",
    enduring:"The intellectual parent of Lean Startup. His book The Four Steps to the Epiphany is the unsung classic of the methodology movement.",
    coreMessage:"We get out of the building before we get out of the runway.",
    sources:[
      "Blank, S. (2005) The Four Steps to the Epiphany. K&S Ranch.",
      "Blank, S. & Dorf, B. (2012) The Startup Owner's Manual. K&S Ranch."
    ],
    unitContext:"Unit 2 customer development and Unit 3 customer discovery role play.",
    thumbnailSvg: _svg("#2d9377","Blank","Customer Development",G.arrow)
  },
  {
    id:"maurya", name:"Ash Maurya", years:"b. 1973",
    role:"Author / entrepreneur", discipline:"Lean canvas methodology",
    units:[2,4], frameworks:["F11 Lean Canvas","F26 Lean Canvas (applied)"],
    why:"Adapted the Business Model Canvas for early-stage startups, replacing partners and relationships with problem and unfair advantage — making it sharper for pre-product-market-fit ventures.",
    foundation:"A one-page business model focused on problem, solution, key metrics, channels, customer segments, value proposition, cost structure, revenue streams and unfair advantage.",
    operationalisation:"Fill the canvas in 20 minutes. Mark each box's confidence level. Identify the most uncertain box. Design experiments. Update weekly.",
    limitations:"As ventures mature, transition to the full Business Model Canvas. The Lean Canvas can encourage premature commitment to a single business model.",
    enduring:"Adopted by accelerators worldwide. Maurya's book Running Lean has become standard reading for early-stage founders.",
    coreMessage:"We fit the business on one page — so the team can argue about what's wrong.",
    sources:[
      "Maurya, A. (2012) Running Lean (2nd ed). O'Reilly.",
      "Maurya, A. (2016) Scaling Lean. Portfolio."
    ],
    unitContext:"Unit 2 (idea triage) and Unit 4 (strategy hackathon).",
    thumbnailSvg: _svg("#2d9377","Maurya","Lean Canvas",G.matrix)
  },
  {
    id:"christensen", name:"Clayton M. Christensen", years:"1952–2020",
    role:"Harvard Business School professor", discipline:"Disruption and JTBD theory",
    units:[2,3,5], frameworks:["F12 JTBD","F24 JTBD Map","F39 Innovator's Dilemma"],
    why:"Single most influential theorist of disruption and customer behaviour in the past generation. Reframed customer purchasing as 'hiring products to do jobs'.",
    foundation:"Disruption from below: rationally serving high-margin customers blinds incumbents to lower-end entrants. JTBD: customers don't buy products, they hire them to do functional, social and emotional jobs.",
    operationalisation:"Identify the moment a customer hires your product. Map the steps of their job. Find under-served stages. Diagnose your industry's vulnerability to disruption from below.",
    limitations:"Not all disruption comes from below; some is from new platforms or technologies. JTBD interviews surface stated jobs; the hired-for jobs are harder to find.",
    enduring:"Christensen's vocabulary — disruption, jobs-to-be-done — is now boardroom common sense. His work remains required reading for any senior executive role in established firms.",
    coreMessage:"We don't sell products; we get hired to do customers' real jobs.",
    sources:[
      "Christensen, C. M. (1997) The Innovator's Dilemma. Harvard Business Review Press.",
      "Christensen, C., Hall, T., Dillon, K. & Duncan, D. (2016) Competing Against Luck. HarperBusiness."
    ],
    unitContext:"Three frameworks across Units 2, 3 and 5 — JTBD discovery and disruption diagnosis.",
    thumbnailSvg: _svg("#2d9377","Christensen","Disruption Theory",G.curve)
  },
  {
    id:"moore", name:"Geoffrey A. Moore", years:"b. 1946",
    role:"Consultant / author", discipline:"High-tech go-to-market",
    units:[2,4], frameworks:["F15 Crossing the Chasm","F32 Bowling Alley"],
    why:"Identified the 'chasm' between early adopters and early majority that has killed countless tech startups — and gave us a sequencing model (the bowling alley) to cross it.",
    foundation:"Most high-tech failures occur not in early adoption but in the chasm between visionary buyers and pragmatist mainstream buyers. Crossing requires narrowing focus to a beachhead segment.",
    operationalisation:"Pick one beachhead segment. Build the 'whole product' for it. Dominate before expanding. Use beachhead reference customers to convert adjacent segments.",
    limitations:"Originally framed for tech products; translation to consumer or pure-service businesses requires adaptation.",
    enduring:"Crossing the Chasm is one of the most-cited go-to-market books of the past 30 years. The vocabulary survives every category and stage.",
    coreMessage:"We dominate one beachhead before we tackle two.",
    sources:[
      "Moore, G. A. (1991) Crossing the Chasm. HarperBusiness.",
      "Moore, G. A. (1995) Inside the Tornado. HarperBusiness."
    ],
    unitContext:"Unit 2 (lifecycle) and Unit 4 (go-to-market sequencing).",
    thumbnailSvg: _svg("#2d9377","Moore","High-tech Go-to-Market",G.bridge)
  },
  {
    id:"porter", name:"Michael E. Porter", years:"b. 1947",
    role:"Harvard Business School", discipline:"Competitive strategy",
    units:[3], frameworks:["F17 Five Forces"],
    why:"Most influential strategy thinker of the late 20th century. Five Forces and Generic Strategies remain the backbone of MBA strategy courses worldwide.",
    foundation:"Industry profitability is determined by five competitive forces: rivalry, buyers, suppliers, entrants, substitutes. Strategy is the art of finding or creating a position where the forces are weak.",
    operationalisation:"Score each force. Identify the most threatening. Design strategy to neutralise or sidestep it. Re-score annually.",
    limitations:"Static snapshot — doesn't capture how forces change. Less explanatory in fast-moving or platform-mediated industries.",
    enduring:"Five Forces is the most-recognised strategy framework on earth. Used in every MBA program, every major consulting firm, every IPO prospectus's 'industry overview' section.",
    coreMessage:"We choose where to compete by mapping where the profit lives.",
    sources:[
      "Porter, M. E. (1979) How Competitive Forces Shape Strategy. HBR Mar–Apr.",
      "Porter, M. E. (1980) Competitive Strategy. Free Press."
    ],
    unitContext:"Unit 3 — industry analysis as the foundation of opportunity sizing.",
    thumbnailSvg: _svg("#b8893a","Porter","Competitive Strategy",G.pyramid)
  },
  {
    id:"fitzpatrick", name:"Rob Fitzpatrick", years:"b. 1985",
    role:"Author / entrepreneur", discipline:"Customer interviewing",
    units:[3], frameworks:["F20 The Mom Test"],
    why:"Wrote the most-recommended short book on customer interviewing in startup land. Three rules that defeat the systematic dishonesty of standard interview techniques.",
    foundation:"Talk about their life, not your idea. Ask specifics about the past, not generics about the future. Talk less, listen more.",
    operationalisation:"Audit your script for leading questions. Ask about past behaviour. Ask for specifics. Notice and stop pitching.",
    limitations:"Useful for validating problems, less useful for testing solution preference (which requires actual product encounters).",
    enduring:"The Mom Test is the discovery interview canon for the post-Lean-Startup era. It survives because every founder needs it, repeatedly.",
    coreMessage:"We ask about your last week — not your imagined Tuesday.",
    sources:[
      "Fitzpatrick, R. (2013) The Mom Test. Founder Centric.",
      "Fitzpatrick, R. (2019) The Workshop Survival Guide. Founder Centric."
    ],
    unitContext:"Unit 3 customer discovery role play — every interview audited against Mom Test rules.",
    thumbnailSvg: _svg("#b8893a","Fitzpatrick","Discovery Interviewing",G.scales)
  },
  {
    id:"osterwalder", name:"Alexander Osterwalder & Yves Pigneur", years:"b. 1974",
    role:"Strategyzer", discipline:"Business model design",
    units:[3,4], frameworks:["F21 Value Proposition Canvas","F25 Business Model Canvas"],
    why:"Built the most widely-adopted business model design tools of the past 15 years. Their canvases sit on the wall of every accelerator and corporate innovation lab worldwide.",
    foundation:"A business model is a structured story about how an organisation creates, delivers and captures value. Nine building blocks make the whole thing visible at once.",
    operationalisation:"Fill all nine blocks. Identify weak ones. Design alternatives. Test the strongest. Pair with Value Proposition Canvas for product-market fit.",
    limitations:"A canvas is not a strategy — it's a vocabulary. Treat completion of the canvas as one milestone among many.",
    enduring:"Their PhD-thesis-turned-bestseller (Business Model Generation) sold over a million copies. The canvas vocabulary is now universal.",
    coreMessage:"We design the business model on one wall — and we redesign it together.",
    sources:[
      "Osterwalder, A. & Pigneur, Y. (2010) Business Model Generation. Wiley.",
      "Osterwalder, A. et al. (2014) Value Proposition Design. Wiley."
    ],
    unitContext:"Unit 3 (VPC for opportunity) and Unit 4 (BMC for the plan).",
    thumbnailSvg: _svg("#b8893a","Osterwalder","Business Model Design",G.cards)
  },
  {
    id:"kim-mauborgne", name:"W. Chan Kim & Renée Mauborgne", years:"published 2005–2017",
    role:"INSEAD professors", discipline:"Blue Ocean Strategy",
    units:[3], frameworks:["F22 Four Actions Grid"],
    why:"Reframed strategy from beating competitors in red oceans to creating uncontested blue oceans. The most successful strategy book franchise of the 21st century.",
    foundation:"Four Actions: Eliminate, Reduce, Raise, Create. Combine to reconstruct value rather than compete on existing factors.",
    operationalisation:"List the industry's competing factors. Run each through the four actions. Synthesise into a new value curve. Test with target customers.",
    limitations:"The 'create' factor is hardest. Most attempted Blue Oceans are merely better Red Oceans.",
    enduring:"Blue Ocean is now used in policy, public sector strategy and non-profits, not just business. The vocabulary travels exceptionally well.",
    coreMessage:"We don't beat the competition — we make the competition irrelevant.",
    sources:[
      "Kim, W. C. & Mauborgne, R. (2005) Blue Ocean Strategy. HBR Press.",
      "Kim, W. C. & Mauborgne, R. (2017) Blue Ocean Shift. Hachette."
    ],
    unitContext:"Unit 3 — opportunity identification through value reconstruction.",
    thumbnailSvg: _svg("#b8893a","Kim & Mauborgne","Blue Ocean Strategy",G.matrix)
  },
  {
    id:"mintzberg", name:"Henry Mintzberg", years:"b. 1939",
    role:"McGill University", discipline:"Strategy and management thought",
    units:[4], frameworks:["F27 Five Ps of Strategy"],
    why:"The most respected critic of conventional strategic planning. His Five Ps reframed strategy not as one definition but as five compatible perspectives.",
    foundation:"Plan, Ploy, Pattern, Position, Perspective. Each captures part of what strategy actually is. Strategy is also as much emergent as deliberate.",
    operationalisation:"Use each P as a separate lens. Diagnose your current state across all five. Strengthen by alignment across them.",
    limitations:"Conceptual rather than operational. Pair with action-oriented frameworks for delivery.",
    enduring:"His 1994 book The Rise and Fall of Strategic Planning permanently shifted how strategy is taught and practised. The Five Ps remain a teaching staple.",
    coreMessage:"We hold five definitions of strategy at once — and align them deliberately.",
    sources:[
      "Mintzberg, H. (1987) The Strategy Concept I: Five Ps for Strategy. CMR 30(1).",
      "Mintzberg, H. (1994) The Rise and Fall of Strategic Planning. Free Press."
    ],
    unitContext:"Unit 4 — strategy vocabulary in business planning.",
    thumbnailSvg: _svg("#b8893a","Mintzberg","Strategy Thought",G.diamond)
  },
  {
    id:"sahlman", name:"William A. Sahlman", years:"b. 1951",
    role:"Harvard Business School", discipline:"Entrepreneurial finance",
    units:[5,10], frameworks:["F33 Great Business Plan Frame","F73 Sahlman Frame (applied)"],
    why:"Wrote the canonical HBR article on writing great business plans. His People-Opportunity-Context-Risk frame is the investor's mental checklist.",
    foundation:"Investors read for four things: People (who is doing this?), Opportunity (is this market real?), Context (timing, regulation, capital climate?) and Risk-Reward profile. Plans that address all four cleanly get attention.",
    operationalisation:"Structure the plan around the four headings. Strengthen the weakest. Stress-test risk. Be honest about reward upside cases.",
    limitations:"Investor-centric. Operational planning needs additional frameworks.",
    enduring:"His HBR piece (1997) remains the most-recommended short reading for any business plan workshop. Used in EUBS, HBS, Stanford and beyond.",
    coreMessage:"We answer the four questions every investor asks — and we answer them honestly.",
    sources:[
      "Sahlman, W. A. (1997) How to Write a Great Business Plan. HBR Jul–Aug.",
      "Sahlman, W. A., Stevenson, H. H., Roberts, M. J. & Bhide, A. (1999) The Entrepreneurial Venture. HBS Press."
    ],
    unitContext:"Unit 5 (plan architecture) and Unit 10 (capstone evaluation).",
    thumbnailSvg: _svg("#7a5a14","Sahlman","Entrepreneurial Finance",G.scales)
  },
  {
    id:"pinchot", name:"Gifford Pinchot III", years:"b. 1942",
    role:"Author / entrepreneur educator", discipline:"Intrapreneurship",
    units:[6], frameworks:["F41 10 Commandments of Intrapreneurship"],
    why:"Coined the word 'intrapreneuring' and made the case that entrepreneurs inside corporations face different obstacles than independent founders — and named the specific behaviours that overcome them.",
    foundation:"Ten commandments for the corporate innovator. The obstacles are political. The remedy is a set of culturally counter-orthodox behaviours, beginning with 'come to work willing to be fired.'",
    operationalisation:"Read the ten commandments with the team. Identify which are most violated in your firm. Build cultural rituals that enable them.",
    limitations:"Some commandments depend on firm culture — implementing them in cultures with strong hierarchical norms is non-trivial.",
    enduring:"His 1985 book Intrapreneuring named a movement. The vocabulary survives in every corporate-venture-studio mandate today.",
    coreMessage:"We act like founders inside the building — and we expect to be misunderstood.",
    sources:[
      "Pinchot, G. III (1985) Intrapreneuring. Harper & Row.",
      "Pinchot, G. III (1999) Intrapreneuring in Action. Berrett-Koehler."
    ],
    unitContext:"Unit 6 corporate innovation case conference.",
    thumbnailSvg: _svg("#7a5a14","Pinchot","Intrapreneurship",G.tree)
  },
  {
    id:"govindarajan", name:"Vijay Govindarajan", years:"b. 1949",
    role:"Tuck School of Business", discipline:"Strategic innovation",
    units:[6], frameworks:["F42 Three-Box Solution"],
    why:"Distilled how mature firms can sustain innovation through three concurrent activities — and named the cultural work of 'forgetting' that most strategy frameworks ignore.",
    foundation:"Box 1: manage the present. Box 2: selectively forget the past. Box 3: create the future. All three concurrently. Most firms over-invest in Box 1 and avoid Box 2.",
    operationalisation:"Calculate spend per box. Diagnose Box 2 forgetting debt. Set Box 3 ambitions explicitly. Rebalance.",
    limitations:"The 'forgetting' work is culturally hardest, often blocked by sunk-cost thinking.",
    enduring:"His Three-Box Solution sits on every corporate innovation portfolio review I've seen since 2016.",
    coreMessage:"We manage today, forget yesterday and create tomorrow — at the same time.",
    sources:[
      "Govindarajan, V. (2016) The Three-Box Solution. HBR Press.",
      "Govindarajan, V. & Trimble, C. (2010) The Other Side of Innovation. HBR Press."
    ],
    unitContext:"Unit 6 case conference on intrapreneurship.",
    thumbnailSvg: _svg("#7a5a14","Govindarajan","Strategic Innovation",G.cards)
  },
  {
    id:"sorensen", name:"Hans Eibe Sørensen", years:"b. 1971",
    role:"University of Southern Denmark", discipline:"Business development",
    units:[6], frameworks:["F46 Market-Oriented BD"],
    why:"Author of the only major academic textbook explicitly on business development — adopted by EUBS as a foundational reference for this course.",
    foundation:"BD is the cross-functional discipline of integrating market insight into strategic and operational decisions. It is neither marketing nor sales nor pure strategy.",
    operationalisation:"Map current BD activities. Audit for market-orientation. Build feedback loops from operations to strategy. Establish BD as a boundary-spanner role.",
    limitations:"BD scope varies enormously between firms; definitional clarity is itself the work.",
    enduring:"His 2012 textbook is the EUBS recommended reading for this course. The market-oriented framing is foundational.",
    coreMessage:"We turn customer truth into strategic decisions — daily.",
    sources:[
      "Sørensen, H. E. (2012) Business Development: A Market-Oriented Perspective. Wiley."
    ],
    unitContext:"Unit 6 corporate BD framing.",
    thumbnailSvg: _svg("#7a5a14","Sørensen","Business Development",G.arrow)
  },
  {
    id:"greiner", name:"Larry E. Greiner", years:"1933–2013",
    role:"USC Marshall · ex-HBS", discipline:"Organisational growth",
    units:[7], frameworks:["F49 Greiner's Growth Curve"],
    why:"Identified the predictable pattern of growth phases and crises that all expanding organisations face — and gave managers a vocabulary for the 'why is this getting harder?' moment.",
    foundation:"Five growth phases (Creativity, Direction, Delegation, Coordination, Collaboration), each ending in a predictable crisis that forces structural transition.",
    operationalisation:"Identify current phase. Identify the looming crisis. Plan structural changes. Communicate the transition openly.",
    limitations:"Phase boundaries vary widely — useful as a diagnostic vocabulary, less so as a predictive timeline.",
    enduring:"His 1972 HBR article was reissued unchanged in 1998 — a rare honour. Still taught in every organisational growth module.",
    coreMessage:"We expect each crisis to come — and we change our shape before it breaks us.",
    sources:[
      "Greiner, L. E. (1972, revised 1998) Evolution and Revolution as Organizations Grow. HBR May–June."
    ],
    unitContext:"Unit 7 growth boardroom role play diagnostics.",
    thumbnailSvg: _svg("#3a5a2e","Greiner","Organisational Growth",G.stairs)
  },
  {
    id:"ansoff", name:"Igor Ansoff", years:"1918–2002",
    role:"Father of strategic management", discipline:"Strategic management",
    units:[7], frameworks:["F53 Ansoff Matrix"],
    why:"His 1957 HBR article first formalised growth strategy as a 2×2 of products and markets — the most-taught growth framework in management education.",
    foundation:"Four growth strategies: Market Penetration, Product Development, Market Development, Diversification. Risk increases clockwise.",
    operationalisation:"Plot current revenue across the four cells. Identify which cell to invest in next. Stress-test risk vs. return. Sequence moves.",
    limitations:"Diversification often fails for the same reason it's appealing — it's novel. Sequence cautiously.",
    enduring:"The Ansoff Matrix is taught in virtually every undergraduate management program globally. Used by consultants, founders and finance teams.",
    coreMessage:"We grow on one axis at a time before we try both.",
    sources:[
      "Ansoff, H. I. (1957) Strategies for Diversification. HBR Sep–Oct.",
      "Ansoff, H. I. (1965) Corporate Strategy. McGraw-Hill."
    ],
    unitContext:"Unit 7 growth strategy choice.",
    thumbnailSvg: _svg("#3a5a2e","Ansoff","Strategic Management",G.matrix)
  },
  {
    id:"mcgrath", name:"Rita McGrath", years:"b. 1959",
    role:"Columbia Business School", discipline:"Strategy under uncertainty",
    units:[7], frameworks:["F55 Discovery-Driven Growth"],
    why:"Reframed corporate planning under uncertainty: plan in reverse, surface assumptions, test the riskiest first. Gave us a hypothesis-driven alternative to traditional forecasting.",
    foundation:"Discovery-Driven Planning starts from desired outcomes and works backward to assumptions. Each plan becomes a list of testable hypotheses, not a forecast.",
    operationalisation:"State the desired financial outcome. Build a reverse income statement. List every assumption. Sequence experiments by riskiness.",
    limitations:"Requires comfort with uncertainty — many corporate cultures resist hypothesis-style plans.",
    enduring:"Now embedded in venture studio operating systems and corporate venture capital methodologies.",
    coreMessage:"We plan backwards from outcomes — and we test the riskiest assumptions first.",
    sources:[
      "McGrath, R. G. & MacMillan, I. C. (1995) Discovery-Driven Planning. HBR Jul–Aug.",
      "McGrath, R. G. & MacMillan, I. C. (2009) Discovery-Driven Growth. HBR Press."
    ],
    unitContext:"Unit 7 growth boardroom role play scenarios.",
    thumbnailSvg: _svg("#3a5a2e","McGrath","Strategy Under Uncertainty",G.funnel)
  },
  {
    id:"kawasaki", name:"Guy Kawasaki", years:"b. 1954",
    role:"Apple alum / venture investor", discipline:"Pitching and evangelism",
    units:[9], frameworks:["F65 10/20/30 Rule"],
    why:"Distilled investor-pitch best practice into a memorable rule that has saved a thousand audiences from death-by-bullet-points.",
    foundation:"10 slides, 20 minutes, 30-point minimum font. The constraint forces focus and prevents over-loading.",
    operationalisation:"Force yourself to 10 slides. Time yourself to 20 minutes. Increase fonts to 30+ pt — and watch how many bullets disappear.",
    limitations:"Specific to investor pitches. Not all presentations should be this constrained.",
    enduring:"Every accelerator, every Demo Day, every pitch coaching session uses 10/20/30 as a starting reference.",
    coreMessage:"We pitch in 10 slides — because anyone who needs more is hiding something.",
    sources:[
      "Kawasaki, G. (2003) The 10/20/30 Rule of PowerPoint. guykawasaki.com.",
      "Kawasaki, G. (2015) The Art of the Start 2.0. Portfolio."
    ],
    unitContext:"Unit 9 pitch craft studio.",
    thumbnailSvg: _svg("#0f1a17","Kawasaki","Pitching and Evangelism",G.text)
  },
  {
    id:"heath", name:"Chip & Dan Heath", years:"published 2007–2017",
    role:"Stanford / Duke", discipline:"Communication and behaviour change",
    units:[9], frameworks:["F67 SUCCESs"],
    why:"Synthesised decades of psychology and communication research into a memorable acronym for sticky messages — used now in pitch coaching, product naming and policy advocacy alike.",
    foundation:"Sticky ideas are Simple, Unexpected, Concrete, Credible, Emotional, and told as Stories.",
    operationalisation:"Audit your message against all six attributes. Strengthen the weakest. Replace abstractions with concrete details. Add story arcs.",
    limitations:"Sticky messages can be sticky for the wrong reasons (e.g., misleading). Use the framework with editorial integrity.",
    enduring:"Made to Stick is one of the most-recommended communication books of the past 20 years. SUCCESs survives in every modern pitch coaching curriculum.",
    coreMessage:"We make our message simple, unexpected, concrete, credible, emotional — and we tell it as a story.",
    sources:[
      "Heath, C. & Heath, D. (2007) Made to Stick. Random House.",
      "Heath, C. & Heath, D. (2017) The Power of Moments. Simon & Schuster."
    ],
    unitContext:"Unit 9 pitch design.",
    thumbnailSvg: _svg("#0f1a17","Heath","Communication & Stickiness",G.star)
  },
  {
    id:"kolb", name:"David A. Kolb", years:"b. 1939",
    role:"Case Western Reserve", discipline:"Experiential learning",
    units:[10], frameworks:["F79 Experiential Learning Cycle"],
    why:"His 1984 Experiential Learning theory is the pedagogical backbone of EU Business School's hands-on approach — and the spine of this course's session design.",
    foundation:"Concrete Experience → Reflective Observation → Abstract Conceptualisation → Active Experimentation. Learning happens when we cycle through all four. Skipping a stage produces incomplete learning.",
    operationalisation:"After each major experience, write a reflection. Generalise to a portable lesson. Design the next experiment. Loop.",
    limitations:"Different learners default to different stages — explicit cycling is the discipline.",
    enduring:"Experiential learning is now mainstream in business education. EU Business School's pedagogical philosophy is rooted in Kolb's cycle.",
    coreMessage:"We don't just experience — we reflect, we generalise, and we experiment again.",
    sources:[
      "Kolb, D. A. (1984) Experiential Learning. Prentice Hall.",
      "Kolb, D. A. (2014) Experiential Learning (2nd ed). Pearson."
    ],
    unitContext:"Pedagogical spine of the course — every session uses Kolb's cycle.",
    thumbnailSvg: _svg("#6b264c","Kolb","Experiential Learning",G.loop)
  }
];
