"use client";

import { useEffect } from "react";

// Only real pointers that can hover, and only for people who haven't turned motion off.
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Tells pointer-aware elements where the pointer is. One listener for the whole page: any element
 * with a data-pointer attribute gets these CSS custom properties while the pointer is over it.
 *
 * --pointer-x / --pointer-y   position inside the element, as a percentage (for spotlights)
 * --pointer-dx / --pointer-dy distance from the centre, from -1 to 1 (for tilts and parallax)
 *
 * The effects themselves are plain CSS in globals.css, so without JavaScript the elements simply
 * sit still. Renders nothing.
 */
export default function PointerEffects() {
  useEffect(() => {
    const media = window.matchMedia(QUERY);
    let current: HTMLElement | null = null;
    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const reset = (element: HTMLElement) => {
      element.style.setProperty("--pointer-dx", "0");
      element.style.setProperty("--pointer-dy", "0");
    };

    const update = () => {
      frame = 0;
      const event = lastEvent;
      if (!event) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-pointer]") : null;

      if (target !== current) {
        if (current) reset(current);
        current = target;
      }
      if (!target) return;

      const box = target.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      target.style.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
      target.style.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
      target.style.setProperty("--pointer-dx", (x * 2 - 1).toFixed(3));
      target.style.setProperty("--pointer-dy", (y * 2 - 1).toFixed(3));
    };

    // Batched to one style update per frame, however fast the pointer moves.
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const handleLeavePage = () => {
      if (current) reset(current);
      current = null;
    };

    const start = () => {
      document.addEventListener("pointermove", handleMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", handleLeavePage);
    };
    const stop = () => {
      document.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeavePage);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      handleLeavePage();
    };

    const handleChange = () => (media.matches ? start() : stop());
    handleChange();
    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
      stop();
    };
  }, []);

  return null;
}
