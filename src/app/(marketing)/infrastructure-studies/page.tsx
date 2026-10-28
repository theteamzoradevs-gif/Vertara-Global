import Link from "next/link";
import { InfrastructureStudiesHub } from "@/components/infrastructure-studies/InfrastructureStudiesHub";

export const metadata = {
  title: "Infrastructure Studies & Location Intelligence | Vertara Global",
  description:
    "12 practitioner studies on India GCC office selection, leasing traps, fit-out planning, and tier-1 vs tier-2 location strategies.",
};

export default function InfrastructureStudiesPage() {
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
            <span>Infrastructure Studies</span>
          </div>

          <h1 className="mt-4 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] leading-tight text-white lg:whitespace-nowrap">
            Infrastructure Studies & Location Intelligence
          </h1>

          <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg leading-relaxed font-normal">
            Practical thinking on workplace strategy, landlord negotiations, and India location selection from practitioners who have built and scaled GCC facilities from the inside.
          </p>
        </div>
      </section>

      {/* 2. RESEARCH LIBRARY HUB (Filters, Search, Cards Grid, Modal Briefing) */}
      <InfrastructureStudiesHub />
    </div>
  );
}
