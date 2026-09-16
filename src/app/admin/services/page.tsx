import Link from "next/link";
import { getServices } from "@/lib/content";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Services</h1>
      <p className="mt-1 text-sm text-muted">
        Service content is seeded and editable in MongoDB. Open a service on the public site to review.
      </p>
      <ul className="mt-6 space-y-3">
        {services.map((s: { slug: string; name: string; shortDescription: string }) => (
          <li
            key={s.slug}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3"
          >
            <div>
              <p className="font-semibold text-navy">{s.name}</p>
              <p className="text-sm text-muted">{s.shortDescription}</p>
            </div>
            <Link
              href={`/services/${s.slug}`}
              className="text-sm font-semibold text-accent hover:underline"
            >
              View →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
