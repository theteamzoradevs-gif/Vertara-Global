"use client";

import { Reveal } from "@/components/ui/Reveal";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative bg-white py-12 md:py-16 border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-4xl">
            {/* Section Header: Eyebrow + Title */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
              Our Mandate
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
              What we do
            </h2>

            {/* Paragraph body */}
            <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-slate">
              Vertara takes a Global Capability Centre from an open question to a running operation — sized right for a mid-market mandate, from a 20–100 person Nano GCC through a full mid-scale build of up to 500 people. We build the business case, design the operating model and entity structure, stand up legal and HR foundations, and stay accountable through launch and the first years of scale.
            </p>

            {/* Value Proposition Forest Green Banner */}
            <div className="mt-7 sm:mt-8 overflow-hidden rounded-2xl border border-[#2F3F34] bg-[#2F3F34] px-6 py-4 text-center text-white shadow-md sm:px-8 sm:py-5">
              <p className="text-sm font-semibold leading-relaxed tracking-wide sm:text-base md:text-lg">
                A partner who owns the whole journey — from business case to operating GCC.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
