/** Public About-page practitioners — single source for UI + chatbot retrieval. */
export type Practitioner = {
  name: string;
  role: string;
  bio: string;
  bullets?: string[];
  image?: string;
  imagePosition?: string;
  initials: string;
};

export const practitionersTeam: Practitioner[] = [
  {
    name: "Namit Ganjisinghani",
    role: "Co-Founder, Former Big 4 Partner",
    initials: "NG",
    bio: "Namit brings more than 20 years of experience in GCC strategy and commercial transformation. During a long career with a Big 4 firm, he built and led a capability hub and supported more than ten GCC set-ups. His work spans business cases, location assessment, operating models, shared services and innovation-led centres of excellence. At Vertara, he leads the strategic and operating-model decisions that turn a GCC ambition into a scalable, governed business capability.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_10%]",
  },
  {
    name: "Neha Chauhan",
    role: "Co-Founder, Corporate Real Estate and Workplace Leader",
    initials: "NC",
    bio: "Neha is an architect and corporate real estate leader with more than 20 years across India and APAC. At a major mining company, she enabled India GCC expansion from the workplace side defining location and space needs, coordinating leasing and fit-out decisions with internal teams and delivery partners, and preparing facilities for occupation and growth. Her work links capacity, employee experience, safety and operational readiness. She brings expertise in portfolio strategy, design, project delivery, sustainability and facilities governance, alongside LEED AP, Green Mark Manager and ISO 9001 internal auditor credentials.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_15%]",
  },
  {
    name: "Erica Chapman, Esq., MCR",
    role: "Director, Client Engagement and Onboarding",
    initials: "EC",
    bio: "Erica is an attorney and global real estate and operations leader with more than 25 years across industrial, retail, hospitality and commercial portfolios. As head of global real estate at one of the world's largest food and beverage companies, she ran a footprint of more than 4,000 locations and 200 million sq. ft., and led the re-evaluation of its site strategy for Global Capability Centres, weighing talent and skill availability against time-zone, financial and geographic constraints. Earlier, at a global lighting manufacturer, she sat on the executive task force that centralized HR, IT, Procurement and Finance into global business services. At Vertara, she leads client engagement and onboarding, working with HQ leadership teams from the first conversation through to a mandate that is scoped, agreed and ready to build.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_15%]",
  },
  {
    name: "Alok Patel (Calyxis Global Solutions)",
    role: "Global Delivery and Talent",
    initials: "AP",
    bio: "Alok has spent more than 20 years building and running offshore and nearshore delivery centres for clients across the UK, EMEA, the US and LATAM. Over 14 years with a global business-services firm, he stood up a nearshore centre in Mexico from a blank sheet, covering hiring, facilities, local compliance and university partnerships, and led delivery for more than 20 global clients with teams of up to 150 people across technology, engineering, life sciences, healthcare and aviation. He is Founder and CEO of Calyxis Global Solutions, which works with Vertara on global delivery and talent. Through Calyxis, he brings the operator's view to the Build stage leadership hiring, workforce planning and a recruitment engine that scales with the centre.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_10%]",
  },
  {
    name: "CA Rahul Kumar Ladia",
    role: "Professional Support – ATRS & Co: Finance, Audit, and Compliance",
    initials: "RL",
    bio: "Rahul is a Chartered Accountant with more than a decade as a finance leader across pharma, medical devices, manufacturing and mining multinationals. At one of the world's largest global mining companies, he led IFRS closing and reporting and managed offshore finance teams. As General Manager Finance at an Indian biopharmaceutical company, he ran financial control, statutory and internal audits, treasury and tax, alongside transactions such as QIPs, slump sales and acquisitions. He is a Partner at A T R S & Co, Chartered Accountants, Vertara's consortium partner for finance, audit and compliance and independent professional support, subject to separate engagement and acceptance by ATRS & Co.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=800",
    imagePosition: "object-[center_10%]",
  },
];
