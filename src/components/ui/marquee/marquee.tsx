import type { CSSProperties } from "react";
import { cn } from "@/utilities/helpers/cn";

type MarqueeProps = {
  items: string[];
  /** Read once by screen readers, in place of the moving text. */
  label: string;
  /** "right" plays the loop backwards, so the text travels left to right. */
  direction?: "left" | "right";
  /** Seconds for one full loop. Lower is faster. */
  durationSeconds?: number;
  /** How many times the item list repeats inside each half of the loop, so it is wider than the screen. */
  repeat?: number;
  separator?: string;
  /** Colours, tilt and position of the band. */
  className?: string;
  /** Font of the moving text. */
  textClassName?: string;
};

/**
 * A band of text that scrolls forever. The track holds the text twice and slides by half its width,
 * so the loop has no visible seam. Hovering pauses it.
 */
export default function Marquee({
  items,
  label,
  direction = "left",
  durationSeconds = 26,
  repeat = 3,
  separator = " · ",
  className,
  textClassName,
}: MarqueeProps) {
  const sequence = Array.from({ length: repeat }, () => items.join(separator)).join(separator) + separator;

  const trackStyle: CSSProperties = {
    animationDuration: `${durationSeconds}s`,
    animationDirection: direction === "right" ? "reverse" : "normal",
  };

  return (
    <div className={cn("group overflow-hidden", className)}>
      <p className="sr-only">{label}</p>
      <div
        aria-hidden="true"
        style={trackStyle}
        className={cn(
          "flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]",
          textClassName,
        )}
      >
        <span className="pr-12">{sequence}</span>
        <span className="pr-12">{sequence}</span>
      </div>
    </div>
  );
}
