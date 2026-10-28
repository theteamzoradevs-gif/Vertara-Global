"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function LedByPractitioners() {
  return (
    <section
      id="led-by-practitioners"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-14 md:py-16 border-b border-border font-sans"
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="w-full text-left">
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
              Leadership
            </p>

            {/* Title */}
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]">
              Led by practitioners
            </h2>

            {/* Main Statement */}
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-[#101C30] max-w-4xl">
              Vertara was started by people who have built capability centres from the inside, at a Big 4 firm and at one of the world's largest mining companies. We've sat in the client's chair. We know what it's like to defend a business case to the board, hire the first leader, find the right office and keep a new team on track in year two. That's the experience we bring to every client.
            </p>

            {/* Read More CTA */}
            <div className="mt-6 sm:mt-8 flex justify-start">
              <Link
                href="/about#leadership"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#233027] hover:shadow-md"
              >
                <span>Read more</span>
                <span className="text-sm leading-none">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
