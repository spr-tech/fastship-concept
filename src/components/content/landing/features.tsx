import Image from "next/image";
import Reveal from "@/components/ui/reveal/reveal";
import SnapCarousel from "@/components/ui/snapCarousel/snapCarousel";
import Text from "@/components/ui/typography/text";
import { features } from "@/data/features";
import { cn } from "@/utilities/helpers/cn";
import SupportBanner from "./supportBanner";

// One element per feature, restyled at lg: a swipeable card on phones and tablets (photo on top,
// text below), a photo card in the bento on desktop. Rendering the two layouts separately and hiding
// one made phones download every desktop photo, so it is one image per feature with sizes for both.
const WIDE_SIZES = "(min-width: 1024px) 800px, 82vw";
const CARD_SIZES = "(min-width: 1024px) 400px, 82vw";

// Photos zoom to 104% while their card is hovered.
const photoZoom =
  "object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:group-hover:scale-104";

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
        <Reveal>
          <Text variant="section" id="features-title">
            <span className="block">{features.title[0]}</span>{" "}
            <span className="block text-accent">{features.title[1]}</span>
          </Text>
        </Reveal>

        {/* Below lg: a row of cards that scrolls sideways and snaps, bleeding to the screen edges, with
            dots under it. From lg: the photo bento, and the dots are hidden. */}
        <SnapCarousel
          label={features.carousel.label}
          hint={features.carousel.hint}
          dotLabels={features.items.map((feature) => `${features.carousel.dotLabel} ${feature.title}`)}
          activeQuery="(max-width: 1023.98px)"
          scrollerClassName="mt-block -mx-5 snap-x snap-mandatory overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
          listClassName="flex gap-3 lg:grid lg:grid-cols-3"
          controlsClassName="lg:hidden"
        >
          {features.items.map((feature, index) => {
            const isWide = index === 0;
            return (
              <Reveal
                key={feature.title}
                as="li"
                index={index}
                className={cn(
                  "group relative isolate flex w-[82vw] max-w-md shrink-0 snap-start flex-col overflow-hidden rounded-card bg-ink-raised",
                  "lg:w-auto lg:max-w-none lg:justify-end",
                  isWide && "lg:col-span-2",
                  index < 2 ? "lg:min-h-76" : "lg:min-h-68",
                )}
              >
                <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden lg:absolute lg:inset-0 lg:-z-20 lg:aspect-auto">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    sizes={isWide ? WIDE_SIZES : CARD_SIZES}
                    // All lazy, the first card included: the section is well below the first screen, and an
                    // eager photo here was fetched alongside the fonts and CSS, slowing the first paint.
                    className={photoZoom}
                  />
                </div>
                {/* Darkens the bottom of the photo so the text on it stays readable. Desktop only. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 hidden bg-linear-to-b from-ink/0 from-25% via-ink/75 via-60% to-ink/95 lg:block"
                />
                <div className="min-w-0 p-4.5 lg:p-5.5">
                  <span aria-hidden="true" className="text-label font-bold tracking-[0.08em] text-accent-on-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 mb-1 text-title-sm leading-tight font-bold lg:text-title">{feature.title}</h3>
                  <p className="text-body leading-snug text-text-on-dark-muted lg:max-w-100 lg:text-text-on-dark">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </SnapCarousel>

        <SupportBanner />
      </div>
    </section>
  );
}
