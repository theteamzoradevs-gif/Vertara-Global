"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Compass, Settings2, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  users: Users,
  building: Building2,
  settings: Settings2,
  compass: Compass,
} as const;

const fallbackImages: Record<string, string> = {
  talent: "/images/talent-team.webp",
  workspace: "/images/workspace-blue.webp",
  operations: "/images/gcc-ops.png",
  advisory: "/images/workspace-collab.jpg",
};

type Module = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: string;
  image?: string;
};

export function ConnectedModules({ modules }: { modules: Module[] }) {
  const [active, setActive] = useState<string | null>(modules[0]?.slug ?? null);
  const current = modules.find((m) => m.slug === active) ?? modules[0];
  const detailImage =
    current?.image ||
    fallbackImages[current?.slug ?? ""] ||
    "/images/gcc-floor.webp";

  // Solid white card — no thread overlay on content (threads stay on section only)
  return (
    <div className="relative z-[1] overflow-hidden rounded-3xl border border-border bg-white px-3 py-6 shadow-sm sm:px-6 sm:py-8 lg:px-8">
      <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <div className="relative mx-auto hidden aspect-square w-full max-w-[420px] sm:block lg:max-w-[460px]">
          <div className="absolute inset-[20%] rounded-full border border-dashed border-accent/40" />
          <div className="absolute inset-[34%] rounded-full bg-navy text-center text-white shadow-xl shadow-navy/20">
            <div className="flex h-full flex-col items-center justify-center px-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-highlight">
                Platform
              </p>
              <p className="mt-1 text-sm font-bold leading-snug md:text-base">
                GCC Operating System
              </p>
            </div>
          </div>
          {modules.map((mod, index) => {
            const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 38;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const Icon = icons[mod.icon as keyof typeof icons] ?? Users;
            const isActive = active === mod.slug;
            return (
              <button
                key={mod.slug}
                type="button"
                style={{ left: `${x}%`, top: `${y}%` }}
                className={cn(
                  "absolute flex w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border bg-white p-2.5 text-center shadow-md transition-all duration-300 sm:w-[32%] md:p-3",
                  isActive
                    ? "z-10 border-accent shadow-accent/20 ring-2 ring-accent/30"
                    : "border-border hover:border-accent/50",
                )}
                onMouseEnter={() => setActive(mod.slug)}
                onFocus={() => setActive(mod.slug)}
                onClick={() => setActive(mod.slug)}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold leading-tight text-navy sm:text-xs">
                  {mod.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 min-w-0 overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:ml-2">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <div className="relative h-40 overflow-hidden sm:h-48">
                  <Image
                    src={detailImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-highlight">
                      Module focus
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                      {current.name}
                    </h3>
                  </div>
                </div>
                <div className="p-5 sm:p-6 md:p-7">
                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    {current.shortDescription}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/services/${current.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover"
                    >
                      Explore {current.name}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-navy transition hover:border-accent hover:text-accent"
                    >
                      Get a quick call
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="grid gap-2 border-t border-border p-3 sm:hidden">
            {modules.map((mod) => (
              <button
                key={mod.slug}
                type="button"
                onClick={() => setActive(mod.slug)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                  active === mod.slug
                    ? "border-accent bg-accent-soft text-navy"
                    : "border-border text-slate",
                )}
              >
                {mod.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
