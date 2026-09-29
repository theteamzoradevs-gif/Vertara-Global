"use client";

import { Reveal } from "@/components/ui/Reveal";

export function OurVision({
  image,
}: {
  image?: string;
} = {}) {
  return (
    <section id="our-story-vision" className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 font-sans" style={{ fontFamily: 'Calibri' }}>
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 sm:space-y-12">
          {/* 1. Our story */}
          <Reveal>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
                Our story
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#101C30]/90 max-w-4xl text-justify">
                Vertara Global was founded by GCC builders, not GCC advisors. Our founders led capability centre builds at a Big 4 firm and one of the world’s largest global mining companies standing up teams from a blank sheet of paper, not writing a recommendation for someone else to execute. That distinction shapes everything about how Vertara works we size engagements the way an operator would, price the way an accountable partner would, and stay past the launch date the way an owner would.
              </p>
            </div>
          </Reveal>

          {/* 2. Our vision */}
          <Reveal delay={0.08}>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
                Our vision
              </h2>
              <div className="border-l-[3.5px] border-[#B59439] pl-4 sm:pl-5 py-0.5">
                <p className="text-base sm:text-lg md:text-xl font-bold italic leading-relaxed text-[#2F3F34]">
                  To be the most trusted partner for organizations building Global Capability Centres — from Nano GCCs to full mid-scale hubs — that create real enterprise value.
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
        </div>
      </div>
    </section>
  );
}
