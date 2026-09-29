"use client";

import { Reveal } from "@/components/ui/Reveal";
import { offeringsData } from "../../data/offerings-data";

export function OfferingsCommercial() {
  const { commercial } = offeringsData;

  return (
    <section
      id="commercial-principles"
      className="relative w-full overflow-hidden bg-[#F9F8F5] py-16 sm:py-20 md:py-24 border-b border-[#D8D2C0] font-sans text-[#101C30]"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
            {/* Left Column (45%): Eyebrow, Title, Lead & Quote Callout */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-start">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#8C7026]">
                {commercial.eyebrow}
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-[#101C30] leading-tight">
                {commercial.title}
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#101C30]/85">
                {commercial.lead}
              </p>

              {/* Gold Callout Quote */}
              <div className="mt-8 border-l-[3px] border-[#B59439] pl-5 sm:pl-6 py-1">
                <p className="text-lg sm:text-xl font-bold italic tracking-tight text-[#2F3F34] leading-snug">
                  "{commercial.calloutQuote}"
                </p>
              </div>
            </div>

            {/* Right Column (55%): The 4 Commercial Principles */}
            <div className="lg:col-span-6 xl:col-span-7 pt-2 lg:pt-4">
              <div className="space-y-6 sm:space-y-8">
                {commercial.principles.map((point) => (
                  <div key={point.title} className="flex items-start gap-4 sm:gap-5">
                    {/* Gold Dot */}
                    <span
                      className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#B59439]"
                      aria-hidden="true"
                    />

                    {/* Content */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#101C30] leading-snug">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#101C30]/75">
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
