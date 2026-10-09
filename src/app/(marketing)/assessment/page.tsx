import type { Metadata } from "next";
import { GccAssessmentSection } from "@/components/engage/GccAssessmentSection";
import { AssessmentContactForm } from "@/components/engage/AssessmentContactForm";

export const metadata: Metadata = {
  title: "GCC Feasibility Assessment — Vertara Global",
  description:
    "10 minutes of structured questions. A feasibility report delivered within 2 business days, reviewed and approved by a Vertara practice expert. The assessment is free and confidential.",
};

export default function AssessmentPage() {
  return (
    <main className="flex-1 w-full bg-[#FAF9F5] font-sans" style={{ fontFamily: "Calibri" }}>
      {/* Contact & Follow-up Inquiry Form */}
      <AssessmentContactForm />

      {/* Assessment Questions Stepper */}
      <GccAssessmentSection />
    </main>
  );
}
