import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { FlowThreads } from "@/components/ui/FlowThreads";

export function Section({
  children,
  className,
  id,
  tone = "default",
  threads = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "navy";
  /** soft flowing threads; false to disable */
  threads?: false | "light" | "medium" | "strong";
}) {
  const tones = {
    default: "bg-surface",
    muted: "bg-surface-elevated",
    navy: "bg-navy text-white",
  };

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-16 md:py-24", tones[tone], className)}
    >
      {threads ? (
        <FlowThreads
          intensity={threads}
          onDark={tone === "navy"}
          className={tone === "navy" ? "opacity-60" : undefined}
        />
      ) : null}
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl md:mb-14">
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b49339]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/75" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
