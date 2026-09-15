import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/chat-sessions", label: "Chat sessions" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/insights", label: "Insights" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/case-studies", label: "Case studies" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page uses this layout too — skip shell there via path check in children pages
  return (
    <div className="min-h-screen bg-surface">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // For login route, middleware allows unauthenticated — show bare children
  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col md:flex-row">
      <aside className="border-b border-border bg-navy text-white md:w-56 md:border-b-0 md:border-r md:border-white/10">
        <div className="px-4 py-5">
          <p className="text-sm font-bold">GCC Advisor Admin</p>
          <p className="mt-1 truncate text-xs text-white/60">{session.user.email}</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:overflow-visible">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-highlight hover:bg-white/10"
          >
            View site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/60 hover:bg-white/10 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
