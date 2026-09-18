import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTABand({
  title = "Ready to talk through your GCC plans?",
  description = "Share a short brief a partner will map fit, timeline, and next steps. No sales theatre.",
  primaryHref = "/contact",
  primaryLabel = "Get a quick call",
  secondaryHref = "/engagement-models",
  secondaryLabel = "Compare engagement models",
  image = "/images/workspace-vibrant.jpg",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl px-6 py-10 text-white md:px-10 md:py-12">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={primaryHref} variant="gold" size="lg">
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              variant="outline"
              size="lg"
              className="border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
