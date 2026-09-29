export type WhatWeStandForPoint = {
  title: string;
  description: string;
};

export type ByTheNumbersPoint = {
  number: string;
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  bullets: string[];
  image?: string;
  initials?: string;
};

export type AboutContentData = {
  aboutUs: {
    title: string;
    content: string;
  };
  ourStory: {
    title: string;
    content: string;
  };
  ourVision: {
    title: string;
    statement: string;
  };
  theName: {
    title: string;
    meaning: string;
    description: string;
  };
  whatWeStandFor: WhatWeStandForPoint[];
  byTheNumbers: ByTheNumbersPoint[];
  theTeam: TeamMember[];
  closingCta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
};

export const seedAboutContent: AboutContentData = {
  aboutUs: {
    title: "About Us",
    content:
      "To be the most trusted partner for organizations building Global Capability Centres that create real enterprise value.",
  },
  ourStory: {
    title: "Our Story",
    content:
      "Vertara Global was founded by operators who have built and scaled India capability centers from the inside — not decks, but delivery. We combine talent, workspace, business operations, and strategic advisory into one accountable partnership so enterprises can move from intent to a live, high-performing GCC without stitching together a dozen vendors.",
  },
  ourVision: {
    title: "Our Vision",
    statement:
      "To be the most trusted partner for organizations building Global Capability Centres that create real enterprise value.",
  },
  theName: {
    title: "The Name",
    meaning:
      "Vertara draws from Vertex, the summit, the highest point of capability and Tara, the Sanskrit word for star, guide and to cross over.",
    description:
      "Together: The guiding summit, a partner that leads organizations to the peak of their GCC ambition.",
  },
  whatWeStandFor: [
    {
      title: "Operator mindset",
      description:
        "Focused on driving decision, implementation, and delivering results; not just recommendations.",
    },
    {
      title: "Sector-led, function-driven approach",
      description:
        "Tailored solutions for sectors and functions; we bring expertise specific to requirements.",
    },
    {
      title: "India execution experts",
      description:
        "Our proprietary model brings location advantage - tier-1, tier 2 cities, expert talent, cost, scale, legal framework and future proofing delivery centres.",
    },
  ],
  byTheNumbers: [
    {
      number: "01",
      title: "Founded by GCC builders",
      description:
        "Leaders from a Big 4 firm and one of the world's largest mining companies who built GCCs from the ground up; 6 sectors, 10 GCC builds.",
    },
    {
      number: "02",
      title: "50+ years of GCC experience",
      description:
        "From business strategy, feasibility to steady state operations.",
    },
  ],
  theTeam: [
    {
      name: "Neha",
      role: "Co-Founder, Former Global Mining Director",
      initials: "N",
      bio: "20+ years in corporate real estate, workplace strategy and portfolio management; set up GCCs for one of the world's largest mining companies, with execution across a large enterprise footprint.",
      bullets: [
        "20+ years in corporate real estate",
        "Workplace strategy & portfolio management",
        "Set up GCCs for a leading global mining enterprise",
        "Execution across large enterprise footprint",
      ],
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Namit G",
      role: "Co-Founder, Former Big 4 Partner",
      initials: "NG",
      bio: "17+ years at a Big 4 firm; built and led a Big 4 Capability hub, enabled 10+ GCC set-ups; expert in GCC strategy, location assessment, and innovation-led CoEs.",
      bullets: [
        "17+ years at a Big 4 firm",
        "Built and led Big 4 capability hub",
        "Enabled 10+ GCC set-ups",
        "Expert in GCC strategy, location assessment, and innovation-led CoEs",
      ],
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Rajesh",
      role: "Practice Director, Ex WSP GCC India Head",
      initials: "R",
      bio: "Expert in shared services operations for global organizations, with deep expertise in transition management, process migration and vendor governance.",
      bullets: [
        "Expert in shared-services operations",
        "Deep expertise in transition management",
        "Process migration",
        "Vendor governance",
      ],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=800",
    },
  ],
  closingCta: {
    title: "Start a conversation with the team",
    description:
      "Share what you're building, we'll connect you with the right partner.",
    buttonText: "Request a partner call",
    buttonLink: "/contact",
  },
};
