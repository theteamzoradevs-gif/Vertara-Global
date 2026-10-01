import { Schema, models, model } from "mongoose";

const ContactContentSchema = new Schema(
  {
    eyebrow: { type: String, default: "CONTACT US" },
    headline: {
      type: String,
      default: "Let’s talk about what yours should look like.",
    },
    description: {
      type: String,
      default:
        "Tell us where you are exploring a Nano GCC pilot, building the full business case, or ready to launch and we’ll come to the first call with a point of view, not a pitch deck.",
    },
    formTitle: { type: String, default: "Send us a message" },
    formSubmitLabel: { type: String, default: "Book a consultation" },
    companyName: {
      type: String,
      default: "Vertara Global — GCC Enablement & Advisory",
    },
    contactEmail: { type: String, default: "hello@gccadvisor.com" },
    contactPhone: { type: String, default: "+91 80 4000 1200" },
    officeAddress: { type: String, default: "" },
    calendlyUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

if (models.ContactContent) {
  delete (models as Record<string, unknown>).ContactContent;
}

export const ContactContent = model("ContactContent", ContactContentSchema);
