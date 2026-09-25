import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  ShieldCheck,
  TrendingUp,
  Scale,
  Sparkles,
  Users2,
  FileCheck2,
  Building2,
  Coins,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — 3-STAGE WEALTH, PE & INSURANCE JOURNEY
 * ------------------------------------------------------------------------- */
const wealthOpportunitySteps = [
  {
    title: "Access Fund Accounting & NAV Talent",
    badge: "Fund Ops & NAV",
    description:
      "Access fund accounting, shadow NAV computation, and portfolio operations talent a mid-market GP or insurer can't justify building at HQ scale.",
  },
  {
    title: "Build Actuarial & Research Capability",
    badge: "Actuarial & Research",
    description:
      "Build actuarial modeling, underwriting support, and investment research capabilities without the years a large asset manager's captive took to mature.",
  },
  {
    title: "Start Lean. Expand as AUM Grows.",
    badge: "AUM-Linked Scale",
    description:
      "Start with one high impact function fund ops, actuarial support, or client reporting and expand capability seamlessly as AUM or policy volume grows.",
  },
];

export function WealthOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {wealthOpportunitySteps.map((step) => {
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
 * SECTION 2: WHAT THIS SECTOR NEEDS — 3-POINT INSTITUTIONAL ARCHITECTURE
 * ------------------------------------------------------------------------- */
const wealthSectorNeedsData = [
  {
    id: "regulatory-reporting-frameworks",
    tabTitle: "REGULATORY REPORTING",
    tag: "IFRS 17, SEC & NAIC",
    title: "Build regulatory reporting for IFRS 17, SEC and NAIC frameworks",
    summary:
      "Engineered pipelines aligned to SEC Form ADV/PF, IFRS 17 actuarial disclosures, SOX controls, and statutory filings.",
    details: [
      "Automated IFRS 17 contractual service margin (CSM) calculation engines and disclosure notes",
      "SEC Form ADV, Form PF, and Form 13F filing preparation workflows with complete audit trails",
      "NAIC statutory accounting principles (SAP) and Risk-Based Capital (RBC) modeling modules",
    ],
    icon: ShieldCheck,
  },
  {
    id: "lp-policyholder-segregation",
    tabTitle: "DATA SEGREGATION",
    tag: "Zero-Trust Chinese Walls",
    title: "Segregate LP and policyholder data with zero-trust security",
    summary:
      "Air-gapped infrastructure, sovereign parent covenants, strict Chinese walls, and zero cross-fund data contamination.",
    details: [
      "Air-gapped LP capital call and distribution portals with multi-factor biometric authentication",
      "Strict policyholder PII tokenization meeting global privacy standards and insurance regulations",
      "100% direct parent-entity IP, financial models, and quantitative code ownership",
    ],
    icon: Lock,
  },
  {
    id: "realtime-platform-integration",
    tabTitle: "REAL-TIME INTEGRATION",
    tag: "Custodian & Admin Sync",
    title: "Integrate in real time with fund and policy admin systems",
    summary:
      "Direct API interconnects with Bloomberg AIM, Aladdin, Charles River, and Guidewire to eliminate manual reconciliations.",
    details: [
      "Sub-second trade capture and custodian cash/position balance reconciliation",
      "Real-time NAV shadow accounting against third-party fund administrators",
      "Automated policy administration sync and claims reserve actuarial telemetry",
    ],
    icon: Network,
  },
];

export function WealthSectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {wealthSectorNeedsData.map((item) => {
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
 * SECTION 3: HOW VERTARA HELPS — CONNECTED INSTITUTIONAL BLUEPRINT
 * ------------------------------------------------------------------------- */
const wealthHowVertaraHelpsPillars = [
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    tagline: "Build IFRS 17, SEC & NAIC reporting in from day one",
    tag: "IFRS 17 & SEC Reporting",
    icon: ShieldCheck,
  },
  {
    id: "finance-accounting",
    title: "Finance, Accounting",
    tagline: "Fund accounting & NAV computation aligned to reporting cycles",
    tag: "Fund Accounting & NAV",
    icon: TrendingUp,
  },
  {
    id: "legal-doc-review",
    title: "Legal, Document Review",
    tagline: "Structure LP agreements, policy docs, data-sharing terms",
    tag: "LP & Policy Legal",
    icon: Scale,
  },
  {
    id: "hr-customer-ops",
    title: "HR, Customer, Business Ops",
    tagline: "Hire actuarial & fund ops talent without a Wall Street budget",
    tag: "Specialist Recruiter Pods",
    icon: Users2,
  },
  {
    id: "innovation-rd",
    title: "Innovation, R&D",
    tagline: "Build investment research and portfolio analytics capability",
    tag: "Equity & Credit Research",
    icon: Sparkles,
  },
];

export function WealthHowVertaraHelpsReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {wealthHowVertaraHelpsPillars.map((item) => {
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
            src="/images/wealth-management.png"
            alt="One Accountable Operating System for Wealth, PE & Insurance"
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
