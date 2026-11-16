"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";
import { useInView } from "@/utilities/hooks/useInView";

type RevealElement = "div" | "section" | "article" | "header" | "li" | "ul" | "p";

type RevealProps = {
  as?: RevealElement;
  /** Position among siblings that reveal together. Each step waits 90ms, up to 4 steps. */
  index?: number;
  id?: string;
  className?: string;
  children: ReactNode;
};

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 4;
const DURATION_MS = 800;

/**
 * Turns on the hidden starting state for every reveal on the page. It only runs in the browser,
 * so without JavaScript nothing is ever hidden. Skipped for reduced motion and for browsers
 * without IntersectionObserver, where content simply stays visible.
 */
function markPageReady() {
  const root = document.documentElement;
  if (root.dataset.reveal === "ready") return;
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.dataset.reveal = "ready";
}

/** Fades its children in and up 32px the first time they scroll into view. Never hides them again. */
export default function Reveal({ as: Tag = "div", index = 0, id, className, children }: RevealProps) {
  const { ref, isInView } = useInView<HTMLElement>();
  const [isDone, setIsDone] = useState(false);
  const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;

  useEffect(() => {
    markPageReady();
  }, []);

  // Once the entrance has played, drop the reveal transition so a card's own hover lift
  // runs at its normal speed instead of inheriting the stagger delay.
  useEffect(() => {
    if (!isInView) return;
    const timer = window.setTimeout(() => setIsDone(true), DURATION_MS + delay + 100);
    return () => window.clearTimeout(timer);
  }, [isInView, delay]);

  const style = delay > 0 ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag
      ref={ref as never}
      id={id}
      style={style}
      className={cn("reveal", isInView && "is-in", isDone && "is-done", className)}
    >
      {children}
    </Tag>
  );
}
