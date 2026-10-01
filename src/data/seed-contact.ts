export type ContactContentData = {
  eyebrow: string;
  headline: string;
  description: string;
  formTitle: string;
  formSubmitLabel: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress?: string;
  calendlyUrl?: string;
};

export const seedContactContent: ContactContentData = {
  eyebrow: "CONTACT US",
  headline: "Let’s talk about what yours should look like.",
  description:
    "Tell us where you are exploring a Nano GCC pilot, building the full business case, or ready to launch and we’ll come to the first call with a point of view, not a pitch deck.",
  formTitle: "Send us a message",
  formSubmitLabel: "Book a consultation",
  companyName: "Vertara Global — GCC Enablement & Advisory",
  contactEmail: "hello@gccadvisor.com",
  contactPhone: "+91 80 4000 1200",
  officeAddress: "",
  calendlyUrl: "",
};
