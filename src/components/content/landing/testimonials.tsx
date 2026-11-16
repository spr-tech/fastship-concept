import { QuoteIcon } from "@/components/ui/icons/icons";
import Text from "@/components/ui/typography/text";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/utilities/helpers/cn";

// Alternating light and dark cards, each tilted a little the other way.
const cardStyles = [
  {
    card: "border border-border bg-surface text-ink -rotate-1",
    avatar: "bg-ink text-text-on-dark",
    location: "text-text-muted",
  },
  {
    card: "bg-ink text-text-on-dark rotate-1",
    avatar: "bg-accent text-ink",
    location: "text-text-on-dark-subtle",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="mx-auto max-w-7xl px-5 pt-section-sm pb-section-lg md:px-8">
      <Text variant="section" id="testimonials-title">
        {testimonials.title}
      </Text>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {testimonials.items.map((testimonial, index) => {
          const style = cardStyles[index % cardStyles.length];
          return (
            <figure key={testimonial.name} className={cn("rounded-card-lg p-7", style.card)}>
              <QuoteIcon size={32} className="text-accent" />
              <Text variant="quote" className="mt-4 mb-6">
                {testimonial.quote}
              </Text>
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn("flex size-11 shrink-0 items-center justify-center rounded-full text-small font-bold", style.avatar)}
                >
                  {testimonial.initials}
                </span>
                <span>
                  <strong className="block">{testimonial.name}</strong>
                  <span className={cn("text-small", style.location)}>{testimonial.location}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
