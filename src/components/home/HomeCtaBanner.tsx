"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function HomeCtaBanner() {
  return (
    <section
      id="cta-mandate"
      className="relative w-full overflow-hidden bg-[#B59439] py-10 sm:py-12 md:py-14 text-[#101C30] font-sans border-t border-b border-[#a6862f]"
      style={{ fontFamily: 'Calibri' }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#101C30] leading-tight">
              What should your GCC look like?
            </h2>

            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-[#101C30]/90 max-w-3xl mx-auto">
              Let’s talk about what yours should look like a 20-person Nano GCC or a 500-person capability centre.
            </p>

            {/* CTA in the middle */}
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
        </Reveal>
      </div>
    </section>
  );
}
