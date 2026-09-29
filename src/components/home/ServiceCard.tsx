"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Compass, Settings2, Users, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons = {
  users: Users,
  building: Building2,
  settings: Settings2,
  compass: Compass,
} as const;

type ServiceCardProps = {
  slug: string;
  name: string;
  shortDescription: string;
  valueProposition?: string;
  icon: string;
  image?: string;
};

export function ServiceCard({
  slug,
  name,
  shortDescription,
  valueProposition,
  icon,
}: ServiceCardProps) {
  const Icon = icons[icon as keyof typeof icons] ?? Users;
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal>
      <div
        className="group h-[265px] [perspective:1200px] sm:h-[280px]"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front — White card on light green section */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#cddcd1] bg-white p-5 sm:p-6 shadow-sm [backface-visibility:hidden]">
            <div>
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5ebe6] text-[#2F3F34] shadow-sm border border-[#cddcd1]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-4 text-base sm:text-lg font-bold text-[#101C30] tracking-tight leading-snug">
                {name}
              </h3>

              <p className="mt-2 line-clamp-3 text-xs sm:text-sm leading-relaxed text-[#101C30]/80">
                {shortDescription}
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs font-bold text-[#2F3F34]">
              <span className="hidden sm:inline">Hover to explore</span>
              <button
                type="button"
                className="sm:hidden underline underline-offset-2"
                onClick={() => setFlipped(true)}
              >
                Tap for details
              </button>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Back — Exact Forest Green #2F3F34 theme while hovered */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2F3F34] bg-[#2F3F34] p-5 sm:p-6 text-white shadow-xl shadow-black/25 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#B59439]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-3 text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                {name}
              </h3>

              <p className="mt-2 line-clamp-3 text-xs sm:text-sm leading-relaxed text-white/85">
                {valueProposition || shortDescription}
              </p>
            </div>

            <div className="pt-3 flex items-center gap-2">
              <Link
                href={`/services/${slug}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#B59439] px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9c7e2d]"
              >
                <span>View module</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                className="sm:hidden rounded-lg border border-white/25 px-2.5 py-2 text-xs text-white/80"
                onClick={() => setFlipped(false)}
              >
                ←
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
