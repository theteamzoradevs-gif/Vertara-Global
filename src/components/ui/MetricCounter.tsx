"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MetricCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const numeric = Number(value) || 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const isFloat = !Number.isInteger(numeric);
  const format = (n: number) =>
    isFloat ? n.toFixed(1) : Math.round(n).toLocaleString("en-US");
  // Show the real value immediately so metrics never stick at 0 if motion is skipped
  const [display, setDisplay] = useState(() => format(numeric));

  useEffect(() => {
    setDisplay(format(numeric));
  }, [numeric, isFloat]);

  useEffect(() => {
    if (!inView) return;

    if (reduce || numeric === 0) {
      setDisplay(format(numeric));
      return;
    }

    let cancelled = false;
    let frame = 0;
    const start = performance.now();
    const duration = 1200;
    setDisplay(format(0));

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(format(numeric * eased));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(format(numeric));
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      setDisplay(format(numeric));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, numeric, reduce, isFloat]);

  return (
    <span ref={ref} className={cn("metric-number", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
