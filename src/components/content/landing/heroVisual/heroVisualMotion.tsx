"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

const TICK_MS = 1800;
const ROWS = 3;
const STATUSES = 4;
const TIMELINE_STEPS = 4;
const CARRIERS = 5;

/**
 * The resting state, rendered on the server and kept under reduced motion: one shipment in transit,
 * one delivered, one picked up, the phone at "Arrived London" and DHL highlighted.
 */
const restingState = {
  "--row-0": 2,
  "--row-1": 3,
  "--row-2": 1,
  "--timeline": 2,
  "--carrier": 0,
} as CSSProperties;

/** Each tick moves exactly one shipment row on a step, taking the rows in turn. */
function stateAt(tick: number) {
  const rows = Array.from({ length: ROWS }, (_, row) => {
    const step = Math.floor((tick - row) / ROWS);
    return ((step % STATUSES) + STATUSES) % STATUSES;
  });
  return {
    rows,
    timeline: Math.floor(tick / 2) % TIMELINE_STEPS,
    carrier: tick % CARRIERS,
  };
}

type HeroVisualMotionProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Drives the hero visual's loops by setting a few CSS custom properties on one element. The drawing
 * itself is server-rendered and reads them (status pills, progress bars, the phone timeline, the
 * carrier highlight), so nothing re-renders. Stops while the visual is off screen or the tab is
 * hidden, and never starts under reduced motion.
 */
export default function HeroVisualMotion({ className, children }: HeroVisualMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tick = 0;
    let timer = 0;
    let isVisible = true;

    const apply = () => {
      const state = stateAt(tick);
      state.rows.forEach((stage, row) => element.style.setProperty(`--row-${row}`, String(stage)));
      element.style.setProperty("--timeline", String(state.timeline));
      element.style.setProperty("--carrier", String(state.carrier));
      tick += 1;
    };

    const start = () => {
      if (timer || !isVisible || document.hidden) return;
      timer = window.setInterval(apply, TICK_MS);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = !!entry?.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    observer.observe(element);

    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div ref={ref} style={restingState} className={className}>
      {children}
    </div>
  );
}
