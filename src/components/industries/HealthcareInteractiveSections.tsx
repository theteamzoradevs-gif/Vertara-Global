import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  ShieldCheck,
  FileCheck2,
  Scale,
  Compass,
  Users2,
  FlaskConical,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — 3-STAGE HEALTHCARE & LIFE SCIENCES JOURNEY
 * ------------------------------------------------------------------------- */
const healthcareOpportunitySteps = [
  {
    title: "Access Regulatory Affairs & Biostatistics",
    badge: "Specialist Talent",
    description:
      "Access regulatory affairs, biostatistics, and pharmacovigilance practitioners a mid-market pipeline can't staff at HQ cost. India pods own CDISC standards, SAS modeling, and global eCTD dossiers.",
  },
  {
    title: "Build Clinical Data & Medical Writing",
    badge: "Trial Capability",
    description:
      "Build clinical data management (EDC/eCRF), protocol authoring, and regulatory medical writing capabilities without the multi-year timeline of an enterprise center build.",
  },
  {
    title: "Start Lean. Expand as Trust Builds.",
    badge: "Progressive Scale",
    description:
      "Start with one regulated function — pharmacovigilance, clinical data management, or medical writing — and add capability seamlessly as trial volume and regulatory trust build.",
  },
];

export function HealthcareOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {healthcareOpportunitySteps.map((step) => {
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
 * SECTION 2: WHAT THIS SECTOR NEEDS — 3-POINT REGULATORY ARCHITECTURE
 * ------------------------------------------------------------------------- */
const healthcareSectorNeedsData = [
  {
    id: "gxp-hipaa-controls",
    tabTitle: "COMPLIANCE FROM DAY 1",
    tag: "GxP & 21 CFR Part 11",
    title: "Build HIPAA, GxP and 21 CFR Part 11 controls from day one",
    summary:
      "Automated audit logs, e-signature validation, and zero-drift regulatory perimeters engineered for immediate rigor.",
    details: [
      "Automated 21 CFR Part 11 audit trails for all clinical data modifications and approvals",
      "HIPAA-compliant ePHI access segregation with field-level encryption at rest and in transit",
      "Continuous computerized system validation protocols covering all trial pipelines",
    ],
    icon: ShieldCheck,
  },
  {
    id: "audit-ready-docs",
    tabTitle: "AUDIT-READY DOCUMENTATION",
    tag: "Inspection Readiness",
    title: "Validate systems with audit-ready documentation from the start",
    summary:
      "SOPs, computerized system validation (CSV), and trial master files ready for immediate FDA, EMA, and PMDA audits.",
    details: [
      "Standardized Electronic Trial Master File (eTMF) workflows and automated indexing",
      "Pre-configured Computerized System Validation (CSV / GAMP 5) packages",
      "Periodic mock inspection simulations and deviation remediation workflows",
    ],
    icon: FileCheck2,
  },
  {
    id: "phi-pii-security",
    tabTitle: "PHI / PII ARCHITECTURE",
    tag: "Zero-Trust Patient Security",
    title: "Engineer zero-trust PHI and PII security architecture",
    summary:
      "Air-gapped VDI, sovereign parent data covenants, and encrypted telemetry satisfying global health regulators.",
    details: [
      "Air-gapped clinical trial sandboxes with disabled local export and print perimeters",
      "100% direct parent-company clinical IP and patient telemetry ownership",
      "End-to-end de-identification pipelines for patient analytics AI modeling",
    ],
    icon: Lock,
  },
];

export function HealthcareSectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {healthcareSectorNeedsData.map((item) => {
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
 * SECTION 3: HOW VERTARA HELPS — CONNECTED REGULATORY BLUEPRINT
 * ------------------------------------------------------------------------- */
const healthcareHowVertaraHelpsPillars = [
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    tagline: "Build GxP, HIPAA & 21 CFR Part 11 controls in from day one",
    tag: "GxP & HIPAA Controls",
    icon: ShieldCheck,
  },
  {
    id: "legal-doc-review",
    title: "Legal, Document Review",
    tagline: "Structure data-sharing and IP agreements for clinical data",
    tag: "Clinical IP Covenants",
    icon: Scale,
  },
  {
    id: "gcc-strategy",
    title: "GCC Strategy & Intelligence",
    tagline: "Locate where clinical & biostatistics talent actually clusters",
    tag: "Cluster Intelligence",
    icon: Compass,
  },
  {
    id: "data-centre",
    title: "Data Centre Migration & Cloud Ops",
    tagline: "Build validated, audit-ready infrastructure for clinical systems",
    tag: "Validated Cloud Ops",
    icon: Server,
  },
  {
    id: "hr-staffing",
    title: "HR, Customer, Business Ops",
    tagline: "Hire regulatory and clinical talent without an enterprise recruiting engine",
    tag: "Specialist Recruiter Pods",
    icon: Users2,
  },
];

export function HealthcareHowVertaraHelpsReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {healthcareHowVertaraHelpsPillars.map((item) => {
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
            src="/images/healthcare.png"
            alt="One Accountable Operating System for Healthcare & Life Sciences"
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
