import { getImageProps, type StaticImageData } from "next/image";
import { cn } from "@/utilities/helpers/cn";

// A 1×1 transparent GIF (43 bytes, inline, never fetched).
const BLANK_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

type DesktopOnlyImageProps = {
  src: StaticImageData;
  alt: string;
  /** Media query for the screens that should NOT get the photo, e.g. "(width < 768px)". */
  hiddenBelow: string;
  sizes: string;
  className?: string;
};

/**
 * A photo that only desktop screens download. Hiding a normal next/image with display: none
 * isn't enough: Chrome still fetches it while scrolling. Here, on small screens the <picture>
 * picks a blank inline pixel, so the photo is never requested.
 *
 * Uses next/image's getImageProps (Next's documented art-direction pattern), so the photo still
 * gets the optimised srcset. That's why this is the one raw <img> in the project.
 */
export default function DesktopOnlyImage({ src, alt, hiddenBelow, sizes, className }: DesktopOnlyImageProps) {
  const { props } = getImageProps({ src, alt, sizes, fill: true });

  return (
    <picture>
      <source media={hiddenBelow} srcSet={BLANK_PIXEL} />
      <img {...props} alt={alt} className={cn("object-cover", className)} />
    </picture>
  );
}
