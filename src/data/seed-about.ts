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
      name: "Namit Ganjsinghani",
      role: "Co-Founder, Former Big 4 Partner",
      bio: "Namit brings more than 20 years of experience in GCC strategy and commercial transformation. During a long career with a Big 4 firm, he built and led a capability hub and supported more than ten GCC set-ups. His work spans business cases, location assessment, operating models, shared services and innovation-led centres of excellence. At Vertara, he leads the strategic and operating-model decisions that turn a GCC ambition into a scalable, governed business capability.",
      image: "",
    },
    {
      name: "Neha Chauhan",
      role: "Co-Founder, Corporate Real Estate and Workplace Leader",
      bio: "Neha is an architect and corporate real estate leader with more than 20 years across India and APAC. At a major mining company, she enabled India GCC expansion from the workplace side defining location and space needs, coordinating leasing and fit-out decisions with internal teams and delivery partners, and preparing facilities for occupation and growth. Her work links capacity, employee experience, safety and operational readiness. She brings expertise in portfolio strategy, design, project delivery, sustainability and facilities governance, alongside LEED AP, Green Mark Manager and ISO 9001 internal auditor credentials.",
      image: "",
    },
    {
      name: "Joining the team",
      role: "",
      bio: "Joining the team: practice-leadership roles across shared services, legal, HR and technology practices, to be announced as the bench expands.",
      image: "",
    },
  ],
  closingCta: {
    text: "Let’s build the right GCC — and build it to last.",
  },
};
