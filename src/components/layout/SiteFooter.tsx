import Link from "next/link";

const columns = [
  {
    title: "OUR EXPERTISE",
    links: [
      { href: "/assessment", label: "Run Your GCC Assessment" },
      { href: "/services#build-model", label: "The Vertara GCC Build Model" },
      { href: "/services#sectors", label: "Sector Expertise" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/services", label: "Our Services" },
      { href: "/insights", label: "Insights" },
      { href: "/#faq", label: "FAQ" },



    ],
  },
  {
    title: "Engage",
    links: [
      { href: "/engage-with-us", label: "Engage with us" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact us" },
    ],
  },
];

export function SiteFooter({
  brandName = "Vertara Global",
  email = "hello@gccadvisor.com",
  phone = "+91 95403 97444 / +91 99103 44485",
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
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center transition hover:opacity-90">
              <span className="text-base sm:text-lg font-bold tracking-[0.2em] text-white leading-tight">
                VERTARA <span className="text-[#B59439] lowercase font-medium">global</span>
              </span>
            </Link>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Helping enterprises set up, staff, and scale Global Capability
            Centers in India as one connected system.
          </p>
          <div className="mt-4 space-y-1.5 text-sm text-white/90">
            <p>
              <a href={`mailto:${email}`} className="transition-colors hover:text-[#B59439]">
                {email}
              </a>
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <a href="tel:+919540397444" className="transition-colors hover:text-[#B59439]">
                +91 95403 97444
              </a>
              <span className="text-white/40">/</span>
              <a href="tel:+919910344485" className="transition-colors hover:text-[#B59439]">
                +91 99103 44485
              </a>
            </p>
          </div>
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
