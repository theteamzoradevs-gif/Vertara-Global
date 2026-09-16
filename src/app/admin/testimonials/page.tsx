import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/CaseStudy";
import { getTestimonials } from "@/lib/content";
import { Button } from "@/components/ui/Button";

async function createTestimonial(formData: FormData) {
  "use server";
  const conn = await connectDB();
  if (!conn) return;
  await Testimonial.create({
    quote: String(formData.get("quote") || ""),
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    company: String(formData.get("company") || ""),
  });
  revalidatePath("/customers");
  revalidatePath("/");
}

async function deleteTestimonial(formData: FormData) {
  "use server";
  const conn = await connectDB();
  if (!conn) return;
  await Testimonial.findByIdAndDelete(String(formData.get("id")));
  revalidatePath("/customers");
  revalidatePath("/");
}

export default async function AdminTestimonialsPage() {
  const items = await getTestimonials();
  const conn = await connectDB();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Testimonials</h1>
      <form action={createTestimonial} className="mt-6 max-w-2xl space-y-3 rounded-2xl border border-border p-5">
        <textarea name="quote" required placeholder="Quote" rows={3} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <div className="grid gap-3 sm:grid-cols-3">
          <input name="name" required placeholder="Name" className="rounded-lg border border-border px-3 py-2 text-sm" />
          <input name="role" placeholder="Role" className="rounded-lg border border-border px-3 py-2 text-sm" />
          <input name="company" placeholder="Service · industry (not company name)" className="rounded-lg border border-border px-3 py-2 text-sm" />
        </div>
        <Button type="submit" disabled={!conn}>Add</Button>
      </form>
      <ul className="mt-8 space-y-3">
        {items.map((t: { _id?: string; name: string; quote: string; company: string }) => (
          <li key={t.name + t.quote.slice(0, 12)} className="rounded-xl border border-border bg-surface-elevated px-4 py-3">
            <p className="text-sm text-slate">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-navy">
                {t.name} · {t.company}
              </p>
              {t._id ? (
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={t._id} />
                  <button type="submit" className="text-sm text-danger">Delete</button>
                </form>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
