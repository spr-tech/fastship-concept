import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import Badge from "@/components/ui/badge/badge";
import { ArrowRightIcon, BookIcon, CarIcon } from "@/components/ui/icons/icons";
import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { services } from "@/data/services";
import type { ServiceDetails } from "@/models/services";
import { cn } from "@/utilities/helpers/cn";
import AirCargoIllustration from "./illustrations/airCargoIllustration";
import CustomsIllustration from "./illustrations/customsIllustration";
import VehicleImportIllustration from "./illustrations/vehicleImportIllustration";

type CardTone = "accent" | "surface" | "ink" | "muted";

// --spot is the hover spotlight's colour. The details panel is dark glass on the light cards and
// light glass on the dark one.
const toneClasses: Record<CardTone, { card: string; description: string; arrow: string; details: string; detailsLink: string }> = {
  accent: {
    card: "bg-accent text-ink [--spot:color-mix(in_oklab,var(--surface)_30%,transparent)]",
    description: "font-medium",
    arrow: "bg-ink text-text-on-dark",
    details: "bg-ink/80 text-text-on-dark",
    detailsLink: "text-accent-on-dark",
  },
  surface: {
    card: "border border-border bg-surface text-ink [--spot:color-mix(in_oklab,var(--accent-subtle)_55%,transparent)]",
    description: "text-text-body",
    arrow: "bg-ink text-text-on-dark",
    details: "bg-ink/80 text-text-on-dark",
    detailsLink: "text-accent-on-dark",
  },
  ink: {
    card: "bg-ink text-text-on-dark [--spot:color-mix(in_oklab,var(--surface)_12%,transparent)]",
    description: "text-text-on-dark-muted",
    arrow: "bg-accent text-ink",
    details: "bg-surface/85 text-ink",
    detailsLink: "text-accent-text",
  },
  muted: {
    card: "bg-surface-muted text-ink [--spot:color-mix(in_oklab,var(--surface)_55%,transparent)]",
    description: "text-text-body",
    arrow: "bg-ink text-text-on-dark",
    details: "bg-ink/80 text-text-on-dark",
    detailsLink: "text-accent-on-dark",
  },
};

type ServiceCardProps = {
  tone: CardTone;
  /** Position in the row, for the staggered scroll reveal. */
  index: number;
  title: string;
  description: string;
  details: ServiceDetails;
  /** Without one the card has no link and no arrow, so it doesn't look clickable. */
  href?: string;
  /** Badge or icon in the top-left corner. */
  corner: ReactNode;
  children: ReactNode;
};

/**
 * The link sits on the title and stretches over the whole card with ::after. The whole card stays
 * clickable, but the link's accessible name is just the title, not every word and drawing inside it.
 * The details panel sits above that stretched link, so its own link can be clicked too.
 */
function ServiceCard({ tone, index, title, description, details, href, corner, children }: ServiceCardProps) {
  const classes = toneClasses[tone];

  return (
    <Reveal
      as="article"
      index={index}
      isPointerAware
      className={cn(
        "service-card pointer-card group relative flex h-full min-h-60 flex-col rounded-card-lg p-5",
        classes.card,
        href && "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ink",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {corner}
        {href && (
          <span
            aria-hidden="true"
            className={cn(
              // Turns from a right arrow into an up-right arrow while the card is hovered.
              "flex size-11 shrink-0 items-center justify-center rounded-full transition-[rotate] duration-350 ease-hover motion-safe:group-hover:-rotate-45",
              classes.arrow,
            )}
          >
            <ArrowRightIcon size={18} />
          </span>
        )}
      </div>

      {children}

      <div className="mt-auto">
        <Text variant="cardTitleLg" className="mb-1.5">
          {href ? (
            <a href={href} className="after:absolute after:inset-0 after:rounded-card-lg focus-visible:shadow-none focus-visible:outline-none">
              {title}
            </a>
          ) : (
            title
          )}
        </Text>
        <Text variant="body" className={classes.description}>
          {description}
        </Text>
      </div>

      {/* Inside the card on phones; slides up over the lower part on desktop hover (see globals.css). */}
      <div className={cn("service-details relative z-2 mt-4 rounded-field p-4 backdrop-blur-md lg:p-5", classes.details)}>
        <p className="text-small font-bold">{details.title}</p>
        <p className="mt-1 text-small opacity-85">{details.text}</p>
        {details.link && (
          <a
            href={details.link.href}
            className={cn("mt-1 inline-flex min-h-11 items-center gap-1.5 text-small font-bold hover:underline", classes.detailsLink)}
          >
            {details.link.label}
            <ArrowRightIcon size={14} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

/** Caps the drawings at 144px tall, so the cards stay compact. The drawing zooms a little on hover. */
function IllustrationFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto aspect-4/3 h-36 max-w-full overflow-hidden rounded-card-sm", className)}>
      <div className="hover-zoom size-full">{children}</div>
    </div>
  );
}

export default function Services() {
  const { airCargo, food, vehicle, customs } = services;

  return (
    // On desktop the section is tall and its inner area pins, so the stacked cards can spread out
    // while it scrolls by (see "Not a business?" cards in globals.css).
    <section id="more" aria-labelledby="more-title" className="stack-section pt-section-xl pb-section-md">
      <div className="stack-pin mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <Text variant="eyebrow" tone="accent">
            {services.eyebrow}
          </Text>
          <Text variant="section" id="more-title" className="mt-2.5">
            <span className="block">{services.title[0]}</span>{" "}
            <span className="block">{services.title[1]}</span>
          </Text>
        </Reveal>

        <ul className="mt-block grid grid-cols-1 gap-3 lg:grid-cols-4">
          <li className="stack-item">
            <ServiceCard
              tone="accent"
              index={0}
              title={airCargo.title}
              description={airCargo.description}
              details={airCargo.details}
              href={airCargo.href}
              corner={<Badge text={airCargo.badge} variant="outline" />}
            >
              <IllustrationFrame className="my-4">
                <AirCargoIllustration
                  label={airCargo.illustrationLabel ?? ""}
                  origin={airCargo.origin}
                  destinations={airCargo.destinations}
                />
              </IllustrationFrame>
            </ServiceCard>
          </li>

          <li className="stack-item">
            <ServiceCard
              tone="surface"
              index={1}
              title={food.title}
              description={food.description}
              details={food.details}
              href={food.href}
              corner={<span className="text-label font-bold text-accent-text">{food.kicker}</span>}
            >
              <ul aria-label={food.itemsLabel} className="my-4 grid grid-cols-3 gap-2">
                {food.items.map((item, itemIndex) => (
                  <li key={item.label} className="flex flex-col gap-1.5">
                    <div className="relative aspect-square overflow-hidden rounded-field">
                      {/* At most about 100px wide (three across a phone-width card), so 110px covers it.
                          On hover the photos zoom one after another. */}
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="110px"
                        style={{ "--zoom-delay": `${itemIndex * 60}ms` } as CSSProperties}
                        className="hover-zoom object-cover"
                      />
                    </div>
                    <span className="text-label font-semibold">{item.label}</span>
                  </li>
                ))}
              </ul>
            </ServiceCard>
          </li>

          <li className="stack-item">
            <ServiceCard
              tone="ink"
              index={2}
              title={vehicle.title}
              description={vehicle.description}
              details={vehicle.details}
              href={vehicle.href}
              corner={<CarIcon size={36} className="text-accent" />}
            >
              <div>
                <IllustrationFrame className="mt-4">
                  <VehicleImportIllustration label={vehicle.illustrationLabel ?? ""} destination={vehicle.destination} />
                </IllustrationFrame>
                <ol className="my-4 flex flex-wrap gap-1.5">
                  {vehicle.steps.map((step, stepIndex) => (
                    <Badge key={step} as="li" variant="dark" text={`${stepIndex + 1} ${step}`} />
                  ))}
                </ol>
              </div>
            </ServiceCard>
          </li>

          <li className="stack-item">
            <ServiceCard
              tone="muted"
              index={3}
              title={customs.title}
              description={customs.description}
              details={customs.details}
              href={customs.href}
              corner={<BookIcon size={36} className="text-accent-text" />}
            >
              <div>
                <IllustrationFrame className="mt-4">
                  <CustomsIllustration
                    label={customs.illustrationLabel ?? ""}
                    documentCode={customs.documentCode}
                    stamp={customs.stamp}
                  />
                </IllustrationFrame>
                <ul className="my-4 flex flex-wrap gap-1.5">
                  {customs.topics.map((topic) => (
                    <Badge key={topic} as="li" variant="light" text={topic} />
                  ))}
                </ul>
              </div>
            </ServiceCard>
          </li>
        </ul>
      </div>
    </section>
  );
}
