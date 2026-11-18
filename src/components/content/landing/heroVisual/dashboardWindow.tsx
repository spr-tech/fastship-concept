import Image from "next/image";
import type { CSSProperties } from "react";
import fastshipLogoLight from "@/assets/images/brand/fastship-logo-light.png";
import { BookIcon, ChatIcon, MapPinIcon, SearchIcon } from "@/components/ui/icons/icons";
import type { HeroVisual } from "@/models/hero";
import { cn } from "@/utilities/helpers/cn";

// One colour per status, in the order of the statuses in the data: booked, picked up, in transit, delivered.
const statusClasses = [
  "bg-ink-line text-text-on-dark-muted",
  "bg-accent/25 text-accent-on-dark",
  "bg-accent text-ink",
  "bg-text-on-dark text-ink",
];

// Destination pins on the route strip, matching the shipments' order. The first route carries the plane.
const ORIGIN = { x: 34, y: 64 };
const pins = [
  { x: 148, y: 24 },
  { x: 222, y: 46 },
  { x: 292, y: 20 },
];
const routePath = (pin: { x: number; y: number }) =>
  `M${ORIGIN.x} ${ORIGIN.y} Q ${(ORIGIN.x + pin.x) / 2} ${Math.min(ORIGIN.y, pin.y) - 34} ${pin.x} ${pin.y}`;

function Plane() {
  return <path d="M-8 -1.6 3 -1.6 8 0 3 1.6-8 1.6ZM-1 -1.6-5 -7-2.5 -7 3 -1.6ZM-1 1.6-5 7-2.5 7 3 1.6Z" className="fill-accent" />;
}

function RouteStrip({ origin, destinations }: { origin: string; destinations: string[] }) {
  const firstRoute = routePath(pins[0]!);
  return (
    <svg viewBox="0 0 320 84" className="block h-full w-full" preserveAspectRatio="xMidYMid meet" focusable="false">
      <g fill="none" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" className="stroke-text-on-dark-subtle">
        {pins.map((pin, index) => (
          <path key={pin.x} d={routePath(pin)} strokeOpacity={index === 0 ? 0.75 : 0.35} />
        ))}
      </g>
      {pins.map((pin, index) => (
        <g key={pin.x}>
          <circle cx={pin.x} cy={pin.y} r="3.5" className="fill-text-on-dark" />
          <text x={pin.x} y={pin.y + 14} textAnchor="middle" className="fill-text-on-dark-subtle text-[9px] font-semibold">
            {destinations[index]}
          </text>
        </g>
      ))}
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="5" className="fill-accent" />
      <text x={ORIGIN.x} y={ORIGIN.y + 15} textAnchor="middle" className="fill-accent-on-dark text-[9px] font-bold">
        {origin}
      </text>

      {/* SVG's own animateMotion keeps the plane on the line at any size. CSS can't pause it, so
          under reduced motion this plane is hidden and a resting one is shown instead. */}
      <g className="motion-reduce:hidden">
        <animateMotion path={firstRoute} dur="3.6s" repeatCount="indefinite" rotate="auto" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines="0.45 0 0.55 1" />
        <Plane />
      </g>
      <g transform="translate(92 34) rotate(-28)" className="motion-safe:hidden">
        <Plane />
      </g>
    </svg>
  );
}

/** A status pill whose labels sit in a column; --stage slides the right one into the window. */
function StatusPill({ statuses }: { statuses: string[] }) {
  return (
    <span className="h-5 w-19 shrink-0 overflow-hidden rounded-full">
      <span className="flex flex-col transition-[translate] duration-500 ease-hover [translate:0_calc(var(--stage)*-1.25rem)]">
        {statuses.map((status, index) => (
          <span key={status} className={cn("flex h-5 items-center justify-center text-mock font-semibold", statusClasses[index])}>
            {status}
          </span>
        ))}
      </span>
    </span>
  );
}

/** The back layer of the hero visual: a dark dashboard window with shipments moving along. */
export default function DashboardWindow({ dashboard }: { dashboard: HeroVisual["dashboard"] }) {
  return (
    <div className="flex overflow-hidden rounded-card-lg border border-ink-line bg-ink text-text-on-dark shadow-card">
      <div className="flex w-10 shrink-0 flex-col items-center gap-3.5 border-r border-ink-line bg-ink-raised py-3.5 lg:w-11">
        {/* The real logo file, cropped to its mark. */}
        <span className="relative block h-6 w-5 overflow-hidden">
          <Image src={fastshipLogoLight} alt="" fill sizes="72px" className="object-cover object-left" />
        </span>
        {[SearchIcon, MapPinIcon, BookIcon, ChatIcon].map((Icon, index) => (
          <span
            key={index}
            className={cn(
              "flex size-7 items-center justify-center rounded-lg",
              index === 0 ? "bg-ink-line text-accent-on-dark" : "text-text-on-dark-subtle",
            )}
          >
            <Icon size={14} />
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1 p-3 lg:p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-small font-bold">{dashboard.title}</span>
          <span className="flex h-7 min-w-0 items-center gap-1.5 rounded-full bg-ink-raised px-2.5 text-mock text-text-on-dark-subtle">
            <SearchIcon size={11} className="shrink-0" />
            <span className="truncate">{dashboard.search}</span>
          </span>
        </div>

        <div className="mt-2.5 flex gap-1">
          {dashboard.tabs.map((tab, index) => (
            <span
              key={tab}
              className={cn(
                "rounded-full px-2.5 py-1 text-mock font-semibold",
                index === 0 ? "bg-text-on-dark text-ink" : "text-text-on-dark-subtle",
              )}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="mt-2.5 h-18 rounded-field bg-ink-raised lg:h-20">
          <RouteStrip origin={dashboard.origin} destinations={dashboard.shipments.map((shipment) => shipment.to)} />
        </div>

        <ul className="mt-2 flex flex-col gap-1.5">
          {dashboard.shipments.map((shipment, index) => (
            <li
              key={shipment.to}
              // Each row reads its own step from the --row-N variable the motion wrapper sets.
              style={{ "--stage": `var(--row-${index})` } as CSSProperties}
              className="rounded-field bg-ink-raised px-2.5 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-8 shrink-0 items-center justify-center rounded-md bg-bg text-mock font-bold text-ink">
                  {shipment.carrier}
                </span>
                <span className="flex-1 truncate text-mock font-semibold">
                  {shipment.from} → {shipment.to}
                </span>
                <StatusPill statuses={dashboard.statuses} />
              </div>
              <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-ink-line">
                <span className="block h-full origin-left rounded-full bg-accent transition-[scale] duration-500 ease-hover [scale:calc((var(--stage)+1)/4)_1]" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
