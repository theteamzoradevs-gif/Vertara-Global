export type InfrastructureStudyCategory =
  | "All Studies"
  | "Workplace & Real Estate"
  | "Location & Cities"
  | "Commercials & Cost"
  | "Scale & Operating Models";

export interface InfrastructureStudyContent {
  intro: string;
  paragraphs: string[];
  insideListTitle: string;
  insideList: string[];
  highlightQuote: string[];
  partnerSectionTitle: string;
  partnerSectionText: string;
  closingCallout: string;
}

export interface InfrastructureStudy {
  id: string;
  slug: string;
  title: string;
  category: "Workplace & Real Estate" | "Location & Cities" | "Commercials & Cost" | "Scale & Operating Models";
  readTime: string;
  excerpt: string;
  keyTakeaway: string;
  pdfFilename: string;
  pdfUrl: string;
  hasDetailPage?: boolean;
  content?: InfrastructureStudyContent;
}

export const infrastructureStudies: InfrastructureStudy[] = [
  {
    id: "study-01",
    slug: "a-small-team-needs-enterprise-grade-resilience",
    title: "A Small Team Needs Enterprise-Grade Resilience",
    category: "Workplace & Real Estate",
    readTime: "5 min read",
    excerpt:
      "A 25-person GCC can support a business process that impacts thousands. Yet many workplace decisions are still made as if headcount defines risk.",
    keyTakeaway:
      "The most resilient GCCs aren't necessarily the largest or most expensive. They're the ones that understand the consequences of failure and plan accordingly.",
    pdfFilename: "A Small Team Needs Enterprise Grade Resilience.pdf",
    pdfUrl: "/documents/infrastructure-studies/A Small Team Needs Enterprise Grade Resilience.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "A 25-person GCC can support a business process that impacts thousands. Yet many workplace decisions are still made as if headcount defines risk.",
      paragraphs: [
        "The reality is different. While a nano GCC may occupy a small footprint, it often owns critical processes that keep global operations running. When connectivity fails, power is disrupted, or an incident response plan doesn't exist, the consequences can extend far beyond the four walls of the office.",
        "The challenge isn't that disruptions happen. It's that many organizations plan their workplace around size rather than business impact.",
        "In this Point of View, Vertara Global explores why resilience should be measured by the cost of interruption, not the number of people in the office. From infrastructure dependencies and regulatory obligations to business continuity and recovery planning, the paper examines what it really takes to build a resilient GCC from day one.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why small GCCs often carry disproportionately large operational risk",
        "The workplace vulnerabilities that can disrupt critical business processes",
        "How to align resilience investments with business impact",
        "Practical frameworks for assessing workplace readiness before launch",
        "The key controls every GCC should verify, test, and own from day one",
      ],
      highlightQuote: [
        "The most resilient GCCs aren't necessarily the largest or most expensive.",
        "They're the ones that understand the consequences of failure and plan accordingly.",
      ],
      partnerSectionTitle: "Building Resilience from Day One",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from strategy and location selection to setup, scale, and transformation. Having helped organizations establish and grow GCCs across functions and geographies, we've seen that resilience is rarely about adding complexity. It's about identifying what matters most, validating assumptions, and building the right safeguards before they are needed. This perspective brings together the key lessons that help GCC leaders protect operations, maintain continuity, and scale with confidence.",
      closingCallout:
        "Read the full paper to learn why enterprise-grade resilience isn't optional for a small GCC and how the right workplace strategy can help prevent a local disruption from becoming a global business problem.",
    },
  },
  {
    id: "study-02",
    slug: "beyond-the-metro-shortlist",
    title: "Beyond the Metro Shortlist",
    category: "Location & Cities",
    readTime: "7 min read",
    excerpt:
      "The best GCC location isn't always the city at the top of the rankings. It's the place where your team can be hired, housed, and retained successfully.",
    keyTakeaway:
      "The most successful GCCs don't choose a location because it's popular. They choose it because it gives them the best chance of building the right team.",
    pdfFilename: "Beyond the Metro Shortlist.pdf",
    pdfUrl: "/documents/infrastructure-studies/Beyond the Metro Shortlist.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The best GCC location isn't always the city at the top of the rankings. It's the place where your team can be hired, housed, and retained successfully.",
      paragraphs: [
        "When organizations evaluate locations for a new GCC, the same metro cities often dominate the shortlist. The logic is understandable: larger talent pools, established ecosystems, and a proven track record of GCC success.",
        "But for a nano GCC, the decision is rarely about the size of the market.",
        "More often, success depends on a handful of critical hires, access to the right workplace, and the ability to scale without competing head-to-head with some of the world's largest employers. A city that looks ideal on paper may not be the best fit for the specific capability you're trying to build. Conversely, a less obvious location may offer a stronger talent proposition, lower attrition, and a more sustainable path to growth.",
        "In this Point of View, Vertara Global explores why location decisions should start with the work, not the rankings. The paper challenges traditional GCC location frameworks and provides a more practical approach for organizations building smaller, highly specialized teams.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why city rankings can be misleading for nano GCCs",
        "How to evaluate locations based on talent fit rather than market size",
        "The growing role of Tier II cities in GCC expansion strategies",
        "Why micro-markets matter more than city-wide statistics",
        "A practical framework for building a location shortlist that reflects business needs, not industry trends",
      ],
      highlightQuote: [
        "The most successful GCCs don't choose a location because it's popular.",
        "They choose it because it gives them the best chance of building the right team.",
      ],
      partnerSectionTitle: "Location Selection Driven by Business Outcomes",
      partnerSectionText:
        "At Vertara Global, we help organizations make location decisions through the lens of business outcomes, talent access, workplace strategy, and long-term scalability. Having supported GCCs across industries and stages of growth, we've seen that the strongest location strategies begin with understanding the capability being built, not simply following where others have gone. This perspective brings together the key questions, frameworks, and lessons that help organizations make smarter location decisions from day one.",
      closingCallout:
        "Read the full paper to learn why the right GCC location may be beyond the usual metro shortlist and how to build a location strategy that aligns with your talent and growth ambitions.",
    },
  },
  {
    id: "study-03",
    slug: "cost-per-seat-is-the-wrong-number",
    title: "Cost per Seat Is the Wrong Number",
    category: "Commercials & Cost",
    readTime: "6 min read",
    excerpt:
      "The cheapest office isn't always the lowest-cost option. Sometimes it's the most expensive decision you can make.",
    keyTakeaway:
      "The most effective workplace decisions aren't driven by the lowest price. They're driven by the value each workplace enables the business to create.",
    pdfFilename: "Cost per Seat Is the Wrong Number.pdf",
    pdfUrl: "/documents/infrastructure-studies/Cost per Seat Is the Wrong Number.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The cheapest office isn't always the lowest-cost option. Sometimes it's the most expensive decision you can make.",
      paragraphs: [
        "When evaluating workspace options, many GCC leaders focus on a single metric: cost per seat. Quotes are compared, spreadsheets are updated, and the lowest number often wins.",
        "But a seat rate only tells part of the story.",
        "The real question isn't what a desk costs. It's what it costs to support productive work. Meeting room availability, collaboration spaces, after-hours access, privacy requirements, technology infrastructure, and peak-day capacity can all have a greater impact on value than the monthly seat price itself.",
        "As GCCs increasingly turn to managed and flexible workspaces, traditional cost comparisons are becoming less reliable. Two offices with similar occupancy costs can deliver vastly different employee experiences, productivity outcomes, and long-term value.",
        "In this Point of View, Vertara Global explores why cost per seat is often the wrong metric for evaluating workplace decisions and introduces a more practical approach to assessing the true cost of occupancy.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why headline seat rates rarely reflect the full cost of a workplace",
        "The hidden expenses that often sit outside the initial quote",
        "How productivity, collaboration, and capacity influence real occupancy costs",
        "Why peak-day requirements matter more than average utilization",
        "A practical framework for comparing workplace options on a like-for-like basis",
      ],
      highlightQuote: [
        "The most effective workplace decisions aren't driven by the lowest price.",
        "They're driven by the value each workplace enables the business to create.",
      ],
      partnerSectionTitle: "Evaluating True Occupancy Value",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from strategy and location selection to workplace setup, scale, and transformation. Having supported companies in evaluating and launching GCC operations, we've seen that the best decisions come from understanding how people actually work, not simply what space costs. This perspective brings together the key considerations and frameworks that help leaders make workplace investments with confidence.",
      closingCallout:
        "Read the full paper to learn why cost per productive seat may be the metric that matters most and how to avoid making a workplace decision based on the wrong number.",
    },
  },
  {
    id: "study-04",
    slug: "designing-for-20-planning-for-100",
    title: "Designing for 20, Planning for 100",
    category: "Scale & Operating Models",
    readTime: "6 min read",
    excerpt:
      "Most GCCs don't get workplace planning wrong because they underestimate growth. They get it wrong because they plan for the destination instead of the journey.",
    keyTakeaway:
      "The best workplace strategies aren't designed for the headcount you hope to reach. They're designed to support the growth journey that gets you there.",
    pdfFilename: "Designing for 20 Planning for 100.pdf",
    pdfUrl: "/documents/infrastructure-studies/Designing for 20 Planning for 100.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "Most GCCs don't get workplace planning wrong because they underestimate growth. They get it wrong because they plan for the destination instead of the journey.",
      paragraphs: [
        "A new GCC may launch with 20 employees, but business plans often project 100 or more within a few years. Faced with that ambition, many organizations make one of two mistakes: they either build for future scale too early and pay for capacity they don't need, or they optimize for today and find themselves scrambling for space sooner than expected.",
        "The challenge is that growth rarely happens in a straight line.",
        "Hiring plans evolve, mandates expand, and workplace requirements change as functions mature. The most successful GCCs don't treat office sizing as a one-time decision. They build a workplace strategy that can evolve alongside the business.",
        "In this Point of View, Vertara Global explores how organizations can balance today's needs with tomorrow's ambitions by designing workplaces that support immediate operations while enabling future growth without unnecessary cost or disruption.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why sizing an office based solely on current or future headcount can be equally costly",
        "How peak demand often matters more than average utilization",
        "The benefits of a staged workplace strategy as teams scale",
        "The infrastructure decisions that should be made early and the ones that can wait",
        "A practical framework for expanding workspace in line with business growth",
      ],
      highlightQuote: [
        "The best workplace strategies aren't designed for the headcount you hope to reach.",
        "They're designed to support the growth journey that gets you there.",
      ],
      partnerSectionTitle: "Balancing Flexibility and Long-Term Scale",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from location strategy and workplace planning to setup, scale, and expansion. Having worked with GCCs at different stages of maturity, we've seen that the most effective workplace decisions balance flexibility, cost efficiency, and long-term growth. This perspective brings together the key lessons and practical considerations that help organizations scale confidently while avoiding costly real estate decisions.",
      closingCallout:
        "Read the full paper to learn how to design for today's team while building a workplace strategy that's ready for tomorrow's growth.",
    },
  },
  {
    id: "study-05",
    slug: "from-incubation-space-to-permanent-home",
    title: "From Incubation Space to Permanent Home",
    category: "Workplace & Real Estate",
    readTime: "8 min read",
    excerpt:
      "Most GCCs don't move into a permanent office because they're ready. They move because the calendar tells them to.",
    keyTakeaway:
      "The most successful GCCs don't treat incubation as a waiting period. They treat it as a learning phase, using real data and operational insights to define what their future workplace should look like.",
    pdfFilename: "From Incubation Space to Permanent Home.pdf",
    pdfUrl: "/documents/infrastructure-studies/From Incubation Space to Permanent Home.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "Most GCCs don't move into a permanent office because they're ready. They move because the calendar tells them to.",
      paragraphs: [
        "A lease renewal is approaching. The team is growing. The office feels crowded on certain days. Before long, the search for a larger, permanent workplace begins.",
        "But are these the right signals?",
        "For many nano GCCs, the first office is designed as an incubation space. Yet the decision to move often stems from contract timelines, budget cycles, or short-term capacity concerns rather than a clear assessment of business needs. The result can be unnecessary costs, underutilized space, and a workplace that no longer aligns with how the organization operates.",
        "In this Point of View, Vertara Global explores one of the most overlooked questions in GCC growth: How do you know when you're truly ready to move from incubation to a permanent home?",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why many GCCs move too early, or for the wrong reasons",
        "The signals leaders should track before committing to a long-term space",
        "The hidden costs often overlooked in move-versus-stay decisions",
        "Why managed offices are increasingly becoming a long-term strategy, not just a temporary solution",
        "A practical framework for evaluating when, why, and how to make the move",
      ],
      highlightQuote: [
        "The most successful GCCs don't treat incubation as a waiting period.",
        "They treat it as a learning phase, using real data and operational insights to define what their future workplace should look like.",
      ],
      partnerSectionTitle: "Evidence-Driven Workplace Transitions",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from location strategy and workplace selection to setup, scale, and expansion. Having worked with GCCs at different stages of growth, we've seen that the best workplace decisions are driven by evidence, not timelines. This perspective brings together the key considerations and lessons that help organizations move once, move well, and move at the right time.",
      closingCallout:
        "Read the full paper to learn how to turn your incubation space into a launchpad for long-term GCC success.",
    },
  },
  {
    id: "study-06",
    slug: "managed-office-or-your-own-space",
    title: "Managed Office or Your Own Space? The GCC Decision Leaders Need to Get Right",
    category: "Scale & Operating Models",
    readTime: "7 min read",
    excerpt:
      "For organizations establishing a Global Capability Centre (GCC), choosing the right workspace is often one of the first major decisions and one of the most underestimated.",
    keyTakeaway:
      "The question isn't simply where your GCC should start. It's whether your workspace strategy is helping you scale faster, smarter, and with less risk.",
    pdfFilename: "Managed Office or Your Own Space.pdf",
    pdfUrl: "/documents/infrastructure-studies/Managed Office or Your Own Space.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "For organizations establishing a Global Capability Centre (GCC), choosing the right workspace is often one of the first major decisions and one of the most underestimated.",
      paragraphs: [
        "Conventional wisdom suggests that leasing your own office delivers better long-term economics, while managed offices offer speed and flexibility. But is the answer really that simple?",
        "As India's GCC landscape continues to expand, leading organizations are taking a more strategic view. Beyond rent comparisons, factors such as upfront investment, scalability, operational readiness, governance, and business flexibility can significantly influence the true cost and value of each model.",
        "In this Point of View, Vertara Global explores the real trade-offs between managed offices and leased spaces, challenging common assumptions and providing a practical framework for decision-making.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "The hidden costs often overlooked in workspace evaluations",
        "When a managed office creates stronger business value",
        "When leasing begins to make financial sense",
        "How GCC leaders can align real estate choices with growth strategy",
      ],
      highlightQuote: [
        "The question isn't simply where your GCC should start.",
        "It's whether your workspace strategy is helping you scale faster, smarter, and with less risk.",
      ],
      partnerSectionTitle: "Strategic Workspace Decision-Making",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of their GCC journey, from strategy and location selection to setup and scale. Having worked with GCCs of varying sizes and maturity levels, we've seen that workspace decisions extend far beyond real estate. They influence speed-to-launch, cost efficiency, scalability, talent experience, and long-term business outcomes. This perspective brings together the key considerations and lessons shaping successful GCC workplace strategies today.",
      closingCallout:
        "Read the full paper to uncover the factors that should shape your GCC real estate decisions today and in the years ahead.",
    },
  },
  {
    id: "study-07",
    slug: "the-20-seat-lease-trap",
    title: "The 20-Seat Lease Trap",
    category: "Commercials & Cost",
    readTime: "5 min read",
    excerpt:
      "The biggest real estate mistake a nano GCC can make isn't choosing the wrong office. It's signing a lease that assumes the future will unfold exactly as planned.",
    keyTakeaway:
      "The most successful GCCs don't lease space solely for the team they have today. They secure options for the business they may become tomorrow.",
    pdfFilename: "The 20 Seat Lease Trap.pdf",
    pdfUrl: "/documents/infrastructure-studies/The 20 Seat Lease Trap.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The biggest real estate mistake a nano GCC can make isn't choosing the wrong office. It's signing a lease that assumes the future will unfold exactly as planned.",
      paragraphs: [
        "Most GCCs start with a modest team and an ambitious growth roadmap. A 20-seat office feels like the right fit today. But what happens when a new workstream lands, hiring accelerates, or business priorities shift six months later?",
        "Too often, organizations optimize for the lowest monthly cost without considering the cost of growth, flexibility, or change. The result is a familiar cycle: outgrowing the space sooner than expected, scrambling for additional capacity, or facing an expensive and disruptive relocation.",
        "In this Point of View, Vertara Global explores why the first office should be viewed not just as a workspace, but as a strategic decision that shapes a GCC's ability to scale. The paper examines how lease structures, expansion rights, and exit terms can have a far greater impact on long-term outcomes than rent alone.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why fast-growing GCCs often outgrow their leases before they outgrow their strategy",
        "The hidden risks of optimizing solely for cost",
        "Why flexibility should be treated as a business investment, not a premium expense",
        "How to evaluate expansion, contraction, and exit scenarios before signing",
        "Practical strategies for aligning workplace commitments with growth uncertainty",
      ],
      highlightQuote: [
        "The most successful GCCs don't lease space solely for the team they have today.",
        "They secure options for the business they may become tomorrow.",
      ],
      partnerSectionTitle: "Strategic Workplace Decisions",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from location strategy and workplace selection to setup, scale, and expansion. Having supported companies building and growing GCCs across India, we've seen that the best workplace decisions balance cost, flexibility, and future growth. This perspective brings together the key considerations, frameworks, and lessons that help organizations avoid costly real estate missteps and scale with confidence.",
      closingCallout:
        "Read the full paper to learn why the smartest lease isn't always the cheapest one and how the right flexibility today can prevent expensive decisions tomorrow.",
    },
  },
  {
    id: "study-08",
    slug: "the-commute-tax",
    title: "The Commute Tax",
    category: "Location & Cities",
    readTime: "6 min read",
    excerpt:
      "The office may fit your budget. But can your people get there without paying the price?",
    keyTakeaway:
      "The most successful GCCs don't start by choosing a building. They start by understanding where their talent is and how people will get to work.",
    pdfFilename: "The Commute Tax.pdf",
    pdfUrl: "/documents/infrastructure-studies/The Commute Tax.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The office may fit your budget. But can your people get there without paying the price?",
      paragraphs: [
        "When organizations choose a location for a new GCC, the decision is often driven by rent, availability, and lease terms. Yet one of the most important factors rarely appears in the business case: the daily commute.",
        "For employees, the journey to work is more than travel time. It influences job acceptance, office attendance, collaboration, and ultimately retention. For a nano GCC, where every hire matters, a poor location decision can quietly become a talent challenge.",
        "As India's leading GCC hubs continue to grow, congestion, longer travel times, and concentrated talent markets are making location strategy more complex than ever. The lowest-cost office isn't always the lowest-cost outcome.",
        "In this Point of View, Vertara Global explores why commute should be treated as a strategic business consideration, not an afterthought. The paper examines how organizations can evaluate locations through the lens of talent access, employee experience, and long-term growth rather than occupancy costs alone.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why commute has become a critical factor in workplace strategy",
        "The hidden costs of choosing a location based solely on rent",
        "How journey times can influence hiring, engagement, and retention",
        "Practical ways to assess talent catchments before selecting a site",
        "A framework for balancing cost, accessibility, and business needs",
      ],
      highlightQuote: [
        "The most successful GCCs don't start by choosing a building.",
        "They start by understanding where their talent is and how people will get to work.",
      ],
      partnerSectionTitle: "People-Centered Location Strategies",
      partnerSectionText:
        "At Vertara Global, we help organizations make location decisions that balance talent access, operational needs, workplace costs, and future growth. Having supported companies through every stage of the GCC lifecycle, we've seen that the strongest location strategies are built around people, not postcodes. This perspective brings together the key considerations and practical lessons that help leaders make smarter workplace decisions from day one.",
      closingCallout:
        "Read the full paper to learn why the true cost of an office extends far beyond rent and how the right location can become a competitive advantage in attracting and retaining talent.",
    },
  },
  {
    id: "study-09",
    slug: "the-first-office-is-a-talent-decision",
    title: "The First Office Is a Talent Decision",
    category: "Scale & Operating Models",
    readTime: "6 min read",
    excerpt:
      "When organizations launch a new Global Capability Centre (GCC), the first office is often viewed as a real estate decision. In reality, it may be one of the most important talent decisions leaders make.",
    keyTakeaway:
      "The most successful GCCs don't treat the office as a place to house employees. They treat it as an extension of their employer brand.",
    pdfFilename: "The First Office Is a Talent Decision.pdf",
    pdfUrl: "/documents/infrastructure-studies/The First Office Is a Talent Decision.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "When organizations launch a new Global Capability Centre (GCC), the first office is often viewed as a real estate decision. In reality, it may be one of the most important talent decisions leaders make.",
      paragraphs: [
        "For a nano GCC, the workplace is often the first tangible proof candidates, employees, and headquarters stakeholders see of the company's commitment to its India operations. Long before culture is experienced or career opportunities are realized, people form impressions from the office itself: the interview experience, the commute, the work environment, and the ease of connecting with global teams.",
        "Yet many organizations still evaluate their first office primarily on cost, location, and seat count.",
        "As competition for GCC talent intensifies, leading organizations are taking a different approach. They recognize that workplace decisions can influence employer brand, employee experience, productivity, and retention. The question is no longer simply, \"What office can we afford?\" but rather, \"What experience are we creating for the people we want to attract and retain?\"",
        "In this Point of View, Vertara Global explores why the first workplace should be considered part of the employer proposition and how organizations can evaluate office decisions through a talent lens rather than a real estate lens alone.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why the first office plays a critical role in shaping candidate and employee perceptions",
        "How workplace friction can create hidden costs that far exceed rent savings",
        "The key moments that should guide workplace selection and design",
        "Practical frameworks for balancing cost, experience, flexibility, and growth",
        "How nano GCCs can compete for talent without competing on scale alone",
      ],
      highlightQuote: [
        "The most successful GCCs don't treat the office as a place to house employees.",
        "They treat it as an extension of their employer brand.",
      ],
      partnerSectionTitle: "Workplace as an Employer Proposition",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of their GCC journey, from strategy and location selection to setup and scale. Having worked with GCCs of varying sizes and maturity levels, we've seen that workplace decisions influence far more than occupancy costs. They shape candidate perceptions, employee engagement, productivity, and long-term growth. This perspective brings together the key considerations and lessons shaping successful GCC workplace strategies today.",
      closingCallout:
        "Read the full paper to learn why your first office may be the most important talent investment your GCC makes.",
    },
  },
  {
    id: "study-10",
    slug: "the-half-empty-office",
    title: "The Half-Empty Office",
    category: "Workplace & Real Estate",
    readTime: "5 min read",
    excerpt:
      "Your office may look half empty on paper and still be running out of space where it matters most.",
    keyTakeaway:
      "The most effective workplace strategies aren't built around averages. They're built around the moments that matter most to employees and the business.",
    pdfFilename: "The Half Empty Office.pdf",
    pdfUrl: "/documents/infrastructure-studies/The Half Empty Office.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "Your office may look half empty on paper and still be running out of space where it matters most.",
      paragraphs: [
        "For many GCC leaders, workplace decisions are guided by utilization reports and occupancy metrics. But averages can be deceiving. A workspace showing 50% utilization across a month can still struggle to accommodate employees on peak collaboration days, creating friction long before traditional metrics signal a problem.",
        "As hybrid work patterns become more predictable, demand is increasingly concentrated around specific days and team interactions. The challenge is no longer understanding how much office space is being used. It's understanding when, where, and why capacity constraints emerge.",
        "In this Point of View, Vertara Global explores one of the most overlooked workplace challenges facing growing GCCs: the gap between average utilization and actual employee experience.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why average occupancy figures often hide emerging capacity issues",
        "The workplace metrics leaders should monitor instead of relying on utilization alone",
        "How hybrid work is changing office planning decisions",
        "Practical ways to identify capacity risks before they impact growth",
        "A simple framework for turning workplace data into timely business decisions",
      ],
      highlightQuote: [
        "The most effective workplace strategies aren't built around averages.",
        "They're built around the moments that matter most to employees and the business.",
      ],
      partnerSectionTitle: "Dynamic Workplace Planning",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from location strategy and workplace selection to setup, scale, and expansion. Having worked with GCCs of varying sizes and maturity levels, we've seen that successful workplace planning depends as much on future growth, employee experience, and operational readiness as it does on occupancy data. This perspective brings together the key insights leaders need to make better workplace decisions before capacity challenges become business challenges.",
      closingCallout:
        "Read the full paper to learn why the busiest day in your office matters far more than the average month.",
    },
  },
  {
    id: "study-11",
    slug: "the-hidden-cost-of-moving-twice",
    title: "The Hidden Cost of Moving Twice",
    category: "Commercials & Cost",
    readTime: "7 min read",
    excerpt:
      "The costliest GCC move isn't the first one. It's the second one you didn't plan for.",
    keyTakeaway:
      "The most successful GCCs don't view their first office as a standalone decision. They view it as the first phase of a long-term workplace strategy.",
    pdfFilename: "The Hidden Cost of Moving Twice.pdf",
    pdfUrl: "/documents/infrastructure-studies/The Hidden Cost of Moving Twice.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "The costliest GCC move isn't the first one. It's the second one you didn't plan for.",
      paragraphs: [
        "Many nano GCCs launch in a managed office with the expectation that they'll move into a permanent space once the team grows. The move itself isn't the challenge. Failing to plan for it is.",
        "In an increasingly competitive office market, finding and securing the right long-term workplace can take far longer than most growth plans anticipate. By the time teams outgrow their first office, many organizations discover that expansion, relocation, and exit costs have already been locked in by decisions made months earlier.",
        "In this Point of View, Vertara Global explores why the true cost of a workplace strategy isn't reflected in the first contract, but in the flexibility, timing, and options it creates for the future.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why the \"temporary\" office often lasts longer than expected",
        "The hidden costs that emerge when growth outpaces workspace capacity",
        "How contract terms can determine the cost of future moves",
        "Practical strategies to reduce disruption, delay, and unnecessary spend",
        "A framework for planning the second move before signing the first agreement",
      ],
      highlightQuote: [
        "The most successful GCCs don't view their first office as a standalone decision.",
        "They view it as the first phase of a long-term workplace strategy.",
      ],
      partnerSectionTitle: "Long-Term Real Estate Strategy",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from location strategy and workplace selection to setup, scale, and expansion. Having supported GCCs at different stages of growth, we've seen that the right workplace decisions are rarely about securing space. They're about preserving flexibility, reducing risk, and enabling future growth. This perspective brings together the key lessons for planning that journey from day one.",
      closingCallout:
        "Read the full paper to learn how planning your second move today can save significant cost, time, and disruption tomorrow.",
    },
  },
  {
    id: "study-12",
    slug: "what-a-nano-gcc-needs-from-its-landlord",
    title: "What a Nano GCC Needs From Its Landlord",
    category: "Scale & Operating Models",
    readTime: "6 min read",
    excerpt:
      "For a nano GCC, the landlord isn't just a real estate provider. They're part of your operating model.",
    keyTakeaway:
      "The best workplace decisions aren't based solely on the space you occupy. They're based on the support, resilience, and accountability that come with it.",
    pdfFilename: "What a Nano GCC Needs From Its Landlord.pdf",
    pdfUrl: "/documents/infrastructure-studies/What a Nano GCC Needs From Its Landlord.pdf",
    hasDetailPage: true,
    content: {
      intro:
        "For a nano GCC, the landlord isn't just a real estate provider. They're part of your operating model.",
      paragraphs: [
        "When organizations evaluate office space, most of the focus goes into location, cost, fit-out, and floor plans. Far less attention is paid to the party responsible for keeping the workplace running once the lease is signed.",
        "For a small GCC, that oversight can become an expensive mistake.",
        "A power outage, a connectivity failure, restricted after-hours access, or the inability to expand quickly can disrupt operations far more than the office itself. Yet many of these risks stem not from the building, but from assumptions about what the landlord or operator will provide.",
        "As India's GCC market continues to grow and high-quality office space becomes increasingly competitive, organizations have less room to negotiate after signing. The most successful GCCs understand that the quality of their landlord relationship can be just as important as the quality of the workspace.",
        "In this Point of View, Vertara Global explores why landlord diligence should be treated with the same importance as site selection. The paper outlines the commitments, service levels, and contractual protections that GCC leaders should secure before moving in.",
      ],
      insideListTitle: "Inside, you'll discover:",
      insideList: [
        "Why landlord evaluation is a critical part of GCC risk management",
        "The operational vulnerabilities hidden behind attractive office spaces",
        "The service commitments every GCC should have documented",
        "How to assess power, connectivity, access, and growth readiness",
        "A practical framework for negotiating flexibility and avoiding future surprises",
      ],
      highlightQuote: [
        "The best workplace decisions aren't based solely on the space you occupy.",
        "They're based on the support, resilience, and accountability that come with it.",
      ],
      partnerSectionTitle: "Operational Diligence & Resilience",
      partnerSectionText:
        "At Vertara Global, we partner with organizations across every stage of the GCC journey, from location strategy and workplace selection to setup, scale, and expansion. Having supported companies building GCCs across a range of industries, we've seen that many workplace challenges can be avoided through better planning and stronger commercial protections from day one. This perspective brings together the key lessons and practical considerations that help GCC leaders build operational resilience from the moment they sign the agreement.",
      closingCallout:
        "Read the full paper to learn why choosing the right landlord may be as important as choosing the right office and how a few critical decisions today can prevent costly disruptions tomorrow.",
    },
  },
];

export function getInfrastructureStudyBySlug(slug: string): InfrastructureStudy | undefined {
  return infrastructureStudies.find((s) => s.slug === slug);
}

export function getStudiesWithDetailPages(): InfrastructureStudy[] {
  return infrastructureStudies.filter((s) => s.hasDetailPage);
}

