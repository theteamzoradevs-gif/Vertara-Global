"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function NanoGccExplainer() {
  return (
    <section id="nano-gcc-explainer" className="relative bg-white py-10 sm:py-12 border-b border-[#E8E4D9]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="border-l-[3px] border-[#B59439] pl-5 sm:pl-7">
            <h2 className="text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]">
              What’s a Nano GCC?
            </h2>

            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#101C30]/90">
              A Nano GCC is a 20–100 employee capability centre small enough to launch in weeks and break even in 12–18 months, disciplined enough to run like a full GCC from day one. It’s a natural entry point for mid-market and investor-backed companies and one part of a wider range Vertara builds for, up to a 500-person mid-scale centre. Vertara has written the playbook on the Nano end of that range.
            </p>

            {/* Read more CTA on left side */}
            <div className="mt-4 sm:mt-5 flex justify-start">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2F3F34] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#233027] hover:shadow-md"
              >
                <span>Read more</span>

              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
