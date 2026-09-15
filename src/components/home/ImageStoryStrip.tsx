import Image from "next/image";

const frames = [
  {
    src: "/images/workspace-blue.webp",
    caption: "Premium GCC floors — ready before day one",
  },
  {
    src: "/images/talent-team.webp",
    caption: "Teams that feel like your enterprise culture",
  },
  {
    src: "/images/gcc-ops.png",
    caption: "Operations command — visible, governed, scalable",
  },
];

export function ImageStoryStrip() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {frames.map((frame) => (
        <figure
          key={frame.src}
          className="group relative overflow-hidden rounded-2xl border border-border shadow-sm"
        >
          <div className="relative h-52 md:h-56">
            <Image
              src={frame.src}
              alt={frame.caption}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">
            {frame.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
