type VehicleImportIllustrationProps = {
  /** Read by screen readers in place of the drawing. */
  label: string;
  /** Name on the map pin, e.g. "Lagos". */
  destination: string;
};

/** A car on a container ship, with a dashed route to a pin. */
export default function VehicleImportIllustration({ label, destination }: VehicleImportIllustrationProps) {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label={label} className="block size-full">
      <rect width="320" height="240" rx="18" className="fill-ink-raised" />

      <path
        d="M232 118 Q268 104 274 66"
        fill="none"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeDasharray="6 7"
        strokeLinecap="round"
        className="stroke-bg"
      />
      <path
        d="M274 30 C262 30 254 39 254 50 C254 64 274 80 274 80 C274 80 294 64 294 50 C294 39 286 30 274 30 Z"
        className="fill-accent"
      />
      <circle cx="274" cy="50" r="7" className="fill-ink-raised" />
      <text x="274" y="100" textAnchor="middle" className="fill-bg font-sans text-[12px] font-bold">
        {destination}
      </text>

      {/* The car */}
      <path
        d="M54 128 L120 128 L132 112 Q138 104 150 104 L184 104 Q196 104 204 114 L216 120 Q226 123 226 132 L226 140 L54 140 Z"
        fill="none"
        strokeWidth="3"
        strokeLinejoin="round"
        className="stroke-bg"
      />
      <path d="M140 112 L150 108 L184 108 L196 120 L140 120 Z" fillOpacity="0.18" className="fill-bg" />
      <circle cx="86" cy="142" r="11" strokeWidth="3" className="fill-ink-raised stroke-bg" />
      <circle cx="198" cy="142" r="11" strokeWidth="3" className="fill-ink-raised stroke-bg" />

      {/* Containers and the ship */}
      <rect x="40" y="154" width="64" height="26" rx="3" strokeOpacity="0.4" strokeWidth="2" className="fill-ink-line stroke-bg" />
      <rect x="110" y="154" width="64" height="26" rx="3" className="fill-accent" />
      <rect x="180" y="154" width="64" height="26" rx="3" strokeOpacity="0.4" strokeWidth="2" className="fill-ink-line stroke-bg" />
      <path d="M28 180 L262 180 L246 204 L44 204 Z" className="fill-accent" />
      <path
        d="M18 218 Q38 208 58 218 T98 218 T138 218 T178 218 T218 218 T258 218 T298 218"
        fill="none"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-bg"
      />
    </svg>
  );
}
