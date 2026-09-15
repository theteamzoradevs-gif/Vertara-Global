import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Insight } from "@/models/Insight";
import { getInsights } from "@/lib/content";
import { Button } from "@/components/ui/Button";

async function createInsight(formData: FormData) {
  "use server";
  const conn = await connectDB();
  if (!conn) return;
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  await Insight.create({
    title,
    slug,
    excerpt: String(formData.get("excerpt") || ""),
    body: String(formData.get("body") || ""),
    category: String(formData.get("category") || "General"),
    coverImage:
      String(formData.get("coverImage") || "") ||
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    published: true,
    publishedAt: new Date(),
  });
  revalidatePath("/insights");
}

async function deleteInsight(formData: FormData) {
  "use server";
  const conn = await connectDB();
  if (!conn) return;
  await Insight.findByIdAndDelete(String(formData.get("id")));
  revalidatePath("/insights");
}

export default async function AdminInsightsPage() {
  const insights = await getInsights();
  const conn = await connectDB();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Insights</h1>
      <form action={createInsight} className="mt-6 max-w-2xl space-y-3 rounded-2xl border border-border bg-surface-elevated p-5">
        <p className="font-semibold text-navy">Publish article</p>
        <input name="title" required placeholder="Title" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="slug" required placeholder="slug-like-this" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="category" placeholder="Category" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="coverImage" placeholder="Cover image URL" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <textarea name="excerpt" placeholder="Excerpt" rows={2} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <textarea name="body" placeholder="Body (use ## for headings, - for bullets)" rows={6} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <Button type="submit" disabled={!conn}>Publish</Button>
      </form>
      <ul className="mt-8 space-y-3">
        {insights.map((i: { _id?: string; slug: string; title: string; category: string }) => (
          <li key={i.slug} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3">
            <div>
              <p className="font-semibold text-navy">{i.title}</p>
              <p className="text-xs text-muted">{i.category} · /insights/{i.slug}</p>
            </div>
            {i._id ? (
              <form action={deleteInsight}>
                <input type="hidden" name="id" value={i._id} />
                <button type="submit" className="text-sm text-danger">Delete</button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
