import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  ShieldCheck,
  Building2,
  Compass,
  TrendingUp,
  FileCheck2,
  Boxes,
  Pickaxe,
  Activity,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — 3-STAGE MINING & METALS JOURNEY
 * ------------------------------------------------------------------------- */
const miningOpportunitySteps = [
  {
    title: "Access Asset Analytics & Reliability Depth",
    badge: "Reliability Engineering",
    description:
      "Access asset analytics and reliability-engineering depth a single-site or two-site producer cannot justify building at HQ. India hubs own predictive failure modeling, vibration analysis, and fleet telemetry.",
  },
  {
    title: "Build ESG & HSE Governance Capability",
    badge: "ESG / HSE Compliance",
    description:
      "Build ESG/HSE reporting capability without the corporate sustainability function a major miner already has — covering carbon accounting, tailings monitoring, and worker safety metrics.",
  },
  {
    title: "Start Lean. Extend Across Sites.",
    badge: "Modular Scale",
    description:
      "Start with one capability — asset analytics, ESG/HSE reporting, or critical spares procurement — and extend seamlessly to the next mine site or commodity line.",
  },
];

export function MiningOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {miningOpportunitySteps.map((step) => {
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
 * SECTION 2: WHAT THIS SECTOR NEEDS — 3-POINT ASSET ARCHITECTURE
 * ------------------------------------------------------------------------- */
const miningSectorNeedsData = [
  {
    id: "scada-fleet-eam-integration",
    tabTitle: "ASSET SYSTEMS INTEGRATION",
    tag: "SAP EAM & Maximo",
    title: "Integrate SCADA, fleet and enterprise asset systems seamlessly",
    summary:
      "Direct telemetry connectors unifying MineStar, Modular, SAP EAM, and IBM Maximo for real-time uptime monitoring.",
    details: [
      "Standardized edge telemetry ingestion for heavy mobile fleet and fixed processing plants",
      "Automated SAP EAM and IBM Maximo work order dispatch and parts inventory reconciliation",
      "Real-time haul truck, excavator, and crusher throughput performance dashboards",
    ],
    icon: Network,
  },
  {
    id: "esg-hse-compliance-standards",
    tabTitle: "ESG & HSE COMPLIANCE",
    tag: "GRI, SASB & ICMM",
    title: "Report ESG and HSE metrics to rigorous global mining standards",
    summary:
      "Automated tailings telemetry, carbon accounting, water stewardship, and worker safety reporting across sites.",
    details: [
      "Continuous tailings storage facility (TSF) sensor monitoring and geotechnical telemetry",
      "Scope 1, 2, and 3 carbon accounting pipelines meeting GRI, SASB, and ICMM frameworks",
      "Incident logging, near-miss reporting, and automated HSE compliance dashboards",
    ],
    icon: ShieldCheck,
  },
  {
    id: "remote-procurement-supply",
    tabTitle: "REMOTE SITE PROCUREMENT",
    tag: "Long-Lead Spares & OEM",
    title: "Optimize remote site procurement and long-lead spares inventory",
    summary:
      "Critical spares inventory optimization, dynamic lead-time buffers, and direct global supplier cost benchmarking.",
    details: [
      "Critical spares inventory modeling preventing catastrophic remote mine shutdowns",
      "Long-lead heavy machinery and OEM component supplier tracking pipelines",
      "100% direct parent-company geotechnical, geological, and metallurgical IP ownership",
    ],
    icon: Boxes,
  },
];

export function MiningSectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {miningSectorNeedsData.map((item) => {
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
 * SECTION 3: HOW VERTARA HELPS — CONNECTED MINING BLUEPRINT
 * ------------------------------------------------------------------------- */
const miningHowVertaraHelpsPillars = [
  {
    id: "design-civil",
    title: "Design and Civil",
    tagline: "Engineering & structural support for site infrastructure and asset design",
    tag: "Site Infrastructure & Civil",
    icon: Building2,
  },
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    tagline: "Build GRI, SASB & ICMM reporting in from day one",
    tag: "GRI, SASB & ICMM",
    icon: ShieldCheck,
  },
  {
    id: "data-centre",
    title: "Data Centre Migration & Cloud Ops",
    tagline: "Connect SCADA, fleet and EAM systems into one data layer",
    tag: "Unified Asset Data Layer",
    icon: Server,
  },
  {
    id: "gcc-strategy",
    title: "GCC Strategy & Intelligence",
    tagline: "Locate mining & asset-management talent beyond the obvious metro",
    tag: "Mining & Heavy Industry Clusters",
    icon: Compass,
  },
  {
    id: "finance-accounting",
    title: "Finance, Accounting",
    tagline: "Procurement & cost-control analytics across remote, long-lead-time supply chains",
    tag: "Remote Capex & Opex Analytics",
    icon: TrendingUp,
  },
];

export function MiningHowVertaraHelpsReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {miningHowVertaraHelpsPillars.map((item) => {
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
            src="/images/mining-metals.png"
            alt="One Accountable Operating System for Mining & Metals"
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
