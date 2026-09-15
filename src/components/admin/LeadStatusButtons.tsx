"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LeadStatusButtons({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();

  async function setStatus(next: string) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-1">
      {(["new", "contacted", "archived"] as const).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setStatus(s)}
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
            status === s
              ? "bg-navy text-white"
              : "bg-surface text-muted hover:bg-accent-soft",
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
