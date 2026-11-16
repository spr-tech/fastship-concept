import type { Track } from "@/models/track";
import { fastshipLinks } from "./links";

export const track: Track = {
  title: "Track a shipment",
  intro: "Enter your tracking ID to see where your package is.",
  inputLabel: "Tracking ID",
  placeholder: "Your tracking ID",
  buttonText: "Track",
  note: "Tracking is turned off in this concept. Nothing is collected, stored or sent.",
  notice: {
    before: "Tracking isn’t connected in this concept.",
    link: { label: "Track on Fastship.Africa", href: fastshipLinks.tracking },
  },
};
