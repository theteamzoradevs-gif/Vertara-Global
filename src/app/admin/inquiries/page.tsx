import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { LeadsManager, LeadItemData } from "@/components/admin/LeadsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inquiries | Veratara Global Admin",
};

export default async function AdminInquiriesPage() {
  const conn = await connectDB();
  let leads: LeadItemData[] = [];

  if (conn) {
    try {
      const docs = await Lead.find().sort({ createdAt: -1 }).lean();
      leads = JSON.parse(JSON.stringify(docs));
    } catch {
      leads = [];
    }
  }

  return <LeadsManager initialLeads={leads} isDbConnected={!!conn} />;
}
