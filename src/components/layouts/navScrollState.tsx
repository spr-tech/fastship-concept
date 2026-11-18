"use client";

import { useEffect, useRef } from "react";

/**
 * Tells the header whether the page is at the top. A 20px marker sits at the very top of the page;
 * while it's on screen <html> gets data-nav="top", and once it scrolls away data-nav="scrolled".
 * An IntersectionObserver, not a scroll listener, so nothing runs while scrolling.
 *
 * Without JavaScript the attribute is never set and the header stays a plain flat bar that scrolls
 * away with the page (see .site-header in globals.css).
 */
export default function NavScrollState() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marker = ref.current;
    const root = document.documentElement;
    if (!marker || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      root.dataset.nav = entry?.isIntersecting ? "top" : "scrolled";
    });
    observer.observe(marker);

    return () => {
      observer.disconnect();
      delete root.dataset.nav;
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-5 w-px" />;
}
