"use client";

import { Reveal } from "@/components/ui/Reveal";

interface WhyUsPoint {
  title: string;
  description: string;
}

const points: WhyUsPoint[] = [
  {
    title: "We stay accountable end to end.",
    description: "We don’t hand off between vendors.",
  },
  {
    title: "We build for the mid-market.",
    description: "Nano through 500-person from day one.",
  },
  {
    title: "We know the cities.",
    description: "We don’t guess at tier-2 cities.",
  },
  {
    title: "We stay until it’s truly yours.",
    description: "We don’t disappear after launch.",
  },
  {
    title: "We price for outcomes.",
    description: "We don’t price by the hour. We price by the milestone you actually reach.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative w-full overflow-hidden bg-[#F9F8F5] py-14 sm:py-16 md:py-22 border-b border-[#E8E4D9] font-sans text-[#101C30]"
      style={{ fontFamily: 'Calibri' }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
            {/* Left Column: Eyebrow, Main Headline & Subtitle Paragraph */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-start">
              {/* Eyebrow matching other sections */}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C7026] sm:text-sm">
                Why us
              </p>

              {/* Main Headline */}
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem] leading-tight">
                More than a launch partner. A partner for what comes next.
              </h2>

              {/* Description Paragraph in italic as requested */}
              <p className="mt-5 sm:mt-6 text-base sm:text-lg italic leading-relaxed text-[#101C30]/85">
                A GCC is not a cost decision. It’s an asset your business will run on for a decade. Build it with a partner who’s still standing next to you on year five, not just launch day.
              </p>
            </div>

            {/* Right Column: 5 Points with dots only, shifted towards right side */}
            <div className="lg:col-span-6 xl:col-span-7 pt-1 lg:pt-3 lg:pl-8 xl:pl-16">
              <div className="space-y-6 sm:space-y-7 md:space-y-8">
                {points.map((point) => (
                  <div key={point.title} className="flex items-start gap-4 sm:gap-5">
                    {/* Gold Dot (no lines) */}
                    <span
                      className="mt-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 rounded-full bg-[#B59439]"
                      aria-hidden="true"
                    />

                    {/* Content: Bold Title + Description */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#101C30] leading-snug">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-[#101C30]/75">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
