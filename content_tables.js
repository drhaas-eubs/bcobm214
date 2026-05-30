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
module.exports={CASES,PREREAD,PREREF};
