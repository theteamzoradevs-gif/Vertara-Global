import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { ChatSession } from "@/models/ChatSession";
import { Insight } from "@/models/Insight";
import { Faq } from "@/models/Faq";

export default async function AdminDashboard() {
  const conn = await connectDB();
  let leadCount = 0;
  let newLeads = 0;
  let chatCount = 0;
  let insightCount = 0;
  let faqCount = 0;

  if (conn) {
    [leadCount, newLeads, chatCount, insightCount, faqCount] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      ChatSession.countDocuments(),
      Insight.countDocuments(),
      Faq.countDocuments(),
    ]);
  }

  const cards = [
    { label: "Total leads", value: leadCount, href: "/admin/inquiries" },
    { label: "New leads", value: newLeads, href: "/admin/inquiries" },
    { label: "Chat sessions", value: chatCount, href: "/admin/chat-sessions" },
    { label: "Insights", value: insightCount, href: "/admin/insights" },
    { label: "FAQs", value: faqCount, href: "/admin/faqs" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Overview of leads, content, and system metrics.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-border bg-surface-elevated p-5 transition hover:border-accent"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-navy">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
