import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's built-in scale. Without this it would read our size tokens
// (text-display-hero, text-body, ...) as text colours, and a colour class like text-text-body would
// silently delete the size. Keep these lists in step with the @theme blocks in globals.css.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-hero",
        "display-auth",
        "display-closing",
        "display-section",
        "display-contact",
        "display-stat",
        "display-statement",
        "display-sm",
        "display-number",
        "display-step",
        "card-title-lg",
        "card-title",
        "band",
        "form-title",
        "title-lg",
        "title",
        "title-sm",
        "quote",
        "lead-lg",
        "lead",
        "body",
        "small",
        "label",
      ],
      radius: ["card-lg", "card", "card-sm", "field"],
      spacing: ["section-xs", "section-sm", "section-md", "section-lg", "section-xl", "block", "card"],
    },
  },
});

/** Joins class names and lets a later Tailwind class override an earlier one (px-4 then px-6 keeps px-6). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
