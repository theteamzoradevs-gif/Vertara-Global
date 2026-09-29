import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { FlowThreads } from "@/components/ui/FlowThreads";

export function Section({
  children,
  className,
  id,
  tone = "default",
  threads = "light",
  style,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "navy" | "green" | "ink" | "none";
  /** soft flowing threads; false to disable */
  threads?: false | "light" | "medium" | "strong";
  style?: React.CSSProperties;
}) {
  const tones = {
    default: "bg-surface",
    muted: "bg-surface-elevated",
    navy: "bg-navy text-white",
    green: "bg-[#2F3F34] text-white",
    ink: "bg-[#101C30] text-white",
    none: "",
  };

  const isDark = tone === "navy" || tone === "green" || tone === "ink";

  return (
    <section
      id={id}
      style={style}
      className={cn("relative overflow-hidden py-16 md:py-24", tones[tone], className)}
    >
      {threads ? (
        <FlowThreads
          intensity={threads}
          onDark={isDark}
          className={isDark ? "opacity-40" : undefined}
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
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl md:mb-14", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          titleClassName
            ? cn("font-bold tracking-tight", titleClassName)
            : "text-3xl font-bold tracking-tight md:text-4xl",
          light ? "text-white" : "text-[#101C30]",
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
