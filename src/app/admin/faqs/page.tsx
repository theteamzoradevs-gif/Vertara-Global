import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/Faq";
import { getFaqs } from "@/lib/content";
import { Button } from "@/components/ui/Button";

async function createFaq(formData: FormData) {
  "use server";
  const conn = await connectDB();
  if (!conn) return;
  await Faq.create({
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    category: String(formData.get("category") || "General"),
    order: Number(formData.get("order") || 99),
  });
  revalidatePath("/faq");
  revalidatePath("/");
}

async function deleteFaq(formData: FormData) {
  "use server";
  const conn = await connectDB();
  if (!conn) return;
  await Faq.findByIdAndDelete(String(formData.get("id")));
  revalidatePath("/faq");
  revalidatePath("/");
}

export default async function AdminFaqsPage() {
  const faqs = await getFaqs();
  const conn = await connectDB();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">FAQs</h1>
      <form action={createFaq} className="mt-6 max-w-2xl space-y-3 rounded-2xl border border-border p-5">
        <input name="question" required placeholder="Question" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <textarea name="answer" required placeholder="Answer" rows={4} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <div className="flex gap-3">
          <input name="category" placeholder="Category" className="flex-1 rounded-lg border border-border px-3 py-2 text-sm" />
          <input name="order" type="number" placeholder="Order" className="w-24 rounded-lg border border-border px-3 py-2 text-sm" />
        </div>
        <Button type="submit" disabled={!conn}>Add FAQ</Button>
      </form>
      <ul className="mt-8 space-y-3">
        {faqs.map((f: { _id?: string; question: string; category: string }) => (
          <li key={f.question} className="flex justify-between gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3">
            <div>
              <p className="font-medium text-navy">{f.question}</p>
              <p className="text-xs text-muted">{f.category}</p>
            </div>
            {f._id ? (
              <form action={deleteFaq}>
                <input type="hidden" name="id" value={f._id} />
                <button type="submit" className="text-sm text-danger">Delete</button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
