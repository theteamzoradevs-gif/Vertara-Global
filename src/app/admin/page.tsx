import Link from "next/link";
import {
  Inbox,
  MessageSquare,
  HelpCircle,
  Quote,
  FolderGit2,
  PanelTop,
  ArrowRight,
  AlertCircle,
  Plus,
} from "lucide-react";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { ChatSession } from "@/models/ChatSession";
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

function sessionPreview(messages?: { role?: string; text?: string }[]) {
  const userMsgs = (messages || []).filter((m) => m.role === "user" && m.text?.trim());
  const latest = userMsgs[userMsgs.length - 1]?.text?.trim();
  if (!latest) return "No user message yet";
  return latest.length > 72 ? `${latest.slice(0, 72)}…` : latest;
}

function sessionStatus(session: {
  intent?: string;
  status?: string;
  messages?: { role?: string; text?: string }[];
}) {
  if (session.intent === "lead_captured") {
    return {
      label: "Lead captured",
      style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  }
  if (session.status === "completed") {
    return {
      label: "Completed",
      style: "bg-slate-100 text-slate-700 border-slate-200",
    };
  }
  if (session.status === "opened") {
    return {
      label: "Opened",
      style: "bg-surface text-muted border-border",
    };
  }
  if (session.status === "in_progress") {
    return {
      label: "In progress",
      style: "bg-teal-50 text-teal-700 border-teal-200",
    };
  }
  const count = session.messages?.length || 0;
  const hasUser = (session.messages || []).some((m) => m.role === "user");
  if (!hasUser || count <= 1) {
    return {
      label: "Opened",
      style: "bg-surface text-muted border-border",
    };
  }
  return {
    label: "In progress",
    style: "bg-teal-50 text-teal-700 border-teal-200",
  };
}

export default async function AdminDashboard() {
  const conn = await connectDB();

  let leadCount = 0;
  let newLeads = 0;
  let contactedLeads = 0;
  let chatCount = 0;
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
  let recentChats: {
    _id: string;
    sessionId: string;
    status?: string;
    intent?: string;
    messages?: { role?: string; text?: string }[];
    updatedAt?: string;
    createdAt?: string;
  }[] = [];

  if (conn) {
    const [
      leadsTotal,
      leadsNew,
      leadsContacted,
      chatsTotal,
      insightsTotal,
      faqsTotal,
      testimonialsTotal,
      casesTotal,
      latestLeads,
      latestChats,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "contacted" }),
      ChatSession.countDocuments(),
      Insight.countDocuments(),
      Faq.countDocuments(),
      Testimonial.countDocuments(),
      CaseStudy.countDocuments(),
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email source status createdAt")
        .lean(),
      ChatSession.find()
        .sort({ updatedAt: -1 })
        .limit(5)
        .select("sessionId status intent messages updatedAt createdAt")
        .lean(),
    ]);

    leadCount = leadsTotal;
    newLeads = leadsNew;
    contactedLeads = leadsContacted;
    chatCount = chatsTotal;
    insightCount = insightsTotal;
    faqCount = faqsTotal;
    testimonialCount = testimonialsTotal;
    caseStudyCount = casesTotal;
    recentLeads = JSON.parse(JSON.stringify(latestLeads));
    recentChats = JSON.parse(JSON.stringify(latestChats));
  }

  const primaryMetrics = [
    { label: "Total Inquiries", value: leadCount, href: "/admin/inquiries", valueClass: "text-navy" },
    { label: "New", value: newLeads, href: "/admin/inquiries", valueClass: "text-teal-600" },
    {
      label: "Contacted",
      value: contactedLeads,
      href: "/admin/inquiries",
      valueClass: "text-blue-600",
    },
    {
      label: "Total Sessions",
      value: chatCount,
      href: "/admin/chat-sessions",
      valueClass: "text-navy",
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
    { title: "View Inquiries", href: "/admin/inquiries", icon: Inbox, primary: false },
  ];

  return (
    <div className="space-y-6">
      {!conn ? (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300/80 bg-amber-50 p-4 text-amber-900 shadow-xs">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm font-medium">
            Database is offline. Counts will appear when connected.
          </p>
        </div>
      ) : null}

      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of leads, content, and recent activity.
        </p>
      </div>

      {/* Operations metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {primaryMetrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs"
          >
            <p className="text-xs text-muted font-medium">{metric.label}</p>
            <p className={`mt-1 text-2xl font-bold ${metric.valueClass}`}>{metric.value}</p>
          </Link>
        ))}
      </div>

      {/* Content summary */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {contentMetrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs"
          >
            <p className="text-xs text-muted font-medium">{metric.label}</p>
            <p className="mt-1 text-2xl font-bold text-navy">{metric.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions — toolbar style */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-elevated p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">
          Quick actions
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {quickActions.map((action) => {
            const Icon = action.icon;
            if (action.primary) {
              return (
                <Link
                  key={action.href + action.title}
                  href={action.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-accent-hover"
                >
                  <Icon className="h-4 w-4" />
                  <span>{action.title}</span>
                </Link>
              );
            }
            return (
              <Link
                key={action.href + action.title}
                href={action.href}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-navy transition hover:bg-surface-elevated"
              >
                <Icon className="h-3.5 w-3.5 text-muted" />
                <span>{action.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Latest Inquiries + Recent Chat Sessions */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xs">
          <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3.5">
            <h2 className="text-sm font-bold text-navy">Latest Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
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
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-muted">
                      <div className="flex flex-col items-center justify-center">
                        <Inbox className="h-10 w-10 text-slate-300" />
                        <p className="mt-3 text-base font-semibold text-navy">No inquiries yet</p>
                        <p className="mt-1 text-xs text-muted">New leads will appear here.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => {
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
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xs">
          <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3.5">
            <h2 className="text-sm font-bold text-navy">Recent Chat Sessions</h2>
            <Link
              href="/admin/chat-sessions"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate">
              <thead className="border-b border-border bg-surface text-xs font-semibold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3.5">Session</th>
                  <th className="px-5 py-3.5">Message</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentChats.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-muted">
                      <div className="flex flex-col items-center justify-center">
                        <MessageSquare className="h-10 w-10 text-slate-300" />
                        <p className="mt-3 text-base font-semibold text-navy">
                          No chat sessions yet
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          New conversations will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentChats.map((session) => {
                    const status = sessionStatus(session);
                    return (
                      <tr key={session._id} className="transition hover:bg-surface/50">
                        <td className="px-5 py-4">
                          <Link
                            href="/admin/chat-sessions"
                            className="flex flex-wrap items-center gap-2"
                          >
                            <span className="font-mono text-xs font-semibold text-navy">
                              {session.sessionId.slice(0, 8)}…
                            </span>
                            <span className="inline-block rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
                              Chat
                            </span>
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <p className="max-w-[200px] truncate text-sm text-navy">
                            {sessionPreview(session.messages)}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold ${status.style}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-xs text-muted">
                          {relativeTime(session.updatedAt || session.createdAt)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
