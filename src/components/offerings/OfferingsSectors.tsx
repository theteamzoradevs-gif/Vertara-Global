"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";
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

        {/* 8 Clickable Sector Cards: Mobile Auto + Manual Slider with dots alone, Desktop 4x2 Grid */}
        <div className="mt-10 sm:mt-14">
          <MobileAutoSlider
            autoSlideInterval={3500}
            desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 items-stretch"
            itemClassName="w-[84vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
            dotTone="gold"
          >
            {sectors.items.map((sector, index) => (
              <Link
                key={sector.id}
                href={sector.route}
                className="group flex h-[195px] w-full flex-col justify-between rounded-2xl border border-[#cddcd1] bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2F3F34] hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2F3F34]/30"
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
            ))}
          </MobileAutoSlider>
        </div>
      </div>
    </section>
  );
}
