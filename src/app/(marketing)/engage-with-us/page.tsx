import type { Metadata } from "next";
import { ThreeWaysToStart } from "@/components/engage/ThreeWaysToStart";

export const metadata: Metadata = {
  title: "Engage with Us — Vertara Global",
  description:
    "Let's talk about your India plans. Tell us where you are: Just exploring, building the business case, or ready to launch.",
};

export default function EngageWithUsPage() {
  return (
    <main className="flex-1 w-full bg-white font-sans" style={{ fontFamily: "Calibri" }}>
      {/* 1. HERO SECTION */}
      <section
        className="relative overflow-hidden text-white bg-[#2F3F34] py-16 sm:py-20 md:py-24 font-sans"
        style={{ fontFamily: "Calibri" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#B59439]">
            Get In Touch
          </p>

          {/* Headline */}
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Engage with us
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-[#e2e8e4]">
            Let's talk about your India plans. Tell us where you are: Just exploring, building the business case, or ready to launch. One of the Vertara practice leader will reply personally, and we'll come to the first call with a view on your situation.
          </p>
        </div>
      </section>

      {/* 2. THREE WAYS TO START (With pop-up modal for Request a call & Discuss research) */}
      <ThreeWaysToStart />
    </main>
  );
}
