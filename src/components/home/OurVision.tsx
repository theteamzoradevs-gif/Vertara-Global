"use client";

import { Reveal } from "@/components/ui/Reveal";

const values = ["Trust", "Ownership", "Craft"];

export function OurVision() {
  return (
    <section id="our-vision" className="relative overflow-hidden bg-surface py-16 md:py-20">
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow and Main Vision Header */}
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-navy">
                VERTARA <span className="text-[#c8923a]">global</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                GCC Advisory
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
              Our vision
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate md:text-lg lg:text-xl lg:leading-relaxed">
              To be the most trusted partner for organizations building Global Capability Centres that create real enterprise value.
            </p>
          </div>
        </Reveal>

        {/* "The name" Card + Values Pills */}
        <div className="mt-10 max-w-3xl space-y-4">
          {/* "The Name" Dark Card */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1f3a] p-6 text-white shadow-xl shadow-navy/10 sm:p-8 md:p-9">
              {/* Subtle decorative glow in background */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#c8923a]/15 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl"
              />

              <div className="relative z-[1]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5a93c]">
                  The name
                </p>

                <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg sm:leading-relaxed">
                  <strong className="font-semibold text-white">Vertara</strong> draws from{" "}
                  <span className="font-semibold text-[#fcd34d]">Vertex</span> — the summit, the highest point of capability and
                  <span className="font-semibold text-[#fcd34d]"> Tara</span>, the Sanskrit word for star, guide and to cross over.
                </p>

                <div className="my-5 h-px w-full bg-white/10" />

                <p className="text-sm leading-relaxed text-white/80 sm:text-base sm:leading-relaxed">
                  Together: <span className="font-medium text-white">The guiding summit</span>, a partner that leads organizations to the peak of their GCC ambition.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Core Values / Pillars (3 Pills) */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {values.map((v) => (
                <div
                  key={v}
                  className="flex h-12 items-center justify-center rounded-full border border-[#c8923a]/60 bg-white px-4 text-center shadow-xs transition-all duration-300 hover:scale-[1.03] hover:border-[#c8923a] hover:bg-[#fffdf7] hover:shadow-sm"
                >
                  <span className="text-sm font-bold tracking-wide text-[#a16207] sm:text-base">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
