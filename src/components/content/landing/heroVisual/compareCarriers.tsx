import { carriers } from "@/data/carriers";
import type { HeroVisual } from "@/models/hero";
import { cn } from "@/utilities/helpers/cn";

/** A placeholder bar where a quote would load, with a highlight sweeping across it. No prices: none are real. */
function ShimmerBar({ delayMs }: { delayMs: number }) {
  return (
    <span className="relative h-1.5 w-12 overflow-hidden rounded-full bg-ink/10">
      <span
        className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-surface to-transparent"
        style={{ animationDelay: `${delayMs}ms` }}
      />
    </span>
  );
}

/**
 * Front-right layer of the hero visual: frosted glass, so the dashboard shows softly through it.
 * A soft orange highlight moves from carrier to carrier (--carrier, set by the motion wrapper) and
 * the button's label slides to match. On phones the blur is dropped for a near-solid card.
 */
export default function CompareCarriers({ compare, className }: { compare: HeroVisual["compare"]; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-card border border-surface/70 bg-surface/95 p-3 text-ink shadow-card lg:bg-surface/70 lg:backdrop-blur-xl lg:backdrop-saturate-150",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-label font-bold">{compare.title}</span>
        <span className="rounded-full bg-ink/8 px-2 py-0.5 text-mock font-bold">{compare.weight}</span>
      </div>

      <div className="relative mt-2">
        {/* Rows are 2rem tall, so the highlight steps down 2rem per carrier. */}
        <span className="absolute inset-x-0 top-0 h-8 rounded-field bg-accent/15 ring-1 ring-accent/40 transition-[translate] duration-500 ease-hover [translate:0_calc(var(--carrier)*2rem)]" />
        <ul className="relative">
          {carriers.map((carrier, index) => (
            <li key={carrier.name} className="flex h-8 items-center gap-2 px-1.5">
              <span className="flex h-5 w-8 shrink-0 items-center justify-center rounded-md bg-ink text-mock font-bold text-text-on-dark">
                {carrier.monogram}
              </span>
              <span className="flex-1 truncate text-mock font-semibold">{carrier.shortName}</span>
              <ShimmerBar delayMs={index * 180} />
            </li>
          ))}
        </ul>
      </div>

      <span className="mt-2 flex h-8 items-center justify-center overflow-hidden rounded-full bg-ink text-mock font-bold text-text-on-dark">
        <span className="flex h-5 flex-col overflow-hidden">
          <span className="flex flex-col transition-[translate] duration-500 ease-hover [translate:0_calc(var(--carrier)*-1.25rem)]">
            {carriers.map((carrier) => (
              <span key={carrier.name} className="flex h-5 items-center justify-center">
                {compare.bookLabel} {carrier.shortName}
              </span>
            ))}
          </span>
        </span>
      </span>
    </div>
  );
}
