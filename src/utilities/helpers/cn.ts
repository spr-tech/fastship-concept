import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Joins class names and lets a later Tailwind class override an earlier one (px-4 then px-6 keeps px-6). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
