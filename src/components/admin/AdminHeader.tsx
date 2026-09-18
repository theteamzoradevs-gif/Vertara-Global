"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Database, ExternalLink } from "lucide-react";

const pathMap: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/leads": "Leads Inbox",
  "/admin/chat-sessions": "Live Chat Sessions",
  "/admin/hero": "Hero Section",
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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface-elevated/80 px-6 backdrop-blur-md">
      {/* Breadcrumb Path */}
      <div className="flex items-center gap-2 text-xs font-medium text-muted">
        <Link href="/admin" className="hover:text-navy transition">
          Admin
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate/40" />
        <span className="font-semibold text-navy">{currentTitle}</span>
      </div>

    </header>
  );
}
