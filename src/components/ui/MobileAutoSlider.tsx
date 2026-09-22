"use client";

import { useState, useEffect, useRef, ReactNode, Children, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MobileAutoSliderProps {
  children: ReactNode;
  autoSlideInterval?: number; // default: 3000ms
  desktopClassName?: string;
  itemClassName?: string;
  dotTone?: "green" | "gold" | "navy";
  className?: string;
}

export function MobileAutoSlider({
  children,
  autoSlideInterval = 3000,
  desktopClassName = "md:grid md:grid-cols-3 md:gap-6",
  itemClassName = "w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col",
  dotTone = "green",
  className,
}: MobileAutoSliderProps) {
  const items = Children.toArray(children);
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smoothly scroll container to a specific slide index
  const scrollToSlide = useCallback((index: number) => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const cards = container.querySelectorAll<HTMLElement>("[data-slider-item]");
    const card = cards[index];
    if (card) {
      isProgrammaticScrollRef.current = true;
      const targetLeft =
        card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 500);
    }
  }, []);

  // Handle dot or card click
  const handleSelectSlide = (index: number) => {
    setActiveIndex(index);
    scrollToSlide(index);
  };

  // Auto-slide interval timer
  useEffect(() => {
    if (count <= 1) return;

    const interval = setInterval(() => {
      // Don't auto-slide if user is currently touching/interacting or if viewport is desktop (>= 768px)
      if (isUserInteractingRef.current) return;
      if (typeof window !== "undefined" && window.innerWidth >= 768) return;

      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % count;
        scrollToSlide(nextIndex);
        return nextIndex;
      });
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [count, autoSlideInterval, scrollToSlide]);

  // Handle manual touch / drag scroll
  const handleScroll = () => {
    // If this scroll event was caused by programmatic scrollTo, ignore it to prevent jump conflicts
    if (isProgrammaticScrollRef.current) return;
    if (!trackRef.current) return;

    const container = trackRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = container.querySelectorAll<HTMLElement>("[data-slider-item]");
    if (!cards.length) return;

    // Find the card closest to the horizontal center of the container
    const containerCenter = scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const handleTouchStart = () => {
    isUserInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Pause briefly after user interaction before resuming auto-slide
    resumeTimerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 2500);
  };

  const getActiveDotColor = () => {
    switch (dotTone) {
      case "gold":
        return "bg-[#b49339]";
      case "navy":
        return "bg-[#0b1f3a]";
      case "green":
      default:
        return "bg-[#2e3f33]";
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      className={cn("w-full", className)}
    >
      {/* Sliding Track (Mobile) / Grid (Desktop) */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className={cn(
          "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 px-1 scrollbar-none md:overflow-visible md:p-0",
          desktopClassName
        )}
      >
        {items.map((child, index) => (
          <div
            key={index}
            data-slider-item
            onClick={() => handleSelectSlide(index)}
            className={itemClassName}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Mobile Pagination Indicator Dots */}
      {count > 1 && (
        <div className="mt-4 flex justify-center items-center gap-1.5 md:hidden">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSlide(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === idx
                  ? cn("w-6", getActiveDotColor())
                  : "w-1.5 bg-[#cddcd1]"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
