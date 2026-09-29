/** Public About-page practitioners — single source for UI + chatbot retrieval. */
export type Practitioner = {
  name: string;
  role: string;
  bio: string;
  bullets: string[];
  image?: string;
  imagePosition?: string;
  initials: string;
};

export const practitionersTeam: Practitioner[] = [
  {
    name: "Namit Ganjisinghani",
    role: "Co-Founder, Former Big 4 Partner",
    initials: "NG",
    bio: "A GCC and commercial transformation leader with 20+ years of experience; built and led a Big 4 capability hub and has supported 10+ GCC set-ups.",
    bullets: [
      "Co-Founder, Former Big 4 Partner",
      "20+ years of experience in GCC and commercial transformation",
      "Built and led a Big 4 capability hub",
      "Supported 10+ GCC set-ups",
    ],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_10%]",
  },
  {
    name: "Neha Chauhan",
    role: "Co-Founder, Corporate Real Estate and Workplace Leader",
    initials: "NC",
    bio: "An architect with 20+ years of experience, she enabled India GCC expansion at a global mining company through workplace strategy, site planning, delivery governance and operational readiness.",
    bullets: [
      "Co-Founder, Corporate Real Estate and Workplace Leader",
      "Architect with 20+ years of experience",
      "Enabled India GCC expansion at a global mining company",
      "Workplace strategy, site planning, delivery governance and operational readiness",
    ],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_15%]",
  },
  {
    name: "Rajesh",
    role: "Practice Director, Ex WSP GCC India Head",
    initials: "R",
    bio: "Expert in shared services operations for global organizations, with deep expertise in transition management, process migration and vendor governance",
    bullets: [
      "Expert in shared-services operations",
      "Deep expertise in transition management",
      "Process migration",
      "Vendor governance",
    ],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_10%]",
  },
];


