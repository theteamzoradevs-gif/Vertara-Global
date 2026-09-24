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
    name: "Neha",
    role: "Co-Founder, Ex-Rio Tinto Director",
    initials: "N",
    bio: "20+ years in corporate real estate, workplace strategy and portfolio management, set up GCCs for Rio Tinto, setup execution across a large enterprise footprint",
    bullets: [
      "20+ years in corporate real estate",
      "Workplace strategy & portfolio management",
      "Set up GCCs for Rio Tinto",
      "Execution across large enterprise footprint",
    ],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_15%]",
  },
  {
    name: "Namit G",
    role: "Co-Founder, Ex-KPMG Partner",
    initials: "NG",
    bio: "17+ yrs at KPMG, Built and led KPMG Capability hub, enabled 10+ GCC set-ups, expert in GCC strategy, location assessment and innovation led CoEs.",
    bullets: [
      "17+ years at KPMG",
      "Built and led KPMG capability hub",
      "Enabled 10+ GCC set-ups",
      "Expert in GCC strategy, location assessment and innovation led CoEs.",
    ],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_10%]",
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


