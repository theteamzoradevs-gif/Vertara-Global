import Link from "next/link";
import {
  Inbox,
  HelpCircle,
  Quote,
  FolderGit2,
  PanelTop,
  ArrowRight,
  AlertCircle,
  Plus,
  Info,
  Mail,
} from "lucide-react";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { Insight } from "@/models/Insight";
import { Faq } from "@/models/Faq";
import { CaseStudy, Testimonial } from "@/models/CaseStudy";

export const dynamic = "force-dynamic";

const SOURCE_LABELS: Record<string, { label: string; style: string }> = {
  contact: {
    label: "Contact Form",
    style: "bg-teal-50 text-teal-700 border-teal-200",
  },
  trust_pop: {
    label: "Trust Pop",
    style: "bg-blue-50 text-blue-700 border-blue-200",
  },
  trust_pop_brief: {
    label: "Trust Pop",
    style: "bg-blue-50 text-blue-700 border-blue-200",
  },
  chat: {
    label: "Chat",
    style: "bg-orange-50 text-orange-700 border-orange-200",
  },
  chat_assistant: {
    label: "Chat",
    style: "bg-orange-50 text-orange-700 border-orange-200",
  },
  engagement_selector: {
    label: "Engagement Selector",
    style: "bg-purple-50 text-purple-700 border-purple-200",
  },
  hero_quick_call: {
    label: "Hero Quick Call",
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

function relativeTime(value?: string | Date | null) {
  if (!value) return "—";
  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default async function AdminDashboard() {
  const conn = await connectDB();

  let leadCount = 0;
  let newLeads = 0;
  let contactedLeads = 0;
  let insightCount = 0;
  let faqCount = 0;
  let testimonialCount = 0;
  let caseStudyCount = 0;
  let recentLeads: {
    _id: string;
    name: string;
    email?: string;
    source?: string;
    status?: string;
    createdAt?: string;
  }[] = [];

  if (conn) {
    const [
      leadsTotal,
      leadsNew,
      leadsContacted,
      insightsTotal,
      faqsTotal,
      testimonialsTotal,
      casesTotal,
      latestLeads,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "contacted" }),
      Insight.countDocuments(),
      Faq.countDocuments(),
      Testimonial.countDocuments(),
      CaseStudy.countDocuments(),
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email source status createdAt")
        .lean(),
    ]);

    leadCount = leadsTotal;
    newLeads = leadsNew;
    contactedLeads = leadsContacted;
    insightCount = insightsTotal;
    faqCount = faqsTotal;
    testimonialCount = testimonialsTotal;
    caseStudyCount = casesTotal;
    recentLeads = JSON.parse(JSON.stringify(latestLeads));
  }

  const primaryMetrics = [
    { label: "Total Inquiries", value: leadCount, href: "/admin/inquiries", valueClass: "text-navy" },
    { label: "New Inquiries", value: newLeads, href: "/admin/inquiries", valueClass: "text-teal-600" },
    {
      label: "Contacted",
      value: contactedLeads,
      href: "/admin/inquiries",
      valueClass: "text-blue-600",
    },
  ];

  const contentMetrics = [
    { label: "Total Insights", value: insightCount, href: "/admin/insights" },
    { label: "Total FAQs", value: faqCount, href: "/admin/faqs" },
    { label: "Testimonials", value: testimonialCount, href: "/admin/testimonials" },
    { label: "Case Studies", value: caseStudyCount, href: "/admin/case-studies" },
  ];

  const quickActions = [
    { title: "Create Insight", href: "/admin/insights", icon: Plus, primary: true },
    { title: "Add Case Study", href: "/admin/case-studies", icon: FolderGit2, primary: false },
    { title: "Add Testimonial", href: "/admin/testimonials", icon: Quote, primary: false },
    { title: "Create FAQ", href: "/admin/faqs", icon: HelpCircle, primary: false },
    { title: "Home Editor", href: "/admin/hero", icon: PanelTop, primary: false },
    { title: "About Us Editor", href: "/admin/about", icon: Info, primary: false },
    { title: "Contact Editor", href: "/admin/contact", icon: Mail, primary: false },
    { title: "View Inquiries", href: "/admin/inquiries", icon: Inbox, primary: false },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {!conn ? (
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-amber-300/80 bg-amber-50 p-3.5 sm:p-4 text-amber-900 shadow-xs">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-amber-600" />
          <p className="text-xs sm:text-sm font-medium">
            Database is offline. Counts will appear when connected.
          </p>
        </div>
      ) : null}

      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-navy">Dashboard</h1>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted">
          Overview of leads, content, and recent activity.
        </p>
      </div>

      {/* Operations metrics (compact 3-col on all screens) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {primaryMetrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className="group rounded-xl sm:rounded-2xl border border-border bg-surface-elevated p-2.5 sm:p-4 shadow-2xs hover:border-accent/40 hover:shadow-xs transition active:scale-[0.98]"
          >
            <p className="text-[10px] sm:text-xs text-muted font-medium truncate leading-tight">
              {metric.label}
            </p>
            <p className={`mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold tracking-tight ${metric.valueClass}`}>
              {metric.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Content summary metrics */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
        {contentMetrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className="group rounded-xl sm:rounded-2xl border border-border bg-surface-elevated p-2.5 sm:p-4 shadow-2xs hover:border-accent/40 hover:shadow-xs transition active:scale-[0.98]"
          >
            <p className="text-[11px] sm:text-xs text-muted font-medium truncate">
              {metric.label}
            </p>
            <p className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-navy">
              {metric.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions toolbar */}
      <div className="flex flex-col gap-2.5 rounded-xl sm:rounded-2xl border border-border bg-surface-elevated p-3.5 sm:p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="shrink-0 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted">
          Quick actions
        </p>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 sm:justify-end">
          {quickActions.map((action) => {
            const Icon = action.icon;
            if (action.primary) {
              return (
                <Link
                  key={action.href + action.title}
                  href={action.href}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white shadow-xs transition hover:bg-accent-hover active:scale-[0.98]"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{action.title}</span>
                </Link>
              );
            }
            return (
              <Link
                key={action.href + action.title}
                href={action.href}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-semibold text-navy transition hover:bg-surface-elevated hover:border-accent/30 active:scale-[0.98]"
              >
                <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted" />
                <span>{action.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Latest Inquiries Container */}
      <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-surface-elevated shadow-xs">
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 sm:px-5 sm:py-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-navy">Latest Inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-accent hover:text-accent-hover transition"
          >
            <span>View all</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="px-5 py-10 sm:py-12 text-center text-muted">
            <div className="flex flex-col items-center justify-center">
              <Inbox className="h-8 w-8 sm:h-10 sm:w-10 text-slate-300" />
              <p className="mt-2.5 text-sm sm:text-base font-semibold text-navy">No inquiries yet</p>
              <p className="mt-0.5 text-xs text-muted">New leads will appear here.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile list view (< 640px) */}
            <div className="divide-y divide-border sm:hidden">
              {recentLeads.map((lead) => {
                const sourceConfig = SOURCE_LABELS[lead.source || ""] || {
                  label: lead.source || "—",
                  style: "bg-surface text-muted border-border",
                };
                return (
                  <div key={lead._id} className="p-3.5 transition hover:bg-surface/50 active:bg-surface">
                    <Link href="/admin/inquiries" className="block space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-bold text-navy text-xs truncate">{lead.name}</span>
                          {lead.status === "new" ? (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500 ring-2 ring-teal-200" />
                          ) : null}
                        </div>
                        <span className="text-[10px] text-muted shrink-0 whitespace-nowrap">
                          {relativeTime(lead.createdAt)}
                        </span>
                      </div>

                      {lead.email ? (
                        <p className="truncate text-[11px] text-muted">{lead.email}</p>
                      ) : null}

                      <div className="flex items-center gap-2 pt-0.5">
                        <span className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${sourceConfig.style}`}>
                          {sourceConfig.label}
                        </span>
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${
                            lead.status === "new"
                              ? "bg-teal-600 text-white shadow-2xs"
                              : lead.status === "contacted"
                                ? "bg-blue-600 text-white shadow-2xs"
                                : "border border-border bg-surface text-slate-500"
                          }`}
                        >
                          {lead.status || "—"}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Desktop / Tablet table view (>= 640px) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm text-slate">
                <thead className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-3.5">Lead Name</th>
                    <th className="px-5 py-3.5">Source</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentLeads.map((lead) => {
                    const sourceConfig = SOURCE_LABELS[lead.source || ""] || {
                      label: lead.source || "—",
                      style: "bg-surface text-muted border-border",
                    };
                    return (
                      <tr key={lead._id} className="transition hover:bg-surface/50">
                        <td className="px-5 py-4">
                          <Link href="/admin/inquiries" className="block min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-navy">{lead.name}</span>
                              {lead.status === "new" ? (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                              ) : null}
                            </div>
                            {lead.email ? (
                              <p className="mt-0.5 truncate text-xs text-muted">{lead.email}</p>
                            ) : null}
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold ${sourceConfig.style}`}
                          >
                            {sourceConfig.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${
                              lead.status === "new"
                                ? "bg-teal-600 text-white shadow-xs"
                                : lead.status === "contacted"
                                  ? "bg-blue-600 text-white shadow-xs"
                                  : "border border-border bg-surface text-slate-500"
                            }`}
                          >
                            {lead.status || "—"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-xs text-muted">
                          {relativeTime(lead.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
