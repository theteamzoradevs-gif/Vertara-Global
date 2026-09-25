import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  ShieldCheck,
  Building2,
  Compass,
  Users2,
  FileCheck2,
  Factory,
  Cpu,
  Boxes,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — 3-STAGE MANUFACTURING JOURNEY
 * ------------------------------------------------------------------------- */
const manufacturingOpportunitySteps = [
  {
    title: "Own OT-IT Integration Across Plants",
    badge: "OT-IT Convergence",
    description:
      "Own OT-IT integration across multi-site plants without the heavy capital expenditure a large industrial conglomerate spends on a global centre of excellence.",
  },
  {
    title: "Access SCADA, PLC & IoT Depth",
    badge: "Automation Talent",
    description:
      "Access SCADA, PLC telemetry integration, and predictive-maintenance engineering talent that a mid-market manufacturer cannot justify hiring plant by plant.",
  },
  {
    title: "Prove the Model. Scale Facility to Facility.",
    badge: "Plant-to-Plant Scale",
    description:
      "Prove the model on one plant's operational data — OEE, downtime, predictive maintenance — then seamlessly extend the blueprint to the next facility.",
  },
];

export function ManufacturingOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {manufacturingOpportunitySteps.map((step) => {
        return (
          <div
            key={step.title}
            className="group relative rounded-2xl border border-[#cddcd1] bg-[#f0f4f1] p-6 sm:p-7 transition-all duration-300 hover:border-[#b49339] hover:bg-[#e5ebe6] hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/80 border border-[#cddcd1] text-[#2e3f33] group-hover:bg-[#2e3f33] group-hover:text-[#b49339] transition-colors">
                  {step.badge}
                </span>
              </div>

              <h3 className="mt-4 text-lg sm:text-xl font-bold text-navy">
                {step.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-slate leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </MobileAutoSlider>
  );
}

/* -------------------------------------------------------------------------
 * SECTION 2: WHAT THIS SECTOR NEEDS — 3-POINT PRODUCTION ARCHITECTURE
 * ------------------------------------------------------------------------- */
const manufacturingSectorNeedsData = [
  {
    id: "scada-mes-erp-integration",
    tabTitle: "OT-IT INTEGRATION",
    tag: "SCADA, MES & ERP",
    title: "Integrate SCADA, MES and ERP without custom builds per facility",
    summary:
      "Pre-configured OPC UA and MQTT telemetry linking Siemens, Rockwell, and SAP for unified shop-floor visibility.",
    details: [
      "Standardized OPC UA/MQTT industrial telemetry streaming architectures",
      "Bi-directional MES and SAP ERP material reconciliation pipelines",
      "Unified factory floor monitoring dashboards with sub-second latency",
    ],
    icon: Network,
  },
  {
    id: "iso-iatf-quality-compliance",
    tabTitle: "QUALITY & COMPLIANCE",
    tag: "ISO 9001 & IATF 16949",
    title: "Deploy scalable ISO 9001 and IATF 16949 compliance workflows",
    summary:
      "Centralized PPAP, FMEA, 8D defect tracking, and digital QMS workflows that scale uniformly across all plants.",
    details: [
      "Automated PPAP (Production Part Approval Process) digital documentation loops",
      "Standardized IATF 16949 and ISO 9001 audit workflows and CAPA tracking",
      "Real-time SPC (Statistical Process Control) defect prediction algorithms",
    ],
    icon: FileCheck2,
  },
  {
    id: "multi-plant-procurement",
    tabTitle: "PROCUREMENT COMPLEXITY",
    tag: "Multi-Plant Supply Chain",
    title: "Handle multi-plant and multi-supplier procurement complexity",
    summary:
      "Direct supplier telemetry, automated vendor scorecards, BOM optimization, and predictive stockout buffers.",
    details: [
      "Dynamic bill of materials (BOM) multi-plant supplier cost benchmarking",
      "Vendor lead-time anomaly sensing and predictive stockout alerts",
      "100% parent-company proprietary design, tooling, and supply chain IP ownership",
    ],
    icon: Boxes,
  },
];

export function ManufacturingSectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {manufacturingSectorNeedsData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="relative rounded-2xl sm:rounded-3xl border border-[#cddcd1] bg-[#edf5ef] p-6 sm:p-7 flex flex-col justify-between h-full cursor-default"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b49339]">
                  {item.tabTitle}
                </p>
              </div>

              <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2e3f33] text-[#b49339] shadow-sm">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-base sm:text-lg font-bold text-navy leading-snug">
                {item.title}
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-slate leading-relaxed">
                {item.summary}
              </p>
            </div>
          </div>
        );
      })}
    </MobileAutoSlider>
  );
}

/* -------------------------------------------------------------------------
 * SECTION 3: HOW VERTARA HELPS — CONNECTED PRODUCTION BLUEPRINT
 * ------------------------------------------------------------------------- */
const manufacturingHowVertaraHelpsPillars = [
  {
    id: "design-civil",
    title: "Design and Civil",
    tagline: "Structural & civil design tied to digital plant-twin work",
    tag: "Digital Plant Twins",
    icon: Building2,
  },
  {
    id: "data-centre",
    title: "Data Centre Migration & Cloud Ops",
    tagline: "Build OT-IT integration and edge-to-cloud pipelines for plant systems",
    tag: "Edge-to-Cloud OT",
    icon: Server,
  },
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    tagline: "Build ISO 9001 & IATF 16949 documentation that travels across plants",
    tag: "ISO & IATF Quality",
    icon: ShieldCheck,
  },
  {
    id: "gcc-strategy",
    title: "GCC Strategy & Intelligence",
    tagline: "Locate where industrial engineering & OT talent actually clusters",
    tag: "Industrial Clusters",
    icon: Compass,
  },
  {
    id: "hr-customer-ops",
    title: "HR, Customer, Business Ops",
    tagline: "Hire OT-IT convergence talent without a per-plant hiring cycle",
    tag: "Industrial Practitioner Pods",
    icon: Users2,
  },
];

export function ManufacturingHowVertaraHelpsReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {manufacturingHowVertaraHelpsPillars.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-4 sm:gap-6">
              {/* Light green rounded square icon container */}
              <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl border border-[#cddcd1] bg-[#e5ebe6] text-[#2e3f33] shadow-xs">
                <Icon className="h-6 w-6" />
              </div>

              {/* Content block */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="text-lg sm:text-xl font-bold text-navy tracking-tight">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm sm:text-base text-slate leading-relaxed">
                  {item.tagline}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right side image */}
      <div className="lg:col-span-5">
        <div className="relative overflow-hidden rounded-3xl border border-[#cddcd1] bg-[#edf5ef] shadow-xl shadow-navy/5">
          <Image
            src="/images/manufacturing.png"
            alt="One Accountable Operating System for Manufacturing"
            width={1792}
            height={1024}
            className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 550px"
          />
        </div>
      </div>
    </div>
  );
}
