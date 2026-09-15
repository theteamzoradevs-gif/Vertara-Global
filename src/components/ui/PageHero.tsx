import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FlowThreads } from "@/components/ui/FlowThreads";

/** Shared page banner with light theme flow-threads on navy */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy text-white",
        className,
      )}
    >
      <FlowThreads intensity="medium" onDark className="opacity-55" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-highlight">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            "max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
            eyebrow && "mt-3",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
