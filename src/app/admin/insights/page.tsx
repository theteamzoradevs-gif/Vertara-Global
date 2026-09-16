import { connectDB } from "@/lib/db";
import { Insight } from "@/models/Insight";
import { seedInsights } from "@/data/seed-content";
import { InsightsManager } from "@/components/admin/InsightsManager";

export const metadata = {
  title: "Insights Management | GCC Advisor Admin",
};

export default async function AdminInsightsPage() {
  const conn = await connectDB();
  let insights = [];

  if (conn) {
    const docs = await Insight.find().sort({ createdAt: -1 }).lean();
    if (docs.length > 0) {
      insights = JSON.parse(JSON.stringify(docs));
    } else {
      insights = seedInsights.map((s, idx) => ({
        _id: `seed-${idx}`,
        ...s,
        published: true,
      }));
    }
  } else {
    insights = seedInsights.map((s, idx) => ({
      _id: `seed-${idx}`,
      ...s,
      published: true,
    }));
  }

  return <InsightsManager initialInsights={insights} />;
}
