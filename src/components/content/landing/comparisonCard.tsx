import { carriers } from "@/data/carriers";
import { hero } from "@/data/hero";

const { comparison } = hero;

// The route and the dot share one viewBox, and the SVG scales evenly ("meet") instead of stretching.
// That keeps the dot on the line at any card width. The design stretched the line but moved the dot
// on a fixed 532px path, which only lined up when the card was exactly 580px wide.
const ROUTE = "M40 118 C 170 10, 360 10, 492 92";

function RouteGraphic() {
  return (
    <svg viewBox="0 0 532 150" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
      <path d={ROUTE} fill="none" strokeWidth="2" strokeDasharray="6 8" className="stroke-text-on-dark-subtle/40" />
      {/* Resting point: the top of the arc, turned along it. At the start of the route it would cover
          the "From" label, and this is where it stays for anyone with reduced motion. Part 10 sets it flying. */}
      <g transform="translate(265 34) rotate(-2)">
        <circle r="14" className="fill-accent" />
        <g transform="translate(-8 -8) scale(0.6667)" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </g>
      </g>
    </svg>
  );
}

/** The dark card beside the hero copy: a sample route and the five carriers being compared. */
export default function ComparisonCard() {
  return (
    <figure className="min-w-0 max-w-125 flex-[1_1_400px] rounded-card-lg bg-ink p-5 text-text-on-dark shadow-card">
      <figcaption className="sr-only">{comparison.label}</figcaption>

      <div className="relative h-32 overflow-hidden rounded-card-sm bg-ink-raised">
        <RouteGraphic />
        <p className="absolute bottom-3 left-4 text-label">
          <span className="block text-text-on-dark-subtle">{comparison.from.label}</span>
          <strong className="text-body">{comparison.from.value}</strong>
        </p>
        <p className="absolute right-4 bottom-3 text-right text-label">
          <span className="block text-text-on-dark-subtle">{comparison.to.label}</span>
          <strong className="text-body">{comparison.to.value}</strong>
        </p>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3 text-small">
        <strong>{comparison.title}</strong>
        <span className="text-text-on-dark-subtle">{comparison.meta}</span>
      </div>

      <ul className="mt-2.5 flex flex-col gap-1.5">
        {carriers.map((carrier) => (
          <li key={carrier.name} className="flex items-center gap-3 rounded-field bg-ink-raised px-3 py-2">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-bg text-[0.6875rem] font-bold text-ink"
            >
              {carrier.monogram}
            </span>
            <span className="flex-1 text-small font-semibold">{carrier.name}</span>
            {/* Placeholder bars where a quote would load. No prices are shown, because none are real. */}
            <span aria-hidden="true" className="h-2 w-19 rounded-md bg-ink-line" />
            <span aria-hidden="true" className="h-2 w-11 rounded-md bg-ink-line max-sm:hidden" />
          </li>
        ))}
      </ul>

      <p className="mt-2.5 flex items-center justify-between gap-3 rounded-field bg-accent px-3.5 py-3 text-small font-bold text-ink">
        <span>{comparison.trackingStrip.label}</span>
        <span>{comparison.trackingStrip.value}</span>
      </p>
    </figure>
  );
}
