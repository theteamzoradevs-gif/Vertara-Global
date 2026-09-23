"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Coins,
  Compass,
  Cpu,
  Factory,
  FileText,
  FlaskConical,
  Hotel,
  Menu,
  Pickaxe,
  Settings2,
  ShoppingBag,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const services = [
  {
    href: "/services/talent",
    label: "Talent Solutions",
    desc: "Hiring, leadership, and retention for GCC scale",
    icon: Users,
  },
  {
    href: "/services/workspace",
    label: "Workspace",
    desc: "Secure, branded floors in India’s talent hubs",
    icon: Building2,
  },
  {
    href: "/services/operations",
    label: "Business Operations",
    desc: "EOR bridge, HR, payroll, compliance transfer",
    icon: Settings2,
  },
  {
    href: "/services/advisory",
    label: "Research & Advisory",
    desc: "Location, org design, and board-ready cases",
    icon: Compass,
  },
];

const insightLinks = [
  {
    href: "/insights/chro-checklist-first-india-gcc",
    label: "CHRO checklist for a first India GCC",
  },
  {
    href: "/insights/choosing-india-city-capability-hub",
    label: "Choosing an India city for capability",
  },
  {
    href: "/insights/build-transfer-vs-managed-team",
    label: "Build & transfer vs managed team",
  },
  { href: "/insights", label: "View all insights →" },
];

const industryCol1 = [
  { href: "/industries/engineering-erd", label: "Engineering & ER&D", icon: Cpu },
  { href: "/industries/healthcare-life-sciences", label: "Healthcare & Life Sciences", icon: FlaskConical },
  { href: "/industries/fmcg-retail", label: "FMCG & Retail", icon: ShoppingBag },
  { href: "/industries/manufacturing", label: "Manufacturing & Industrial IoT", icon: Factory },
];

const industryCol2 = [
  { href: "/industries/wealth-management-pe-insurance", label: "Wealth Management, PE & Insurance", icon: Coins },
  { href: "/industries/technology-ai", label: "Technology & AI", icon: Sparkles },
  { href: "/industries/mining-metals", label: "Mining & Metals", icon: Pickaxe },
  { href: "/industries/travel-leisure-hospitality", label: "Travel, Leisure, Hospitality", icon: Hotel },
];

const simpleLinks = [
  { href: "/engagement-models", label: "Engagement" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ brandName = "Vertara Global" }: { brandName?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<"services" | "industries" | "insights" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(next: "services" | "industries" | "insights") {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(next);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  }

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm shadow-navy/5">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-navy transition hover:opacity-90"
        >
          VERTARA <span className="text-[#b49339]">GLOBAL</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <MegaTrigger
            label="Services"
            active={menu === "services" || pathname.startsWith("/services")}
            onEnter={() => openMenu("services")}
            onLeave={scheduleClose}
          />
          <MegaTrigger
            label="Industries"
            href="/industries"
            active={menu === "industries" || pathname.startsWith("/industries")}
            onEnter={() => openMenu("industries")}
            onLeave={scheduleClose}
            onClick={() => setMenu(null)}
          />
          <MegaTrigger
            label="Insights"
            active={menu === "insights" || pathname.startsWith("/insights")}
            onEnter={() => openMenu("insights")}
            onLeave={scheduleClose}
          />
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-accent-soft text-accent"
                  : "text-slate hover:bg-surface hover:text-navy",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            href="/contact"
            size="sm"
            className="hidden sm:inline-flex shrink-0 whitespace-nowrap text-xs sm:text-sm px-3 sm:px-3.5 py-1.5 sm:py-2"
          >
            Book a consultation
          </Button>
          <button
            type="button"
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-border text-navy transition hover:bg-surface hover:border-accent/40 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu ? (
        <div
          className="absolute inset-x-0 top-full border-b border-border bg-white shadow-xl shadow-navy/10"
          onMouseEnter={() => openMenu(menu)}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[1.25fr_0.75fr] lg:px-8">
            {menu === "services" ? (
              <>
                <div className="grid gap-2 sm:grid-cols-2">
                  {services.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="group flex gap-3 rounded-xl border border-transparent p-3 transition hover:border-[#b49339]/30 hover:bg-[#e5ebe6]/60"
                        onClick={() => setMenu(null)}
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e5ebe6] text-[#2e3f33] shadow-xs group-hover:bg-[#2e3f33] group-hover:text-[#b49339] transition-all">
                          <Icon className="h-5 w-5 stroke-[2.2]" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-navy group-hover:text-accent">
                            {s.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">{s.desc}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="rounded-2xl border border-[#cddcd1] bg-[#e5ebe6] p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b49339]">
                      Connected platform
                    </p>
                    <p className="mt-2 text-lg font-bold text-navy">One operating system for your GCC</p>
                    <p className="mt-2 text-sm text-slate leading-relaxed">
                      Talent, workspace, ops, and advisory — planned together so nothing slips between vendors.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/#how-it-connects"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2e3f33] hover:text-[#b49339] transition-colors"
                      onClick={() => setMenu(null)}
                    >
                      See how it connects <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </>
            ) : menu === "industries" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  <div className="space-y-1.5">
                    {industryCol1.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="group flex items-center gap-3.5 rounded-xl border border-transparent p-2.5 transition hover:border-[#b49339]/30 hover:bg-[#e5ebe6]/60"
                          onClick={() => setMenu(null)}
                        >
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e5ebe6] text-[#2e3f33] shadow-xs group-hover:bg-[#2e3f33] group-hover:text-[#b49339] group-hover:scale-105 transition-all">
                            <Icon className="h-5 w-5 stroke-[2.2]" />
                          </span>
                          <span className="block text-sm font-semibold text-navy group-hover:text-accent">
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="space-y-1.5">
                    {industryCol2.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="group flex items-center gap-3.5 rounded-xl border border-transparent p-2.5 transition hover:border-[#b49339]/30 hover:bg-[#e5ebe6]/60"
                          onClick={() => setMenu(null)}
                        >
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e5ebe6] text-[#2e3f33] shadow-xs group-hover:bg-[#2e3f33] group-hover:text-[#b49339] group-hover:scale-105 transition-all">
                            <Icon className="h-5 w-5 stroke-[2.2]" />
                          </span>
                          <span className="block text-sm font-semibold text-navy group-hover:text-accent">
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#cddcd1] bg-[#e5ebe6] p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b49339]">
                      Domain Specialization
                    </p>
                    <p className="mt-2 text-sm sm:text-base font-bold text-navy leading-snug">
                      Customized GCC setups for specialized industry verticals
                    </p>
                    <p className="mt-2 text-xs text-slate leading-relaxed">
                      Air-gapped security, certified physical perimeters, and regulatory compliance for your sector.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/industries"
                      className="mt-4 inline-flex items-center rounded-lg bg-[#b49339] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#9e7f2b]"
                      onClick={() => setMenu(null)}
                    >
                      View all industries →
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  {insightLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy transition hover:bg-accent-soft"
                      onClick={() => setMenu(null)}
                    >
                      <FileText className="mt-0.5 h-4 w-4 text-accent" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    For decision makers
                  </p>
                  <p className="mt-2 font-bold text-navy">
                    Practical reads for CHROs, COOs, and global ops leaders
                  </p>
                  <Link
                    href="/insights"
                    className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
                    onClick={() => setMenu(null)}
                  >
                    Browse insights
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="max-h-[85vh] w-full overflow-y-auto overflow-x-hidden border-t border-border bg-white px-4 py-5 shadow-lg lg:hidden">
          {/* Prominent CTA on mobile */}
          <div className="mb-4">
            <Button
              href="/contact"
              size="md"
              className="w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Book a consultation
            </Button>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wider text-[#b49339]">
            Services
          </p>
          <div className="mt-2 space-y-1">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-3 rounded-xl p-2 text-sm font-semibold text-navy transition hover:bg-[#e5ebe6]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e5ebe6] text-[#2e3f33]">
                    <Icon className="h-4 w-4 stroke-[2.2]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy leading-tight">{s.label}</p>
                    <p className="text-xs font-normal text-muted truncate">{s.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#b49339]">
            Industries
          </p>
          <div className="mt-2 space-y-1">
            {[...industryCol1, ...industryCol2].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl p-2 text-sm font-semibold text-navy transition hover:bg-[#e5ebe6]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e5ebe6] text-[#2e3f33]">
                    <Icon className="h-4 w-4 stroke-[2.2]" />
                  </span>
                  <span className="text-sm font-semibold text-navy leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#b49339]">
            Explore
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[
              ...simpleLinks,
              { href: "/insights", label: "Insights" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-xl px-3 py-2 text-sm font-medium transition",
                  pathname.startsWith(link.href)
                    ? "bg-accent-soft text-accent font-semibold"
                    : "text-navy hover:bg-surface",
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MegaTrigger({
  label,
  active,
  href,
  onEnter,
  onLeave,
  onClick,
}: {
  label: string;
  active: boolean;
  href?: string;
  onEnter: () => void;
  onLeave: () => void;
  onClick?: () => void;
}) {
  const commonClasses = cn(
    "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
    active ? "bg-accent-soft text-accent" : "text-slate hover:bg-surface hover:text-navy",
  );

  if (href) {
    return (
      <Link
        href={href}
        className={commonClasses}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        onClick={onClick}
        aria-expanded={active}
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition", active && "rotate-180")} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={commonClasses}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      aria-expanded={active}
    >
      {label}
      <ChevronDown className={cn("h-3.5 w-3.5 transition", active && "rotate-180")} />
    </button>
  );
}
