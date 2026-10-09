"use client";

import { Reveal } from "@/components/ui/Reveal";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

const points = [
  {
    title: "Integrated execution & senior judgment",
    description:
      "Direct founder/practitioner engagement one team, not multiple vendors.",
  },
  {
    title: "Speed to deliver & agility to scale",
    description:
      "Launch in weeks, not quarters no re-architecture as headcount grows from a Nano GCC to a 500-person hub.",
  },
  {
    title: "Right-sized governance",
    description:
      "Compliance scoped to the centre’s actual size controls built in from day one, whether that’s 20 people or 500.",
  },
  {
    title: "Leadership-first build",
    description:
      "First 5 hires before the next 50 the same discipline whether the end-state is 100 people or 500.",
  },
  {
    title: "Tier-2 city fluency, cost economics",
    description:
      "Coimbatore, Indore, Jaipur, Kochi evaluated equally alongside Bengaluru, Gurgaon, Hyderabad.",
  },
  {
    title: "Sector-shaped judgment",
    description:
      "Engineering, Pharma, FMCG, Financial Services same rigor, different starting point.",
  },
];

export function BuiltForMidMarket() {
  return (
    <section
      id="built-for-mid-market"
      className="relative overflow-hidden bg-[#F9F8F5] py-14 md:py-20 border-b border-[#E8E4D9]"
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
              Our Focus
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]">
              Built for mid-market, focussing on establishing and scaling Nano GCCs
            </h2>

            <p className="mt-3 w-full text-base sm:text-lg leading-relaxed text-[#101C30]">
              A GCC for a mid-market company needs different judgment than one for a Fortune 500 different pace, different budget discipline, different cities. We work the full range a 20-person Nano GCC pilot at one end, a 400–500 person mid-scale capability hub at the other, and everything in between without forcing every mandate through the same enterprise playbook.
            </p>
          </div>
        </Reveal>

        {/* 6 Cards: Mobile Auto + Manual Slider with dots, Desktop Grid */}
        <div className="mt-10">
          <MobileAutoSlider
            autoSlideInterval={3500}
            desktopClassName="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
            itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:max-w-none flex flex-col h-full"
            dotTone="gold"
          >
            {points.map((item) => (
              <div
                key={item.title}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#cddcd1] bg-[#e5ebe6] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2F3F34]/50 hover:shadow-md cursor-pointer"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#101C30] tracking-tight leading-snug group-hover:text-[#2F3F34] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#101C30]/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </MobileAutoSlider>
        </div>
      </div>
    </section>
  );
}
