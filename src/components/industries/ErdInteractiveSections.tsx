import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  Sparkles,
  Compass,
  FileCheck2,
  Users2,
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
    title: "Integrate PLM and CAD with HQ systems from day one",
    summary:
      "Direct multi-region license server peering, latency-optimized cloud interconnects, and zero-conflict sync.",
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
    title: "Build compute infrastructure for simulation and digital twins",
    summary:
      "Dedicated GPU/CPU server infrastructure sized specifically for finite element analysis (FEA) and CFD workloads.",
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
    title: "Protect IP and design data from week one across all assets",
    summary:
      "Air-gapped virtual environments, biometric lab perimeters, DLP enforcement, and sovereign parent entity IP assignment.",
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
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {sectorNeedsData.map((item) => {
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
 * SECTION 3: HOW VERTARA HELPS — CONNECTED OPERATING BLUEPRINT
 * ------------------------------------------------------------------------- */
const howVertaraHelpsPillars = [
  {
    id: "innovation-rd",
    title: "Innovation and R&D",
    tagline: "Own the roadmap prototype, patent",
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {howVertaraHelpsPillars.map((item) => {
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
            src="/images/engineering-erd.png"
            alt="One Accountable Operating System for ER&D"
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
