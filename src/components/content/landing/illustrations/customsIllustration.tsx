type CustomsIllustrationProps = {
  /** Read by screen readers in place of the drawing. */
  label: string;
  /** The code printed on the document, e.g. "HS 0904.11". */
  documentCode: string;
  /** The word on the stamp, e.g. "CLEARED". */
  stamp: string;
};

/** A shipping document with an HS code and a "cleared" stamp. */
export default function CustomsIllustration({ label, documentCode, stamp }: CustomsIllustrationProps) {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label={label} className="block size-full">
      <rect width="320" height="240" rx="18" className="fill-bg" />

      {/* The document */}
      <rect x="66" y="30" width="150" height="184" rx="12" strokeWidth="2.5" className="fill-surface stroke-ink" />
      <rect x="84" y="50" width="70" height="10" rx="5" className="fill-ink" />
      <g className="fill-border-strong">
        <rect x="84" y="74" width="112" height="7" rx="3.5" />
        <rect x="84" y="90" width="96" height="7" rx="3.5" />
        <rect x="84" y="106" width="104" height="7" rx="3.5" />
        <rect x="84" y="170" width="80" height="7" rx="3.5" />
        <rect x="84" y="186" width="60" height="7" rx="3.5" />
      </g>
      <rect x="84" y="128" width="96" height="28" rx="8" strokeWidth="2" className="fill-bg stroke-ink" />
      <text x="132" y="147" textAnchor="middle" className="fill-ink font-mono text-[12px] font-bold">
        {documentCode}
      </text>

      {/* The stamp */}
      <g transform="translate(226 162) rotate(-14)">
        <circle r="42" fillOpacity="0.85" strokeWidth="3" className="fill-bg stroke-accent-text" />
        <circle r="34" fill="none" strokeWidth="1.5" strokeDasharray="3 4" className="stroke-accent-text" />
        <text y="5" textAnchor="middle" letterSpacing="1" className="fill-accent-text font-display text-[17px]">
          {stamp}
        </text>
      </g>
    </svg>
  );
}
