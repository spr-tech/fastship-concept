type AirCargoIllustrationProps = {
  /** Read by screen readers in place of the drawing. */
  label: string;
  origin: string;
  /** Three airport codes, drawn top to bottom. */
  destinations: string[];
};

// Destination pins and where each code label sits, matching the three routes below.
const pins = [
  { cx: 252, cy: 62, labelY: 44 },
  { cx: 268, cy: 132, labelY: 114 },
  { cx: 236, cy: 196, labelY: 222 },
];

/** Dashed air routes from Lagos to three destinations, with a plane on the first. */
export default function AirCargoIllustration({ label, origin, destinations }: AirCargoIllustrationProps) {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label={label} className="block size-full">
      <defs>
        <pattern id="air-cargo-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" className="fill-bg" fillOpacity="0.14" />
        </pattern>
      </defs>
      <rect width="320" height="240" rx="18" className="fill-ink" />
      <rect width="320" height="240" rx="18" fill="url(#air-cargo-dots)" />

      <g fill="none" strokeWidth="2.5" strokeDasharray="6 7" strokeLinecap="round" className="stroke-bg">
        <path d="M78 176 Q150 40 252 62" strokeOpacity="0.7" />
        <path d="M78 176 Q190 108 268 132" strokeOpacity="0.45" />
        <path d="M78 176 Q170 214 236 196" strokeOpacity="0.45" />
      </g>

      <g transform="translate(168 84) rotate(-14)" className="fill-accent">
        <path d="M-22 0 L16 -3 Q24 0 16 3 Z" />
        <path d="M-4 -2 L-14 -18 L-7 -18 L7 -2 Z" />
        <path d="M-4 2 L-14 18 L-7 18 L7 2 Z" />
        <path d="M-19 -1 L-24 -10 L-19 -10 L-12 -1 Z" />
      </g>

      <g className="fill-bg font-sans text-[12px] font-bold">
        {pins.map((pin, index) => (
          <g key={pin.cx}>
            <circle cx={pin.cx} cy={pin.cy} r="6" />
            <text x={pin.cx} y={pin.labelY} textAnchor="middle">
              {destinations[index]}
            </text>
          </g>
        ))}
      </g>

      <circle cx="78" cy="176" r="16" className="fill-accent" fillOpacity="0.25" />
      <circle cx="78" cy="176" r="8" className="fill-accent" />
      <text x="78" y="212" textAnchor="middle" className="fill-accent font-sans text-[12px] font-bold">
        {origin}
      </text>
    </svg>
  );
}
