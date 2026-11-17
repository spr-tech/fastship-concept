import fastshipLogoLight from "@/assets/images/brand/fastship-logo-light.png";
import Badge from "@/components/ui/badge/badge";
import { navigation } from "@/data/navigation";
import type { SignIn } from "@/models/auth";
import { PanelHeading } from "./authParts";

const ROUTE = "M10 64 C 120 0, 300 0, 406 52";

/** Sample shipment card, desktop only. The route and dot scale together so the dot stays on the line. */
function TrackingCard({ card }: { card: SignIn["panel"]["card"] }) {
  return (
    <figure className="max-w-115 rounded-card bg-ink-raised p-5 max-lg:hidden">
      <figcaption className="sr-only">{card.label}</figcaption>
      <div aria-hidden="true">
        <div className="flex items-center justify-between text-small">
          <strong>{card.route}</strong>
          <Badge text={card.status} variant="accent" />
        </div>
        <svg viewBox="0 0 416 80" className="mt-2 block h-20 w-full" focusable="false">
          <path d={ROUTE} fill="none" strokeWidth="2" strokeDasharray="5 7" className="stroke-text-on-dark-subtle/40" />
          {/* Resting point at the top of the arc. Part 10 sets it moving. */}
          <circle cx="209" cy="15" r="11" className="fill-accent" />
        </svg>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink-line">
          {/* Part 10 grows this from the left. */}
          <div className="h-full w-[72%] rounded-full bg-accent" />
        </div>
        <div className="mt-2.5 flex justify-between text-label text-text-on-dark-subtle">
          <span>{card.start}</span>
          <span>{card.end}</span>
        </div>
      </div>
    </figure>
  );
}

export default function SignInPanel({ panel }: { panel: SignIn["panel"] }) {
  return (
    <>
      <PanelHeading
        logo={fastshipLogoLight}
        logoAlt={navigation.logoAlt}
        title={panel.title}
        secondLineClassName="text-accent"
        text={panel.text}
        textClassName="text-text-on-dark-muted"
      />
      <TrackingCard card={panel.card} />
    </>
  );
}
