"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function OurVision({
  image = "/images/About Us.jpeg",
}: {
  image?: string;
}) {
  return (
    <section id="our-vision" className="relative overflow-hidden bg-surface py-16 md:py-20">
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Column: Eyebrow, Title, Vision, The Name, Values Pills */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <Reveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
                  Our Story
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
                  About Us
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate md:text-lg lg:text-xl lg:leading-relaxed">
                  To be the most trusted partner for organizations building Global Capability Centres that create real enterprise value.
                </p>
              </div>
            </Reveal>

            {/* "The name" as simple text */}
            <div className="mt-8 space-y-4">
              <Reveal delay={0.1}>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]">
                    The name
                  </p>

                  <p className="text-base leading-relaxed text-slate md:text-lg lg:leading-relaxed">
                    Vertara draws from Vertex, the summit, the highest point of capability and Tara, the Sanskrit word for star, guide and to cross over.
                  </p>

                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    Together: The guiding summit, a partner that leads organizations to the peak of their GCC ambition.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="pt-2 flex justify-center">
                  <Button href="/about" size="md">
                    Read more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: About Us Image */}
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-muted/10 shadow-md">
                <Image
                  src={image}
                  alt="About Vertara Global"
                  width={780}
                  height={606}
                  className="h-auto w-full rounded-3xl object-contain"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 45vw, 480px"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
