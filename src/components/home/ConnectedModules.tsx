"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTouchingRef = useRef(false);
  const isInView = useInView(containerRef, { amount: 0.15 });

  const activeIndex = modules.findIndex((m) => m.slug === (active ?? modules[0]?.slug));
  const current = modules[activeIndex >= 0 ? activeIndex : 0] ?? modules[0];
  const detailImage =
    current?.image ||
    fallbackImages[current?.slug ?? ""] ||
    "/images/gcc-floor.webp";

  const resetAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (isTouchingRef.current) return;
      setActive((prev) => {
        const idx = modules.findIndex((m) => m.slug === (prev ?? modules[0]?.slug));
        const nextIdx = (idx + 1) % modules.length;
        return modules[nextIdx].slug;
      });
    }, 2000);
  };

  // Continuous auto-slide timer that runs every 2s when in view
  useEffect(() => {
    if (!isInView) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    resetAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, modules]);

  // Center active pill horizontally on mobile without affecting page vertical scroll
  useEffect(() => {
    if (pillsRef.current && activeIndex >= 0) {
      const container = pillsRef.current;
      const activeBtn = container.children[activeIndex] as HTMLElement;
      if (activeBtn) {
        const targetLeft =
          activeBtn.offsetLeft - (container.clientWidth - activeBtn.clientWidth) / 2;
        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  const selectModule = (slug: string) => {
    setActive(slug);
    resetAutoSlide();
  };

  const handleTouchStart = () => {
    isTouchingRef.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isTouchingRef.current = false;
    }, 2500);
  };

  // Solid white card — no thread overlay on content (threads stay on section only)
  return (
    <div
      ref={containerRef}
      className="relative z-[1] overflow-visible rounded-3xl border-0 bg-transparent p-0 shadow-none sm:overflow-hidden sm:border sm:border-border sm:bg-white sm:px-6 sm:py-8 lg:px-8 sm:shadow-sm"
    >
      {/* Mobile-only horizontal module selector pills */}
      <div
        ref={pillsRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex gap-2.5 overflow-x-auto pb-3.5 pt-1 px-1 scrollbar-none sm:hidden"
      >
        {modules.map((mod) => {
          const Icon = icons[mod.icon as keyof typeof icons] ?? Users;
          const isActive = (active ?? modules[0]?.slug) === mod.slug;
          return (
            <button
              key={mod.slug}
              type="button"
              onClick={() => selectModule(mod.slug)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-[#2e3f33] text-white shadow-sm"
                  : "border border-border bg-white text-navy hover:border-[#2e3f33]/40"
              )}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5 shrink-0",
                  isActive ? "text-[#b49339]" : "text-[#2e3f33]"
                )}
              />
              <span>{mod.name}</span>
            </button>
          );
        })}
      </div>

      <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <div className="relative mx-auto hidden aspect-square w-full max-w-[420px] sm:block lg:max-w-[460px]">
          <div className="absolute inset-[20%] rounded-full border border-dashed border-accent/40" />
          <div className="absolute inset-[34%] rounded-full bg-[#0e3621] bg-gradient-to-br from-[#0d3320] via-[#0e3621] to-[#082013] text-center text-white shadow-xl shadow-black/30 border border-white/10">
            <div className="flex h-full flex-col items-center justify-center px-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b49339]">
                Platform
              </p>
              <p className="mt-1 text-sm font-bold leading-snug md:text-base text-white">
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
            const isActive = (active ?? modules[0]?.slug) === mod.slug;
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
                onMouseEnter={() => selectModule(mod.slug)}
                onFocus={() => selectModule(mod.slug)}
                onClick={() => selectModule(mod.slug)}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d3320]/85 via-[#0d3320]/30 to-transparent" />
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
        </div>
      </div>
    </div>
  );
}
