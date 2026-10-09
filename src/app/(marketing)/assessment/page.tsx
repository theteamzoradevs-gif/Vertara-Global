import type { Metadata } from "next";
import { GccAssessmentSection } from "@/components/engage/GccAssessmentSection";

export const metadata: Metadata = {
  title: "GCC Feasibility Assessment — Vertara Global",
  description:
    "10 minutes of structured questions. A feasibility report delivered within 2 business days, reviewed and approved by a Vertara practice expert. The assessment is free and confidential.",
};

export default function AssessmentPage() {
  return (
    <main className="flex-1 w-full bg-[#FAF9F5] font-sans" style={{ fontFamily: "Calibri" }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden text-white bg-[#2F3F34] py-14 sm:py-18 md:py-20 font-sans"
        style={{ fontFamily: "Calibri" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#B59439]">
            Feasibility Assessment
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Run your GCC assessment
          </h1>
          <p className="mt-3 sm:mt-4 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-[#e2e8e4]">
            10 minutes of structured questions; a feasibility report within 2 business days, reviewed and approved by a Vertara practice expert. The assessment is free and confidential.
          </p>
        </div>
      </section>

      {/* Assessment Questions Stepper */}
      <GccAssessmentSection />
    </main>
  );
}
