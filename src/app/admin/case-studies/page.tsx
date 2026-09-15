import { getCaseStudies } from "@/lib/content";
import Link from "next/link";

export default async function AdminCaseStudiesPage() {
  const cases = await getCaseStudies();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Case studies</h1>
      <p className="mt-1 text-sm text-muted">
        Seeded case studies appear on the customers page. Re-seed or edit via MongoDB for full CMS edits.
      </p>
      <ul className="mt-6 space-y-3">
        {cases.map((c: { title: string; client: string; industry: string }) => (
          <li key={c.title} className="rounded-xl border border-border bg-surface-elevated px-4 py-3">
            <p className="font-semibold text-navy">{c.title}</p>
            <p className="text-sm text-muted">
              {c.client} · {c.industry}
            </p>
          </li>
        ))}
      </ul>
      <Link href="/customers" className="mt-6 inline-block text-sm font-semibold text-accent">
        View on site →
      </Link>
    </div>
  );
}
