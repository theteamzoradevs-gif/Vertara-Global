import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { LeadStatusButtons } from "@/components/admin/LeadStatusButtons";

export default async function AdminLeadsPage() {
  const conn = await connectDB();
  const leads = conn
    ? JSON.parse(JSON.stringify(await Lead.find().sort({ createdAt: -1 }).lean()))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Leads</h1>
      <p className="mt-1 text-sm text-muted">
        Unified inbox — contact, trust pop, chat, and engagement selector.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface-elevated">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Intent</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  No leads yet{conn ? "" : " (database offline)"}.
                </td>
              </tr>
            ) : (
              leads.map((lead: {
                _id: string;
                name: string;
                company?: string;
                email?: string;
                source: string;
                intent?: string;
                status: string;
                createdAt: string;
              }) => (
                <tr key={lead._id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-navy">{lead.name}</td>
                  <td className="px-4 py-3 text-muted">{lead.company || "—"}</td>
                  <td className="px-4 py-3 text-muted">{lead.email || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{lead.intent || "—"}</td>
                  <td className="px-4 py-3">
                    <LeadStatusButtons id={lead._id} status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
