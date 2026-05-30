// Framework sheet content — Units 3 (AI Costs) and 4 (IP & Value). Keyed by exact title.
const C = {};

// ============ UNIT 3 — Economics of AI Adoption: Costs ============
C["AI Value Stack"]={
 def:"The AI Value Stack is a layered map of the AI economy — semiconductors, cloud infrastructure, foundation models, and applications — showing where cost is incurred and where value and margin accrue.",
 who:"A synthesis from venture and industry analysis of the generative-AI supply chain, discussed by investors such as Andreessen Horowitz and Sequoia.",
 why:"It was developed to help firms see that AI cost and value are distributed across a stack, and to locate where they are exposed or where they capture margin.",
 how:"A firm maps its dependencies and spend across the layers; concentration in any layer signals cost or lock-in risk to be managed.",
 when:"When designing AI sourcing strategy and analysing cost structure and dependency.",
 whom:"CTOs, strategists and finance leaders.",
 innov:"It gives a single picture of the AI economy's layers, clarifying that most application-layer firms rent the layers beneath them.",
 sources:["a16z (2023) 'Who owns the generative AI platform?'.","Sequoia Capital (2023) 'Generative AI: A creative new world'."]};

C["Compute Cost Pyramid"]={
 def:"The Compute Cost Pyramid distinguishes the cost profiles of training, fine-tuning and inference, showing that while training is rare and expensive, inference is continuous and scales with usage.",
 who:"A practitioner construct from machine-learning operations and cloud-economics analysis of large-model lifecycles.",
 why:"It was developed to correct the assumption that training dominates AI cost; for deployed systems, inference at scale is frequently the larger bill.",
 how:"Costs are allocated across training, fine-tuning and inference; planning focuses on the layer that dominates the firm's actual usage pattern.",
 when:"During AI cost forecasting and architecture decisions.",
 whom:"ML engineering, finance and platform teams.",
 innov:"It reframes AI cost around lifecycle stage, highlighting inference economics that one-off training-cost framing obscures.",
 sources:["Patterson, D. et al. (2021) 'Carbon emissions and large neural network training', arXiv:2104.10350.","Sevilla, J. et al. (2022) 'Compute trends across three eras of machine learning', IJCNN."]};

C["Token Economics"]={
 def:"Token Economics analyses the cost of operating large language models on a per-token basis, revealing how prompt design, context length and volume drive operating cost at scale.",
 who:"An operational framing from LLM-application practice, formalised as providers priced models per input and output token.",
 why:"It was developed to make the recurring cost of LLM applications visible and manageable, since small per-token costs compound enormously at scale.",
 how:"Cost per token is multiplied across realistic volumes; prompt and context efficiency are optimised to control spend.",
 when:"When budgeting and optimising LLM-based products.",
 whom:"Product, engineering and finance teams running LLM applications.",
 innov:"It translates abstract model usage into a concrete, controllable unit cost, enabling FinOps discipline for generative AI.",
 sources:["OpenAI (2023) 'Pricing' documentation.","Chen, L. et al. (2023) 'FrugalGPT: How to use large language models while reducing cost', arXiv:2305.05176."]};

C["Hyperscaler Dependency Map"]={
 def:"The Hyperscaler Dependency Map visualises an organisation's reliance on a small number of cloud and model providers, exposing concentration and vendor lock-in risk.",
 who:"A risk-management construct from cloud-strategy and concentration-risk practice, echoed by regulators concerned with cloud concentration.",
 why:"It was developed to surface the strategic risk of depending on one or two hyperscalers for compute, models and data.",
 how:"Dependencies are mapped as a network; single points of failure and lock-in are identified and mitigation (multi-cloud, portability) considered.",
 when:"During cloud and AI sourcing strategy and resilience planning.",
 whom:"CTOs, risk officers and procurement.",
 innov:"It makes provider concentration explicit and actionable, balancing the convenience of hyperscalers against strategic dependency.",
 sources:["Bank of England (2022) 'Financial Stability in Focus: Cloud services'.","Armbrust, M. et al. (2010) 'A view of cloud computing', Communications of the ACM, 53(4)."]};

C["Capex vs. Opex Shift"]={
 def:"The Capex-vs-Opex Shift describes how cloud and AI move IT spending from upfront capital investment in owned assets to ongoing operating expense for rented capability.",
 who:"A cloud-economics principle long discussed in IT-strategy and finance, central to the cloud value proposition.",
 why:"It was developed to clarify the financial trade-off between owning infrastructure and renting it, with implications for flexibility, cost control and risk.",
 how:"Owning versus renting intelligence is evaluated on cost, flexibility and risk; the shift to opex is weighed against long-run cost at scale.",
 when:"When deciding AI infrastructure ownership and modelling total cost.",
 whom:"CFOs, CIOs and procurement.",
 innov:"It frames the financial structure of AI investment, highlighting that opex flexibility can become a large recurring cost at scale.",
 sources:["Carr, N. (2008) The Big Switch. New York: Norton.","Armbrust, M. et al. (2010) 'A view of cloud computing', CACM, 53(4)."]};

C["Private · Hybrid · Hyperscaler 2×2"]={
 def:"This matrix compares private, hybrid and hyperscaler hosting approaches for AI, trading the control of self-hosting against the cost and convenience of public cloud.",
 who:"A cloud-architecture decision construct from enterprise IT and AI-infrastructure practice.",
 why:"It was developed to structure the hosting decision, which carries large consequences for cost, control, compliance and speed.",
 how:"Workloads are placed by their control and cost requirements; sensitive or steady workloads may favour private, variable workloads the hyperscaler.",
 when:"When choosing AI hosting and balancing compliance against cost.",
 whom:"Cloud architects, CTOs and compliance leaders.",
 innov:"It clarifies that hosting is not binary but a portfolio, matching each workload to the right control–cost trade-off.",
 sources:["NIST (2011) The NIST Definition of Cloud Computing, SP 800-145.","Gartner (2022) 'Cloud strategy decision framework'."]};

C["Cloud Cost Waterfall"]={
 def:"A Cloud Cost Waterfall decomposes a cloud or AI bill into its components — compute, storage, networking, data transfer and managed services — to reveal where spend actually goes.",
 who:"A FinOps-practice construct for cost transparency, codified by the FinOps Foundation.",
 why:"It was developed to counter opaque cloud billing, exposing the often-surprising drivers of spend such as data egress.",
 how:"The total bill is broken into a waterfall of components; the largest and least-expected drivers are targeted for optimisation.",
 when:"During cloud cost optimisation and AI operating-cost analysis.",
 whom:"FinOps, finance and platform teams.",
 innov:"It makes cloud spend legible component by component, enabling targeted optimisation rather than blunt cuts.",
 sources:["FinOps Foundation (2020) FinOps Framework.","Storment, J.R. and Fuller, M. (2019) Cloud FinOps. Sebastopol: O'Reilly."]};

C["Latency-Cost Frontier"]={
 def:"The Latency-Cost Frontier expresses the trade-off between the speed of an AI system and its cost, showing that lower latency generally commands higher cost and that not all use cases need the fastest tier.",
 who:"An engineering-economics construct from systems and ML-serving practice.",
 why:"It was developed to prevent over-spending on speed that the use case does not require, matching latency to genuine need.",
 how:"Use cases are placed on the frontier; each is served at the cheapest tier that meets its real latency requirement.",
 when:"When designing AI serving architecture and controlling inference cost.",
 whom:"ML engineering, product and finance teams.",
 innov:"It makes the speed-versus-cost trade-off explicit per use case, avoiding paying for latency that delivers no value.",
 sources:["Dean, J. and Barroso, L.A. (2013) 'The tail at scale', Communications of the ACM, 56(2).","Crankshaw, D. et al. (2017) 'Clipper: A low-latency online prediction serving system', NSDI."]};

C["Data Gravity Map"]={
 def:"A Data Gravity Map illustrates how applications and compute are drawn toward where large data sets reside, because moving data is costly and slow — so 'data gravity' shapes architecture.",
 who:"Coined by Dave McCrory in 2010 to describe the pull that accumulated data exerts on services and infrastructure.",
 why:"It was developed to explain why workloads cluster around data and to inform decisions about where to process AI workloads.",
 how:"Major data stores are mapped; compute and applications are located to minimise costly data movement, influencing cloud and edge choices.",
 when:"During data and AI architecture and multi-cloud planning.",
 whom:"Architects, data engineers and infrastructure leaders.",
 innov:"It names a force that quietly governs architecture and cost, guiding where AI processing should physically occur.",
 sources:["McCrory, D. (2010) 'Data gravity in the clouds', blog.","Cloud Security Alliance (2021) 'Data gravity and cloud architecture'."]};

C["FinOps Loop"]={
 def:"The FinOps Loop is a continuous cycle — Inform, Optimise, Operate — for managing cloud and AI spend collaboratively across finance, engineering and business teams.",
 who:"Codified by the FinOps Foundation, building on cloud-financial-management practice.",
 why:"It was developed to bring financial accountability to variable cloud and AI consumption without slowing engineering.",
 how:"Teams cycle through visibility (Inform), efficiency action (Optimise) and embedding practices (Operate), iterating continuously.",
 when:"When establishing ongoing AI and cloud cost governance.",
 whom:"FinOps practitioners, finance and engineering leaders.",
 innov:"It operationalises cost management as a shared, continuous practice rather than a periodic finance exercise.",
 sources:["FinOps Foundation (2020) FinOps Framework.","Storment, J.R. and Fuller, M. (2019) Cloud FinOps. Sebastopol: O'Reilly."]};

C["Open vs. Proprietary LLM 2×2"]={
 def:"This matrix contrasts open-source and proprietary large language models, trading the control and marginal-cost advantages of open models against the capability and speed of frontier proprietary APIs.",
 who:"A strategy framing from the 2020s open-versus-closed model debate, discussed across AI-engineering and policy communities.",
 why:"It was developed to structure the model-sourcing decision, which shapes cost, control, capability and dependency.",
 how:"Each use case is placed by its capability needs and control requirements; the matrix recommends open self-hosting, hosted open, or frontier API.",
 when:"When selecting models and balancing control, cost and capability.",
 whom:"ML engineering, product and strategy leaders.",
 innov:"It clarifies a fast-moving trade-off, showing open models can lower marginal cost and increase control while demanding more in-house capability.",
 sources:["Bommasani, R. et al. (2021) 'On the opportunities and risks of foundation models', arXiv:2108.07258.","Liesenfeld, A. and Dingemanse, M. (2024) 'Rethinking open source generative AI', FAccT."]};

C["Make-vs-Buy Decision Tree"]={
 def:"The Make-vs-Buy Decision Tree guides whether to build, fine-tune or simply call an external model or component, by working through questions of differentiation, capability and cost.",
 who:"An adaptation of classic make-or-buy and transaction-cost reasoning to the AI model lifecycle.",
 why:"It was developed to prevent undifferentiated in-house model effort and to reserve build capacity for genuine sources of advantage.",
 how:"The tree asks whether the capability is strategic, whether data confers advantage, and whether an API suffices, terminating in build, fine-tune or buy.",
 when:"When deciding how to source AI capability for a specific use case.",
 whom:"CTOs, ML leads and product owners.",
 innov:"It turns the abstract build-or-buy question into a structured, repeatable decision for AI components.",
 sources:["Williamson, O.E. (1985) The Economic Institutions of Capitalism. New York: Free Press.","Bommasani, R. et al. (2021) 'On the opportunities and risks of foundation models', arXiv:2108.07258."]};

C["Talent Scarcity Heatmap"]={
 def:"The Talent Scarcity Heatmap maps where specialist AI, data and MLOps skills are most scarce and expensive, informing build-versus-buy, location and partnership decisions.",
 who:"A workforce-planning construct drawing on labour-market analysis of AI skills, including OECD and industry skills studies.",
 why:"It was developed to make the scarcity and cost of AI talent a visible input to strategy rather than an after-the-fact constraint.",
 how:"Skills are shaded by scarcity and cost; the map informs whether to build internal capability, outsource, or partner, and where to locate teams.",
 when:"During AI workforce and sourcing strategy.",
 whom:"HR, technology and transformation leaders.",
 innov:"It elevates talent scarcity to a first-order strategic variable, recognising that the wage premium can dwarf software spend.",
 sources:["OECD (2023) OECD Employment Outlook 2023: Artificial Intelligence and the Labour Market. Paris: OECD.","Stanford HAI (2024) AI Index Report."]};

C["Skill-Premium Curve"]={
 def:"The Skill-Premium Curve shows how scarce AI-related skills command a rising wage premium, and how that premium changes as supply catches up or technology shifts demand.",
 who:"Grounded in labour-economics analysis of skill-biased technological change, associated with economists such as David Autor and Lawrence Katz.",
 why:"It was developed to explain and anticipate the cost of scarce skills, informing whether to hire, train or wait.",
 how:"The premium for target skills is tracked over time; strategy weighs paying the premium now against building supply through training.",
 when:"When planning AI hiring and compensation strategy.",
 whom:"HR, finance and workforce-planning leaders.",
 innov:"It frames AI talent cost dynamically, recognising premiums shift with supply and with the technology itself.",
 sources:["Autor, D.H., Katz, L.F. and Krueger, A.B. (1998) 'Computing inequality', Quarterly Journal of Economics, 113(4).","Acemoglu, D. and Autor, D. (2011) 'Skills, tasks and technologies', Handbook of Labor Economics, 4."]};

C["MLOps Maturity Ladder"]={
 def:"The MLOps Maturity Ladder describes stages of operational capability for machine learning, from ad hoc manual work to fully automated, self-healing pipelines, indicating the cost and reliability at each stage.",
 who:"Formalised in industry MLOps guidance, including Google Cloud's MLOps maturity levels and Microsoft's MLOps practices.",
 why:"It was developed to help organisations locate their ML operational maturity and the investment required to scale models reliably.",
 how:"Current practice is placed on a rung; the next rung defines the automation, monitoring and governance investment needed to scale.",
 when:"When scaling AI from pilot to production and planning MLOps investment.",
 whom:"ML engineering, platform and operations leaders.",
 innov:"It turns reliable ML operations into a staged capability, exposing the often-underestimated cost of moving beyond prototypes.",
 sources:["Google Cloud (2020) 'MLOps: Continuous delivery and automation pipelines in machine learning'.","Kreuzberger, D., Kühl, N. and Hirschl, S. (2023) 'Machine learning operations (MLOps)', IEEE Access, 11."]};

C["Cost-Benefit Trade-off Matrix"]={
 def:"The Cost-Benefit Trade-off Matrix arrays AI initiatives by their expected value against their total, risk-adjusted cost, supporting disciplined prioritisation of where to invest.",
 who:"A general decision-analysis construct adapted to AI investment appraisal.",
 why:"It was developed to ensure AI investment decisions weigh full risk-adjusted cost against realistic benefit, not headline capability.",
 how:"Each initiative is scored on value and total risk-adjusted cost; the matrix highlights high-value, justified-cost initiatives.",
 when:"During AI portfolio prioritisation and investment governance.",
 whom:"Executives, finance and AI programme leaders.",
 innov:"It integrates the cost lessons of the unit — hidden costs and risk — into a single prioritisation view.",
 sources:["Boardman, A.E. et al. (2017) Cost-Benefit Analysis: Concepts and Practice. Cambridge: CUP.","McKinsey & Company (2023) 'The economic potential of generative AI'."]};

C["AI Risk Register"]={
 def:"An AI Risk Register catalogues the risks of an AI initiative by likelihood and impact, with owners and mitigations, providing a structured basis for governance and de-risking.",
 who:"An adaptation of standard enterprise risk-management practice to AI, aligned with frameworks such as the NIST AI Risk Management Framework.",
 why:"It was developed to make AI-specific risks — bias, drift, security, compliance — explicit, owned and managed rather than discovered after harm.",
 how:"Risks are scored on likelihood and impact, assigned owners and mitigations, and reviewed as the system evolves.",
 when:"Throughout the AI lifecycle, from design through operation.",
 whom:"Risk officers, AI governance teams and project leaders.",
 innov:"It applies disciplined risk management to AI specifically, supporting accountable, auditable deployment.",
 sources:["NIST (2023) AI Risk Management Framework (AI RMF 1.0).","ISO/IEC (2023) ISO/IEC 23894: AI Risk Management."]};

C["Bias & Failure Modes Map"]={
 def:"The Bias & Failure Modes Map identifies where an AI model can produce biased, unfair or otherwise harmful outputs and who bears the consequences, guiding mitigation and monitoring.",
 who:"Drawn from algorithmic-fairness and responsible-AI research, notably the work of Cathy O'Neil and the FAccT community.",
 why:"It was developed to anticipate the specific ways models fail and discriminate, since such failures carry reputational, legal and human cost.",
 how:"Potential failure and bias modes are enumerated per use case, with detection and mitigation assigned to each.",
 when:"During responsible-AI design and pre-deployment review.",
 whom:"Responsible-AI, risk and ML teams.",
 innov:"It systematises the search for harm, treating bias and failure as design concerns rather than post-hoc surprises.",
 sources:["O'Neil, C. (2016) Weapons of Math Destruction. New York: Crown.","Mehrabi, N. et al. (2021) 'A survey on bias and fairness in machine learning', ACM Computing Surveys, 54(6)."]};

C["Black Swan Radar"]={
 def:"The Black Swan Radar is a lens for surfacing rare, high-impact, hard-to-predict events — Taleb's 'black swans' — that conventional risk analysis underweights, so that fragility to them can be reduced.",
 who:"Based on Nassim Nicholas Taleb's work in The Black Swan (2007) and his broader writing on uncertainty and fragility.",
 why:"It was developed to counter the tendency to plan for the average case and ignore the rare event that actually determines survival.",
 how:"Plausible tail events are surfaced and the system's fragility to them assessed; mitigation favours robustness and optionality over precise prediction.",
 when:"During risk strategy, especially for AI systems exposed to rare but catastrophic failure.",
 whom:"Risk officers, strategists and senior leaders.",
 innov:"It shifts risk thinking from forecasting the likely to building resilience against the consequential rare event.",
 sources:["Taleb, N.N. (2007) The Black Swan. London: Penguin.","Taleb, N.N. (2012) Antifragile. New York: Random House."]};

C["Mitigation Cost Curve"]={
 def:"The Mitigation Cost Curve shows how the cost of reducing a risk rises while the marginal risk removed falls, revealing the point beyond which further de-risking costs more than the risk it removes.",
 who:"A risk-economics construct related to the economics of safety and diminishing returns to control.",
 why:"It was developed to identify the optimal level of mitigation, avoiding both reckless under-investment and uneconomic over-control.",
 how:"Mitigation cost is plotted against residual risk; investment stops where marginal cost exceeds marginal risk reduction.",
 when:"When deciding how much to invest in AI risk controls.",
 whom:"Risk, finance and governance leaders.",
 innov:"It introduces economic discipline to de-risking, recognising that perfect safety is neither attainable nor optimal.",
 sources:["Viscusi, W.K. (1996) 'Economic foundations of the current regulatory reform efforts', Journal of Economic Perspectives, 10(3).","Hubbard, D.W. (2020) The Failure of Risk Management. Hoboken: Wiley."]};

// ============ UNIT 4 — IP & Value Creation through AI ============
C["IP Quadrant"]={
 def:"The IP Quadrant organises the four main forms of intellectual property — patent, copyright, trademark and trade secret — clarifying what each protects and how each applies to AI assets.",
 who:"A foundational construct of intellectual-property law and management, taught across IP-strategy texts.",
 why:"It was developed to help managers match each asset to the appropriate protection rather than defaulting to one form.",
 how:"Each AI-related asset is classified into the quadrant best suited to it, and a layered protection strategy is built across forms.",
 when:"When designing IP protection for AI products, data and models.",
 whom:"Legal, IP and product-strategy teams.",
 innov:"It clarifies that AI assets often need a combination of protections, since no single form covers models, data and brand together.",
 sources:["WIPO (2020) WIPO Technology Trends 2019: Artificial Intelligence. Geneva: WIPO.","Cornish, W., Llewelyn, D. and Aplin, T. (2019) Intellectual Property. London: Sweet & Maxwell."]};

C["Authorship Decision Tree"]={
 def:"The Authorship Decision Tree guides whether an AI-assisted output is human-authored, machine-generated, or jointly created, with different copyright and ownership consequences for each path.",
 who:"Associated with the legal scholarship of Jyh-An Lee and colleagues on AI, authorship and intellectual property.",
 why:"It was developed because most jurisdictions require a human author for copyright, leaving AI-generated output in a contested space that must be navigated.",
 how:"The tree asks about the human's creative contribution and control, classifying the output and its likely ownership and protectability.",
 when:"When determining rights in AI-generated content and code.",
 whom:"Legal, IP and product leaders working with generative AI.",
 innov:"It operationalises an unsettled legal question into a usable decision aid, central to value capture in generative AI.",
 sources:["Lee, J.-A., Hilty, R.M. and Liu, K.-C. (eds.) (2021) Artificial Intelligence and Intellectual Property. Oxford: OUP.","US Copyright Office (2023) 'Copyright registration guidance: Works containing material generated by AI'."]};

C["Patentability Funnel"]={
 def:"The Patentability Funnel filters an invention through the core tests of patentability — novelty, non-obviousness (inventive step) and utility — to assess whether AI-related innovation can be patented.",
 who:"A representation of established patent-law doctrine, applied to AI by patent practitioners and offices such as the EPO and USPTO.",
 why:"It was developed to help innovators assess, early and cheaply, whether an AI invention is likely to clear the bar for patent protection.",
 how:"The invention passes through each test; failure at any stage indicates an alternative protection (e.g. trade secret) may be preferable.",
 when:"When deciding whether and how to protect AI inventions.",
 whom:"Patent attorneys, R&D and IP-strategy leaders.",
 innov:"It frames patentability as a sequential filter, clarifying where AI inventions commonly fail (often obviousness or eligible subject matter).",
 sources:["European Patent Office (2021) Guidelines for Examination, Part G.","Abbott, R. (2020) The Reasonable Robot. Cambridge: CUP."]};

C["Inventorship Test"]={
 def:"The Inventorship Test addresses whether an AI system can be named as an inventor on a patent, a question that courts and offices have largely answered by requiring a human inventor.",
 who:"Crystallised through the DABUS litigation brought by Stephen Thaler across multiple jurisdictions, and analysed by scholars such as Ryan Abbott.",
 why:"It was developed to resolve who, if anyone, can hold rights in inventions generated with substantial AI contribution.",
 how:"The contribution of human and machine is examined against the legal requirement of a natural-person inventor; rights strategy follows the conclusion.",
 when:"When AI materially contributes to an invention and inventorship must be determined.",
 whom:"Patent attorneys, R&D leaders and IP strategists.",
 innov:"It marks the current legal boundary — that inventorship requires a human — with significant consequences for AI-driven R&D.",
 sources:["Thaler v Comptroller-General of Patents (UK Supreme Court, 2023) UKSC 49.","Abbott, R. (2020) The Reasonable Robot. Cambridge: CUP."]};

C["Trademark Distinctiveness Spectrum"]={
 def:"The Trademark Distinctiveness Spectrum ranks marks from generic and descriptive (weak or unprotectable) through suggestive to arbitrary and fanciful (strongest), guiding brand and naming strategy.",
 who:"A doctrine of trademark law crystallised in the United States by the Abercrombie case and reflected in trademark practice generally.",
 why:"It was developed to explain why some marks receive strong protection and others none, informing how brands should be named.",
 how:"A proposed mark is located on the spectrum; naming favours the distinctive end to secure stronger, more defensible protection.",
 when:"When naming AI products and building brand IP.",
 whom:"Brand, marketing and legal teams.",
 innov:"It links naming choices directly to legal strength, a consideration easily overlooked in fast-moving AI product launches.",
 sources:["Abercrombie & Fitch Co. v Hunting World, Inc. (1976) 537 F.2d 4.","Cornish, W., Llewelyn, D. and Aplin, T. (2019) Intellectual Property. London: Sweet & Maxwell."]};

C["Wrapper vs. Moat Ladder"]={
 def:"The Wrapper-vs-Moat Ladder distinguishes degrees of defensibility for AI products, from a thin wrapper over a third-party model, through proprietary workflow and data, to a durable system-level moat.",
 who:"A contemporary venture-strategy framing from the generative-AI investment debate.",
 why:"It was developed to answer the investor's question of whether an AI product owns anything defensible beneath a thin application layer.",
 how:"A product is placed on the ladder by its sources of defensibility; strategy aims to climb from wrapper toward moat.",
 when:"During AI product strategy and investment due diligence.",
 whom:"Founders, product leaders and investors.",
 innov:"It names the central defensibility question of the AI era — a wrapper is a feature, not a moat — and charts the path to durability.",
 sources:["Helmer, H. (2016) 7 Powers. Deep Strategy.","a16z (2023) 'Who owns the generative AI platform?'."]};

C["7 Powers"]={
 def:"7 Powers identifies the seven sources of durable competitive advantage — scale economies, network economies, counter-positioning, switching costs, branding, cornered resource and process power — that allow a firm to earn persistent returns.",
 who:"Developed by strategist and investor Hamilton Helmer in 7 Powers (2016), distilling decades of strategy practice.",
 why:"It was developed to define precisely what 'power' means — the potential to earn persistent differential returns — and how it is created.",
 how:"A business is tested for which of the seven powers it holds or could build; AI advantages are mapped to specific powers rather than vague differentiation.",
 when:"During strategy formulation and assessment of AI-business defensibility.",
 whom:"Founders, strategists and investors.",
 innov:"It provides a rigorous, exhaustive taxonomy of durable advantage, sharpening loose talk of 'moats' into specific, buildable powers.",
 sources:["Helmer, H. (2016) 7 Powers: The Foundations of Business Strategy. Deep Strategy.","Porter, M.E. (1980) Competitive Strategy. New York: Free Press."]};

C["Defensibility Matrix"]={
 def:"The Defensibility Matrix maps an AI offering by its degree of differentiation against the switching cost it creates, distinguishing commodity features from genuine moats.",
 who:"A synthesis from competitive-strategy practice applied to AI products.",
 why:"It was developed to test quickly whether an AI product is defensible or merely a replicable feature.",
 how:"An offering is placed by differentiation and switching cost; only the high-high quadrant constitutes a moat worth defending.",
 when:"During product and investment strategy for AI.",
 whom:"Founders, product and investment leaders.",
 innov:"It distils defensibility into two decisive axes, complementing the fuller 7 Powers analysis with a quick diagnostic.",
 sources:["Porter, M.E. (1985) Competitive Advantage. New York: Free Press.","Helmer, H. (2016) 7 Powers. Deep Strategy."]};

C["Proprietary Data Flywheel"]={
 def:"A Proprietary Data Flywheel is a self-reinforcing loop in which a firm's unique data improves its product, which attracts more usage and generates more unique data, compounding advantage over time.",
 who:"A construct from data-strategy and platform practice, related to data network effects and the work of Hagiu and Wright.",
 why:"It was developed to identify when data genuinely compounds into advantage, as opposed to merely accumulating.",
 how:"The loop is tested for whether new data is unique, improves the product, and is hard to replicate; only then does it constitute a flywheel.",
 when:"When assessing data-based defensibility of AI products.",
 whom:"Founders, product and data leaders, investors.",
 innov:"It distinguishes a compounding data moat from inert data accumulation, a key test of durable AI advantage.",
 sources:["Hagiu, A. and Wright, J. (2020) 'When data creates competitive advantage', HBR, 98(1).","Gregory, R.W. et al. (2021) 'The role of artificial intelligence and data network effects', Academy of Management Review, 46(3)."]};

C["Value Capture Map"]={
 def:"A Value Capture Map traces where, along a value chain or stack, margin actually accrues, distinguishing where value is created from where it is captured.",
 who:"Grounded in value-chain and value-capture theory, associated with strategy scholars including Porter and Brandenburger and Stuart.",
 why:"It was developed to ensure firms position themselves where value is captured, not merely created — a frequent failing in technology supply chains.",
 how:"Value creation and capture are mapped across the chain; strategy moves the firm toward the points of durable capture.",
 when:"During strategy and AI-stack positioning decisions.",
 whom:"Strategists, founders and corporate-development teams.",
 innov:"It separates value creation from value capture, explaining why some AI layers earn margin while others are commoditised.",
 sources:["Brandenburger, A.M. and Stuart, H.W. (1996) 'Value-based business strategy', Journal of Economics & Management Strategy, 5(1).","Porter, M.E. (1985) Competitive Advantage. New York: Free Press."]};

C["Data Asset Classification"]={
 def:"Data Asset Classification organises a firm's data by its origin and rights — owned, licensed, public or derived — clarifying what value can be captured from each and what obligations attach.",
 who:"A data-governance construct from information-management and data-strategy practice.",
 why:"It was developed to make explicit which data a firm may freely exploit, which carries licence or privacy constraints, and which is truly proprietary.",
 how:"Each data set is classified by origin and rights; value strategy and compliance follow from the classification.",
 when:"When treating data as IP and assessing data-based value and risk.",
 whom:"Data governance, legal and strategy teams.",
 innov:"It links data value directly to rights and provenance, preventing over-claiming of value from data the firm does not fully control.",
 sources:["DAMA International (2017) DAMA-DMBOK: Data Management Body of Knowledge. 2nd edn. Basking Ridge: Technics.","OECD (2019) Enhancing Access to and Sharing of Data. Paris: OECD."]};

C["Data Rights Stack"]={
 def:"The Data Rights Stack layers the rights associated with data — collection, use, sharing and licensing — clarifying the chain of permissions that governs how data can be exploited.",
 who:"A construct from data-governance and privacy practice, reflecting data-protection regimes such as the GDPR.",
 why:"It was developed to ensure that downstream uses of data, including AI training, rest on a valid chain of rights.",
 how:"Each layer of rights is verified for a given data set before it is used; gaps in the chain block or constrain exploitation.",
 when:"Before using data for AI training or productisation.",
 whom:"Legal, privacy and data teams.",
 innov:"It makes the often-implicit chain of data permissions explicit, reducing legal exposure in data-driven AI.",
 sources:["European Parliament and Council (2016) Regulation (EU) 2016/679 (GDPR).","OECD (2021) 'Mapping data portability initiatives, opportunities and challenges'."]};

C["Data Moat Strength"]={
 def:"Data Moat Strength assesses how defensible a data advantage is, by its uniqueness, scale and freshness, distinguishing fleeting data from a durable moat.",
 who:"A synthesis from data-strategy and competitive-advantage analysis of data assets.",
 why:"It was developed to test whether a data advantage will persist or be eroded as rivals acquire comparable data.",
 how:"A data asset is scored on uniqueness, scale and freshness; only data strong on all three constitutes a durable moat.",
 when:"When evaluating data-based defensibility.",
 whom:"Strategy, data and investment leaders.",
 innov:"It refines the notion of a 'data moat' into measurable attributes, avoiding overstated claims of data advantage.",
 sources:["Hagiu, A. and Wright, J. (2020) 'When data creates competitive advantage', HBR, 98(1).","Gregory, R.W. et al. (2021) 'AI and data network effects', AMR, 46(3)."]};

C["Privacy-Value Frontier"]={
 def:"The Privacy-Value Frontier expresses the trade-off between the value extractable from personal data and the privacy and compliance constraints that limit its use, identifying the efficient boundary.",
 who:"A construct from privacy-economics and responsible-data practice, informed by data-protection law.",
 why:"It was developed to help firms maximise legitimate data value without breaching privacy norms or law.",
 how:"Uses of data are placed against the frontier; the firm operates at the boundary that maximises value within compliance.",
 when:"When designing data-driven AI products subject to privacy regulation.",
 whom:"Privacy, legal and product teams.",
 innov:"It frames privacy not only as a constraint but as a boundary defining the efficient, lawful use of data for value.",
 sources:["Acquisti, A., Taylor, C. and Wagman, L. (2016) 'The economics of privacy', Journal of Economic Literature, 54(2).","European Parliament and Council (2016) Regulation (EU) 2016/679 (GDPR)."]};

C["Synthetic Data Trade-off"]={
 def:"The Synthetic Data Trade-off weighs the low cost and privacy benefits of artificially generated data against its potential loss of fidelity to real-world distributions.",
 who:"A construct from machine-learning practice as synthetic data became a common alternative to scarce or sensitive real data.",
 why:"It was developed to guide when synthetic data is a sound substitute and when it risks degrading model performance.",
 how:"For a use case, the cost and privacy gains of synthetic data are weighed against fidelity risk and validated against real data where possible.",
 when:"When sourcing training data under cost or privacy constraints.",
 whom:"ML engineering, data and privacy teams.",
 innov:"It frames synthetic data as a deliberate trade-off rather than a free substitute, guarding against silent model degradation.",
 sources:["Jordon, J. et al. (2022) 'Synthetic data — what, why and how?', Royal Society / The Alan Turing Institute.","Nikolenko, S.I. (2021) Synthetic Data for Deep Learning. Cham: Springer."]};

C["IP Protection Portfolio"]={
 def:"An IP Protection Portfolio combines patents, trade secrets, trademarks and other rights into a layered defence, recognising that no single instrument fully protects an AI business.",
 who:"A construct from intellectual-property strategy and management practice.",
 why:"It was developed because AI value spans models, data, methods and brand, each best protected by a different instrument.",
 how:"Each asset is matched to the most effective protection and the portfolio assembled to cover gaps and reinforce defensibility.",
 when:"When designing the overall IP strategy for an AI venture.",
 whom:"Legal, IP and executive leaders.",
 innov:"It treats protection as a coordinated portfolio rather than isolated filings, fitting the multi-faceted nature of AI value.",
 sources:["WIPO (2020) WIPO Technology Trends 2019: Artificial Intelligence. Geneva: WIPO.","Reitzig, M. (2004) 'Strategic management of intellectual property', MIT Sloan Management Review, 45(3)."]};

C["Licensing Models Map"]={
 def:"The Licensing Models Map arranges software and data licences from fully open and permissive through to restrictive and proprietary, clarifying the rights and obligations each entails.",
 who:"A construct from open-source and IP-licensing practice, reflecting licence taxonomies maintained by the Open Source Initiative.",
 why:"It was developed to help firms choose and comply with licences, since obligations differ sharply across the spectrum.",
 how:"Components and outputs are mapped to their licences; obligations (e.g. copyleft) are identified and managed before distribution.",
 when:"When using or distributing AI models, code and data.",
 whom:"Legal, engineering and compliance teams.",
 innov:"It makes the consequences of licence choice explicit, particularly important where AI code may inherit obligations from training data.",
 sources:["Open Source Initiative (2024) 'Licenses & Standards'.","Rosen, L. (2004) Open Source Licensing. Upper Saddle River: Prentice Hall."]};

C["Freedom-to-Operate Check"]={
 def:"A Freedom-to-Operate (FTO) check assesses whether a product can be commercialised without infringing third-party intellectual-property rights, reducing the risk of litigation.",
 who:"A standard IP-management practice used widely in technology and pharmaceutical commercialisation.",
 why:"It was developed to surface infringement risk before launch, when remedies are cheaper than after.",
 how:"Relevant third-party rights are searched and analysed; the product is cleared, designed around obstacles, or licences are sought.",
 when:"Before launching or scaling an AI product.",
 whom:"Legal, IP and product-launch teams.",
 innov:"It brings disciplined infringement diligence to fast-moving AI launches, where training data and methods create novel exposure.",
 sources:["WIPO (2020) 'Freedom to operate', WIPO guidance.","Cornish, W., Llewelyn, D. and Aplin, T. (2019) Intellectual Property. London: Sweet & Maxwell."]};

C["Open-Source Compliance Ladder"]={
 def:"The Open-Source Compliance Ladder orders open-source obligations by stringency — from permissive notice requirements to strong copyleft — guiding the compliance effort each licence demands.",
 who:"A construct from open-source-compliance practice, reflecting work by bodies such as the Linux Foundation's OpenChain project.",
 why:"It was developed to help organisations comply with open-source obligations, which scale with licence type and can affect proprietary code.",
 how:"Each component's licence is placed on the ladder and the corresponding obligations met before distribution.",
 when:"When incorporating open-source AI components into products.",
 whom:"Legal, engineering and compliance teams.",
 innov:"It clarifies the graduated nature of open-source obligations, helping avoid inadvertent copyleft exposure in AI products.",
 sources:["OpenChain Project (2022) ISO/IEC 5230: Open Source Compliance.","Fontana, R. et al. (2021) Open Source Compliance in the Enterprise. Linux Foundation."]};

C["AI Output Ownership Flow"]={
 def:"The AI Output Ownership Flow traces who owns content or code generated by an AI system, following the chain from training data and model terms through to user and provider agreements.",
 who:"A construct from technology-law practice responding to the ownership uncertainties of generative AI outputs.",
 why:"It was developed because ownership of AI-generated output is unsettled and depends on a chain of contracts and copyright rules.",
 how:"The flow follows model terms, input rights and user agreements to determine likely ownership and any encumbrances on output.",
 when:"When commercialising AI-generated content or code.",
 whom:"Legal, product and commercial teams.",
 innov:"It maps an emerging, contested area into a navigable flow, essential for capturing value from generative outputs safely.",
 sources:["US Copyright Office (2023) 'Copyright registration guidance: Works containing AI-generated material'.","Lee, J.-A., Hilty, R.M. and Liu, K.-C. (eds.) (2021) Artificial Intelligence and Intellectual Property. Oxford: OUP."]};

module.exports = C;
