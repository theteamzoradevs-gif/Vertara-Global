export type NanoGccStudyCategory =
  | "All Insights"
  | "Operating Models"
  | "Governance & Risk"
  | "Strategy & Scale"
  | "Technology & Engineering"
  | "Leadership & Change";

export interface NanoGccStudyContent {
  intro: string;
  paragraphs: string[];
  insideListTitle: string;
  insideList: string[];
  highlightQuote: string[];
  partnerSectionTitle: string;
  partnerSectionText: string;
  closingCallout: string;
}

export interface NanoGccStudy {
  id: string;
  slug: string;
  title: string;
  category: "Operating Models" | "Governance & Risk" | "Strategy & Scale" | "Technology & Engineering" | "Leadership & Change";
  readTime: string;
  excerpt: string;
  keyTakeaway: string;
  pdfFilename: string;
  pdfUrl: string;
  hasDetailPage?: boolean;
  content?: NanoGccStudyContent;
}

export const nanoGccStudies: NanoGccStudy[] = [
  {
    id: "nano-01",
    slug: "from-eor-to-entity",
    title: "From EOR to Entity: When Should Your Nano GCC Graduate?",
    category: "Operating Models",
    readTime: "6 min read",
    excerpt:
      "Most Nano GCCs start on an employer of record. The question isn't whether to create your own entity. It's when.",
    keyTakeaway:
      "The question facing leaders today is no longer, \"Should we stay on an EOR?\" It's \"Is our EOR still creating more flexibility than risk?\"",
    pdfFilename: "From EOR to Entity.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/From%20EOR%20to%20Entity.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "Most Nano GCCs start on an employer of record. The question isn't whether to create your own entity. It's when.",
      paragraphs: [
        "For most mid-market companies, an employer of record (EOR) is the natural way to launch a first capability center in India. It offers speed, low commitment, and an easy exit while the business tests whether the center will work. For a small team proving a new capability, it is often the smartest place to begin.",
        "But EOR was designed to employ people, not to house a capability center. As a Nano GCC matures, per-head fees keep climbing, control and intellectual property sit with a third party, and tax and labour-law questions become harder to ignore. The moment India becomes operationally important, EOR stops being a flexibility tool and starts becoming a constraint.",
        "This creates a timing decision that many leaders get wrong. Move too early, and a reversible experiment becomes a fixed commitment. Move too late, and costs, risk, and migration complexity compound quietly. For Nano GCCs that own code, data, and AI assets, the tipping point usually arrives earlier than expected.",
        "In this Point of View, Vertara Global explores when a Nano GCC should graduate from EOR to its own entity, and how to make the move without losing momentum or people.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why EOR is a launch vehicle, not a destination, and where it runs out",
        "The six signals that show your center is ready for its own entity",
        "A readiness scorecard and break-even view to time the move with confidence",
        "The hidden costs of moving too early, and of moving too late",
        "A practical roadmap for transitioning employees without disruption",
      ],
      highlightQuote: [
        "The question facing leaders today is no longer, \"Should we stay on an EOR?\"",
        "It's \"Is our EOR still creating more flexibility than risk?\"",
      ],
      partnerSectionTitle: "Transitioning from EOR to Dedicated Entity",
      partnerSectionText:
        "At Vertara Global, we help mid-market organizations design, time, and execute the move from EOR to entity, from structure and incorporation to people transition and year-two support. This perspective brings together the commercial, legal, and people considerations shaping that decision.",
      closingCallout:
        "Read the full paper to learn why headcount is a signal, not the trigger, and how to graduate your Nano GCC at the right time.",
    },
  },
  {
    id: "nano-02",
    slug: "insourcing-without-the-fight",
    title: "Insourcing Without the Fight",
    category: "Operating Models",
    readTime: "6 min read",
    excerpt:
      "The work is already offshore. The question is who owns it, and how you take it back without breaking what works.",
    keyTakeaway:
      "Vendors can transfer work. Only organisations can absorb knowledge.",
    pdfFilename: "Insourcing Without the Fight.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/Insourcing%20Without%20the%20Fight.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The work is already offshore. The question is who owns it, and how you take it back without breaking what works.",
      paragraphs: [
        "Most mid-market companies thinking about a first GCC are not starting from scratch. Application support, testing, cloud operations or data engineering often already sits with an IT services vendor, sometimes under a contract that has been renewed for years.",
        "Bringing that work into your own nano GCC can strengthen ownership of IP, speed up decisions and keep knowledge inside the business. But the move carries real risk. The vendor stands to lose revenue, its people are asked to train their replacements, and the contract rarely says how the handover should work. Handled badly, service slips and a long relationship ends in mistrust.",
        "In this Point of View, Vertara Global sets out how to insource as a planned capability transfer rather than a termination: moving scope in slices, proving readiness at each step, and giving the incumbent a reason to hand over well.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why more companies are bringing technology work in-house in 2026",
        "Why insourcing so often turns into a fight, and how to defuse it early",
        "A four-phase glide path with clear gates for moving each slice of work",
        "The contract clauses and commercial levers to review before the first conversation",
        "How to decide what your nano GCC should own and what a partner should keep",
        "Four mistakes that derail insourcing, and the questions every board should ask",
      ],
      highlightQuote: [
        "Vendors can transfer work.",
        "Only organisations can absorb knowledge.",
      ],
      partnerSectionTitle: "Planned Capability Transfer",
      partnerSectionText:
        "At Vertara Global, we help mid-market companies plan and run the move from outsourced delivery to owned capability, from contract review and transition design to building the team that will own the work. This perspective brings together the practical steps that help leaders insource without disrupting delivery or damaging the relationship.",
      closingCallout:
        "Read the full paper to learn how to move work into your own GCC on evidence, not on a calendar date, and keep a vendor that would still take your call.",
    },
  },
  {
    id: "nano-03",
    slug: "nano-gcc-paradox",
    title: "The Nano GCC Paradox",
    category: "Strategy & Scale",
    readTime: "5 min read",
    excerpt:
      "The next generation of GCCs won't be defined by headcount. They'll be defined by expertise density.",
    keyTakeaway:
      "The question facing leaders today is no longer, \"How many people do we need?\" It's \"What capabilities must we own, and who do we need to own them?\"",
    pdfFilename: "Nano GCC Paradox.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/Nano%20GCC%20Paradox.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The next generation of GCCs won't be defined by headcount. They'll be defined by expertise density.",
      paragraphs: [
        "For more than two decades, GCC success was measured by scale. Larger teams, bigger campuses, and expanding headcount were seen as the clearest indicators of value creation. But as AI reshapes the economics of knowledge work, many of the assumptions that fueled that growth are beginning to change.",
        "Today, organizations can achieve more with smaller, highly specialized teams than ever before. The advantage is shifting from the number of people employed to the quality of expertise, ownership, and decision-making embedded within a center. In other words, the future of GCCs may belong not to the largest operations, but to the most focused ones.",
        "This shift is creating a significant opportunity for mid-market companies. Historically, GCCs were viewed as a model reserved for large enterprises with the scale to justify substantial investments. AI, evolving talent models, and changing operating structures are lowering that barrier and opening the door to a new generation of GCCs built for impact rather than size.",
        "In this Point of View, Vertara Global explores the rise of the Nano GCC and why smaller, sharper, and AI-enabled centers may represent the next stage of GCC evolution.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why AI is transforming the traditional GCC talent pyramid",
        "The concept of expertise density and why it may become the new measure of GCC success",
        "How large-scale operating models can create hidden complexity and slower decision-making",
        "Why mid-market companies are increasingly adopting the GCC model",
        "The principles required to design and scale a high-impact Nano GCC",
      ],
      highlightQuote: [
        "The question facing leaders today is no longer, \"How many people do we need?\"",
        "It's \"What capabilities must we own, and who do we need to own them?\"",
      ],
      partnerSectionTitle: "Focus & Expertise Density",
      partnerSectionText:
        "At Vertara Global, we help organizations design and build focused, AI-ready Nano GCCs that deliver strategic capability, accelerate innovation, and create long-term business value. This perspective brings together the market shifts, emerging operating models, and leadership considerations shaping the future of GCCs.",
      closingCallout:
        "Read the full paper to explore why the next generation of GCCs will be smaller, sharper, and built around expertise rather than scale.",
    },
  },
  {
    id: "nano-04",
    slug: "nano-gccs-risk-management-strategy",
    title: "Nano GCCs: The New Hedge Against Talent, Geopolitical and Vendor Risk",
    category: "Governance & Risk",
    readTime: "6 min read",
    excerpt:
      "The next generation of GCC business cases will not be won on cost alone. They will be won on resilience.",
    keyTakeaway:
      "The most successful organizations are not eliminating risk. They are building operating models that allow them to manage it more effectively.",
    pdfFilename: "Nano GCCs Risk Management Strategy.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/Nano%20GCCs%20Risk%20Management%20Strategy.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The next generation of GCC business cases will not be won on cost alone. They will be won on resilience.",
      paragraphs: [
        "For years, organizations have evaluated GCCs primarily through the lens of efficiency, talent access, and operating leverage. Those advantages remain important, but boardrooms today are increasingly focused on a different set of questions: How dependent are we on third parties? What happens if critical talent becomes unavailable? How exposed are we to geopolitical disruption, regulatory change, or supplier concentration?",
        "As business environments become more volatile, operational resilience is emerging as a strategic priority. In this context, the role of a GCC is evolving. No longer viewed solely as a delivery engine, a well-designed GCC can provide something many organizations struggle to achieve through outsourced models alone: greater control over critical capabilities, intellectual property, talent, and decision-making.",
        "Yet resilience is not created simply by establishing a captive centre. Particularly at nano scale, organizations must carefully balance the risks a GCC helps mitigate against the risks it introduces. Key-person dependency, governance maturity, leadership depth, compliance oversight, and long-term sponsorship become just as important as cost and capability considerations.",
        "In this Point of View, Vertara Global examines why more organizations are evaluating Nano GCCs through a risk-management lens and how leaders can determine whether a captive model strengthens enterprise resilience or merely shifts risk from one part of the organization to another.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "How Nano GCCs can reduce exposure to vendor concentration, talent scarcity, and geopolitical uncertainty",
        "Why ownership of critical capabilities is becoming a strategic advantage",
        "The risks small GCCs introduce and the controls required to manage them effectively",
        "A board-level framework for assessing GCC-related risk and resilience",
        "The governance, talent, and operating model decisions that determine long-term success",
        "When a Nano GCC is the right strategic hedge, and when alternative models may offer greater value",
      ],
      highlightQuote: [
        "The most successful organizations are not eliminating risk.",
        "They are building operating models that allow them to manage it more effectively.",
      ],
      partnerSectionTitle: "Resilience-Driven Capability Models",
      partnerSectionText:
        "At Vertara Global, we help organizations evaluate, design, and build GCC models that balance growth, capability, and resilience. From operating model strategy and location selection to governance, talent, and ongoing oversight, we work with leadership teams to create centres that are built for sustainable business outcomes, not just scale.",
      closingCallout:
        "Read the full paper to explore how the right GCC strategy can enhance resilience, strengthen operational control, and create lasting competitive advantage in an increasingly uncertain world.",
    },
  },
  {
    id: "nano-05",
    slug: "neo-captive-gcc",
    title: "The Rise of the Neo-Captive GCC",
    category: "Operating Models",
    readTime: "6 min read",
    excerpt:
      "The future of GCCs will not be defined by what enterprises build themselves or outsource to others. It will be defined by what they choose to own.",
    keyTakeaway:
      "The question facing leadership teams is no longer: \"Should we build or outsource?\" It's: \"What capabilities must we own, and what can we orchestrate?\"",
    pdfFilename: "Neo-Captive GCC.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/Neo-Captive%20GCC.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The future of GCCs will not be defined by what enterprises build themselves or outsource to others. It will be defined by what they choose to own.",
      paragraphs: [
        "For decades, organizations faced a binary choice when building global capabilities: establish a fully owned captive centre or outsource work to a third-party provider. Each model offered clear advantages, but each came with equally significant trade-offs. Captives delivered control but required substantial investment, time, and leadership attention. Outsourcing provided speed and flexibility but often came at the cost of institutional knowledge, talent ownership, and long-term capability building.",
        "Today, that binary is breaking down.",
        "As AI reshapes the economics of knowledge work, specialized talent becomes scarcer, and mid-market companies increasingly pursue global capability strategies, enterprises are searching for a model that combines ownership with agility. The result is the emergence of a new operating model: the Neo-Captive GCC.",
        "A Neo-Captive enables organizations to retain ownership of the decisions that matter most, while leveraging specialist partners to accelerate setup, operations, and scale. It combines the governance and strategic control of a captive with the speed and flexibility traditionally associated with outsourcing.",
        "In this Point of View, Vertara Global explores why the Neo-Captive is emerging as the next stage in GCC evolution and how organizations can design capability centres that maximize ownership without inheriting unnecessary complexity.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why the traditional captive-versus-outsourcing debate no longer reflects how modern enterprises operate",
        "How AI, talent scarcity, and the rise of mid-market GCCs are creating demand for new delivery models",
        "The principles that define a successful Neo-Captive GCC",
        "How to determine which capabilities should be owned and which can be orchestrated through partners",
        "The governance structures, talent models, and operating frameworks required to avoid dependence while maintaining speed",
      ],
      highlightQuote: [
        "The question facing leadership teams is no longer: \"Should we build or outsource?\"",
        "It's: \"What capabilities must we own, and what can we orchestrate?\"",
      ],
      partnerSectionTitle: "Ownership and Orchestration",
      partnerSectionText:
        "At Vertara Global, we help organizations design, launch, and scale GCCs that combine strategic ownership with operational flexibility. This perspective outlines the framework, decision-making principles, and market forces shaping the rise of the Neo-Captive GCC.",
      closingCallout:
        "Read the full paper to discover why the next generation of GCCs will be built around ownership, orchestration, and enterprise control rather than a choice between traditional captives and outsourcing.",
    },
  },
  {
    id: "nano-06",
    slug: "the-engineering-nano-gcc",
    title: "The Engineering Nano GCC",
    category: "Technology & Engineering",
    readTime: "6 min read",
    excerpt:
      "Your India team can write the code. But can it own the product?",
    keyTakeaway:
      "The most successful engineering GCCs aren't designed around administration. They're designed around invention, and around the product capability the team will own.",
    pdfFilename: "The Engineering Nano GCC.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/The%20Engineering%20Nano%20GCC.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "Your India team can write the code. But can it own the product?",
      paragraphs: [
        "Most new GCCs in India now launch with product, engineering or R&D mandates. Yet many small engineering centres stall at the same point: they add capacity, but never become part of how the product is actually built.",
        "For a nano GCC of 20 to 200 people, the obstacles are rarely about hiring. They sit in questions most setup plans leave for later: who owns the invention, which tools engineers can reach, what technical data can cross borders, and how a small team earns a real place on the product roadmap.",
        "The best engineering nano GCCs are not built to cut engineering cost. They are built to increase engineering throughput, and that only happens when the centre owns something headquarters depends on.",
        "In this Point of View, Vertara Global introduces the Four Gates of an engineering nano GCC: Ownership, Access, Transfer and Integration. The paper shows how mid-market companies can design each gate into the operating model from day one, rather than discovering it at the first patent filing or audit.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why engineering nano GCCs need a different playbook from IT or operations centres",
        "How to protect IP and trade secrets when engineers sit in India and patents are filed abroad",
        "Why toolchain access and secure development environments are the hidden critical path",
        "What export controls mean for sharing code and design files across borders",
        "The mandate journey: how a small team moves from contributing to owning outcomes",
      ],
      highlightQuote: [
        "The most successful engineering GCCs aren't designed around administration.",
        "They're designed around invention, and around the product capability the team will own.",
      ],
      partnerSectionTitle: "Engineering-Specific Capability Blueprints",
      partnerSectionText:
        "At Vertara Global, engineering-specific GCC solutions are our core expertise. As practitioners who have built and run global capability centres, we've seen that the centres that thrive are the ones where IP, tooling, compliance and integration are part of the blueprint, not afterthoughts. This perspective brings those lessons together for leaders planning their first engineering centre.",
      closingCallout:
        "Read the full paper to learn how to turn a small engineering team into a larger, faster innovation engine that stays fully integrated with headquarters.",
    },
  },
  {
    id: "nano-07",
    slug: "the-gcc-problem-is-at-headquarters",
    title: "The GCC Problem Is at Headquarters",
    category: "Leadership & Change",
    readTime: "5 min read",
    excerpt:
      "For a nano GCC, the biggest risk is rarely in India. It is in how headquarters receives the team.",
    keyTakeaway:
      "The strongest GCCs aren’t defined only by the talent you hire. They’re defined by how your organisation receives it.",
    pdfFilename: "The GCC Problem Is at Headquarters.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/The%20GCC%20Problem%20Is%20at%20Headquarters.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "For a nano GCC, the biggest risk is rarely in India. It is in how headquarters receives the team.",
      paragraphs: [
        "When a Global Capability Centre stalls, most post-mortems look at India: attrition, a weak site leader, the wrong city or a slow hiring partner. Far less attention is paid to the organisation on the other side of the relationship.",
        "For a small GCC, that blind spot can be the most expensive mistake of all.",
        "Headquarters approves a GCC as a strategic decision, then often runs it as a procurement contract. The centre gets tickets instead of problems, cost targets instead of outcomes, and status calls instead of a seat at the table. A nano GCC of 20 to 200 people has no buffer against that reflex, and by year two it delivers exactly what it was treated as: a cheaper, slightly worse outsourcing contract.",
        "As more mid-market companies open centres in India, the gap between a fast-maturing ecosystem and the parent organisation is widening. The most successful GCCs are not only built well in India. They are received well at headquarters.",
        "In this Point of View, Vertara Global explores why so many nano GCCs fail at headquarters rather than in India, and what CEOs, CFOs, CTOs and functional leaders can do about it.",
      ],
      insideListTitle: "Inside, you’ll discover:",
      insideList: [
        "Why mid-market headquarters fall into the “vendor reflex”, and the everyday signals that reveal it",
        "Why nano GCCs are more exposed than large centres",
        "The year-two cliff: why most problems surface between months 12 and 24",
        "Five headquarters failure patterns, each with an early warning signal",
        "A four-step “our team” playbook and ten questions for the board",
      ],
      highlightQuote: [
        "The strongest GCCs aren’t defined only by the talent you hire.",
        "They’re defined by how your organisation receives it.",
      ],
      partnerSectionTitle: "Parent-Organisation Alignment & Reception",
      partnerSectionText:
        "At Vertara Global, we partner with organisations across every stage of the GCC journey, from the first business case and operating model to setup, scale and the critical second year. We work on both sides of the relationship: building the centre in India and preparing headquarters to receive it. This perspective brings together the change narrative, stakeholder alignment and adoption practices that help leadership teams turn a new centre into “our team”.",
      closingCallout:
        "Read the full paper to learn why your GCC’s success may depend more on headquarters than on India, and how a few leadership decisions in year one can prevent a costly cliff in year two.",
    },
  },
  {
    id: "nano-08",
    slug: "the-nano-run-billion-dollar-enterprise",
    title: "The Nano-Run Billion-Dollar Enterprise",
    category: "Strategy & Scale",
    readTime: "6 min read",
    excerpt:
      "What if the most effective GCC of the future isn't built with hundreds of people, but with a handful of exceptional talent empowered by AI?",
    keyTakeaway:
      "The future of GCCs may not be determined by how many people they employ. It may be determined by how effectively talent, technology, and governance work together.",
    pdfFilename: "The Nano Run Billion Dollar Enterprise.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/The%20Nano%20Run%20Billion%20Dollar%20Enterprise.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "What if the most effective GCC of the future isn't built with hundreds of people, but with a handful of exceptional talent empowered by AI?",
      paragraphs: [
        "For decades, scale in the GCC world has been measured in headcount. Larger teams meant greater capability, broader mandates, and stronger business impact.",
        "That assumption is now being challenged.",
        "A new generation of AI-native companies is reaching remarkable scale with teams that are a fraction of the size traditionally required. While GCCs operate under different constraints, the underlying question is becoming increasingly relevant: can a small, senior-led team deliver enterprise-grade outcomes when AI is embedded into the way work gets done?",
        "The answer is not simply about technology. It's about operating model design.",
        "In this Point of View, Vertara Global explores the rise of the \"nano-run\" enterprise and what it means for GCC leaders. The paper examines how organizations can rethink team structures, talent strategies, and governance models to create greater impact with smaller, highly skilled teams.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why AI-native organizations are redefining the relationship between scale and headcount",
        "How a senior-heavy GCC model can deliver disproportionate business value",
        "The critical difference between buying AI tools and achieving AI leverage",
        "Why governance, not technology, is the real enabler of sustainable AI-driven productivity",
        "A practical framework for evaluating whether a nano-run operating model can work for your organization",
      ],
      highlightQuote: [
        "The future of GCCs may not be determined by how many people they employ.",
        "It may be determined by how effectively talent, technology, and governance work together.",
      ],
      partnerSectionTitle: "Rethinking Scale and Headcount",
      partnerSectionText:
        "At Vertara Global, we help organizations design GCCs for the next era of growth, where capability is measured by outcomes rather than headcount. Having supported companies across strategy, operating model design, talent, AI, and GCC setup, we've seen that the most successful organizations are rethinking traditional assumptions about scale. This perspective brings together the key insights, opportunities, and risks leaders should consider as they build the next generation of GCCs.",
      closingCallout:
        "Read the full paper to explore how AI-enabled operating models could reshape the economics, structure, and future of Global Capability Centres.",
    },
  },
  {
    id: "nano-09",
    slug: "the-next-frontier-ai-first-gccs",
    title: "The Next Frontier: AI-First GCCs",
    category: "Technology & Engineering",
    readTime: "6 min read",
    excerpt:
      "The next generation of GCCs won't be defined by how much AI they use. They'll be defined by how they are built around it.",
    keyTakeaway:
      "The future of GCCs will not be determined by the number of AI tools deployed. It will be determined by how effectively organizations redesign work, empower talent, and govern AI at scale.",
    pdfFilename: "The Next Frontier AI First GCCs.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/The%20Next%20Frontier%20AI%20First%20GCCs.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The next generation of GCCs won't be defined by how much AI they use. They'll be defined by how they are built around it.",
      paragraphs: [
        "Over the past two decades, GCCs have evolved from cost-efficient delivery centres to strategic hubs driving innovation, product development, and enterprise transformation. Today, a new shift is underway: the emergence of the AI-first GCC.",
        "Yet many organizations are still approaching AI as a tool to layer onto existing processes. The leaders gaining real advantage are taking a different path. They're redesigning workflows, operating models, talent structures, and governance frameworks around AI from the outset.",
        "The opportunity is significant. As AI investment accelerates across the GCC ecosystem, the gap between AI adoption and measurable business impact is becoming increasingly apparent. The organizations that close that gap first will define the next era of global operations.",
        "In this Point of View, Vertara Global explores what it means to build an AI-first GCC and why the conversation must move beyond tools, pilots, and productivity metrics toward enterprise-wide transformation.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "The difference between an AI-enabled GCC and an AI-first GCC",
        "Why governance may prove more important than technology itself",
        "How AI is reshaping talent models, organizational design, and leadership mandates",
        "The operating principles required to scale AI responsibly",
        "A practical roadmap for transitioning from experimentation to enterprise ownership",
      ],
      highlightQuote: [
        "The future of GCCs will not be determined by the number of AI tools deployed.",
        "It will be determined by how effectively organizations redesign work, empower talent, and govern AI at scale.",
      ],
      partnerSectionTitle: "Building the AI-First GCC Blueprint",
      partnerSectionText:
        "At Vertara Global, we help organizations design and build GCCs that are ready for the next era of enterprise growth. From operating model design and talent strategy to AI governance and transformation, we work with leaders to turn AI ambition into measurable business outcomes. This perspective brings together the key insights, frameworks, and considerations shaping the rise of AI-first GCCs.",
      closingCallout:
        "Read the full paper to explore how AI-first operating models can unlock greater agility, productivity, and enterprise value, and why the next frontier of GCC evolution is already underway.",
    },
  },
  {
    id: "nano-10",
    slug: "when-does-a-company-actually-need-a-nano-gcc",
    title: "When Does a Company Actually Need a Nano GCC?",
    category: "Strategy & Scale",
    readTime: "6 min read",
    excerpt:
      "The decision to establish a GCC should not be driven by company size. It should be driven by business need.",
    keyTakeaway:
      "The question facing leadership teams is no longer: \"Are we big enough for a GCC?\" It's: \"Are we facing the business challenges that a GCC is uniquely positioned to solve?\"",
    pdfFilename: "When Does a Company Actually Need a Nano GCC.pdf",
    pdfUrl: "/documents/Nano%20GCC%20Strategy/When%20Does%20a%20Company%20Actually%20Need%20a%20Nano%20GCC.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The decision to establish a GCC should not be driven by company size. It should be driven by business need.",
      paragraphs: [
        "For years, organizations have viewed Global Capability Centers through the lens of scale. Conventional wisdom suggested that GCCs were the domain of large enterprises with substantial revenues, global operations, and thousands of employees. Smaller and mid-market organizations often assumed they were simply not ready.",
        "Today, that assumption is being challenged.",
        "As AI accelerates digital transformation, access to specialized talent becomes increasingly critical, and businesses seek greater control over strategic capabilities, organizations are discovering that the need for a GCC often emerges long before they reach traditional enterprise scale.",
        "The question is no longer whether a company is large enough to build a GCC. It is whether the business challenges it faces are significant enough to justify one.",
        "In this Point of View, Vertara Global explores the operational, talent, and strategic signals that indicate when a Nano GCC can create meaningful business value. Rather than focusing on revenue thresholds or employee counts, we introduce a practical framework for evaluating readiness based on business needs and organizational capability.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why revenue is often the wrong trigger for launching a GCC",
        "The key operational and strategic indicators that signal GCC readiness",
        "The common warning signs that suggest organizations should wait",
        "How to assess organizational preparedness using the Vertara GCC Readiness Index",
        "The different pathways available for companies at various stages of GCC maturity",
        "How leadership teams can avoid costly mistakes and build for long-term success",
      ],
      highlightQuote: [
        "The question facing leadership teams is no longer: \"Are we big enough for a GCC?\"",
        "It's: \"Are we facing the business challenges that a GCC is uniquely positioned to solve?\"",
      ],
      partnerSectionTitle: "Business Need and Readiness Evaluation",
      partnerSectionText:
        "At Vertara Global, we help organizations evaluate, design, and scale GCC strategies aligned to their growth ambitions and operating realities. This perspective provides leaders with a practical lens to determine whether the time is right to establish a Nano GCC and what it takes to succeed once the journey begins.",
      closingCallout:
        "Read the full paper to discover how leading organizations are moving beyond traditional size-based thinking and using business need, readiness, and strategic intent to determine when a Nano GCC makes sense.",
    },
  },
];

export function getNanoGccStudyBySlug(slug: string): NanoGccStudy | undefined {
  return nanoGccStudies.find((s) => s.slug === slug);
}

export function getNanoGccStudiesWithDetailPages(): NanoGccStudy[] {
  return nanoGccStudies.filter((s) => s.hasDetailPage);
}
