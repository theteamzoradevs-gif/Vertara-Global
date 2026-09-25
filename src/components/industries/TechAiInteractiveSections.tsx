import Image from "next/image";
import {
  Server,
  Lock,
  Network,
  ShieldCheck,
  Cpu,
  Sparkles,
  Compass,
  Users2,
  FileCheck2,
  Terminal,
  Layers,
  Database,
  Code2,
} from "lucide-react";
import { MobileAutoSlider } from "@/components/ui/MobileAutoSlider";

/* -------------------------------------------------------------------------
 * SECTION 1: THE OPPORTUNITY — 3-STAGE TECH & AI JOURNEY
 * ------------------------------------------------------------------------- */
const techAiOpportunitySteps = [
  {
    title: "Build Sized GPU & MLOps Infrastructure",
    badge: "GPU & Compute",
    description:
      "Build GPU/compute and MLOps infrastructure that a mid-market AI or SaaS enterprise cannot justify funding at hyperscaler capital intensity. Hybrid bare-metal clusters sized for real workloads.",
  },
  {
    title: "Access GenAI & Applied Research Talent",
    badge: "GenAI Depth",
    description:
      "Access GenAI/LLM engineering, transformer optimization, and applied AI research talent that is globally scarce without a Silicon Valley cost base.",
  },
  {
    title: "Start Lean. Scale as Usage Grows.",
    badge: "Usage-Linked Scale",
    description:
      "Start with one capability model ops, data platform engineering, or applied research and scale compute and headcount proportionally as production API usage grows.",
  },
];

export function TechAiOpportunityJourney() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col"
      dotTone="green"
    >
      {techAiOpportunitySteps.map((step) => {
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
 * SECTION 2: WHAT THIS SECTOR NEEDS — 3-POINT AI INFRASTRUCTURE
 * ------------------------------------------------------------------------- */
const techAiSectorNeedsData = [
  {
    id: "right-sized-gpu-compute",
    tabTitle: "RIGHT-SIZED COMPUTE",
    tag: "GPU Training & Inference",
    title: "Right-size GPU infrastructure to actual training and inference load",
    summary:
      "High-density GPU clusters (H100/A100, L40S) with dynamic spot allocation, tiering, and zero idle-burn orchestration.",
    details: [
      "Dynamic GPU cluster autoscaling for fine-tuning and batch inference workloads",
      "Hybrid cloud + bare-metal colocation reducing annual GPU compute burn by 50%+",
      "Sub-millisecond model weight retrieval pipelines with distributed caching",
    ],
    icon: Server,
  },
  {
    id: "mlops-pipelines-lifecycle",
    tabTitle: "MLOPS PIPELINES",
    tag: "Model Lifecycle & CI/CD",
    title: "Build enterprise MLOps pipelines integrated from day one",
    summary:
      "Automated data drift detection, prompt regression testing, evaluation harnesses, and CI/CD deployment pipelines.",
    details: [
      "Automated model registry, feature store, and dataset versioning loops (MLflow/Kubeflow)",
      "Real-time token latency, hallucination rate, and embedding drift monitoring",
      "Continuous fine-tuning and reinforcement learning (RLHF/DPO) pipeline automation",
    ],
    icon: Cpu,
  },
  {
    id: "finops-cloud-governance",
    tabTitle: "FINOPS & CLOUD GOVERNANCE",
    tag: "Hybrid Multi-Cloud Spend",
    title: "Govern hybrid and multi-cloud spend with strict FinOps guardrails",
    summary:
      "Cloud FinOps architecture with automated resource tagging, egress elimination, and workload-level budget guardrails.",
    details: [
      "Real-time FinOps attribution tracking GPU/LLM cost per API call or tenant",
      "Multi-region data sovereign boundary controls satisfying international enterprise clients",
      "100% direct parent-company model weights, training data, and algorithm IP ownership",
    ],
    icon: Lock,
  },
];

export function TechAiSectorNeedsSelector() {
  return (
    <MobileAutoSlider
      desktopClassName="md:grid md:grid-cols-3 md:gap-6"
      itemClassName="w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex flex-col h-full"
      dotTone="green"
    >
      {techAiSectorNeedsData.map((item) => {
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
 * SECTION 3: HOW VERTARA HELPS — CONNECTED AI BLUEPRINT
 * ------------------------------------------------------------------------- */
const techAiHowVertaraHelpsPillars = [
  {
    id: "data-centre-cloud-ops",
    title: "Data Centre Migration & Cloud Ops",
    tagline: "Right-size GPU/compute infrastructure and govern hybrid multi-cloud costs",
    tag: "High-Density GPU Ops",
    icon: Server,
  },
  {
    id: "innovation-rd",
    title: "Innovation, R&D",
    tagline: "GenAI/LLM engineering and applied research",
    tag: "GenAI & Applied Research",
    icon: Sparkles,
  },
  {
    id: "hr-customer-ops",
    title: "HR, Customer, Business Ops",
    tagline: "Hire ML engineers without a Silicon Valley cost base",
    tag: "AI/ML Practitioner Hiring",
    icon: Users2,
  },
  {
    id: "gcc-strategy",
    title: "GCC Strategy & Intelligence",
    tagline: "Locate AI/ML and data engineering talent clusters",
    tag: "AI & DeepTech Clusters",
    icon: Compass,
  },
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    tagline: "Data governance and model risk management, day one",
    tag: "Model Risk & Governance",
    icon: ShieldCheck,
  },
];

export function TechAiHowVertaraHelpsReveal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left side list */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-7">
        {techAiHowVertaraHelpsPillars.map((item) => {
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
            src="/images/technology-ai.png"
            alt="One Accountable Operating System for Tech & AI"
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
