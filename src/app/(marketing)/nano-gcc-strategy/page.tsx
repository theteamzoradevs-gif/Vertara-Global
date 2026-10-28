import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

      {/* 3. FULL-WIDTH CTA BANNER */}
      <section className="w-full overflow-hidden bg-[#B59439] py-12 sm:py-14 md:py-16 text-[#101C30] border-t border-b border-[#a6862f]">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl md:text-4xl leading-tight">
            Let’s build the right GCC — and build it to last.
          </h2>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-[#101C30]/90 max-w-2xl mx-auto">
            Discuss your India capability centre roadmap, operating model, and scale mandate directly with our advisory partners.
          </p>

          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-7 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-white shadow-md transition-all duration-200 hover:bg-[#233027] hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Discuss Your GCC Mandate</span>
              <ArrowUpRight className="h-5 w-5 stroke-[2.4]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
