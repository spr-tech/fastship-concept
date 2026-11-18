import Image from "next/image";
import type { ReactNode } from "react";
import Badge from "@/components/ui/badge/badge";
import { ArrowRightIcon, BookIcon, CarIcon } from "@/components/ui/icons/icons";
import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { services } from "@/data/services";
import { cn } from "@/utilities/helpers/cn";
import AirCargoIllustration from "./illustrations/airCargoIllustration";
import CustomsIllustration from "./illustrations/customsIllustration";
import VehicleImportIllustration from "./illustrations/vehicleImportIllustration";

type CardTone = "accent" | "surface" | "ink" | "muted";

const toneClasses: Record<CardTone, { card: string; description: string; arrow: string }> = {
  accent: { card: "bg-accent text-ink", description: "font-medium", arrow: "bg-ink text-text-on-dark" },
  surface: { card: "border border-border bg-surface text-ink", description: "text-text-body", arrow: "bg-ink text-text-on-dark" },
  ink: { card: "bg-ink text-text-on-dark", description: "text-text-on-dark-muted", arrow: "bg-accent text-ink" },
  muted: { card: "bg-surface-muted text-ink", description: "text-text-body", arrow: "bg-ink text-text-on-dark" },
};

type ServiceCardProps = {
  tone: CardTone;
  /** Position in the row, for the staggered scroll reveal. */
  index: number;
  title: string;
  description: string;
  /** Without one the card has no link and no arrow, so it doesn't look clickable. */
  href?: string;
  /** Badge or icon in the top-left corner. */
  corner: ReactNode;
  children: ReactNode;
};

/**
 * The link sits on the title and stretches over the whole card with ::after. The whole card stays
 * clickable, but the link's accessible name is just the title, not every word and drawing inside it.
 */
function ServiceCard({ tone, index, title, description, href, corner, children }: ServiceCardProps) {
  const classes = toneClasses[tone];

  return (
    <Reveal
      as="article"
      index={index}
      className={cn(
        "group lift relative flex min-h-60 flex-col justify-between rounded-card-lg p-5",
        classes.card,
        href && "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ink",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {corner}
        {href && (
          <span aria-hidden="true" className={cn(
              // Turns from a right arrow into an up-right arrow while the card is hovered.
              "flex size-11 shrink-0 items-center justify-center rounded-full transition-[rotate] duration-300 motion-safe:group-hover:-rotate-45",
              classes.arrow,
            )}>
            <ArrowRightIcon size={18} />
          </span>
        )}
      </div>

      {children}

      <div>
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
    </Reveal>
  );
}

function IllustrationFrame({ children }: { children: ReactNode }) {
  return <div className="mx-auto mt-4 aspect-4/3 h-36 max-w-full overflow-hidden rounded-card-sm">{children}</div>;
}

export default function Services() {
  const { airCargo, food, vehicle, customs } = services;

  return (
    <section id="more" aria-labelledby="more-title" className="mx-auto max-w-7xl px-5 pt-section-xl pb-section-md md:px-8">
      <Reveal>
        <Text variant="eyebrow" tone="accent">
          {services.eyebrow}
        </Text>
        <Text variant="section" id="more-title" className="mt-2.5">
          <span className="block">{services.title[0]}</span>{" "}
          <span className="block">{services.title[1]}</span>
        </Text>
      </Reveal>

      <div className="mt-block grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
        <ServiceCard
          tone="accent"
          index={0}
          title={airCargo.title}
          description={airCargo.description}
          href={airCargo.href}
          corner={<Badge text={airCargo.badge} variant="outline" />}
        >
          <div className="mx-auto my-4 aspect-4/3 h-36 max-w-full overflow-hidden rounded-card-sm">
            <AirCargoIllustration
              label={airCargo.illustrationLabel ?? ""}
              origin={airCargo.origin}
              destinations={airCargo.destinations}
            />
          </div>
        </ServiceCard>

        <ServiceCard
          tone="surface"
          index={1}
          title={food.title}
          description={food.description}
          href={food.href}
          corner={<span className="text-label font-bold text-accent-text">{food.kicker}</span>}
        >
          <ul aria-label={food.itemsLabel} className="my-4 grid grid-cols-3 gap-2">
            {food.items.map((item) => (
              <li key={item.label} className="flex flex-col gap-1.5">
                <div className="relative aspect-square overflow-hidden rounded-field">
                  {/* At most about 100px wide (three across a phone-width card), so 110px covers it. */}
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="110px" className="object-cover" />
                </div>
                <span className="text-label font-semibold">{item.label}</span>
              </li>
            ))}
          </ul>
        </ServiceCard>

        <ServiceCard
          tone="ink"
          index={2}
          title={vehicle.title}
          description={vehicle.description}
          href={vehicle.href}
          corner={<CarIcon size={36} className="text-accent" />}
        >
          <div>
            <IllustrationFrame>
              <VehicleImportIllustration label={vehicle.illustrationLabel ?? ""} destination={vehicle.destination} />
            </IllustrationFrame>
            <ol className="my-4 flex flex-wrap gap-1.5">
              {vehicle.steps.map((step, index) => (
                <Badge key={step} as="li" variant="dark" text={`${index + 1} ${step}`} />
              ))}
            </ol>
          </div>
        </ServiceCard>

        <ServiceCard
          tone="muted"
          index={3}
          title={customs.title}
          description={customs.description}
          href={customs.href}
          corner={<BookIcon size={36} className="text-accent-text" />}
        >
          <div>
            <IllustrationFrame>
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
      </div>
    </section>
  );
}
