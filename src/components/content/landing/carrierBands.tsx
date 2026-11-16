import Marquee from "@/components/ui/marquee/marquee";
import { carrierBands, carriers } from "@/data/carriers";

const bandText = "font-display text-band tracking-[1px]";

/** Two tilted bands scrolling in opposite directions. */
export default function CarrierBands() {
  return (
    // overflow-x-clip hides the bands' overhang without making the section a scroll container,
    // so the tilted edges can still show above and below.
    <section aria-label={carrierBands.label} className="relative h-34 overflow-x-clip">
      <Marquee
        label={carrierBands.statement.label}
        items={carrierBands.statement.items}
        direction="right"
        durationSeconds={32}
        className="absolute -inset-x-10 top-6 rotate-2 bg-ink py-3 text-text-on-dark"
        textClassName={bandText}
      />
      <Marquee
        label={carrierBands.carriersLabel}
        items={carriers.map((carrier) => carrier.wordmark)}
        direction="left"
        durationSeconds={26}
        className="absolute -inset-x-10 top-14 -rotate-2 bg-accent py-3 text-ink"
        textClassName={bandText}
      />
    </section>
  );
}
