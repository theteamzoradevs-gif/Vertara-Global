"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Compass,
  FileText,
  Menu,
  Settings2,
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

const simpleLinks = [
  { href: "/engagement-models", label: "Engagement" },
  { href: "/customers", label: "Customers" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader({ brandName = "Veratara Global" }: { brandName?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<"services" | "insights" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(next: "services" | "insights") {
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
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm shadow-navy/5">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-base sm:text-lg font-bold uppercase tracking-[0.2em] text-navy">
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
          <Button href="/contact" size="sm" className="hidden sm:inline-flex shrink-0 whitespace-nowrap">
            Book a consultation
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-navy lg:hidden"
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
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
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
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2e3f33] text-[#b49339] shadow-sm">
                          <Icon className="h-5 w-5 stroke-[2.2] text-[#b49339]" />
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
                <div className="rounded-2xl bg-[#2e3f33] p-5 text-white shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b49339]">
                    Connected platform
                  </p>
                  <p className="mt-2 text-lg font-bold">One operating system for your GCC</p>
                  <p className="mt-2 text-sm text-white/70">
                    Talent, workspace, ops, and advisory — planned together so nothing slips between vendors.
                  </p>
                  <Link
                    href="/#how-it-connects"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#b49339] hover:text-white"
                    onClick={() => setMenu(null)}
                  >
                    See how it connects <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
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
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-white px-4 py-4 lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Services</p>
          <div className="mt-2 space-y-1">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-accent-soft"
                onClick={() => setMobileOpen(false)}
              >
                {s.label}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">Explore</p>
          <div className="mt-2 space-y-1">
            {[
              ...simpleLinks,
              { href: "/insights", label: "Insights" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-accent-soft"
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
  onEnter,
  onLeave,
}: {
  label: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-accent-soft text-accent" : "text-slate hover:bg-surface hover:text-navy",
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-expanded={active}
    >
      {label}
      <ChevronDown className={cn("h-3.5 w-3.5 transition", active && "rotate-180")} />
    </button>
  );
}
