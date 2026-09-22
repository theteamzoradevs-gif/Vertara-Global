import {
  Server,
  Lock,
  Network,
  Sparkles,
  Compass,
  FileCheck2,
  Users2,
  ArrowRight,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — INTERACTIVE NUMBERED JOURNEY
 * ------------------------------------------------------------------------- */
const journeySteps = [
  {
    title: "Move Beyond Drafting",
    badge: "Core Systems",
    description:
      "Transition from offshore drafting and ticket-taking to full systems engineering. India pods own microservices, hardware-in-the-loop (HIL) testing, and patentable design architectures.",
  },
  {
    title: "Enterprise-Grade Engineering Talent",
    badge: "Discipline Depth",
    description:
      "Direct access to top 1% discipline-specific engineering practitioners in India's premier clusters. Vetted for complex CAD modeling, finite element analysis, and global PLM workflows.",
  },
  {
    title: "Start Lean. Expand with Proof.",
    badge: "Scale & CoE",
    description:
      "Avoid multi-year lock-ins. Launch a focused 10–25 engineer lighthouse pod to establish velocity and operating rhythm, then expand seamlessly into a global Center of Excellence.",
  },
];

export function ErdOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {journeySteps.map((step) => {
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
 * SECTION 2: WHAT THIS SECTOR NEEDS — INTERACTIVE 3-POINT SELECTOR WITH VISUAL
 * ------------------------------------------------------------------------- */
const sectorNeedsData = [
  {
    id: "connected-systems",
    tabTitle: "CONNECTED SYSTEMS",
    tag: "PLM & CAD Integration",
    title: "Integrate PLM/CAD with HQ systems from day one",
    summary:
      "Direct multi-region license server peering, latency-optimized cloud interconnects, and zero-conflict repository synchronization.",
    details: [
      "Multi-seat license pooling across Siemens Teamcenter, Dassault ENOVIA, and PTC Windchill",
      "Dedicated sub-50ms MPLS/AWS Direct Connect links for massive CAD assembly streaming",
      "Bidirectional version control preventing geometry file lockouts across time zones",
    ],
    icon: Network,
  },
  {
    id: "compute-simulation",
    tabTitle: "COMPUTE & SIMULATION",
    tag: "Compute Infrastructure",
    title: "Build compute infrastructure for simulation, rendering, digital-twin workloads",
    summary:
      "Dedicated GPU/CPU server infrastructure sized specifically for finite element analysis (FEA), computational fluid dynamics (CFD).",
    details: [
      "High-density compute nodes configured for ANSYS Fluent, Mechanical, and Abaqus solves",
      "Dedicated GPU rendering clusters for real-time visualization and VR review",
      "Isolated telemetry pipelines feeding multi-physics digital twins in real-time",
    ],
    icon: Server,
  },
  {
    id: "ip-protection",
    tabTitle: "IP PROTECTION",
    tag: "Zero-Trust Security",
    title: "Protect IP and design data from week one — not after a scare",
    summary:
      "Air-gapped virtual environments, strict physical biometric lab perimeters, DLP enforcement, and sovereign parent entity IP assignment.",
    details: [
      "Air-gapped Virtual Desktop Infrastructure (VDI) with disabled local peripherals and print controls",
      "Biometric physical access control and 24/7 monitored cleanroom engineering bays",
      "100% direct IP assignment to global parent company in all employee and vendor covenants",
    ],
    icon: Lock,
  },
];

export function ErdSectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6 md:items-start"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="gold"
    >
      {sectorNeedsData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="group relative rounded-2xl sm:rounded-3xl border border-[#143056] bg-[#0b1f3a] p-6 sm:p-7 text-white shadow-xl shadow-navy/10 flex flex-col justify-between transition-all duration-300 hover:border-[#b49339]/60 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0b1f3a]/40 cursor-pointer h-full"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b49339]">
                  {item.tabTitle}
                </p>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#2e3f33] text-[#b49339] border border-[#b49339]/25 shrink-0">
                  {item.tag}
                </span>
              </div>

              <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#143056] text-[#b49339] shadow-xs group-hover:bg-[#2e3f33] transition-colors">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-base sm:text-lg font-bold text-white leading-snug">
                {item.title}
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                {item.summary}
              </p>

              {/* Reveal details on hover */}
              <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4">
                <div className="pt-3.5 border-t border-white/10 space-y-2.5">
                  {item.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/75 leading-relaxed">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b49339]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
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
const howVertaraHelpsPillars = [
  {
    id: "innovation-rd",
    title: "Innovation & R&D",
    tagline: "Own the roadmap — prototype, patent",
    tag: "Systems Architecture",
    icon: Sparkles,
  },
  {
    id: "data-centre",
    title: "Data Centre Migration & Cloud Ops",
    tagline: "Size infrastructure for CAD/PLM & simulation",
    tag: "High-Density Compute",
    icon: Server,
  },
  {
    id: "gcc-strategy",
    title: "GCC Strategy & Intelligence",
    tagline: "Map location to the right engineering discipline",
    tag: "Cluster Intelligence",
    icon: Compass,
  },
  {
    id: "legal-doc",
    title: "Legal, Document Review",
    tagline: "Build IP protection into the entity from day one",
    tag: "Zero-Trust IP",
    icon: FileCheck2,
  },
  {
    id: "hr-staffing",
    title: "HR & Staffing",
    tagline: "Hire technical leaders by discipline, not generically",
    tag: "Practitioner Recruiting",
    icon: Users2,
  },
];

export function ErdHowVertaraHelpsReveal() {
  return (
    <div className="relative rounded-3xl border border-[#cddcd1] bg-white p-5 sm:p-8 md:p-10 shadow-xl shadow-navy/5 overflow-hidden">
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2e3f33_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* DESKTOP VIEW (md and up): Connected 5-Pillar Progression List */}
      <div className="relative hidden md:block space-y-3.5">
        {/* Continuous vertical circuit line connecting nodes */}
        <div className="absolute left-6 sm:left-7 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#b49339] via-[#cddcd1] to-[#b49339]/40" />

        {howVertaraHelpsPillars.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group relative flex items-center justify-between gap-6 rounded-2xl border border-[#cddcd1]/60 bg-[#f0f4f1]/70 p-5 transition-all duration-300 hover:border-[#b49339] hover:bg-[#e5ebe6] hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            >
              {/* Left Node & Title */}
              <div className="flex items-center gap-5 min-w-0">
                <div className="relative z-10 flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#0b1f3a] text-[#b49339] shadow-md ring-4 ring-white group-hover:bg-[#2e3f33] group-hover:scale-105 transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-lg font-bold text-navy group-hover:text-navy transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-sm font-medium text-slate group-hover:text-navy/80 transition-colors">
                    {item.tagline}
                  </p>
                </div>
              </div>

              {/* Right Tag Pill */}
              <div className="flex shrink-0 items-center">
                <span className="inline-flex items-center rounded-lg border border-[#cddcd1] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2e3f33] group-hover:border-[#b49339] group-hover:text-[#b49339] group-hover:bg-[#2e3f33] transition-all">
                  {item.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE VIEW (< md): Auto + Manual Slider */}
      <div className="relative block md:hidden">
        <MobileAutoSlider
          dotTone="green"
          itemClassName="w-[84vw] max-w-[320px] shrink-0 snap-center flex flex-col"
        >
          {howVertaraHelpsPillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-[#cddcd1]/60 bg-[#f0f4f1]/70 p-5 transition-all duration-300 hover:border-[#b49339] hover:bg-[#e5ebe6] cursor-pointer h-full"
              >
                {/* Node & Title */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0b1f3a] text-[#b49339] shadow-md ring-4 ring-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-bold text-navy">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-slate leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                {/* Tag Pill */}
                <div className="pt-3 border-t border-[#cddcd1]/50 flex justify-end">
                  <span className="inline-flex items-center rounded-lg border border-[#cddcd1] bg-white px-3 py-1 text-xs font-semibold text-[#2e3f33]">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </MobileAutoSlider>
      </div>

      {/* Blueprint Footer Strip */}
      <div className="relative mt-6 flex items-center justify-start">
        <a
          href="#enquire"
          className="inline-flex items-center gap-2 rounded-xl bg-[#2e3f33] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b1f3a] transition-colors shadow-xs"
        >
          <span>Discuss Capability Blueprint</span>
          <ArrowRight className="h-3.5 w-3.5 text-white" />
        </a>
      </div>
    </div>
  );
}
