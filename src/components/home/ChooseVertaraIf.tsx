"use client";

import { Reveal } from "@/components/ui/Reveal";

const triggers = [
  {
    number: "01",
    titleLine1: "You’re building your",
    titleLine2: "first India GCC",
    descLine1: "Whether that starts as a Nano",
    descLine2: "pilot or a larger build",
  },
  {
    number: "02",
    titleLine1: "You’re scaling to a",
    titleLine2: "capability hub",
    descLine1: "From cost centre to capability",
    descLine2: "hub to innovation centre",
  },
  {
    number: "03",
    titleLine1: "You’re opening a",
    titleLine2: "second location",
    descLine1: "Without duplicating your",
    descLine2: "governance or overhead",
  },
  {
    number: "04",
    titleLine1: "You’re an investor-backed",
    titleLine2: "growth company",
    descLine1: "And need rapid, compliant scale",
    descLine2: "on a tight runway",
  },
  {
    number: "05",
    titleLine1: "You’re a digital-native",
    titleLine2: "technology business",
    descLine1: "Expanding engineering,",
    descLine2: "analytics or AI teams",
  },
];

export function ChooseVertaraIf() {
  return (
    <section id="choose-vertara" className="relative bg-[#F9F8F5] py-14 md:py-18 border-b border-[#E8E4D9]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="w-full">
            {/* Section Header */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
              Decision Triggers
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]">
              Choose Vertara if
            </h2>

            {/* 5-Column Grid: Balanced 2-line title and 2-line description with top border */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
              {triggers.map((item) => (
                <div
                  key={item.number}
                  className="flex flex-col"
                >
                  {/* Numbering */}
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#B59439]">
                    {item.number}
                  </span>

                  {/* Balanced 2-line title */}
                  <h3 className="mt-2.5 text-[15px] sm:text-base font-bold text-[#101C30] leading-snug">
                    <span className="block">{item.titleLine1}</span>
                    <span className="block">{item.titleLine2}</span>
                  </h3>

                  {/* Balanced 2-line description */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#101C30]/80">
                    <span className="block">{item.descLine1}</span>
                    <span className="block">{item.descLine2}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
