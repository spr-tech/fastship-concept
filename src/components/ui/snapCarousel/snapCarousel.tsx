"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";

type SnapCarouselProps = {
  /** Names the scroll area for screen readers. */
  label: string;
  /** One label per item, for its dot, e.g. "Show Automated workflows". */
  dotLabels: string[];
  /** Small line under the dots, e.g. "Swipe to see more". */
  hint: string;
  /**
   * While this media query matches, the list is a carousel: the scroll area takes keyboard focus
   * and the dots work. Outside it the caller lays the list out some other way (a grid, say), and
   * should hide the controls with controlsClassName.
   */
  activeQuery?: string;
  scrollerClassName?: string;
  listClassName?: string;
  controlsClassName?: string;
  /** The items, each an <li>. */
  children: ReactNode;
};

/**
 * A row of cards that scrolls sideways with native overflow scrolling and CSS scroll-snap, plus
 * pagination dots. An IntersectionObserver marks the card that is mostly in view; each dot is a
 * button that scrolls to its card (smoothly, unless reduced motion is on).
 */
export default function SnapCarousel({
  label,
  dotLabels,
  hint,
  activeQuery = "all",
  scrollerClassName,
  listClassName,
  controlsClassName,
  children,
}: SnapCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarousel, setIsCarousel] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(activeQuery);
    const update = () => setIsCarousel(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [activeQuery]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const items = Array.from(listRef.current?.children ?? []);
    if (!isCarousel || !scroller || !items.length || typeof IntersectionObserver === "undefined") return;

    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
        let best = 0;
        items.forEach((item, index) => {
          if ((ratios.get(item) ?? 0) > (ratios.get(items[best]!) ?? 0)) best = index;
        });
        setActiveIndex(best);
      },
      { root: scroller, threshold: [0.25, 0.5, 0.75, 1] },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [isCarousel]);

  const handleDotClick = (index: number) => {
    const scroller = scrollerRef.current;
    const item = listRef.current?.children[index] as HTMLElement | undefined;
    if (!scroller || !item) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const padding = parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0;
    scroller.scrollTo({ left: item.offsetLeft - padding, behavior: isReduced ? "auto" : "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        // Focusable so keyboard users can scroll it with the arrow keys, but only while it is a carousel.
        tabIndex={isCarousel ? 0 : undefined}
        className={cn("relative", scrollerClassName)}
      >
        <ul ref={listRef} className={listClassName}>
          {children}
        </ul>
      </div>

      <div className={cn("mt-3 flex flex-col items-center gap-1", controlsClassName)}>
        <div className="flex items-center">
          {dotLabels.map((dotLabel, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={dotLabel}
                type="button"
                aria-label={dotLabel}
                aria-current={isActive ? "true" : undefined}
                onClick={() => handleDotClick(index)}
                className="flex min-h-11 min-w-6 cursor-pointer items-center justify-center px-1"
              >
                {/* The active dot is a wider orange pill. */}
                <span
                  className={cn(
                    "block h-2 rounded-full transition-colors duration-300",
                    isActive ? "w-6 bg-accent" : "w-2 bg-text-on-dark/30",
                  )}
                />
              </button>
            );
          })}
        </div>
        <p className="text-label text-text-on-dark-subtle">{hint}</p>
      </div>
    </div>
  );
}
