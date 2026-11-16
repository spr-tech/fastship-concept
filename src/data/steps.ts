import type { HowItWorks } from "@/models/about";
import { conceptLinks } from "./links";

export const howItWorks: HowItWorks = {
  eyebrow: "How it works",
  title: ["Designed for speed.", "Built for scale."],
  cta: { label: "Request a demo", href: conceptLinks.contact },
  steps: [
    { title: "Input shipment details", description: "Create your shipment in seconds." },
    { title: "Access multiple options", description: "Instantly compare courier services across your route." },
    { title: "Book and dispatch", description: "Confirm and schedule pickup without friction." },
    { title: "Track end to end", description: "Stay informed until delivery is completed." },
  ],
};
