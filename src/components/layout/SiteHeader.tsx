"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const services = [
  {
    href: "/services/talent",
    label: "Talent Solutions",
    desc: "Hiring, leadership, and retention for GCC scale",
  },
  {
    href: "/services/workspace",
    label: "Workspace",
    desc: "Secure, branded floors in India's talent hubs",
  },
  {
    href: "/services/operations",
    label: "Business Operations",
    desc: "EOR bridge, HR, payroll, compliance transfer",
  },
  {
    href: "/services/advisory",
    label: "Research & Advisory",
    desc: "Location, org design, and board-ready cases",
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

/* Kept for future re-enabling if needed:
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
*/

const simpleLinks = [
  { href: "/about", label: "About Us" },
];

export function SiteHeader({ brandName = "Vertara Global" }: { brandName?: string }) {
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
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm shadow-navy/5 font-sans"
      style={{ fontFamily: 'Calibri' }}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-sm sm:text-base md:text-lg font-bold tracking-[0.14em] sm:tracking-[0.2em] text-navy transition hover:opacity-90"
        >
          VERTARA <span className="text-[#b49339] lowercase font-medium">global</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-accent-soft text-accent font-semibold"
                : "text-slate hover:bg-surface hover:text-navy",
            )}
          >
            Home
          </Link>
          <Link
            href="/offerings"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith("/offerings") || pathname.startsWith("/services")
                ? "bg-accent-soft text-accent font-semibold"
                : "text-slate hover:bg-surface hover:text-navy",
            )}
          >
            Our Offerings
          </Link>
          {/* Industries menu disabled - to be added later */}
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
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="group block rounded-xl border border-transparent p-3 transition hover:border-[#b49339]/30 hover:bg-[#e5ebe6]/60"
                      onClick={() => setMenu(null)}
                    >
                      <span className="block text-sm font-semibold text-navy group-hover:text-accent">
                        {s.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">{s.desc}</span>
                    </Link>
                  ))}
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
                      href="/offerings"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2F3F34] hover:text-[#b49339] transition-colors"
                      onClick={() => setMenu(null)}
                    >
                      Explore full offerings overview <ArrowRight className="h-3.5 w-3.5" />
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
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-navy transition hover:bg-accent-soft hover:text-accent"
                      onClick={() => setMenu(null)}
                    >
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
              Discuss your GCC mandate
            </Button>
          </div>

          <div className="mb-2">
            <Link
              href="/offerings"
              className={cn(
                "block rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[#e5ebe6]",
                pathname.startsWith("/offerings") || pathname.startsWith("/services")
                  ? "bg-accent-soft text-accent"
                  : "text-navy",
              )}
              onClick={() => setMobileOpen(false)}
            >
              Our Offerings
            </Link>
          </div>

          {/* Industries section disabled for now */}

          <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#b49339]">
            Explore
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[
              { href: "/", label: "Home" },
              { href: "/insights", label: "Insights" },
              { href: "/about", label: "About Us" },
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
