"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  image: string;
};

export function ServiceCard({
  slug,
  name,
  shortDescription,
  valueProposition,
  icon,
  image,
}: ServiceCardProps) {
  const Icon = icons[icon as keyof typeof icons] ?? Users;
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal>
      <div
        className="group h-[400px] [perspective:1200px] sm:h-[420px]"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#cddcd1] bg-[#e5ebe6] shadow-sm [backface-visibility:hidden]">
            <div className="relative h-44 shrink-0 overflow-hidden sm:h-48">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d3320]/75 via-[#0d3320]/20 to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-accent shadow">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold text-navy">{name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {shortDescription}
              </p>
              <p className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                Hover to explore →
              </p>
              <button
                type="button"
                className="mt-2 text-left text-sm font-semibold text-navy underline-offset-2 hover:underline sm:hidden"
                onClick={() => setFlipped(true)}
              >
                Tap for details
              </button>
            </div>
          </div>

          {/* Back — dark green theme */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0e3621] bg-gradient-to-br from-[#0d3320] via-[#0e3621] to-[#082013] p-5 text-white shadow-xl shadow-black/30 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-highlight">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold">{name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
              {valueProposition || shortDescription}
            </p>
            <div className="mt-4 space-y-2">
              <Link
                href={`/services/${slug}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-highlight px-4 py-2.5 text-sm font-semibold text-[#0d3320] transition hover:bg-white"
              >
                View service
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Get a quick call
              </Link>
            </div>
            <button
              type="button"
              className="mt-3 text-center text-xs text-white/60 sm:hidden"
              onClick={() => setFlipped(false)}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
