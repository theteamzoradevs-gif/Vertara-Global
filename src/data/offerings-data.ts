export interface BuildStage {
  number: string;
  name: string;
  deliverables: string;
}

export interface Discipline {
  title: string;
  description: string;
}

export interface CommercialPrinciple {
  title: string;
  description: string;
}

export interface SectorItem {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  howVertaraHelps: string;
  route: string;
}

export const offeringsData = {
  hero: {
    eyebrow: "Capabilities & Practice",
    title: "Our Services",
    description:
      "We help you decide whether India is the right place for your next capability centre, where it should be and what it should look like. Then we build it with you. Whether you start with 20 people or plan for 500, every engagement is shaped around your business, your pace and your budget.",
  },

  scope: {
    eyebrow: "Scale Scope",
    title: "Built for mid-market, focussing on establishing and scaling Nano GCCs ",
    intro:
      "Vertara isn’t a Nano-only shop. We work the full mid-market range: a 20–100 person Nano GCC for companies proving a capability before committing further, and full mid-scale builds up to 400–500 people for companies ready to commit at scale from the outset. Both use the same six-stage build model and the same governance discipline sized to the mandate, never a generic template.",
    researchNote:
      "Backed by our own research: see the Nano GCC paper series on Insights.",
    researchHref: "/insights",
    items: [
      {
        number: "01",
        tag: "NANO GCC",
        title: "Nano GCC (20–100 people)",
        description:
          "Launched fast, governed properly from day one, modeled to break even in 12–18 months. The right entry point when the priority is proving the model before scaling.",
        id: "nano-gcc",
      },
      {
        number: "02",
        tag: "MID-SCALE GCC",
        title: "Mid-scale GCC (100–500 people)",
        description:
          "A full capability hub built with the same leadership-first, right-sized-governance discipline, for companies ready to commit to scale from the start.",
        id: "mid-scale-gcc",
      },
      {
        number: "03",
        tag: "BOTH SCOPES",
        title: "Both scopes",
        description:
          "One to several functions proven and expanded, with a clear path to grow headcount without re-architecting the entity, governance or systems.",
        id: "both-scopes",
      },
      {
        number: "04",
        tag: "RESEARCH",
        title: "Backed by our own research",
        description:
          "See the Nano GCC paper series on Insights.",
        linkHref: "/insights",
        linkText: "Explore Insights →",
        id: "research",
      },
    ],
  },

  buildModel: {
    eyebrow: "Operating Model",
    title: "The Vertara GCC build model",
    description:
      "One integrated journey with clear ownership at every stage. Each stage has a named owner, defined deliverables and a clear handover into the next nothing moves forward until the gate is met. The same six stages apply whether the mandate is a 20-person Nano GCC pilot or a 500-person mid-scale build.",
    stages: [
      {
        number: "01",
        name: "Discover",
        deliverables:
          "Business case, mandate & scope, location strategy, operating model, service catalogue, transition roadmap",
      },
      {
        number: "02",
        name: "Design",
        deliverables:
          "Entity/structure coordination, statutory setup, contracts, compliance framework, governance model",
      },
      {
        number: "03",
        name: "Build",
        deliverables:
          "Org design, leadership hiring, talent strategy, workforce planning, recruitment support, onboarding",
      },
      {
        number: "04",
        name: "Launch & stabilise",
        deliverables:
          "Work moves from HQ, the first teams become productive, and SOPs and KPIs are set.",
      },
      {
        number: "05",
        name: "Scale",
        deliverables:
          "Grow headcount and scope, add automation and analytics, and stand up new centres of excellence.",
      },
      {
        number: "06",
        name: "Sustain",
        deliverables:
          "Health checks after handover and a year-two review, so problems are caught early.",
      },
    ] as BuildStage[],
  },

  disciplines: {
    eyebrow: "Core Capability",
    title: "Six disciplines run across every sector",
    items: [
      {
        title: "GCC Strategy & Design",
        description:
          "Business case, mandate, location and operating-model decisions.",
      },
      {
        title: "Legal & Entity Setup",
        description:
          "Structure, statutory setup, contracts, compliance and governance.",
      },
      {
        title: "HR & Staffing",
        description:
          "Org design, leadership hiring, workforce planning and onboarding.",
      },
      {
        title: "Digital Transformation",
        description:
          "Process redesign, automation, data & analytics.",
      },
      {
        title: "IT & Technology",
        description:
          "Technology strategy, architecture, workplace tech, cybersecurity.",
      },
      {
        title: "CoE / Shared Services Build",
        description:
          "Functional CoE design, transition, SOPs, SLAs and continuous improvement.",
      },
    ] as Discipline[],
  },

  commercial: {
    eyebrow: "Commercial Principles",
    title: "Commercial principles",
    lead: "How we engage commercially flexes to where you are in the GCC journey from an advisory conversation through a full milestone-based build but the principles underneath stay fixed.",
    calloutQuote: "The engagement changes. The accountability doesn’t.",
    principles: [
      {
        title: "Milestone-linked, not upfront-loaded",
        description: "You pay as value is delivered.",
      },
      {
        title: "Advisory fees itemized separately",
        description: "Itemized clearly from third-party costs.",
      },
      {
        title: "Transparent scope-change process",
        description: "Zero silent creep throughout the mandate.",
      },
      {
        title: "Every engagement sized to the client",
        description:
          "Not discounted from an enterprise rate card — a Nano GCC is priced like a Nano GCC, a 500-person build priced like one, never a one-size package.",
      },
    ] as CommercialPrinciple[],
  },

  sectors: {
    eyebrow: "Sector Expertise",
    title: "Sector expertise",
    description:
      "A closer look at where mid-market builds Nano through mid-scale are happening, sector by sector.",
    items: [
      {
        id: "engineering-erd",
        title: "Engineering & ER&D",
        tagline:
          "Product engineering · R&D · software simulation · AI · architectural design",
        overview:
          "From CAD seats to real product ownership: systems architecture, embedded firmware and simulation-driven design, integrated with HQ systems from day one.",
        howVertaraHelps:
          "Enterprise-grade CAD/PLM/simulation talent (SolidWorks, CATIA, ANSYS, MATLAB/Simulink), compute sized for simulation and digital-twin workloads, IP protected from week one.",
        route: "/industries/engineering-erd",
      },
      {
        id: "fmcg-retail",
        title: "FMCG & Retail",
        tagline:
          "Consumer analytics · merchandising · supply chain · marketing · e-commerce",
        overview:
          "From order processing to demand intelligence: demand forecasting, assortment planning and pricing analytics, integrated with POS, ERP and e-commerce in real time.",
        howVertaraHelps:
          "Category-management and RGM talent, SKU-and-store-level data infrastructure, consumer-data and loyalty-PII governance from day one.",
        route: "/industries/fmcg-retail",
      },
      {
        id: "healthcare-life-sciences",
        title: "Healthcare & Life Sciences",
        tagline:
          "R&D · regulatory · clinical · medical affairs · patient analytics AI · cyber",
        overview:
          "From back-office support to regulatory-grade capability: regulatory affairs, biostatistics and pharmacovigilance, with HIPAA, GxP and 21 CFR Part 11 controls built in from the first hire.",
        howVertaraHelps:
          "Clinical data management and medical-writing capability, audit-ready validated systems, PHI/PII architecture sized to the real regulatory bar.",
        route: "/industries/healthcare-life-sciences",
      },
      {
        id: "wealth-management-pe-insurance",
        title: "Wealth Management, PE & Insurance",
        tagline:
          "Fund & portfolio operations · actuarial support · client reporting & compliance · investment & equity research",
        overview:
          "From back-office reconciliation to investment-grade operations: fund accounting, NAV and portfolio operations, reporting built for the frameworks that actually apply — IFRS 17, SEC/SOX, NAIC.",
        howVertaraHelps:
          "Actuarial and investment-research capability, LP/policyholder data segregated to a bulge-bracket bar, real-time system integration.",
        route: "/industries/wealth-management-pe-insurance",
      },
      {
        id: "manufacturing",
        title: "Manufacturing",
        tagline:
          "Supply chain & procurement · plant operations analytics · industrial IoT · quality & compliance",
        overview:
          "From shop-floor support to production intelligence: OT-IT integration across plants, integrated with SCADA, MES and ERP without a custom build per facility.",
        howVertaraHelps:
          "SCADA/PLC integration and predictive-maintenance talent, ISO 9001 & IATF 16949 documentation that travels plant to plant, proof-on-one-plant-then-extend delivery.",
        route: "/industries/manufacturing",
      },
      {
        id: "mining-metals",
        title: "Mining & Metals",
        tagline:
          "Asset analytics · engineering · procurement · ESG/HSE data",
        overview:
          "From site reporting to asset intelligence: asset analytics and reliability engineering, integrated with SCADA, fleet and asset systems (SAP EAM, Maximo).",
        howVertaraHelps:
          "GRI, SASB & ICMM reporting built in, one data layer across SCADA/fleet/EAM, procurement handled across remote, long-lead-time supply chains.",
        route: "/industries/mining-metals",
      },
      {
        id: "travel-leisure-hospitality",
        title: "Travel, Leisure, Hospitality",
        tagline:
          "Reservations · loyalty platforms · guest analytics · revenue reporting",
        overview:
          "From reservations processing to revenue intelligence: revenue management and channel distribution, integrated with PMS, channel managers and GDS/OTA platforms.",
        howVertaraHelps:
          "Guest personalization and loyalty analytics, revenue forecasting sized for a boutique portfolio, guest-data protection across markets from day one.",
        route: "/industries/travel-leisure-hospitality",
      },
      {
        id: "tech-ai-services",
        title: "Tech, AI and Services",
        tagline:
          "GenAI/LLM engineering · MLOps · applied research · data platforms",
        overview:
          "From IT support to AI-grade infrastructure: GPU/compute and MLOps right-sized to real training and inference load, not hyperscaler capital intensity.",
        howVertaraHelps:
          "GenAI/LLM engineering and applied-research talent, MLOps pipelines tied to cloud strategy from day one, deliberate hybrid/multi-cloud cost governance.",
        route: "/industries/technology-ai",
      },
    ] as SectorItem[],
  },

  ctaBanner: {
    title: "What should your GCC look like?",
    description:
      "Let’s talk about what yours should look like a 20-person Nano GCC or a 500-person capability centre.",
    buttonText: "Discuss Your GCC Mandate",
    buttonHref: "/contact",
  },
};
