import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Compass,
  Users2,
  FileCheck2,
  Hotel,
  CalendarCheck,
  Plane,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — 3-STAGE HOSPITALITY JOURNEY
 * ------------------------------------------------------------------------- */
const hospitalityOpportunitySteps = [
  {
    title: "Access Revenue & Distribution Depth",
    badge: "Revenue & Distribution",
    description:
      "Access revenue-management, channel-distribution, and dynamic pricing depth a boutique or mid-size hotel portfolio cannot justify building in-house.",
  },
  {
    title: "Build Loyalty & Guest Personalization",
    badge: "Guest Personalization",
    description:
      "Build guest-personalization and multi-tier loyalty capability — delivering the same high-touch guest experience bar set by global hospitality majors.",
  },
  {
    title: "Start Lean. Scale Property by Property.",
    badge: "Portfolio Scaling",
    description:
      "Start with one capability — revenue management, loyalty ops, or channel/OTA management — and extend seamlessly property by property across your portfolio.",
  },
];

export function HospitalityOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {hospitalityOpportunitySteps.map((step) => {
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
 * SECTION 2: WHAT THIS SECTOR NEEDS — 3-POINT HOSPITALITY ARCHITECTURE
 * ------------------------------------------------------------------------- */
const hospitalitySectorNeedsData = [
  {
    id: "pms-channel-manager-integration",
    tabTitle: "PMS & OTA INTEGRATION",
    tag: "Opera & Channel Managers",
    title: "Integrate PMS, channel managers and global OTA platforms",
    summary:
      "Direct API interconnects unifying Opera, SiteMinder, Amadeus, and Booking.com for zero-lag rate distribution.",
    details: [
      "Sub-second ARI (Availability, Rates, Inventory) synchronization across global OTAs",
      "Unified PMS telemetry streaming from Oracle Opera, Cloudbeds, and Mews",
      "Automated overbooking prevention and cross-channel inventory parity reconciliation",
    ],
    icon: Network,
  },
  {
    id: "demand-volatility-revenue-forecasting",
    tabTitle: "DEMAND VOLATILITY",
    tag: "Dynamic Pricing Engines",
    title: "Forecast revenue and manage seasonal demand volatility in real time",
    summary:
      "Machine-learning pricing engines forecasting local event surges, flight velocity, and cancellation probability.",
    details: [
      "Dynamic RevPAR and ADR yield management algorithms updated in real time",
      "Forward-looking flight search, event calendar, and comp-set rate scraping telemetry",
      "Length-of-stay (LOS) and minimum-spend restriction optimization engines",
    ],
    icon: TrendingUp,
  },
  {
    id: "guest-privacy-pii-governance",
    tabTitle: "GUEST PRIVACY & PII",
    tag: "Global Privacy Regimes",
    title: "Protect guest loyalty data and PII across global privacy regimes",
    summary:
      "Tokenized guest profiles and payment gateways complying strictly with GDPR, CCPA, and PCI-DSS Level 1.",
    details: [
      "PCI-DSS Level 1 tokenized credit card vaults with disabled local agent visibility",
      "Multi-jurisdiction GDPR / CCPA consent management and right-to-be-forgotten loops",
      "100% direct parent-company guest loyalty data, algorithm, and reporting IP ownership",
    ],
    icon: Lock,
  },
];

export function HospitalitySectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {hospitalitySectorNeedsData.map((item) => {
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
 * SECTION 3: HOW VERTARA HELPS — CONNECTED HOSPITALITY BLUEPRINT
 * ------------------------------------------------------------------------- */
const hospitalityHowVertaraHelpsPillars = [
  {
    id: "data-centre",
    title: "Data Centre Migration & Cloud Ops",
    tagline: "Connect PMS, channel manager and GDS/OTA platforms into one data layer",
    tag: "Unified Data Layer",
    icon: Server,
  },
  {
    id: "innovation-rd",
    title: "Innovation, R&D",
    tagline: "Build guest personalization and loyalty analytics capability",
    tag: "Guest Personalization AI",
    icon: Sparkles,
  },
  {
    id: "hr-customer-ops",
    title: "HR, Customer, Business Ops",
    tagline: "Run guest service and multi-property staffing operations",
    tag: "Multi-Property Staffing",
    icon: Users2,
  },
  {
    id: "finance-accounting",
    title: "Finance, Accounting",
    tagline: "Revenue reporting and channel-cost reconciliation across properties",
    tag: "Channel Cost & RevPAR",
    icon: TrendingUp,
  },
  {
    id: "gcc-strategy",
    title: "GCC Strategy & Intelligence",
    tagline: "Locate where hospitality & travel analytics talent clusters",
    tag: "Travel & Revenue Clusters",
    icon: Compass,
  },
];

export function HospitalityHowVertaraHelpsReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {hospitalityHowVertaraHelpsPillars.map((item) => {
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
            src="/images/travel.png"
            alt="One Accountable Operating System for Travel & Hospitality"
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
