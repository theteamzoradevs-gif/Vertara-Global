import Link from "next/link";
import { NanoGccStrategyHub } from "@/components/nano-gcc-strategy/NanoGccStrategyHub";

export const metadata = {
  title: "Nano GCC Strategy & Operating Models | Vertara Global",
  description:
    "10 strategic perspectives on building, governing, and scaling lean capability centres in India from leaders who have built them.",
};

export default function NanoGccStrategyPage() {
  return (
    <div className="w-full font-sans" style={{ fontFamily: "Calibri" }}>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#2F3F34] md:min-h-[calc(100vh-4.25rem)] md:min-h-[calc(100svh-4.25rem)] md:flex md:flex-col md:justify-center">
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 md:py-20 lg:py-24 lg:px-8">
          {/* Breadcrumb / Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            <Link href="/insights" className="hover:underline">
              Insights
            </Link>
            <span>/</span>
            <span>Nano GCC Strategy</span>
          </div>

          <h1 className="mt-4 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] leading-tight text-white lg:whitespace-nowrap">
            Nano GCC Strategy & Operating Models
          </h1>

          <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            Practical thinking on building, governing, and scaling lean capability centres in India from leaders who have built and run them from the inside.
          </p>
        </div>
      </section>

      {/* 2. RESEARCH LIBRARY HUB */}
      <NanoGccStrategyHub />
    </div>
  );
}
