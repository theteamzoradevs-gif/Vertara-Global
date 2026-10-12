import { connectDB } from "@/lib/db";
import { Insight } from "@/models/Insight";
import { InsightsManager } from "@/components/admin/InsightsManager";

export const metadata = {
  title: "Insights Management | Vertara Global Admin",
};

export default async function AdminInsightsPage() {
  const conn = await connectDB();
  let insights = [];

  if (conn) {
    const docs = await Insight.find().sort({ createdAt: -1 }).lean();
    insights = JSON.parse(JSON.stringify(docs));
  }

  return <InsightsManager initialInsights={insights} />;
}
