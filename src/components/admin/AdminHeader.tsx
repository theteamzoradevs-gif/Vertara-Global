"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";

const pathMap: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/inquiries": "Inquiries",
  "/admin/leads": "Inquiries",
  "/admin/chat-sessions": "Chat Sessions",
  "/admin/hero": "Home Editor",
  "/admin/insights": "Insights",
  "/admin/faqs": "FAQs Manager",
  "/admin/testimonials": "Testimonials Manager",
  "/admin/case-studies": "Case Studies Manager",
  "/admin/settings": "System Settings",
};

export function AdminHeader() {
  const pathname = usePathname();
  const currentTitle = pathMap[pathname] || "Admin Console";

  return (
    <header className="sticky top-0 z-30 hidden md:flex h-16 items-center justify-between border-b border-border bg-surface-elevated/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-2 text-xs font-medium text-muted">
        <Link href="/admin" className="hover:text-navy transition">
          Admin
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate/40" />
        <span className="font-semibold text-navy">{currentTitle}</span>
      </div>

      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-navy hover:bg-accent-soft hover:text-accent hover:border-accent/30 transition shadow-2xs"
      >
        <span>View Live Site</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
      </Link>
    </header>
  );
}
