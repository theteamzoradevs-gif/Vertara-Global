import Image from "next/image";

const frames = [
  {
    number: "01",
    src: "/images/workspace-blue.webp",
    caption: "Premium GCC floors — ready before day one",
    category: "Workspace",
  },
  {
    number: "02",
    src: "/images/talent-team.webp",
    caption: "Teams that feel like your enterprise culture",
    category: "Culture & Talent",
  },
  {
    number: "03",
    src: "/images/gcc-ops.png",
    caption: "Operations command — visible, governed, scalable",
    category: "Operations",
  },
  {
    number: "04",
    src: "/images/gcc-floor.webp",
    caption: "Enterprise-ready technology — built for how your teams work",
    category: "Technology",
  },
  {
    number: "05",
    src: "/images/workspace-collab.jpg",
    caption: "Spaces that help people connect, collaborate and belong",
    category: "Employee experience",
  },
  {
    number: "06",
    src: "/images/workspace-vibrant.jpg",
    caption: "Secure by design — resilient for business-critical operations",
    category: "Security & continuity",
  },
];

export function ImageStoryStrip() {
  return (
    <div className="w-full">
      {/* 3 cards per row on mobile (2 rows of 3), 3 columns on desktop */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-3">
        {frames.map((frame) => (
          <figure
            key={frame.caption}
            className="group relative overflow-hidden rounded-xl border border-border shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#2e3f33]/40 hover:shadow-lg sm:rounded-2xl"
          >
            <div className="relative aspect-[3/4] w-full sm:aspect-auto sm:h-56 md:h-60">
              <Image
                src={frame.src}
                alt={frame.caption}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:640px) 33vw, (max-width:1024px) 33vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-2 sm:p-4 md:p-5">
              <p className="text-[8px] font-bold uppercase tracking-wider text-[#b49339] sm:text-[11px] sm:tracking-[0.16em] line-clamp-1">
                {frame.category}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold leading-tight text-white line-clamp-2 sm:mt-1 sm:text-sm sm:leading-snug md:text-base sm:line-clamp-none">
                {frame.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
