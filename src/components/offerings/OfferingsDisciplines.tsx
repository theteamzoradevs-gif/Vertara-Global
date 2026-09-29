"use client";

import { Reveal } from "@/components/ui/Reveal";
import { offeringsData } from "../../data/offerings-data";

export function OfferingsDisciplines() {
  const { disciplines } = offeringsData;

  const leftColumn = disciplines.items.slice(0, 3);
  const rightColumn = disciplines.items.slice(3, 6);

  return (
    <section
      id="disciplines"
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 md:py-24 border-b border-[#D8D2C0]/70 font-sans"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl text-left">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
              {disciplines.eyebrow}
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-[#101C30] leading-tight">
              {disciplines.title}
            </h2>
          </div>
        </Reveal>

        {/* Balanced 2-Column List with Gold Indicator Dots */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
          {/* Left Column (Items 1-3) */}
          <div className="space-y-6 sm:space-y-8">
            {leftColumn.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="flex items-start gap-4">
                  {/* Gold Dot */}
                  <span
                    className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#B59439]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#101C30] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#101C30]/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Column (Items 4-6) */}
          <div className="space-y-6 sm:space-y-8">
            {rightColumn.map((item, index) => (
              <Reveal key={item.title} delay={(index + 3) * 0.08}>
                <div className="flex items-start gap-4">
                  {/* Gold Dot */}
                  <span
                    className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#B59439]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#101C30] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#101C30]/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
