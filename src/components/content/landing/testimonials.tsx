import { QuoteIcon } from "@/components/ui/icons/icons";
import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/utilities/helpers/cn";

// Alternating light and dark cards, each tilted a little the other way. --spot is the colour of the
// hover spotlight, and the avatar ring's offset matches the card so the ring floats clear of it.
const cardStyles = [
  {
    card: "border border-border bg-surface text-ink -rotate-1 [--spot:color-mix(in_oklab,var(--accent-subtle)_55%,transparent)]",
    avatar: "bg-ink text-text-on-dark ring-offset-surface",
    location: "text-text-muted",
  },
  {
    card: "bg-ink text-text-on-dark rotate-1 [--spot:color-mix(in_oklab,var(--surface)_12%,transparent)]",
    avatar: "bg-accent text-ink ring-offset-ink",
    location: "text-text-on-dark-subtle",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="mx-auto max-w-7xl px-5 pt-section-sm pb-section-lg md:px-8">
      <Reveal>
        <Text variant="section" id="testimonials-title">
          {testimonials.title}
        </Text>
      </Reveal>

      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {testimonials.items.map((testimonial, index) => {
          const style = cardStyles[index % cardStyles.length];
          return (
            <Reveal
              key={testimonial.name}
              as="figure"
              index={index}
              isPointerAware
              // On hover the card also straightens out of its tilt.
              className={cn("pointer-card group relative rounded-card-lg p-5.5 hover:rotate-0", style.card)}
            >
              {/* Scales up and twists a little while the card is hovered. */}
              <QuoteIcon
                size={28}
                className="text-accent transition-[scale,rotate] duration-350 ease-hover motion-safe:group-hover:scale-125 motion-safe:group-hover:-rotate-8"
              />
              <Text variant="quote" className="mt-3 mb-5">
                {testimonial.quote}
              </Text>
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-label font-bold ring-accent transition-shadow duration-300 motion-safe:group-hover:ring-2 motion-safe:group-hover:ring-offset-2",
                    style.avatar,
                  )}
                >
                  {testimonial.initials}
                </span>
                <span>
                  <strong className="block">{testimonial.name}</strong>
                  <span className={cn("text-small", style.location)}>{testimonial.location}</span>
                </span>
              </figcaption>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
