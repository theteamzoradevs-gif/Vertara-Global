export type WhatWeStandForPoint = {
  point: string;
};

export type ByTheNumbersPoint = {
  point: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  initials?: string;
  imagePosition?: string;
};

export type AboutContentData = {
  aboutUs: {
    title: string;
    description: string;
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
    paragraph: string;
  };
  whatWeStandFor: WhatWeStandForPoint[];
  byTheNumbers: ByTheNumbersPoint[];
  theTeam: TeamMember[];
  leadershipEnabled?: boolean;
  closingCta: {
    text: string;
  };
};

export const seedAboutContent: AboutContentData = {
  aboutUs: {
    title: "About Us",
    description:
      "Renamed from “Who We Are” and moved towards the end of the navigation, after Our Offerings and Insights — for the visitor who wants credentials and provenance once they’re already convinced by the offering.",
  },
  ourStory: {
    title: "Our Story",
    content:
      "Vertara Global was founded by GCC builders, not GCC advisors. Our founders led capability-centre builds at a Big 4 firm and one of the world’s largest global mining companies — standing up teams from a blank sheet of paper, not writing a recommendation for someone else to execute. That distinction shapes everything about how Vertara works: we size engagements the way an operator would, price the way an accountable partner would, and stay past the launch date the way an owner would.",
  },
  ourVision: {
    title: "Our Vision",
    statement:
      "To be the most trusted partner for organizations building Global Capability Centres — from Nano GCCs to full mid-scale hubs — that create real enterprise value.",
  },
  theName: {
    title: "The Name",
    paragraph:
      "Vertara draws on Vertex — the summit, the highest point of capability — and Tara, the Sanskrit word for star, guide, and “to cross over.” Together: the guiding summit, a partner that leads organizations to the peak of their GCC ambition.",
  },
  whatWeStandFor: [
    {
      point: "Trust — transparent scoping, milestone-based terms, no silent scope creep.",
    },
    {
      point: "Ownership — one accountable team across strategy, legal, HR and technology.",
    },
    {
      point: "Craft — practitioner judgment applied to every decision.",
    },
  ],
  byTheNumbers: [
    {
      point: "50+ years of combined GCC experience across the founding team",
    },
    {
      point: "6 sectors, 10 GCC builds led by our founders before Vertara existed",
    },
  ],
  theTeam: [
    {
      name: "Neha Chauhan",
      role: "Co-Founder, Corporate Real Estate and Workplace Leader",
      initials: "NC",
      bio: "Neha is an architect and corporate real estate leader with more than 20 years across India and APAC. At a major mining company, she enabled India GCC expansion from the workplace side defining location and space needs, coordinating leasing and fit-out decisions with internal teams and delivery partners, and preparing facilities for occupation and growth. Her work links capacity, employee experience, safety and operational readiness. She brings expertise in portfolio strategy, design, project delivery, sustainability and facilities governance, alongside LEED AP, Green Mark Manager and ISO 9001 internal auditor credentials.",
      image: "/teams/Neha.jpeg",
      imagePosition: "object-[center_20%]",
      linkedin: "https://www.linkedin.com/in/nehachauhan82?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      name: "Namit Ganjsinghani",
      role: "Co-Founder, Former Big 4 Partner",
      initials: "NG",
      bio: "Namit brings more than 20 years of experience in GCC strategy and commercial transformation. During a long career with a Big 4 firm, he built and led a capability hub and supported more than ten GCC set-ups. His work spans business cases, location assessment, operating models, shared services and innovation-led centres of excellence. At Vertara, he leads the strategic and operating-model decisions that turn a GCC ambition into a scalable, governed business capability.",
      image: "/teams/Namit.jpeg",
      imagePosition: "object-center",
      linkedin: "https://www.linkedin.com/in/namit-ganjsinghani-219b343?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      name: "Erica Chapman, Esq., MCR",
      role: "Director, Client Engagement and Onboarding",
      initials: "EC",
      bio: "Erica is an attorney and global real estate and operations leader with more than 25 years across industrial, retail, hospitality and commercial portfolios. As head of global real estate at one of the world's largest food and beverage companies, she ran a footprint of more than 4,000 locations and 200 million sq. ft., and led the re-evaluation of its site strategy for Global Capability Centres, weighing talent and skill availability against time-zone, financial and geographic constraints. Earlier, at a global lighting manufacturer, she sat on the executive task force that centralized HR, IT, Procurement and Finance into global business services. At Vertara, she leads client engagement and onboarding, working with HQ leadership teams from the first conversation through to a mandate that is scoped, agreed and ready to build.",
      image: "/teams/Erica.png",
      imagePosition: "object-[center_25%]",
      linkedin: "https://www.linkedin.com/in/ericajchapman?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      name: "Saurabh Agarwal",
      role: "Technology, Cybersecurity & Talent Development Leader",
      initials: "SA",
      bio: "Saurabh Agarwal is the Founder & Managing Director of Skill Cube, with over two decades of experience across technology, cybersecurity, consulting, telecommunications and insurance. A former Chief Information Security Officer and Data Privacy Officer, he brings international experience spanning the US, Europe, APAC, the Middle East and Africa.\n\nHis expertise complements Vertara Global’s focus on enabling secure, scalable and future-ready GCCs. His background in cybersecurity governance, data privacy and talent development is relevant to building strong foundations for new centres, developing specialist capabilities and strengthening operational readiness as businesses scale in India.\n\nAlongside Vertara’s strengths in GCC strategy, workplace and operational enablement, Saurabh’s experience offers a complementary perspective on aligning people, technology and security with enterprise objectives.",
      image: "/teams/Saurabh.jpeg",
      imagePosition: "object-[center_20%]",
      linkedin: "https://www.linkedin.com/in/saurabhagarwalinfosec?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      name: "CA Rahul Kumar Ladia",
      role: "Professional Support – ATRS & Co: Finance, Audit, and Compliance",
      initials: "RL",
      bio: "Rahul is a Chartered Accountant with more than a decade as a finance leader across pharma, medical devices, manufacturing and mining multinationals. At one of the world's largest global mining companies, he led IFRS closing and reporting and managed offshore finance teams. As General Manager Finance at an Indian biopharmaceutical company, he ran financial control, statutory and internal audits, treasury and tax, alongside transactions such as QIPs, slump sales and acquisitions. He is a Partner at A T R S & Co, Chartered Accountants, Vertara's consortium partner for finance, audit and compliance and independent professional support, subject to separate engagement and acceptance by ATRS & Co.",
      image: "/teams/Rahul.png",
      imagePosition: "object-[center_20%]",
      linkedin: "https://www.linkedin.com/in/ca-rahul-kumar-ladia?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  ],
  leadershipEnabled: true,
  closingCta: {
    text: "Let’s build the right GCC — and build it to last.",
  },
};
