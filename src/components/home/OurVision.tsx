"use client";

import { Reveal } from "@/components/ui/Reveal";

export function OurVision({
  image,
}: {
  image?: string;
} = {}) {
  return (
    <section id="our-story-vision" className="relative overflow-hidden bg-[#F5F2EA] pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 font-sans" style={{ fontFamily: 'Calibri' }}>
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 sm:space-y-12">
          {/* 1. Our story */}
          <Reveal>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">
                Our story
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#101C30]/90 text-left">
                Vertara Global was founded by GCC builders, not GCC advisors. Our founders led capability centre builds at a Big 4 firm and one of the world’s largest global mining companies standing up teams from a blank sheet of paper, not writing a recommendation for someone else to execute. That distinction shapes everything about how Vertara works we size engagements the way an operator would, price the way an accountable partner would, and stay past the launch date the way an owner would.
              </p>
            </div>
          </Reveal>

          {/* 2. Our vision */}
          <Reveal delay={0.08}>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">
                Our vision
              </h2>
              <div className="border-l-[3.5px] border-[#B59439] pl-4 sm:pl-5 py-0.5">
                <p className="text-base sm:text-lg md:text-xl font-bold italic leading-relaxed text-[#2F3F34]">
                  To be the most trusted partner for organizations building Global Capability Centres from Nano GCCs to full mid-scale hubs that create real enterprise value.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 3. The name */}
          <Reveal delay={0.16}>
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
                THE NAME
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#101C30]/90 max-w-4xl">
                Vertara draws from Vertex, the summit, the highest point of capability and Tara, the Sanskrit word for star, guide and to cross over.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#526171] max-w-4xl">
                Together: The guiding summit, a partner that leads organizations to the peak of their GCC ambition.
              </p>
            </div>
          </Reveal>

          {/* 4. What we stand for & By the numbers */}
          <Reveal delay={0.24}>
            <div className="pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-6 sm:gap-y-8 items-start">
                {/* Column 1: WHAT WE STAND FOR */}
                <div className="flex flex-col gap-6 sm:gap-8 lg:contents">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy lg:order-1">
                    What we stand for
                  </h3>

                  {/* 01 TRUST */}
                  <div className="lg:order-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#B59439]">
                        01
                      </span>
                      <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-navy">
                        Trust
                      </h4>
                    </div>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526171] pl-8">
                      Transparent scoping, milestone-based terms, no silent scope creep.
                    </p>
                  </div>

                  {/* 02 OWNERSHIP */}
                  <div className="lg:order-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#B59439]">
                        02
                      </span>
                      <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-navy">
                        Ownership
                      </h4>
                    </div>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526171] pl-8">
                      One accountable team across strategy, legal, HR and technology.
                    </p>
                  </div>

                  {/* 03 CRAFT */}
                  <div className="lg:order-7">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#B59439]">
                        03
                      </span>
                      <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-navy">
                        Craft
                      </h4>
                    </div>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526171] pl-8">
                      Practitioner judgment applied to every decision.
                    </p>
                  </div>
                </div>

                {/* Column 2: BY THE NUMBERS */}
                <div className="flex flex-col gap-6 sm:gap-8 lg:contents mt-8 lg:mt-0">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy lg:order-2">
                    By the numbers
                  </h3>

                  {/* Stat 1: 50+ */}
                  <div className="lg:order-4">
                    <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-navy">
                      50+
                    </p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526171]">
                      Years of combined GCC experience across the founding team
                    </p>
                  </div>

                  {/* Stat 2: 6 */}
                  <div className="lg:order-6">
                    <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-navy">
                      6
                    </p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526171]">
                      Sectors
                    </p>
                  </div>

                  {/* Stat 3: 10 */}
                  <div className="lg:order-8">
                    <p className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-navy">
                      10
                    </p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526171]">
                      GCC builds led by our founders before Vertara existed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
