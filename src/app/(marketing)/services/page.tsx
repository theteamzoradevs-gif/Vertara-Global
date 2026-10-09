import type { Metadata } from "next";
import { OfferingsHero } from "@/components/offerings/OfferingsHero";
import { OfferingsScope } from "@/components/offerings/OfferingsScope";
import { OfferingsBuildModel } from "@/components/offerings/OfferingsBuildModel";
import { OfferingsSectors } from "@/components/offerings/OfferingsSectors";
import { OfferingsDisciplines } from "@/components/offerings/OfferingsDisciplines";
import { OfferingsCommercial } from "@/components/offerings/OfferingsCommercial";
import { OfferingsCtaBanner } from "@/components/offerings/OfferingsCtaBanner";

export const metadata: Metadata = {
  title: "Our Services — The Vertara GCC Build Model, Scope & Sectors",
  description:
    "Explore the six-stage Vertara GCC build model, our milestone-linked commercial principles, and sector-by-sector capabilities across Nano to mid-scale builds (20 to 500 people).",
};

export default function ServicesPage() {
  return (
    <main className="flex-1 w-full bg-white font-sans" style={{ fontFamily: "Calibri" }}>
      {/* 1. Hero: Our Services */}
      <OfferingsHero />

      {/* 2. Scale Scope: Nano to mid-scale GCCs */}
      <OfferingsScope />

      {/* 3. Build Model: The Vertara GCC build model (6 Stages) */}
      <OfferingsBuildModel />

      {/* 4. Sector Expertise: Compact 4x2 grid with pop-up panels */}
      <OfferingsSectors />

      {/* 5. Cross-Cutting Disciplines: Six disciplines run across every stage */}
      <OfferingsDisciplines />

      {/* 6. Commercial Principles: Side-by-side manifesto */}
      <OfferingsCommercial />

      {/* 7. Bottom Mandate CTA Banner */}
      <OfferingsCtaBanner />
    </main>
  );
}
