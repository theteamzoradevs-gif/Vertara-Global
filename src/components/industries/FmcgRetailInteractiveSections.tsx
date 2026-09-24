import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  Boxes,
  TrendingUp,
  Compass,
  FileCheck2,
  Users2,
  ShoppingBag,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — 3-STAGE FMCG & RETAIL JOURNEY
 * ------------------------------------------------------------------------- */
const fmcgOpportunitySteps = [
  {
    title: "Move Beyond Transaction Processing",
    badge: "Demand Intelligence",
    description:
      "Transition from basic transaction and order logging to full commercial ownership. India hubs own predictive demand forecasting, assortment planning, and dynamic pricing analytics.",
  },
  {
    title: "Access Category & RGM Talent",
    badge: "CPG Skillset",
    description:
      "Direct access to top 1% category management and revenue-growth-management (RGM) practitioners in India's premier analytics clusters — without the heavy enterprise overhead.",
  },
  {
    title: "Start Lean. Expand with Proof.",
    badge: "Scale & Growth",
    description:
      "Avoid rigid multi-year lock-ins. Launch a focused pod in one critical capability (demand sensing, promo analytics, loyalty ops) and expand seamlessly into full commercial analytics.",
  },
];

export function FmcgOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {fmcgOpportunitySteps.map((step) => {
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
 * SECTION 2: WHAT THIS SECTOR NEEDS — 3-POINT RETAIL ARCHITECTURE
 * ------------------------------------------------------------------------- */
const fmcgSectorNeedsData = [
  {
    id: "realtime-pos-erp",
    tabTitle: "REAL-TIME INTEGRATION",
    tag: "POS & ERP Streaming",
    title: "Integrate POS, ERP and e-commerce platforms in real time",
    summary:
      "Direct streaming connectors across SAP, Oracle Retail, and Shopify Plus — eliminating batch-and-wait reporting.",
    details: [
      "Sub-second streaming pipelines capturing store POS receipts and digital checkout signals",
      "Bi-directional ERP sync preventing cross-channel stockout and inventory overselling",
      "Automated order routing and distributed fulfillment reconciliation across channels",
    ],
    icon: Network,
  },
  {
    id: "sku-store-infrastructure",
    tabTitle: "SKU & STORE GRANULARITY",
    tag: "SKU Data Infrastructure",
    title: "Build high-throughput data infrastructure at SKU and store level",
    summary:
      "High-throughput data pipelines engineered down to individual barcode, store aisle, and promotional tier.",
    details: [
      "Granular price-elasticity modeling and dynamic markdown optimization engines",
      "Micro-location store demand sensing and localized shelf replenishment loops",
      "Returns and shrinkage predictive anomaly detection algorithms running daily",
    ],
    icon: Boxes,
  },
  {
    id: "loyalty-pii-governance",
    tabTitle: "CONSUMER DATA GOVERNANCE",
    tag: "Loyalty PII Protection",
    title: "Govern consumer data and loyalty PII with zero-trust controls",
    summary:
      "Zero-trust architecture protecting loyalty program PII and customer 360 data stores from day one.",
    details: [
      "Tokenized customer data lakes with sovereign encryption and field-level masking",
      "Strict role-based access control (RBAC) and air-gapped analytics sandboxes",
      "100% direct parent-company IP and customer data ownership across all covenants",
    ],
    icon: Lock,
  },
];

export function FmcgSectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {fmcgSectorNeedsData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="group relative rounded-2xl sm:rounded-3xl border border-[#cddcd1] bg-[#edf5ef] p-6 sm:p-7 transition-all duration-300 hover:border-[#2e3f33]/40 hover:bg-[#e5ebe6] hover:-translate-y-1.5 hover:shadow-lg flex flex-col justify-between h-full cursor-default"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b49339]">
                  {item.tabTitle}
                </p>
              </div>

              <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#cddcd1] bg-[#e5ebe6] text-[#2e3f33] shadow-xs group-hover:bg-[#2e3f33] group-hover:text-[#b49339] transition-colors">
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
 * SECTION 3: HOW VERTARA HELPS — CONNECTED OPERATING BLUEPRINT
 * ------------------------------------------------------------------------- */
const fmcgHowVertaraHelpsPillars = [
  {
    id: "data-centre",
    title: "Data Centre Migration & Cloud Ops",
    tagline: "Build the pipeline for POS, ERP and e-commerce feeds",
    tag: "Real-Time Pipelines",
    icon: Server,
  },
  {
    id: "gcc-strategy",
    title: "GCC Strategy & Intelligence",
    tagline: "Locate the centre where retail & CPG analytics talent clusters",
    tag: "Cluster Intelligence",
    icon: Compass,
  },
  {
    id: "finance-accounting",
    title: "Finance, Accounting",
    tagline: "Align trade spend and promo ROI with commercial analytics",
    tag: "Promo ROI & Trade Spend",
    icon: TrendingUp,
  },
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    tagline: "Build consumer data & loyalty PII governance in from day one",
    tag: "Zero-Trust Loyalty PII",
    icon: FileCheck2,
  },
  {
    id: "hr-staffing",
    title: "HR & Staffing",
    tagline: "Hire category management and RGM talent, not generic analysts",
    tag: "Practitioner Recruiting",
    icon: Users2,
  },
];

export function FmcgHowVertaraHelpsReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {fmcgHowVertaraHelpsPillars.map((item) => {
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
            src="/images/fmcg-retail.png"
            alt="One Accountable Operating System for FMCG & Retail"
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
