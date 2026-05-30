// Framework sheet content for BARBM312. Keyed by exact framework title.
// Each: {def, who, why, how, when, whom, innov, sources:[...]}.
// Related frameworks + slibrary/sheet numbering are computed in the builder.
// This file covers ALL 140; split across sheets_content*.js for editability.

const C = {};

// ============ UNIT 1 — AI, Data & Strategic Business Growth ============
C["DIKW Pyramid"]={
 def:"The DIKW Pyramid is a hierarchical model that arranges Data, Information, Knowledge and Wisdom in ascending order of context and value, showing how raw signals must be progressively interpreted before they can inform a decision.",
 who:"Popularised by Russell Ackoff in his 1989 address 'From Data to Wisdom', with roots traced to earlier information-science writing and an oft-cited stanza by T.S. Eliot.",
 why:"Ackoff argued that organisations were drowning in data while starving for understanding. The model was developed to make explicit the work required to convert data into the judgment on which action depends.",
 how:"Each customer signal is located on the pyramid and traced upward: is it raw data, structured information, actionable knowledge, or decision-ready wisdom? Gaps reveal where value is being lost.",
 when:"At the start of any data or analytics initiative, when scoping what an AI system must actually deliver, and when auditing why dashboards fail to change behaviour.",
 whom:"Data leaders, analytics teams, product managers and executives deciding what to instrument and what to ignore.",
 innov:"Compared with treating 'big data' as inherently valuable, DIKW reframes value as the climb toward judgment — clarifying that AI accelerates the lower rungs but rarely supplies wisdom by itself.",
 sources:["Ackoff, R.L. (1989) 'From data to wisdom', Journal of Applied Systems Analysis, 16, pp. 3–9.","Rowley, J. (2007) 'The wisdom hierarchy', Journal of Information Science, 33(2), pp. 163–180."]};

C["OODA Loop"]={
 def:"The OODA Loop is a four-stage decision cycle — Observe, Orient, Decide, Act — that models how an actor adapts to a changing environment by continuously re-cycling through the four stages faster than rivals.",
 who:"Developed by United States Air Force colonel and military strategist John Boyd in the 1970s–80s from his study of fighter-pilot decision-making and the dynamics of conflict.",
 why:"Boyd sought to explain why outnumbered pilots could prevail: not by superior force, but by completing the decision cycle faster, repeatedly disorienting the opponent.",
 how:"Map the four stages to a real decision process, then look for delays. AI typically compresses Observe and Orient; the discipline is to keep Decide and Act human and fast.",
 when:"In fast-moving competitive or operational contexts — pricing, fraud, content, incident response — where the speed of re-decision matters more than the size of any single decision.",
 whom:"Operations leaders, strategists, and anyone designing real-time or near-real-time AI decision systems.",
 innov:"Unlike linear plan-then-execute models, OODA is explicitly cyclical and adversarial, treating tempo itself as a source of advantage — a natural fit for AI-accelerated decision loops.",
 sources:["Boyd, J. (1986) 'Patterns of Conflict' (unpublished briefing).","Osinga, F. (2007) Science, Strategy and War: The Strategic Theory of John Boyd. London: Routledge."]};

C["Decision-Intelligence Stack"]={
 def:"The Decision-Intelligence Stack is a layered model that arranges raw signals, models, human judgment and action into a pipeline, making explicit each step required to turn data into a decision that creates business value.",
 who:"A practitioner synthesis associated with the emerging discipline of decision intelligence, drawing on Cassie Kozyrkov's framing of decision-making as an engineering problem.",
 why:"It was developed to counter the tendency to invest in models while neglecting the surrounding pipeline — the data feeding them and the human action that follows.",
 how:"Each layer is audited for fitness: are the signals trustworthy, the models appropriate, the judgment well-framed, and the action actually taken? The weakest layer caps the value of the whole.",
 when:"When designing or diagnosing an end-to-end AI decision system, especially where good models fail to produce business outcomes.",
 whom:"Product owners, data-science leads and executives responsible for AI return on investment.",
 innov:"It shifts attention from the model in isolation to the full decision pipeline, treating judgment and action as first-class components rather than afterthoughts.",
 sources:["Kozyrkov, C. (2019) 'Introduction to Decision Intelligence', Google Cloud.","Pratt, L. and Malcolm, N. (2022) The Decision Intelligence Handbook. Sebastopol: O'Reilly."]};

C["Data Value Chain"]={
 def:"The Data Value Chain describes the sequence of activities — capture, store, process, analyse and act — through which raw data is progressively transformed into business value, mirroring Porter's value-chain logic applied to data.",
 who:"Adapted from Michael Porter's value chain (1985) by data-management scholars and bodies such as the OECD, which formalised a data value cycle.",
 why:"It was developed to help organisations see data handling as a chain of value-adding steps rather than a cost centre, and to locate where value leaks.",
 how:"Each link is examined for cost, quality and value contribution; investment is directed to the link that most constrains the eventual decision.",
 when:"During data-strategy design, platform investment decisions, and when justifying data spend to finance.",
 whom:"Chief data officers, data engineers and finance partners assessing the return on data infrastructure.",
 innov:"By borrowing Porter's margin logic, it reframes data from a static asset to a flow whose value depends on the whole chain, not any single tool.",
 sources:["Porter, M.E. (1985) Competitive Advantage. New York: Free Press.","OECD (2015) Data-Driven Innovation: Big Data for Growth and Well-Being. Paris: OECD."]};

C["Insight-to-Action Gap"]={
 def:"The Insight-to-Action Gap is the recurring shortfall between the insights an organisation generates and the decisions or behaviours it actually changes — the distance between knowing and doing.",
 who:"Articulated by Jeffrey Pfeffer and Robert Sutton in The Knowing-Doing Gap (2000) and echoed across analytics-adoption research.",
 why:"Pfeffer and Sutton observed that firms accumulate knowledge yet fail to act on it; the concept names this failure so it can be managed rather than assumed away.",
 how:"Insights are tracked through to the decisions they were meant to change; where no behaviour shifts, the analysis is treated as waste and the cause diagnosed.",
 when:"When reviewing analytics or AI programmes that produce reports nobody acts on, and when designing for adoption rather than mere production of insight.",
 whom:"Analytics leaders, change managers and executives accountable for realising value from data.",
 innov:"It relocates the bottleneck from analysis to action, challenging the assumption that better insight automatically yields better outcomes.",
 sources:["Pfeffer, J. and Sutton, R.I. (2000) The Knowing-Doing Gap. Boston: HBS Press.","Davenport, T.H. (2013) 'Keep up with your quants', Harvard Business Review, 91(7)."]};

C["Customer Journey Map"]={
 def:"A Customer Journey Map is a visual representation of the end-to-end experience a customer has with an organisation, charting stages, touchpoints, emotions and pain points from first awareness through to advocacy.",
 who:"Rooted in service-design and design-thinking practice, popularised through the 2000s by consultancies and the work of design firms such as IDEO.",
 why:"It was developed to replace inside-out, org-chart thinking with an outside-in view that follows the customer across silos, surfacing breakdowns that no single department owns.",
 how:"Stages are laid along a timeline; at each, touchpoints, customer goals, emotions and friction are recorded. AI opportunities are mapped where data or personalisation could remove friction.",
 when:"During experience redesign, before personalisation initiatives, and when diagnosing churn or low conversion.",
 whom:"CX and marketing teams, service designers and product managers.",
 innov:"Unlike funnel metrics that aggregate behaviour, the journey map preserves the lived sequence and emotion, revealing where AI should intervene and where it should not.",
 sources:["Stickdorn, M. and Schneider, J. (2011) This Is Service Design Thinking. Amsterdam: BIS.","Richardson, A. (2010) 'Using customer journey maps to improve customer experience', Harvard Business Review."]};

C["Moments of Truth"]={
 def:"Moments of Truth are the brief, high-stakes interactions where a customer forms a decisive impression of a brand — points at which the relationship is won or lost in seconds.",
 who:"Coined by Jan Carlzon, former CEO of Scandinavian Airlines, in his 1987 book of the same name; later extended by Procter & Gamble and Google's 'Zero Moment of Truth'.",
 why:"Carlzon used the idea to refocus a struggling airline on the frontline encounters that customers actually remember, rather than internal process.",
 how:"The journey is scanned for the handful of interactions that disproportionately shape perception; resources and AI assistance are concentrated there.",
 when:"When prioritising limited CX investment, designing service recovery, and deciding where automation helps versus harms.",
 whom:"Service leaders, CX designers and frontline managers.",
 innov:"It directs attention away from uniform investment across all touchpoints toward the decisive few — a sharp prioritisation lens for AI-enabled service.",
 sources:["Carlzon, J. (1987) Moments of Truth. Cambridge: Ballinger.","Lecinski, J. (2011) Winning the Zero Moment of Truth. Google."]};

C["Engagement Flywheel"]={
 def:"The Engagement Flywheel is a cyclical model in which attracting, engaging and delighting customers feed one another, so that satisfied customers generate the energy that attracts the next cohort.",
 who:"Popularised by HubSpot (notably Brian Halligan) as a successor to the linear marketing funnel, drawing conceptually on Jim Collins's flywheel metaphor.",
 why:"It was developed to capture the compounding, self-reinforcing nature of modern customer growth, where word of mouth and retention drive acquisition.",
 how:"Each phase is measured for the force it adds and the friction it removes; investment targets whichever reduces friction most, accelerating the whole wheel.",
 when:"When designing growth strategy for products with strong referral or retention dynamics, and when moving beyond funnel thinking.",
 whom:"Growth, marketing and product leaders.",
 innov:"Unlike the funnel, which discards the customer at purchase, the flywheel treats existing customers as the primary engine of future growth.",
 sources:["Halligan, B. and Shah, D. (2018) 'The flywheel', HubSpot.","Collins, J. (2001) Good to Great. New York: HarperBusiness."]};

C["Personalisation Ladder"]={
 def:"The Personalisation Ladder is a maturity model describing increasing degrees of tailoring — from broad segmentation, through recommendation and prediction, to true one-to-one personalisation.",
 who:"A synthesis from CRM and marketing-technology practice, building on Peppers and Rogers's one-to-one marketing.",
 why:"It was developed to help firms locate their current personalisation maturity and avoid over-reaching into intrusive tailoring before the data and trust foundations exist.",
 how:"The organisation places its current capability on a rung and identifies the data, consent and modelling required to climb without eroding trust.",
 when:"When planning personalisation investment and when balancing relevance against the risk of 'creepy' targeting.",
 whom:"CX, CRM and data teams, and privacy or compliance partners.",
 innov:"It frames personalisation as a graduated capability with a trust ceiling, rather than a switch to be flipped on.",
 sources:["Peppers, D. and Rogers, M. (1993) The One to One Future. New York: Doubleday.","Arora, N. et al. (2008) 'Putting one-to-one marketing to work', Marketing Letters, 19."]};

C["Jobs To Be Done"]={
 def:"Jobs To Be Done (JTBD) is a theory holding that customers 'hire' products and services to make progress on a specific job in a particular circumstance, so innovation should target the job rather than the demographic.",
 who:"Developed by Clayton Christensen and colleagues (notably Bob Moesta and Tony Ulwick's related outcome-driven variant), articulated in Competing Against Luck (2016).",
 why:"Christensen argued that correlation-based segmentation misled innovators; framing demand as a job clarifies why customers switch and what would make them switch to you.",
 how:"The team identifies the functional, emotional and social job, the circumstances that trigger it, and the obstacles the current solution leaves unresolved.",
 when:"During product strategy, opportunity sensing and when AI features risk being built for activity rather than genuine customer progress.",
 whom:"Product, innovation and marketing leaders.",
 innov:"It replaces demographic and feature-led thinking with a causal account of demand, sharpening where AI should add value.",
 sources:["Christensen, C.M. et al. (2016) Competing Against Luck. New York: HarperBusiness.","Ulwick, A. (2005) What Customers Want. New York: McGraw-Hill."]};

C["Embedded vs. AI-Native 2×2"]={
 def:"The Embedded vs. AI-Native matrix contrasts products that bolt AI onto an existing architecture with those designed around AI from the ground up, mapping the depth of intelligence against the legacy of the underlying system.",
 who:"A contemporary strategy framing arising from the 2020s debate over how incumbents should respond to generative AI, discussed widely by venture and product strategists.",
 why:"It was developed to help leaders decide whether to retrofit AI into legacy products or rebuild, clarifying that the two paths change what decisions are even possible.",
 how:"A product is placed on the grid by AI depth and architectural legacy; the position implies a different investment, talent and risk profile.",
 when:"When setting product architecture strategy and prioritising modernisation versus rebuild.",
 whom:"Product and engineering leaders, CTOs and strategists.",
 innov:"It names a distinction obscured by generic 'AI adoption' talk: bolt-on intelligence lifts information quality, while AI-native design changes the product's possibility space.",
 sources:["Bornstein, M., Appenzeller, G. and Casado, M. (2023) 'Emerging architectures for LLM applications', a16z.","Furr, N. and Shipilov, A. (2019) 'Digital doesn't have to be disruptive', Harvard Business Review."]};

C["Build · Buy · Partner"]={
 def:"The Build–Buy–Partner framework structures the sourcing decision for a capability: develop it internally, purchase a finished solution, or collaborate with a partner, according to strategic value and internal capability.",
 who:"A long-standing corporate-strategy heuristic formalised in make-or-buy and transaction-cost economics, extended to alliances by scholars such as Williamson and later strategy texts.",
 why:"It was developed to discipline sourcing decisions that are often made by default, ensuring scarce build capacity is reserved for what is genuinely strategic.",
 how:"A capability is scored on strategic value and on internal capability; the resulting position recommends build, buy or partner, with AI components assessed the same way.",
 when:"When sourcing AI models, data or tooling, and when deciding what to own versus rent in the AI stack.",
 whom:"CTOs, procurement, and corporate-development teams.",
 innov:"Applied to AI, it clarifies that calling a commodity model is 'buy' while a proprietary data advantage is worth 'build' — preventing undifferentiated in-house effort.",
 sources:["Williamson, O.E. (1985) The Economic Institutions of Capitalism. New York: Free Press.","Capron, L. and Mitchell, W. (2012) Build, Borrow, or Buy. Boston: HBR Press."]};

C["Legacy Modernisation Curve"]={
 def:"The Legacy Modernisation Curve depicts the trade-off between continuing to optimise an existing system and rebuilding it, showing how returns to optimisation flatten while a rebuild offers a higher but riskier trajectory.",
 who:"A practitioner model from enterprise-architecture and digital-transformation practice, related to technical-debt and application-portfolio theory.",
 why:"It was developed to help organisations recognise when incremental improvement of a legacy estate has exhausted its returns and a step change is warranted.",
 how:"Current systems are plotted on the curve; diminishing optimisation returns are weighed against the cost, risk and upside of modernisation or AI-native rebuild.",
 when:"When deciding whether to layer AI onto legacy systems or re-platform, and during transformation planning.",
 whom:"Enterprise architects, CIOs and transformation leads.",
 innov:"It makes the optimise-versus-rebuild decision explicit and time-dependent, countering the inertia of perpetual incremental patching.",
 sources:["Gartner (2019) '7 Options to Modernize Legacy Systems'.","Ross, J.W., Weill, P. and Robertson, D. (2006) Enterprise Architecture as Strategy. Boston: HBR Press."]};

C["Value Proposition Canvas"]={
 def:"The Value Proposition Canvas is a tool that maps a customer profile — jobs, pains and gains — against a value map of products, pain relievers and gain creators, to test the fit between what is offered and what is needed.",
 who:"Created by Alexander Osterwalder, Yves Pigneur and colleagues at Strategyzer, building on the Business Model Canvas (2010) and detailed in Value Proposition Design (2014).",
 why:"It was developed to make the often-implicit logic of a value proposition explicit and testable, reducing the risk of building things customers do not want.",
 how:"The customer profile is completed first; the value map is then designed to relieve the most severe pains and create the most wanted gains, and fit is checked.",
 when:"During product design, opportunity validation and when shaping AI features around real customer jobs.",
 whom:"Product, innovation and marketing teams.",
 innov:"It operationalises Jobs To Be Done into a visual, testable fit between offer and need, widely adopted as a standard innovation tool.",
 sources:["Osterwalder, A. et al. (2014) Value Proposition Design. Hoboken: Wiley.","Osterwalder, A. and Pigneur, Y. (2010) Business Model Generation. Hoboken: Wiley."]};

C["Data Network Effects"]={
 def:"Data Network Effects describe a dynamic in which a product improves as more usage generates more data, which improves the product and attracts more users — a compounding, data-driven moat.",
 who:"Articulated by venture investors and platform scholars, notably Andrei Hagiu and Julian Wright, who cautioned that not all data improves products.",
 why:"The concept was developed to distinguish genuine, defensible data advantages from the loose claim that 'more data wins', which often fails to compound.",
 how:"The team tests whether additional data actually improves the product and whether that improvement is hard for rivals to replicate; only then is a data moat real.",
 when:"When assessing AI product defensibility and investor due diligence on data-based advantage.",
 whom:"Founders, product leaders and investors.",
 innov:"It refines the network-effects canon by isolating when data — not just users — creates compounding advantage, puncturing naïve 'big data' moats.",
 sources:["Hagiu, A. and Wright, J. (2020) 'When data creates competitive advantage', Harvard Business Review, 98(1).","Parker, G., Van Alstyne, M. and Choudary, S.P. (2016) Platform Revolution. New York: Norton."]};

C["White-Space Map"]={
 def:"A White-Space Map plots customer needs against served segments to expose unmet needs — the 'white space' between existing offerings where new value can be created.",
 who:"A strategy-and-innovation technique associated with growth strategy and with Mark Johnson's work on white space and business-model innovation.",
 why:"It was developed to direct innovation toward genuinely unserved demand rather than crowded, well-contested territory.",
 how:"Needs and segments are crossed in a grid; cells that are important to customers yet poorly served are flagged as white-space opportunities for AI-enabled offerings.",
 when:"During opportunity sensing, portfolio planning and market-entry decisions.",
 whom:"Strategy, innovation and corporate-development teams.",
 innov:"It systematises the search for non-obvious opportunity, complementing Blue Ocean thinking with a structured needs-by-segment lens.",
 sources:["Johnson, M.W. (2010) Seizing the White Space. Boston: HBR Press.","Christensen, C.M. and Raynor, M. (2003) The Innovator's Solution. Boston: HBS Press."]};

C["Demand-Signal Radar"]={
 def:"The Demand-Signal Radar is a visual scan of emerging consumer needs detected from data signals across multiple dimensions, helping an organisation sense shifts in demand before they become obvious.",
 who:"A practitioner construct from demand-sensing and market-intelligence practice, related to environmental-scanning and weak-signal detection methods.",
 why:"It was developed to help firms detect early, faint indicators of changing demand that aggregate metrics miss until it is too late to respond.",
 how:"Signal dimensions are arranged on a radar; AI-processed data raises or lowers each, and clusters of rising signals point to emerging opportunities.",
 when:"During trend analysis, product roadmapping and competitive sensing.",
 whom:"Market-intelligence, strategy and product teams.",
 innov:"It turns scattered weak signals into a single, scannable picture, exploiting AI's ability to process diverse data into early demand indicators.",
 sources:["Ansoff, H.I. (1975) 'Managing strategic surprise by response to weak signals', California Management Review, 18(2).","Day, G.S. and Schoemaker, P.J.H. (2006) Peripheral Vision. Boston: HBR Press."]};

C["Blue Ocean Strategy Canvas"]={
 def:"The Strategy Canvas is the central diagnostic of Blue Ocean Strategy, plotting how competitors invest across the factors an industry competes on, to reveal opportunities to create uncontested 'blue ocean' market space.",
 who:"Developed by W. Chan Kim and Renée Mauborgne of INSEAD in Blue Ocean Strategy (2005).",
 why:"It was developed to move firms away from bloody 'red ocean' competition on the same factors toward value innovation that makes the competition irrelevant.",
 how:"Competing factors are plotted on the horizontal axis and investment on the vertical; the firm then applies the eliminate-reduce-raise-create grid to redraw its value curve.",
 when:"During strategy formulation, market creation and when escaping commoditised competition with AI-enabled offerings.",
 whom:"Senior strategists and executive teams.",
 innov:"It reframes strategy from beating rivals to making them irrelevant through value innovation, supported by a distinctive visual diagnostic.",
 sources:["Kim, W.C. and Mauborgne, R. (2005) Blue Ocean Strategy. Boston: HBS Press.","Kim, W.C. and Mauborgne, R. (2017) Blue Ocean Shift. New York: Hachette."]};

C["Trend → Opportunity Funnel"]={
 def:"The Trend-to-Opportunity Funnel is a staged filter that narrows a broad set of observed trends and weak signals down to a small set of validated opportunities worth investment.",
 who:"A foresight-practice construct combining environmental scanning with stage-gate filtering, used in corporate-foresight and innovation pipelines.",
 why:"It was developed to convert the noise of trend-watching into disciplined opportunity selection, avoiding both trend-chasing and paralysis.",
 how:"Trends enter the wide mouth; each stage applies tests of relevance, feasibility and strategic fit until a few validated bets remain.",
 when:"During innovation pipeline management and foresight-to-strategy translation.",
 whom:"Foresight, innovation and strategy teams.",
 innov:"It imposes selection discipline on foresight, linking trend detection directly to a fundable opportunity portfolio.",
 sources:["Rohrbeck, R. (2011) Corporate Foresight. Heidelberg: Physica-Verlag.","Cooper, R.G. (2008) 'Perspective: The Stage-Gate idea-to-launch process', Journal of Product Innovation Management, 25(3)."]};

C["Three Horizons"]={
 def:"The Three Horizons model frames growth as the simultaneous management of three time horizons: defending and extending the core (H1), building emerging businesses (H2), and creating options for the future (H3).",
 who:"Introduced by Mehrdad Baghai, Stephen Coley and David White of McKinsey in The Alchemy of Growth (1999).",
 why:"It was developed to stop firms from over-investing in today's core at the expense of tomorrow's growth, balancing exploitation and exploration.",
 how:"Initiatives are sorted into the three horizons and resourced so that future growth is funded even while the core is optimised, with AI bets often spanning H2 and H3.",
 when:"During portfolio strategy, innovation governance and AI investment sequencing.",
 whom:"Executives, strategy teams and innovation boards.",
 innov:"It institutionalises the parallel pursuit of present and future growth, countering the short-termism that lets disruptors win H3.",
 sources:["Baghai, M., Coley, S. and White, D. (1999) The Alchemy of Growth. Reading: Perseus.","McKinsey & Company (2009) 'Enduring Ideas: The three horizons of growth'."]};

// ============ UNIT 2 — Economics of AI Adoption: Benefits ============
C["Productivity J-Curve"]={
 def:"The Productivity J-Curve describes how a general-purpose technology first depresses measured productivity — as firms invest in intangible complements — before delivering a steep, delayed payoff.",
 who:"Formalised by Erik Brynjolfsson, Daniel Rock and Chad Syverson (2021), building on Brynjolfsson's long study of the IT productivity paradox.",
 why:"It was developed to explain why transformative technologies appear to fail in the statistics for years, reassuring decision-makers that the dip is part of the path.",
 how:"An AI programme's measured productivity is read against the curve; investment in complementary intangibles is tracked to confirm a slope is being built.",
 when:"When boards lose patience with AI ROI, and when distinguishing a genuine lag from a genuine absence of value.",
 whom:"CFOs, transformation leaders and investment committees.",
 innov:"It supplies a rigorous, evidence-based reason not to abandon AI programmes at the bottom of the dip, reframing the cost of complements as investment, not failure.",
 sources:["Brynjolfsson, E., Rock, D. and Syverson, C. (2021) 'The Productivity J-Curve', American Economic Journal: Macroeconomics, 13(1), pp. 333–372.","Brynjolfsson, E. and McAfee, A. (2014) The Second Machine Age. New York: Norton."]};

C["Solow Paradox Revisited"]={
 def:"The Solow Paradox is the observation that the computer age was 'everywhere except in the productivity statistics' — revisited today as AI investment outpaces measurable economic impact.",
 who:"Named for economist Robert Solow's 1987 remark; revisited by Brynjolfsson and others studying the AI era.",
 why:"It was developed as a caution that visible technological adoption does not guarantee measured productivity gains, prompting investigation of why.",
 how:"Apparent AI ubiquity is contrasted with productivity data; explanations — mismeasurement, lags, redistribution, mismanagement — are tested.",
 when:"When reconciling enthusiastic AI adoption with flat productivity figures.",
 whom:"Economists, strategists and policy-minded executives.",
 innov:"It frames a recurring puzzle that disciplines hype, pushing analysts to look for lags and complements rather than assume immediate gains.",
 sources:["Solow, R. (1987) 'We'd better watch out', New York Times Book Review, 12 July.","Brynjolfsson, E., Rock, D. and Syverson, C. (2019) 'Artificial intelligence and the modern productivity paradox', in The Economics of AI. Chicago: UCP."]};

C["Adoption → Impact Lag"]={
 def:"The Adoption-to-Impact Lag is the time delay between deploying a technology and observing its measurable economic impact, during which value accrues invisibly through complementary change.",
 who:"A concept grounded in technology-diffusion and productivity research, associated with Paul David's analysis of the electric dynamo and with Brynjolfsson's AI work.",
 why:"It was developed to set realistic expectations: transformative technologies historically take years to show up in performance after adoption.",
 how:"The expected lag is estimated and built into the business case so that early flat results are interpreted correctly rather than as failure.",
 when:"During AI business-case design and post-deployment review.",
 whom:"Finance, strategy and programme leaders.",
 innov:"It makes the historically observed delay an explicit planning parameter, protecting good investments from premature judgment.",
 sources:["David, P.A. (1990) 'The dynamo and the computer', American Economic Review, 80(2).","Brynjolfsson, E. and Hitt, L. (2003) 'Computing productivity', Review of Economics and Statistics, 85(4)."]};

C["Intangible Capital Iceberg"]={
 def:"The Intangible Capital Iceberg depicts how the visible cost of a technology sits above a much larger submerged investment in intangibles — process redesign, skills, data and organisational change — required to realise its value.",
 who:"Drawn from the intangible-capital research of Brynjolfsson, Rock and Syverson and from Corrado, Hulten and Sichel's measurement of intangibles.",
 why:"It was developed to explain why AI returns lag: the complementary intangible investment dwarfs the visible technology spend and is often unaccounted for.",
 how:"The technology's visible cost is placed above the waterline; the required intangible investment below it is named and budgeted.",
 when:"When building AI business cases and explaining why adoption alone yields little.",
 whom:"CFOs, transformation leaders and analysts.",
 innov:"It visualises the hidden majority of value-creating investment, countering the assumption that buying the technology is the main cost.",
 sources:["Corrado, C., Hulten, C. and Sichel, D. (2009) 'Intangible capital and U.S. economic growth', Review of Income and Wealth, 55(3).","Brynjolfsson, E., Rock, D. and Syverson, C. (2021) 'The Productivity J-Curve', AEJ: Macro, 13(1)."]};

C["Diffusion S-Curve"]={
 def:"The Diffusion S-Curve charts how an innovation is adopted over time, from a slow start among innovators, through rapid mainstream uptake, to saturation among laggards, tracing an S-shaped cumulative curve.",
 who:"Formalised by Everett Rogers in Diffusion of Innovations (1962), building on earlier rural-sociology adoption studies.",
 why:"It was developed to explain the social process of adoption and to identify the distinct adopter categories a new technology must win in sequence.",
 how:"An innovation's current adoption is located on the curve; strategy is tailored to the next adopter group rather than treating the market as homogeneous.",
 when:"When forecasting AI adoption, timing market entry and segmenting go-to-market.",
 whom:"Product marketers, strategists and forecasters.",
 innov:"It frames adoption as a staged social process rather than a switch, underpinning later models such as Crossing the Chasm.",
 sources:["Rogers, E.M. (1962) Diffusion of Innovations. New York: Free Press.","Bass, F.M. (1969) 'A new product growth model for consumer durables', Management Science, 15(5)."]};

C["Value-Chain Heatmap"]={
 def:"A Value-Chain Heatmap overlays the intensity of a technology's potential impact onto Porter's value-chain activities, showing where AI can lift performance across primary and support functions.",
 who:"A practitioner application of Porter's value chain (1985) used by consultancies to prioritise AI investment across the enterprise.",
 why:"It was developed to move AI investment from scattered experiments to a deliberate map of where the technology adds most value in the operating model.",
 how:"Each value-chain activity is shaded by AI opportunity; hotspots guide where to concentrate pilots and scaling.",
 when:"During enterprise AI strategy and investment prioritisation.",
 whom:"Strategy, operations and transformation leaders.",
 innov:"It combines a classic strategy map with AI-opportunity scoring, giving a single enterprise-wide view of where to act first.",
 sources:["Porter, M.E. (1985) Competitive Advantage. New York: Free Press.","Bughin, J. et al. (2017) Artificial Intelligence: The Next Digital Frontier? McKinsey Global Institute."]};

C["Function Benefit Matrix"]={
 def:"The Function Benefit Matrix maps business functions against the type and size of benefit AI can deliver, distinguishing where AI mainly reduces cost from where it primarily drives revenue.",
 who:"A consulting construct used in enterprise AI benefit assessment, drawing on function-level studies such as McKinsey's State of AI surveys.",
 why:"It was developed to give leaders a structured view of which functions to target first and what kind of value to expect from each.",
 how:"Functions are scored on benefit type and magnitude; the matrix surfaces priority functions and clarifies the value narrative.",
 when:"During AI portfolio planning and benefit forecasting.",
 whom:"Executives, function heads and transformation teams.",
 innov:"It separates cost benefits from revenue benefits by function, preventing a one-size-fits-all benefit story.",
 sources:["McKinsey & Company (2025) The State of AI in 2025. McKinsey Global Survey.","Davenport, T.H. and Ronanki, R. (2018) 'Artificial intelligence for the real world', Harvard Business Review, 96(1)."]};

C["Automation Potential Grid"]={
 def:"The Automation Potential Grid plots tasks by how automatable they are against how much value automating them would create, to prioritise where AI automation should be applied first.",
 who:"Grounded in the task-based automation research of Frey and Osborne and of Brynjolfsson, Mitchell and Rock on suitability for machine learning.",
 why:"It was developed to move automation decisions from the whole-job level to the task level, where the real opportunity and risk lie.",
 how:"Tasks are scored on automatability and value; high-value, highly automatable tasks are prioritised, while high-value, low-automatability tasks are targeted for augmentation.",
 when:"During workforce and process redesign and AI use-case selection.",
 whom:"Operations leaders, process owners and workforce planners.",
 innov:"It reframes automation around tasks rather than jobs, aligning with evidence that AI augments far more tasks than it fully automates.",
 sources:["Brynjolfsson, E., Mitchell, T. and Rock, D. (2018) 'What can machines learn and what does it mean for occupations?', AEA Papers and Proceedings, 108.","Frey, C.B. and Osborne, M.A. (2017) 'The future of employment', Technological Forecasting and Social Change, 114."]};

C["AI Use-Case Portfolio"]={
 def:"The AI Use-Case Portfolio arrays candidate AI initiatives by value and effort (or risk), separating quick wins from strategic bets and from initiatives to defer or avoid.",
 who:"A standard portfolio-prioritisation technique adapted to AI by consultancies and AI-strategy practitioners.",
 why:"It was developed to impose discipline on a flood of AI ideas, balancing near-term wins with longer-term strategic investment.",
 how:"Each use case is scored on value and effort; the resulting quadrants guide sequencing and resource allocation.",
 when:"During AI roadmap planning and governance review.",
 whom:"AI programme leaders, product owners and steering committees.",
 innov:"It applies established portfolio logic to AI specifically, balancing momentum-building quick wins against transformational bets.",
 sources:["McKinsey & Company (2023) 'The economic potential of generative AI'.","Cooper, R.G., Edgett, S.J. and Kleinschmidt, E.J. (2001) Portfolio Management for New Products. Cambridge: Perseus."]};

C["Capability Uplift Map"]={
 def:"The Capability Uplift Map shows, role by role, how AI augments human capability — raising the performance or reach of a worker rather than replacing the role outright.",
 who:"Associated with the augmentation research of Wilson and Daugherty and the 'centaur' literature on human–AI collaboration.",
 why:"It was developed to shift the conversation from replacement to augmentation, identifying where AI most amplifies human capability.",
 how:"Roles are mapped to the specific capabilities AI can uplift; investment targets augmentation that raises output and job quality together.",
 when:"During workforce strategy and AI-enabled role redesign.",
 whom:"HR, operations and transformation leaders.",
 innov:"It centres the augmentation thesis — humans plus AI outperform either alone — against a purely substitutive view of automation.",
 sources:["Wilson, H.J. and Daugherty, P.R. (2018) 'Collaborative intelligence', Harvard Business Review, 96(4).","Daugherty, P.R. and Wilson, H.J. (2018) Human + Machine. Boston: HBR Press."]};

C["Cost-to-Serve Curve"]={
 def:"The Cost-to-Serve Curve shows how the unit cost of serving a customer or transaction falls as automation and AI absorb increasing volume, revealing scale economics.",
 who:"Rooted in cost-accounting and operations practice, with cost-to-serve analysis popularised in supply-chain and service-economics literature.",
 why:"It was developed to quantify how automation changes the economics of service delivery, distinguishing fixed investment from falling marginal cost.",
 how:"Unit cost is plotted against automated volume; the curve's shape informs pricing, capacity and the payback on automation investment.",
 when:"When evaluating automation ROI and designing scalable service models.",
 whom:"Operations, finance and pricing leaders.",
 innov:"It makes the scale economics of AI-enabled service explicit, linking automation investment to declining unit cost.",
 sources:["Cokins, G. (2001) Activity-Based Cost Management. Hoboken: Wiley.","Anderson, S.W. (2007) 'Managing costs and cost structure', Handbook of Management Accounting Research, 2."]};

C["Process Cycle Efficiency"]={
 def:"Process Cycle Efficiency is the ratio of value-added time to total cycle time in a process, quantifying how much of a process actually creates value versus waiting and rework.",
 who:"A core Lean metric, formalised in Lean and Six Sigma practice building on the Toyota Production System.",
 why:"It was developed to expose hidden waste — the large share of cycle time spent waiting — that conventional efficiency measures miss.",
 how:"Value-added time is divided by total lead time; AI interventions are assessed by how much they raise the ratio rather than merely speed isolated steps.",
 when:"During process improvement and when targeting AI at genuine bottlenecks.",
 whom:"Operations and continuous-improvement teams.",
 innov:"It focuses improvement on flow efficiency rather than local speed, ensuring AI is applied where it reduces total cycle time.",
 sources:["George, M.L. (2002) Lean Six Sigma. New York: McGraw-Hill.","Womack, J.P. and Jones, D.T. (1996) Lean Thinking. New York: Simon & Schuster."]};

C["Lean Waste Lens (AI)"]={
 def:"The Lean Waste Lens applies the classic categories of waste (the eight 'mudas') to identify where AI can eliminate non-value-adding activity such as overprocessing, waiting, defects and unused talent.",
 who:"Built on the Toyota Production System and Lean thinking codified by Ohno, Womack and Jones, extended to AI-enabled operations.",
 why:"It was developed to direct improvement effort at systematic categories of waste rather than ad hoc fixes.",
 how:"Each waste category is examined for AI remedies; AI is deployed where it removes waste rather than merely accelerating it.",
 when:"During operational improvement and AI use-case identification in processes.",
 whom:"Operations, quality and continuous-improvement teams.",
 innov:"It channels AI toward proven waste categories, guarding against automating waste instead of eliminating it.",
 sources:["Ohno, T. (1988) Toyota Production System. Cambridge: Productivity Press.","Womack, J.P. and Jones, D.T. (1996) Lean Thinking. New York: Simon & Schuster."]};

C["Throughput Accounting"]={
 def:"Throughput Accounting evaluates decisions by their effect on throughput, inventory and operating expense, prioritising the system's constraint rather than local efficiencies.",
 who:"Developed by Eliyahu Goldratt as part of the Theory of Constraints, set out in The Goal (1984) and Throughput Accounting literature.",
 why:"It was developed to counter cost-accounting distortions that reward local efficiency while ignoring the bottleneck that governs total output.",
 how:"Decisions, including AI investments, are judged by their effect on the constraint; improving a non-bottleneck is treated as illusory gain.",
 when:"When prioritising AI investment in operations and avoiding optimisation of non-bottlenecks.",
 whom:"Operations and finance leaders.",
 innov:"It reframes performance around the system constraint, ensuring AI effort flows to the bottleneck that actually limits throughput.",
 sources:["Goldratt, E.M. (1984) The Goal. Great Barrington: North River Press.","Corbett, T. (1998) Throughput Accounting. Great Barrington: North River Press."]};

C["Effort-Value Reallocation"]={
 def:"Effort-Value Reallocation tracks how time freed by automation is redeployed, distinguishing AI programmes that reinvest freed hours into high-value work from those that simply cut.",
 who:"A management construct emerging from the future-of-work and augmentation literature, related to job-redesign research.",
 why:"It was developed to ensure that productivity gains from AI translate into higher-value output rather than being lost or merely banked as headcount cuts.",
 how:"Freed effort is measured and explicitly reallocated to higher-value tasks; the value of reallocation is tracked alongside the cost saved.",
 when:"During AI-enabled workforce redesign and benefit realisation.",
 whom:"HR, operations and transformation leaders.",
 innov:"It treats reallocation of freed capacity as a managed decision, not a by-product, capturing the augmentation upside of automation.",
 sources:["Daugherty, P.R. and Wilson, H.J. (2018) Human + Machine. Boston: HBR Press.","Autor, D. (2015) 'Why are there still so many jobs?', Journal of Economic Perspectives, 29(3)."]};

C["CAC : LTV Ratio"]={
 def:"The CAC:LTV ratio compares the cost of acquiring a customer with the lifetime value that customer generates, a core test of whether a growth model is economically sustainable.",
 who:"A staple of SaaS and subscription economics, popularised by investors such as David Skok and by unit-economics practice.",
 why:"It was developed to discipline growth spending, ensuring that acquisition cost is justified by the value a customer ultimately delivers.",
 how:"Lifetime value is divided by acquisition cost; a healthy ratio (commonly 3:1 or better) signals a fundable model, while AI is assessed by its effect on both terms.",
 when:"During growth-strategy and investment decisions and when evaluating AI's effect on acquisition or retention.",
 whom:"Founders, growth leaders, finance and investors.",
 innov:"It anchors growth in unit economics rather than vanity metrics, providing a single sustainability test for customer acquisition.",
 sources:["Skok, D. (2013) 'SaaS metrics 2.0', forEntrepreneurs.","Gupta, S., Lehmann, D.R. and Stuart, J.A. (2004) 'Valuing customers', Journal of Marketing Research, 41(1)."]};

C["Retention / Churn Cohort"]={
 def:"A Retention/Churn Cohort analysis tracks groups of customers acquired in the same period over time, revealing how retention decays and where AI-driven interventions lift it.",
 who:"A standard analytics technique in subscription and product analytics, formalised through cohort-analysis and customer-lifetime-value practice.",
 why:"It was developed to expose retention dynamics hidden by aggregate metrics, isolating the effect of changes over the customer lifecycle.",
 how:"Cohorts are plotted over time; AI interventions (personalisation, churn prediction) are evaluated by their lift on later-period retention.",
 when:"When measuring AI's impact on retention and diagnosing churn.",
 whom:"Growth, CX and analytics teams.",
 innov:"It provides a clean, time-aware view of retention that attributes change to interventions rather than noise.",
 sources:["Fader, P.S. and Hardie, B.G.S. (2009) 'Probability models for customer-base analysis', Journal of Interactive Marketing, 23(1).","Reichheld, F.F. (1996) The Loyalty Effect. Boston: HBS Press."]};

C["Pirate Metrics (AARRR)"]={
 def:"Pirate Metrics (AARRR) is a funnel of five growth stages — Acquisition, Activation, Retention, Referral and Revenue — that frames where to focus measurement and improvement in a growth model.",
 who:"Created by venture investor Dave McClure in 2007 to give startups a simple, actionable metrics framework.",
 why:"It was developed to cut through vanity metrics and focus founders on the few stage-level numbers that actually drive growth.",
 how:"Each stage is measured; the weakest stage becomes the focus of experimentation, with AI applied where it most improves stage conversion.",
 when:"During growth measurement and prioritisation for products and AI-enabled services.",
 whom:"Founders, growth and product teams.",
 innov:"It distilled growth measurement into five memorable, actionable stages, becoming a default startup metrics language.",
 sources:["McClure, D. (2007) 'Startup metrics for pirates', 500 Startups.","Croll, A. and Yoskovitz, B. (2013) Lean Analytics. Sebastopol: O'Reilly."]};

C["Net Revenue Retention"]={
 def:"Net Revenue Retention (NRR) measures the revenue retained and expanded from existing customers over a period, net of churn and contraction — a key indicator of compounding, durable growth.",
 who:"A metric central to modern SaaS and subscription analysis, emphasised by growth investors and operators.",
 why:"It was developed to capture whether a customer base grows on its own through expansion, independent of new acquisition.",
 how:"Starting revenue is adjusted for expansion, contraction and churn; NRR above 100% indicates self-expanding revenue, and AI features are assessed by their NRR contribution.",
 when:"When evaluating durable growth, AI feature monetisation and investor readiness.",
 whom:"Finance, growth leaders and investors.",
 innov:"It isolates the compounding power of the existing base, a stronger signal of durable AI-product value than gross growth.",
 sources:["Skok, D. (2017) 'SaaS metrics that matter', forEntrepreneurs.","Bain & Company (2021) 'The economics of net revenue retention'."]};

C["Growth Loop"]={
 def:"A Growth Loop is a closed, self-reinforcing system in which the output of one cycle of usage becomes the input that drives the next, producing compounding rather than linear growth.",
 who:"Articulated by growth practitioners such as those at Reforge (notably Brian Balfour) as a successor to funnel thinking.",
 why:"It was developed to capture how durable products grow through reinvested output — content, data, referrals — rather than one-off acquisition.",
 how:"The loop's steps are mapped and the reinvestment mechanism identified; AI is applied where it strengthens the reinvested output.",
 when:"During growth-model design for products with compounding dynamics.",
 whom:"Growth, product and strategy leaders.",
 innov:"It reframes growth as a reinforcing loop rather than a leaky funnel, focusing effort on the compounding mechanism.",
 sources:["Balfour, B. (2017) 'Growth loops are the new funnels', Reforge.","Ellis, S. and Brown, M. (2017) Hacking Growth. New York: Currency."]};

module.exports = C;
