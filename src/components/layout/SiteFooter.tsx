import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services/talent", label: "Talent Solutions" },
      { href: "/services/workspace", label: "Workspace" },
      { href: "/services/operations", label: "Business Operations" },
      { href: "/services/advisory", label: "Research & Advisory" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/industries", label: "Industries" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/insights", label: "Insights" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Engage",
    links: [
      { href: "/engagement-models", label: "Engagement models" },
      { href: "/contact", label: "Book a consultation" },
    ],
  },
];

export function SiteFooter({
  brandName = "Vertara Global",
  email = "hello@gccadvisor.com",
  phone = "+91 80 4000 1200",
}: {
  brandName?: string;
  email?: string;
  phone?: string;
}) {
  return (
    <footer
      className="border-t border-[#3c5243] bg-[#2F3F34] text-white font-sans"
      style={{ fontFamily: 'Calibri' }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex h-7 items-center">
            <Link href="/" className="text-base sm:text-lg font-bold tracking-[0.2em] text-white">
              VERTARA <span className="text-[#B59439] lowercase font-medium">global</span>
            </Link>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Helping enterprises set up, staff, and scale Global Capability
            Centers in India — as one connected system.
          </p>
          <p className="mt-4 text-sm text-white/90">{email}</p>
          <p className="text-sm text-white/90">{phone}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <div className="flex h-7 items-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B59439]">
                {col.title}
              </p>
            </div>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 bg-[#25332a] py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </div>
    </footer>
  );
}
