"use client";

import { Reveal } from "@/components/ui/Reveal";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative bg-white py-12 md:py-16 border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="w-full">
            {/* Section Header: Eyebrow + Title */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
              Our Foundation
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]">
              What we do
            </h2>

            {/* Paragraph body - expanded full width towards right side */}
            <p className="mt-4 w-full text-sm sm:text-base md:text-lg leading-relaxed text-[#101C30]">
              Vertara takes a Global Capability Centre from an open question to a running operation sized right for a mid-market mandate, from a 20–100 person Nano GCC through a full mid-scale build of up to 500 people. We build the business case, design the operating model and entity structure, stand up legal and HR foundations, and stay accountable through launch and the first years of scale.
            </p>

            {/* Value Proposition Callout */}
            <div className="mt-6 sm:mt-8 border-l-[3px] border-[#B59439] pl-4 sm:pl-5 py-0.5">
              <p className="text-base sm:text-lg md:text-xl font-bold italic tracking-tight text-[#2F3F34] leading-snug">
                A partner who owns the whole journey from business case to operating GCC.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
