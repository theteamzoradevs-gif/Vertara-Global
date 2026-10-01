"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";
import { offeringsData } from "../../data/offerings-data";

export function OfferingsScope() {
  const { scope } = offeringsData;

  return (
    <section
      id="scope"
      className="relative w-full overflow-hidden bg-white py-14 sm:py-16 md:py-20 border-b border-[#D8D2C0]/70 font-sans"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div>
            {/* Eyebrow */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B59439]">
              {scope.eyebrow}
            </p>

            {/* Heading */}
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem] leading-tight">
              {scope.title}
            </h2>

            {/* Intro Narrative */}
            <p className="mt-4 w-full text-base sm:text-lg leading-relaxed text-[#101C30]/85">
              {scope.intro}
            </p>
          </div>

          {/* 4 Cards: Mobile Auto + Manual Slider with dots, Desktop Grid */}
          <div className="mt-10 sm:mt-12">
            <MobileAutoSlider
              autoSlideInterval={3500}
              desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
              itemClassName="w-[84vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
              dotTone="gold"
            >
              {scope.items.map((item) => (
                <div
                  key={item.title}
                  id={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#D8D2C0] bg-[#F9F8F5]/70 p-6 transition-all duration-300 hover:border-[#2F3F34] hover:bg-white hover:shadow-lg cursor-pointer h-full"
                >
                  <div>
                    {/* Top Bar: Number & Tag */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#B59439]">
                        {item.number}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C7026] bg-white px-2 py-0.5 rounded border border-[#D8D2C0]">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-[#101C30] leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm leading-relaxed text-[#101C30]/80">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom link (for Card 4 research or interactive hover) */}
                  {item.linkHref ? (
                    <div className="mt-6 pt-4 border-t border-[#D8D2C0]/60">
                      <Link
                        href={item.linkHref}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F3F34] hover:text-[#B59439] transition-colors"
                      >
                        <span>{item.linkText || "Explore Insights →"}</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-6 pt-4 border-t border-transparent" />
                  )}
                </div>
              ))}
            </MobileAutoSlider>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
