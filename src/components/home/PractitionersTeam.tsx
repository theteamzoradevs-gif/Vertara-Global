"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { practitionersTeam } from "@/data/practitioners-team";

const openPositions = [
  {
    number: "01",
    title: "Legal & Entity Setup",
    description:
      "Entity structuring, statutory setup, contracts, compliance frameworks and governance for GCCs from Nano to mid-scale.",
  },
  {
    number: "02",
    title: "People & HR Advisory",
    description:
      "Org design, leadership hiring strategy, compensation, HR policies and workforce planning for newly built centres.",
  },
  {
    number: "03",
    title: "Digital & Technology",
    description:
      "Technology strategy, IT operating model, automation, data and AI, and cybersecurity for centres built digital from day one.",
  },
];

export function PractitionersTeam() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      id="leadership"
      className="relative w-full overflow-hidden bg-white pt-6 sm:pt-8 pb-0 text-[#101C30] font-sans"
      style={{ fontFamily: 'Calibri' }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            Leadership
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl md:text-4xl">
            Led by practitioners. Built to grow.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#526171] sm:text-lg">
            Strategy, GCC execution and shared services under one senior-led
            platform with the bench expanding across practice areas.
          </p>
        </div>

        {/* Uniform Height Cards Grid with 3D Flip & Centered Last Row */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
          {practitionersTeam.map((leader, index) => {
            const isFlipped = !!flippedCards[index];
            const total = practitionersTeam.length;
            const isLastRowTwoOnLg = total % 3 === 2;
            const isFirstOfTwoOnLg = isLastRowTwoOnLg && index === total - 2;
            const isLastSingleOnMd = total % 2 === 1 && index === total - 1;

            return (
              <div
                key={leader.name}
                className={cn(
                  "relative h-[310px] sm:h-[320px] w-full [perspective:1000px]",
                  // On large screens (6-col grid): 3 cards per row (2 cols each).
                  // If 2 cards in last row, the first starts at col 2 to perfectly center them.
                  isFirstOfTwoOnLg ? "lg:[grid-column:2/span_2]" : "lg:col-span-2",
                  // On tablet/medium screens (2-col grid): center single card in the last row
                  isLastSingleOnMd
                    ? "md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto lg:w-full lg:mx-0"
                    : "md:col-span-1"
                )}
                onMouseLeave={() => {
                  if (flippedCards[index]) {
                    setFlippedCards((prev) => ({
                      ...prev,
                      [index]: false,
                    }));
                  }
                }}
              >
                <div
                  className={cn(
                    "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
                    isFlipped && "[transform:rotateY(180deg)]"
                  )}
                >
                  {/* FRONT FACE (Uniform Compact Height, 4 lines, Snug Bottom Spacing) */}
                  <div className="absolute inset-0 flex h-full w-full flex-col justify-start rounded-2xl border border-[#3E5245] bg-[#2F3F34] px-5 pt-4 pb-3 sm:px-6 sm:pt-4.5 sm:pb-3.5 shadow-md [backface-visibility:hidden]">
                    {/* Circular Photo Avatar */}
                    <div className="relative mx-auto h-16 w-16 sm:h-18 sm:w-18 shrink-0 overflow-hidden rounded-full border-2 border-[#B59439]/60 shadow-xs bg-[#243329]">
                      {leader.image ? (
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className={cn(
                            "object-cover",
                            leader.imagePosition || "object-[center_15%]"
                          )}
                          sizes="(max-width: 640px) 64px, 72px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#243329] text-xl font-bold text-[#B59439]">
                          {leader.initials}
                        </div>
                      )}
                    </div>

                    {/* Name & Role Header */}
                    <div className="mt-2.5 min-h-[3.1rem] sm:min-h-[3.3rem] flex flex-col justify-start text-center">
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                        {leader.name}
                      </h3>

                      <p className="mt-0.5 text-xs sm:text-[13px] font-semibold italic text-[#B59439] leading-snug">
                        {leader.role}
                      </p>
                    </div>

                    {/* Bio Clamped: 4 lines with normal word spacing (no text-justify) */}
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#D8D2C0] text-left line-clamp-4">
                      {leader.bio}
                    </p>

                    {/* Read more button directly below text with compact bottom margin */}
                    <div className="mt-2 sm:mt-2.5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => toggleFlip(index)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B59439] hover:text-[#D4AF37] transition-colors cursor-pointer"
                        aria-label={`Read full bio for ${leader.name}`}
                      >
                        <span>Read more</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE (Flipped: Full Complete Bio Text - auto returns on mouse leave) */}
                  <div className="absolute inset-0 flex h-full w-full flex-col justify-between rounded-2xl border border-[#B59439]/70 bg-[#2F3F34] p-4 sm:p-5 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="flex flex-col h-full overflow-hidden">
                      {/* Top Header on Back */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#3E5245]">
                        <div className="text-left">
                          <h4 className="text-base font-bold text-white leading-snug">
                            {leader.name}
                          </h4>
                          <p className="text-xs font-semibold italic text-[#B59439]">
                            {leader.role}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFlip(index)}
                          className="shrink-0 rounded-full p-1 text-[#D8D2C0]/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Full Bio text with normal spacing, fills the card body without visible scrollbar */}
                      <div className="mt-2.5 flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-0.5">
                        <p className="text-xs sm:text-sm leading-relaxed text-[#D8D2C0] text-left">
                          {leader.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Vertara & Open Positions */}
        <div className="mt-16 sm:mt-20 pt-10 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column (5 cols on lg) */}
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
                JOIN VERTARA
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#101C30] leading-snug">
                We are growing the bench
              </h3>
              <p className="mt-2 text-base sm:text-lg font-medium text-[#101C30]/85 leading-relaxed">
                Three practice-leadership roles are open
                <br />
                <br />
                We're building practice leadership across the capabilities that
                help GCCs get built and scaled.
              </p>
            </div>

            {/* Right Column (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-7 sm:space-y-8">
              {openPositions.map((pos) => (
                <div key={pos.number}>
                  <div className="flex items-baseline gap-3 pb-1">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#B59439]">
                      {pos.number}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#101C30]">
                      {pos.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526171]">
                    {pos.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width CTA Banner (Styled after Image 2: Gold #B59439 with Forest Green #2F3F34 CTA) */}
      <div className="mt-16 sm:mt-20 w-full overflow-hidden bg-[#B59439] py-12 sm:py-14 md:py-16 text-[#101C30] border-t border-b border-[#a6862f]">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl md:text-4xl leading-tight">
            Let’s build the right GCC — and build it to last.
          </h3>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-[#101C30]/90 max-w-2xl mx-auto">
            Interested in joining Vertara? Discuss the role with us.
          </p>

          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-7 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-white shadow-md transition-all duration-200 hover:bg-[#233027] hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Discuss Your GCC Mandate</span>
              <ArrowUpRight className="h-5 w-5 stroke-[2.4]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
