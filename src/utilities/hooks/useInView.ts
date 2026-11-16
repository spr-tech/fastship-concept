import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Share of the element that must be on screen before it counts as seen. */
  threshold?: number;
  /** Grows or shrinks the viewport box, e.g. "0px 0px -10% 0px" to trigger a little before the bottom edge. */
  rootMargin?: string;
};

/**
 * Reports once that an element has scrolled into view, then stops watching it.
 * Firing once is deliberate: content that faded out again on the way back up was rejected in review.
 */
export function useInView<T extends Element>({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    // Without the observer, isInView stays false. Reveal never hides anything in that case.
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
