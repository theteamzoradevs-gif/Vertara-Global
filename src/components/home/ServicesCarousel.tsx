"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

type ServiceItem = {
  slug: string;
  name: string;
  shortDescription: string;
  valueProposition?: string;
  icon: string;
  image: string;
};

export function ServicesCarousel({ services }: { services: ServiceItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(trackRef, { amount: 0.2 });

  // Auto-slide every 1 second on mobile when in view and not hovered
  useEffect(() => {
    if (!isInView || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 1000);

    return () => clearInterval(timer);
  }, [isInView, isHovered, services.length]);

  // Keep active card centered in horizontal scroll on mobile
  useEffect(() => {
    if (trackRef.current && window.innerWidth < 640) {
      const card = trackRef.current.children[activeIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full"
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-4"
      >
        {services.map((s, i) => (
          <div
            key={s.slug}
            className="w-[82vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none"
            onClick={() => setActiveIndex(i)}
          >
            <ServiceCard
              slug={s.slug}
              name={s.name}
              shortDescription={s.shortDescription}
              valueProposition={s.valueProposition}
              icon={s.icon}
              image={s.image}
            />
          </div>
        ))}
      </div>

      {/* Mobile Pagination Indicator Dots */}
      <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
        {services.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeIndex === idx ? "w-6 bg-[#2e3f33]" : "w-1.5 bg-[#cddcd1]"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
