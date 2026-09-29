"use client";

import Link from "next/link";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { offeringsData } from "../../data/offerings-data";

export function OfferingsHero() {
  const { hero } = offeringsData;

  return (
    <section
      className="relative flex flex-col justify-between overflow-hidden border-b border-[#2F3F34] bg-[#2F3F34] text-white py-16 sm:py-20 md:py-24 font-sans"
      style={{ fontFamily: "Calibri" }}
    >
      {/* Background Flow Threads */}
      <FlowThreads intensity="medium" onDark className="opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#B59439]">
          {hero.eyebrow}
        </p>

        {/* Headline */}
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          {hero.title}
        </h1>

        {/* Description */}
        <p className="mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-[#e2e8e4]">
          {hero.description}
        </p>

        {/* Hero Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#B59439] px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#9c7e2e] hover:shadow-md"
          >
            Discuss Your GCC Mandate
          </Link>
          <a
            href="#build-model"
            className="inline-flex items-center justify-center rounded-lg border border-[#445b4c] bg-[#1E2922]/85 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#152019] hover:border-[#B59439]/60"
          >
            See Build Model
          </a>
        </div>


      </div>
    </section>
  );
}
