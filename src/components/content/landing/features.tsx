import Image from "next/image";
import Button from "@/components/ui/button/button";
import DesktopOnlyImage from "@/components/ui/image/desktopOnlyImage";
import Text from "@/components/ui/typography/text";
import { features } from "@/data/features";
import { cn } from "@/utilities/helpers/cn";

// One element per feature, restyled at 860px (the design's breakpoint): a compact row with an 88px
// thumbnail on phones, a photo card on desktop. Rendering the two layouts separately and hiding one
// made phones download every desktop photo, then reuse those big files for the thumbnails.
// The last value in each sizes list is the phone thumbnail: 148px, because the 5:3 photos are
// cropped to a square, so an 88px-tall crop needs about 148px of width. Desktop widths are in px, not
// vw: with a vw value Next drops every srcset width below 640 x that share, which took the
// thumbnail candidates out of the srcset.
const WIDE_SIZES = "(min-width: 860px) 800px, 148px";
const CARD_SIZES = "(min-width: 860px) 400px, 148px";

/** The ragged top edge that makes the dark section look torn from the page above. */
function TornEdge() {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="absolute -top-9.75 left-0 block h-10 w-full fill-ink"
    >
      <path d="M0 40 L0 22 L60 30 L130 14 L210 26 L290 10 L360 24 L450 16 L530 30 L610 12 L700 26 L780 18 L860 32 L950 14 L1030 26 L1120 10 L1200 24 L1290 16 L1370 28 L1440 18 L1440 40 Z" />
    </svg>
  );
}

export default function Features() {
  return (
    <section aria-labelledby="features-title" className="relative bg-ink text-text-on-dark">
      <TornEdge />
      <div className="mx-auto max-w-7xl px-5 py-section-lg md:px-8">
        <Text variant="section" id="features-title">
          <span className="block">{features.title[0]}</span>{" "}
          <span className="block text-accent">{features.title[1]}</span>
        </Text>

        <ul className="mt-block flex flex-col gap-2 min-[860px]:grid min-[860px]:grid-cols-3 min-[860px]:gap-3">
          {features.items.map((feature, index) => {
            const isWide = index === 0;
            return (
              <li
                key={feature.title}
                className={cn(
                  "relative isolate flex items-center gap-3.5 overflow-hidden rounded-card-sm bg-ink-raised py-2 pr-3 pl-2",
                  "min-[860px]:flex-col min-[860px]:items-stretch min-[860px]:justify-end min-[860px]:gap-0 min-[860px]:rounded-card min-[860px]:p-0",
                  isWide && "min-[860px]:col-span-2",
                  index < 2 ? "min-[860px]:min-h-76" : "min-[860px]:min-h-68",
                )}
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-field min-[860px]:absolute min-[860px]:inset-0 min-[860px]:-z-20 min-[860px]:size-auto min-[860px]:rounded-none">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    sizes={isWide ? WIDE_SIZES : CARD_SIZES}
                    className="object-cover"
                  />
                </div>
                {/* Darkens the bottom of the photo so the text on it stays readable. Desktop only. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 hidden bg-linear-to-b from-ink/0 from-25% via-ink/75 via-60% to-ink/95 min-[860px]:block"
                />
                <div className="min-w-0 min-[860px]:p-5.5">
                  <span aria-hidden="true" className="text-[11px] font-bold tracking-[0.08em] text-accent-on-dark min-[860px]:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-0.5 mb-1 text-lead leading-tight font-bold min-[860px]:my-1 min-[860px]:text-title">
                    {feature.title}
                  </h3>
                  <p className="text-body leading-snug text-text-on-dark-muted min-[860px]:max-w-100 min-[860px]:text-text-on-dark">
                    {feature.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <SupportBanner />
      </div>
    </section>
  );
}

function SupportBanner() {
  const { support } = features;

  return (
    <article className="mt-3 flex flex-wrap overflow-hidden rounded-card bg-accent text-ink">
      <div className="flex flex-[1_1_320px] flex-col justify-between gap-6 p-[clamp(1.5rem,3.2vw,2.5rem)]">
        <Text variant="stat">{support.stat}</Text>
        <div>
          <Text variant="titleLg" className="mb-1.5">{support.title}</Text>
          <p className="max-w-95 text-body font-medium">{support.description}</p>
          <Button text={support.cta.label} href={support.cta.href} variant="dark" size="md" className="mt-4.5" />
        </div>
      </div>
      {/* Desktop only, as in the design. DesktopOnlyImage stops phones downloading it at all. */}
      <div className="relative min-h-56 flex-[1_1_360px] max-[860px]:hidden">
        <DesktopOnlyImage
          src={support.image.src}
          alt={support.image.alt}
          hiddenBelow="(width < 860px)"
          sizes="(min-width: 1280px) 520px, 50vw"
        />
      </div>
    </article>
  );
}
