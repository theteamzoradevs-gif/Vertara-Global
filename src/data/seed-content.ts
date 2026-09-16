export type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

export const seedSettings = {
  brandName: "Veratara Global",
  tagline: "Build, staff, and scale Global Capability Centers in India",
  heroHeadline: "Your GCC in India — designed, staffed, and scaled with clarity",
  heroSubheadline:
    "We help CHROs, COOs, and Heads of Global Operations set up high-performing Global Capability Centers — talent, workspace, operations, and advisory — as one connected system.",
  contactEmail: "hello@gccadvisor.com",
  contactPhone: "+91 80 4000 1200",
  metrics: [
    { label: "GCCs established", value: 85, suffix: "+" },
    { label: "Enterprise clients", value: 210, suffix: "+" },
    { label: "Professionals placed", value: 12000, suffix: "+" },
    { label: "Years of experience", value: 12, suffix: "+" },
  ] as Metric[],
  trustPopImage: "/images/workspace-blue.webp",
  trustPopHeadline: "Trusted by enterprises building lasting India capability",
  aboutStory:
    "Veratara Global was founded by operators who have built and scaled India capability centers from the inside — not decks, but delivery. We combine talent, workspace, business operations, and strategic advisory into one accountable partnership so enterprises can move from intent to a live, high-performing GCC without stitching together a dozen vendors.",
  aboutMission:
    "Make India GCC setup predictable for enterprise buyers: clear ownership, honest timelines, and a single operating rhythm from first hire to steady-state scale.",
  leadership: [
    {
      name: "Asha Mehra",
      role: "Managing Partner",
      bio: "Former GCC head for a Fortune 200 financial services firm; 15+ years building offshore capability.",
      image:
          "/images/talent-team.webp",
    },
    {
      name: "Rohan Kapoor",
      role: "Partner, Talent & Operations",
      bio: "Scaled hiring and HR ops across Tier-1 Indian cities for multiple captive centers.",
      image:
          "/images/workspace-collab.jpg",
    },
    {
      name: "Priya Nair",
      role: "Partner, Advisory",
      bio: "Location strategy, org design, and board-ready business cases for GCC investments.",
      image:
          "/images/gcc-floor.webp",
    },
  ],
};

export const seedServices = [
  {
    slug: "talent",
    name: "Talent Solutions",
    shortDescription:
      "Employer branding, sourcing, screening, and onboarding pipelines built for GCC-scale hiring.",
    valueProposition:
      "Build durable India talent engines — leadership first, then waves of specialists — without losing culture or quality.",
    icon: "users",
    image: "/images/talent-team.webp",
    order: 1,
    metrics: [
      { label: "Professionals placed", value: 12000, suffix: "+" },
      { label: "Avg. time-to-offer", value: 18, suffix: " days" },
      { label: "Leadership hires", value: 420, suffix: "+" },
    ],
    processSteps: [
      {
        number: "01",
        title: "Strategy",
        summary: "Role architecture, city mix, and employer brand narrative.",
        detail:
          "We define capability maps, career bands, and a hiring plan aligned to your parent-org culture — including which roles must be leadership-first vs wave-based.",
        image:
          "/images/gcc-ops.png",
      },
      {
        number: "02",
        title: "Setup",
        summary: "Pipelines, scorecards, and interview loops ready to run.",
        detail:
          "Sourcing channels, screening rubrics, panel training, and ATS/workflow integration so every hire is comparable and auditable.",
        image:
          "/images/workspace-blue.webp",
      },
      {
        number: "03",
        title: "Launch",
        summary: "First leadership and seed teams productive.",
        detail:
          "Centre head, talent lead, and initial IC cohorts join with structured onboarding, buddy systems, and parent-side access from week one.",
        image:
          "/images/workspace-vibrant.jpg",
      },
      {
        number: "04",
        title: "Scale",
        summary: "Predictable ramps with retention guardrails.",
        detail:
          "Wave planning, referral engines, and retention programmes keep quality high as headcount moves from tens to hundreds.",
        image:
          "/images/talent-team.webp",
      },
    ],
    subServices: [
      {
        title: "Leadership & specialist hiring",
        summary: "Centre heads, domain leads, and scarce skill profiles.",
        detail:
          "Executive search-grade processes for critical roles, plus deep pipelines for engineering, AI/ML, finance ops, and product.",
      },
      {
        title: "Employer branding",
        summary: "India-facing careers narrative that attracts the right talent.",
        detail:
          "Positioning, careers site messaging, and campus/community programmes aligned to your parent brand.",
      },
      {
        title: "Onboarding & assimilation",
        summary: "From offer to productive contributor without culture drift.",
        detail:
          "Structured 30-60-90 plans, security/access readiness, and parent-team immersion rituals.",
      },
      {
        title: "Retention programmes",
        summary: "Keep the people who make the GCC work.",
        detail:
          "Career frameworks, learning pathways, and early-warning retention analytics.",
      },
    ],
  },
  {
    slug: "workspace",
    name: "Workspace",
    shortDescription:
      "Premium, secure, fully managed office environments in India’s top talent hubs.",
    valueProposition:
      "Give your India teams a workplace that feels like the enterprise — secure, brandable, and ready before the first hire walks in.",
    icon: "building",
    image: "/images/workspace-blue.webp",
    order: 2,
    metrics: [
      { label: "Sq ft managed", value: 2.4, suffix: "M+" },
      { label: "Cities active", value: 6, suffix: "" },
      { label: "Fit-out turnaround", value: 8, suffix: " wks" },
    ],
    processSteps: [
      {
        number: "01",
        title: "Strategy",
        summary: "City, micro-market, and capacity modelling.",
        detail:
          "We match talent density, cost, and commute realities to a workspace plan that scales in phases.",
        image:
          "/images/workspace-collab.jpg",
      },
      {
        number: "02",
        title: "Setup",
        summary: "Lease, fit-out, IT, and security controls.",
        detail:
          "From shell to ready floor: cabling, access control, meeting rooms, and brand-aligned interiors.",
        image:
          "/images/gcc-floor.webp",
      },
      {
        number: "03",
        title: "Launch",
        summary: "Day-one ready experience for arriving teams.",
        detail:
          "Facilities ops, visitor management, and parent-network connectivity live before occupancy.",
        image:
          "/images/gcc-ops.png",
      },
      {
        number: "04",
        title: "Scale",
        summary: "Expand floors and cities without disruption.",
        detail:
          "Phased capacity options and swing space so growth never blocks hiring plans.",
        image:
          "/images/workspace-blue.webp",
      },
    ],
    subServices: [
      {
        title: "Site selection & leasing",
        summary: "Negotiate and structure for multi-year GCC growth.",
        detail:
          "Micro-market analysis, landlord negotiations, and expansion options built into the lease.",
      },
      {
        title: "Fit-out & brand experience",
        summary: "Spaces that reinforce culture and collaboration.",
        detail:
          "Design, project management, and furniture programmes calibrated to your work modes.",
      },
      {
        title: "Facilities management",
        summary: "Day-to-day ops that stay invisible until they matter.",
        detail:
          "Soft services, hard services, and SLA-backed response for enterprise expectations.",
      },
      {
        title: "IT & physical security",
        summary: "Access, network, and endpoint readiness.",
        detail:
          "Badge access, secure printing, meeting-room AV, and alignment with your security baselines.",
      },
    ],
  },
  {
    slug: "operations",
    name: "Business Operations",
    shortDescription:
      "HR, payroll, EOR bridge, compliance, finance, and legal — the operating layer of your GCC.",
    valueProposition:
      "Run India employment, compliance, and shared services with enterprise-grade controls while your captive entity comes online.",
    icon: "settings",
    image: "/images/gcc-ops.png",
    order: 3,
    metrics: [
      { label: "Compliance programmes", value: 70, suffix: "+" },
      { label: "Payroll accuracy", value: 99.5, suffix: "%" },
      { label: "EOR bridge seats", value: 3500, suffix: "+" },
    ],
    processSteps: [
      {
        number: "01",
        title: "Strategy",
        summary: "Entity path, compliance surface, and ops design.",
        detail:
          "We map entity type, statutory registrations, and the interim EOR bridge so delivery never waits on paperwork.",
        image:
          "/images/workspace-vibrant.jpg",
      },
      {
        number: "02",
        title: "Setup",
        summary: "Policies, payroll, and vendor stack configured.",
        detail:
          "HRIS, benefits, leave, and finance processes aligned to parent policy and India law.",
        image:
          "/images/talent-team.webp",
      },
      {
        number: "03",
        title: "Launch",
        summary: "First employees paid and protected correctly.",
        detail:
          "Onboarding checklists, statutory enrolments, and manager enablement for India people ops.",
        image:
          "/images/workspace-collab.jpg",
      },
      {
        number: "04",
        title: "Scale",
        summary: "Transfer to captive ownership when ready.",
        detail:
          "Clean transition of contracts, data, and processes to your entity with zero payroll gap.",
        image:
          "/images/gcc-floor.webp",
      },
    ],
    subServices: [
      {
        title: "Employer-of-Record bridge",
        summary: "Hire while your entity incorporates.",
        detail:
          "Employees work under your management; we handle employment, payroll, and compliance until transfer.",
      },
      {
        title: "HR & payroll",
        summary: "India employment done right at scale.",
        detail:
          "Statutory compliance, benefits administration, and monthly payroll with audit trails.",
      },
      {
        title: "Compliance & legal coordination",
        summary: "Registrations, policies, and ongoing obligations.",
        detail:
          "Partner network for CS/CA support, labour law updates, and policy localisation.",
      },
      {
        title: "Finance & tax ops support",
        summary: "Local finance rhythm for a captive centre.",
        detail:
          "AP/AR support models, GST workflows, and reporting packs for parent finance teams.",
      },
    ],
  },
  {
    slug: "advisory",
    name: "Research & Advisory",
    shortDescription:
      "Location strategy, org design, market intelligence, and board-ready GCC business cases.",
    valueProposition:
      "Decide where, how large, and how to govern your GCC — with data your leadership team can trust.",
    icon: "compass",
    image: "/images/workspace-collab.jpg",
    order: 4,
    metrics: [
      { label: "Location studies", value: 140, suffix: "+" },
      { label: "Business cases", value: 95, suffix: "+" },
      { label: "Benchmark datasets", value: 40, suffix: "+" },
    ],
    processSteps: [
      {
        number: "01",
        title: "Strategy",
        summary: "Clarify outcomes, constraints, and success metrics.",
        detail:
          "We frame the GCC thesis: cost, talent, control, and speed — with explicit trade-offs for the board.",
        image:
          "/images/gcc-ops.png",
      },
      {
        number: "02",
        title: "Setup",
        summary: "Models, location shortlists, and org design.",
        detail:
          "Financial models, city comparisons, and target organisation charts ready for leadership review.",
        image:
          "/images/workspace-blue.webp",
      },
      {
        number: "03",
        title: "Launch",
        summary: "Decision packs and implementation roadmap.",
        detail:
          "A sequenced plan tying advisory recommendations to talent, workspace, and ops workstreams.",
        image:
          "/images/workspace-vibrant.jpg",
      },
      {
        number: "04",
        title: "Scale",
        summary: "Ongoing intelligence as the centre matures.",
        detail:
          "Compensation benchmarks, capability reviews, and expansion scenarios for the next phase.",
        image:
          "/images/talent-team.webp",
      },
    ],
    subServices: [
      {
        title: "Location & city analysis",
        summary: "Talent, cost, and risk by micro-market.",
        detail:
          "Compare Bengaluru, Hyderabad, Pune, NCR, Chennai, and Mumbai against your role mix.",
      },
      {
        title: "Organisational design",
        summary: "Spans, layers, and governance that travel.",
        detail:
          "Design leadership structures and reporting lines that keep parent alignment strong.",
      },
      {
        title: "Market intelligence",
        summary: "Compensation, attrition, and capability benchmarks.",
        detail:
          "Evidence-based inputs for hiring plans and board updates.",
      },
      {
        title: "Business case development",
        summary: "Investment logic your CFO will recognise.",
        detail:
          "Scenario models, break-even analysis, and risk registers for GCC approval.",
      },
    ],
  },
];

export const seedEngagementModels = [
  {
    slug: "flexible-partnership",
    name: "Flexible Partnership",
    summary:
      "An ongoing advisory and delivery partnership that flexes with your roadmap.",
    engagementLength: "12–36 months, renewable",
    ownership: "Shared operating model; you own the entity & IP",
    setupTime: "4–8 weeks to first outcomes",
    bestFit: "Enterprises that want continuous capability without a big-bang build",
    costProfile: "Predictable retainer + scoped workstreams",
    order: 1,
    practiceSteps: [
      {
        title: "Quarterly operating rhythm",
        detail: "Priority stacks, hiring plans, and risk reviews with a named partner.",
      },
      {
        title: "On-demand workstreams",
        detail: "Spin up talent, workspace, or ops modules as needs emerge.",
      },
      {
        title: "Knowledge continuity",
        detail: "Documented playbooks so your internal team stays in control.",
      },
    ],
    selectorTags: {
      teamSize: ["1-50", "50-200"],
      timeline: ["flexible", "3-6"],
      ownership: ["shared", "captive"],
    },
  },
  {
    slug: "build-and-transfer",
    name: "Build & Transfer",
    summary:
      "We stand up the GCC, then transfer people, processes, and ops to your captive entity.",
    engagementLength: "9–18 months typical",
    ownership: "Full captive ownership after transfer",
    setupTime: "8–14 weeks to operational launch",
    bestFit: "Teams committed to a wholly-owned India centre with a clear end-state",
    costProfile: "Front-loaded build; lowest long-term run-rate",
    order: 2,
    practiceSteps: [
      {
        title: "Design & entity path",
        detail: "Business case, location, and incorporation track run in parallel.",
      },
      {
        title: "Seed & scale under bridge",
        detail: "Leadership and early teams hire via EOR while the entity forms.",
      },
      {
        title: "Transfer & steady state",
        detail: "Contracts, payroll, and governance move cleanly to your entity.",
      },
    ],
    selectorTags: {
      teamSize: ["50-200", "200+"],
      timeline: ["3-6", "6-12"],
      ownership: ["captive"],
    },
  },
  {
    slug: "managed-team",
    name: "Managed Team",
    summary:
      "A dedicated India team managed to your outcomes — ideal for focused capability pods.",
    engagementLength: "6–24 months",
    ownership: "Team employed under our envelope; IP remains yours",
    setupTime: "2–6 weeks to first cohort",
    bestFit: "Fast capacity for a defined function before full captive commitment",
    costProfile: "Per-seat managed rate; faster start, higher vs captive at scale",
    order: 3,
    practiceSteps: [
      {
        title: "Scope the pod",
        detail: "Roles, skills, and success metrics for a self-contained team.",
      },
      {
        title: "Staff & embed",
        detail: "Hire, onboard, and connect to parent workflows and tooling.",
      },
      {
        title: "Operate & option to convert",
        detail: "Run delivery with clear SLAs; convert to captive when ready.",
      },
    ],
    selectorTags: {
      teamSize: ["1-50", "50-200"],
      timeline: ["asap", "3-6"],
      ownership: ["managed", "shared"],
    },
  },
];

export const seedInsights = [
  {
    title: "The CHRO’s checklist for a first India GCC",
    slug: "chro-checklist-first-india-gcc",
    excerpt:
      "What people leaders should lock before the first offer letter goes out — governance, bands, and culture transfer.",
    category: "Talent",
    coverImage: "/images/talent-team.webp",
    published: true,
    body: `## Start with outcomes, not headcount

A GCC succeeds when the parent organisation is clear about what the centre owns — product modules, finance ops, analytics, or shared services — and how success will be measured in the first 18 months.

## Governance before volume hiring

Appoint a centre head early. Align career bands to the parent. Decide which decisions stay in HQ and which move to India. These choices prevent the most expensive failure mode: a centre that can hire but cannot decide.

## Culture is an operating system

Rituals, feedback cadence, and manager enablement travel poorly if left to chance. Treat assimilation as a workstream with owners and dates — equal to entity setup and workspace.

## The 90-day people readiness test

- Leadership slate identified and interviewing
- Offer and onboarding playbooks localised
- Parent-side buddies assigned for first 50 hires
- Retention early-warning metrics defined`,
  },
  {
    title: "Choosing an India city for your next capability hub",
    slug: "choosing-india-city-capability-hub",
    excerpt:
      "Talent density, cost, attrition, and time-zone overlap — a practical frame for location decisions.",
    category: "Advisory",
    coverImage: "/images/workspace-collab.jpg",
    published: true,
    body: `## There is no single “best” city

Bengaluru still leads for deep engineering and AI/ML density. Hyderabad and Pune often win on cost-to-quality for scaled engineering. NCR offers diverse functions and useful overlap with Europe and US East. Chennai and Mumbai fit specific domain strengths.

## Model the role mix, not the headline salary

A centre heavy on senior ML talent will score cities differently than one built for finance ops. Build your shortlist from the actual org chart.

## Commute and retention are strategy

Micro-market choice inside a city can swing attrition more than a 5% compensation delta. Visit floors. Talk to operators. Treat workplace reality as data.`,
  },
  {
    title: "Build & transfer vs managed team: a decision guide",
    slug: "build-transfer-vs-managed-team",
    excerpt:
      "When to commit to a captive path — and when a managed pod buys you speed without locking the wrong structure.",
    category: "Engagement",
    coverImage: "/images/gcc-floor.webp",
    published: true,
    body: `## Use managed teams to learn

If you need capacity in 4–6 weeks for a bounded mission, a managed team reduces irreversible decisions. You still own IP and direction.

## Use build & transfer when the end-state is captive

If leadership has already approved a wholly-owned centre, optimise for clean transfer: EOR bridge, entity track, and HR ops designed to hand over.

## Hybrid is common

Many enterprises run a managed pod while the captive entity and leadership slate form — then transfer. The mistake is pretending the hybrid phase does not need an explicit plan.`,
  },
];

export const seedCaseStudies = [
  {
    title: "Standing up a 180-person product engineering GCC",
    /** Service / engagement label — not a client company name */
    client: "Build & Transfer · Product engineering",
    industry: "Retail / Digital",
    challenge:
      "Need a wholly-owned India engineering centre within 12 months, without freezing product delivery during entity setup.",
    approach:
      "Build & Transfer with an EOR bridge for the first 60 engineers, parallel entity and workspace tracks, and leadership-first hiring in Bengaluru.",
    result:
      "Centre live at month 10 with 180 engineers on captive payroll, 22% lower blended cost vs prior vendor model, and parent NPS for India delivery above target.",
    metrics: [
      { label: "Headcount at transfer", value: "180" },
      { label: "Time to operational launch", value: "10 mo" },
      { label: "Cost vs prior model", value: "-22%" },
    ],
    image: "/images/gcc-floor.webp",
    featured: true,
  },
  {
    title: "Finance ops hub with regulated controls",
    client: "Business operations · Finance outsourcing",
    industry: "BFSI",
    challenge:
      "Consolidate finance operations into an India hub with audit-ready controls and low attrition leadership.",
    approach:
      "Flexible Partnership for advisory and ops design; Managed Team for the first 40 specialists in Hyderabad; workspace and compliance run as integrated modules.",
    result:
      "40-person hub productive in 11 weeks; audit findings closed in first cycle; leadership retention 100% through year one.",
    metrics: [
      { label: "Time to first cohort", value: "11 wks" },
      { label: "Year-1 leadership retention", value: "100%" },
      { label: "Process SLAs met", value: "98%" },
    ],
    image: "/images/gcc-ops.png",
    featured: true,
  },
];

export const seedTestimonials = [
  {
    quote:
      "They treated our GCC like a product launch — clear owners, honest timelines, and no theatre. We went from board approval to a productive seed team without losing a quarter.",
    name: "Elena Brooks",
    role: "COO",
    /** Service / industry context — not a company name */
    company: "Workplace · Extended capacity · Product engineering",
  },
  {
    quote:
      "The connected model mattered. Talent, workspace, and ops stopped being three vendor conversations and became one plan our CHRO and CFO could both trust.",
    name: "Marcus Chen",
    role: "Chief People Officer",
    company: "Talent + Workspace · BFSI shared services",
  },
  {
    quote:
      "We needed India capability without losing parent-culture alignment. GCC Advisor sequenced leadership hires and workspace so nothing raced ahead of readiness.",
    name: "Sophie Laurent",
    role: "VP Global Operations",
    company: "Talent · Digital product GCC",
  },
  {
    quote:
      "Advisory that survived contact with reality. Their location and org design work held up when we actually had to hire and fill a floor.",
    name: "Ananya Rao",
    role: "Head of Global Operations",
    company: "Research & Advisory · Healthcare operations",
  },
  {
    quote:
      "The EOR bridge kept delivery moving while our entity formed. Transfer to captive payroll was clean — our audit team was impressed.",
    name: "James Okonkwo",
    role: "Director, Shared Services",
    company: "Business operations · Banking / captive transfer",
  },
  {
    quote:
      "As an India centre head, I finally had one partner who spoke both HQ language and local operating reality. Hiring quality held as we scaled past 150.",
    name: "Rohit Malhotra",
    role: "Centre Head",
    company: "Talent · AI / data capability centre",
  },
];

/** Industry / capability chips — placeholder until real client logos are added */
export const seedClientLogos = [
  { name: "Product Engineering", logoText: "Product Engineering", order: 1 },
  { name: "BFSI Operations", logoText: "BFSI Operations", order: 2 },
  { name: "Workplace Capacity", logoText: "Workplace Capacity", order: 3 },
  { name: "Shared Services", logoText: "Shared Services", order: 4 },
  { name: "AI / Data Hub", logoText: "AI / Data Hub", order: 5 },
  { name: "Captive Transfer", logoText: "Captive Transfer", order: 6 },
];

export const seedFaqs = [
  {
    question: "What is a Global Capability Center (GCC)?",
    answer:
      "A GCC is a captive (or captive-bound) offshore centre that the parent enterprise owns and operates — typically in India — to deliver engineering, product, AI/ML, finance, analytics, or shared services. Unlike a pure vendor relationship, the goal is lasting capability, IP control, and cultural alignment with the parent.",
    category: "Basics",
    order: 1,
  },
  {
    question: "How long does it take to set up a GCC in India?",
    answer:
      "Timelines depend on entity type, city, headcount, and compliance surface. A managed team can be productive in 2–6 weeks. A build-and-transfer captive path commonly reaches operational launch in roughly 8–14 weeks for the seed phase, with scale continuing over subsequent quarters. We agree milestones in writing after discovery.",
    category: "Timeline",
    order: 2,
  },
  {
    question: "What does a GCC cost compared to an offshore vendor?",
    answer:
      "Setup investment covers entity, legal, infrastructure, and recruitment. At steady state, captive centres typically achieve a lower run-rate than vendor models once past a threshold headcount — often modelled around 40+ roles within 12–18 months. We build a tailored business case rather than quoting generic day rates.",
    category: "Commercial",
    order: 3,
  },
  {
    question: "Can we own the GCC outright?",
    answer:
      "Yes. In Build & Transfer and Flexible Partnership paths, the entity, IP, and eventual employment relationship are designed for your ownership. We facilitate setup and optional ongoing services — we do not take equity in your centre.",
    category: "Ownership",
    order: 4,
  },
  {
    question: "What roles can we hire through a GCC?",
    answer:
      "Engineering, AI/ML, product, design, QA, DevOps, finance and accounting operations, analytics, customer operations, and specialist domain roles. India’s talent pools support both deep technical centres and multi-function hubs.",
    category: "Talent",
    order: 5,
  },
  {
    question: "Which Indian city should we choose?",
    answer:
      "It depends on role mix, cost targets, and retention risk. Bengaluru for engineering/AI depth; Hyderabad and Pune for strong engineering at moderated cost; NCR for diverse functions and time-zone overlap; Chennai and Mumbai for specific domain strengths. We run a structured location study against your org chart.",
    category: "Location",
    order: 6,
  },
  {
    question: "Do you provide a bridge while our entity is forming?",
    answer:
      "Yes. An Employer-of-Record (managed employment) bridge lets you hire and deliver under your management while incorporation and registrations complete, then transfer employees cleanly to your captive entity.",
    category: "Operations",
    order: 7,
  },
  {
    question: "How do engagement models differ?",
    answer:
      "Flexible Partnership is an ongoing multi-module relationship. Build & Transfer stands up a captive and hands it over. Managed Team delivers a dedicated pod quickly under our employment envelope. Use our engagement selector to see which fits your team size, timeline, and ownership preference.",
    category: "Engagement",
    order: 8,
  },
];

export const whyGccCards = [
  {
    title: "Cost efficiency",
    stat: "40–60%",
    detail: "Lower blended team cost vs onshore delivery at comparable quality bands.",
  },
  {
    title: "Access to talent",
    stat: "Top 2%",
    detail: "Reach specialised engineering, AI/ML, and ops talent in India’s hubs.",
  },
  {
    title: "Speed to capability",
    stat: "Weeks",
    detail: "Seed teams productive faster than traditional multi-vendor builds.",
  },
  {
    title: "Control & IP",
    stat: "100%",
    detail: "Captive paths keep ownership, culture, and intellectual property with you.",
  },
];
