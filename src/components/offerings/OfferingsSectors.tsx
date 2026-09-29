"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { offeringsData } from "../../data/offerings-data";

export function OfferingsSectors() {
  const { sectors } = offeringsData;

  return (
    <section
      id="sectors"
      className="relative w-full overflow-hidden border-b border-[#cddcd1] py-14 sm:py-16 md:py-20 font-sans"
      style={{ backgroundColor: "#e5ebe6", fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="w-full text-left">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
              {sectors.eyebrow}
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem] leading-tight">
              {sectors.title}
            </h2>

            <p className="mt-3 w-full text-base sm:text-lg leading-relaxed text-[#101C30]/85">
              {sectors.description}
            </p>
          </div>
        </Reveal>

        {/* Compact 4x2 Grid of 8 Clickable Sector Cards linked to specific industry routes */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {sectors.items.map((sector, index) => (
            <Reveal key={sector.id} delay={index * 0.04} className="flex flex-col">
              <Link
                href={sector.route}
                className="group flex h-[190px] sm:h-[195px] w-full flex-col justify-between rounded-2xl border border-[#cddcd1] bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2F3F34] hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2F3F34]/30"
              >
                <div>
                  {/* Category Eyebrow */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B59439]">
                    Sector {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>

                  {/* Sector Title */}
                  <h3 className="mt-2 text-base sm:text-lg font-bold tracking-tight text-[#101C30] group-hover:text-[#2F3F34] transition-colors leading-snug min-h-[44px] line-clamp-2">
                    {sector.title}
                  </h3>

                  {/* Teaser Preview */}
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#101C30]/75 line-clamp-2">
                    {sector.overview}
                  </p>
                </div>

                {/* Bottom Click Cue */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#2F3F34]">
                  <span>Explore details</span>
                  <span className="text-sm font-bold leading-none transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
