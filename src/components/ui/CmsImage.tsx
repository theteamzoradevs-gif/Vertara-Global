import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const OPTIMIZED_HOSTS = new Set([
  "images.unsplash.com",
  "images.pexels.com",
  "cdn.pixabay.com",
]);

function canOptimize(src: string) {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    const url = new URL(src);
    return url.protocol === "https:" && OPTIMIZED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

type Props = Omit<ImageProps, "src"> & {
  src?: string | null;
};

export function CmsImage({ src, alt, className, fill, sizes, priority, ...props }: Props) {
  const imageSrc = typeof src === "string" ? src.trim() : "";
  if (!imageSrc) return null;

  if (canOptimize(imageSrc)) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        className={className}
        fill={fill}
        sizes={sizes}
        priority={priority}
        {...props}
      />
    );
  }

  return (
    // Native img for CMS hosts that are not in next.config image allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
