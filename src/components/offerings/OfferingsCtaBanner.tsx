"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { offeringsData } from "../../data/offerings-data";

export function OfferingsCtaBanner() {
  const { ctaBanner } = offeringsData;

  return (
    <section
      id="cta-mandate"
      className="relative w-full overflow-hidden bg-[#B59439] py-12 sm:py-14 md:py-16 text-[#101C30] font-sans border-t border-b border-[#a6862f]"
      style={{ fontFamily: "Calibri" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#101C30] leading-tight">
              {ctaBanner.title}
            </h2>

            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-[#101C30]/90 max-w-3xl mx-auto">
              {ctaBanner.description}
            </p>

            <div className="mt-7 sm:mt-8 flex items-center justify-center">
              <Link
                href={ctaBanner.buttonHref}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-7 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-white shadow-md transition-all duration-200 hover:bg-[#233027] hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{ctaBanner.buttonText}</span>
                <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
