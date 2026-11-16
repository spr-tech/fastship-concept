import type { Hero } from "@/models/hero";
import { conceptLinks } from "./links";

export const hero: Hero = {
  badge: "Demo available on request",
  title: ["Stop managing couriers.", "Start running a system."],
  intro:
    "Fastship.Africa gives you direct access to DHL, FedEx, UPS, Aramex and GIG through one platform. Compare, book and track every shipment from a single dashboard.",
  primaryCta: { label: "Get a shipping quote", href: conceptLinks.signUp },
  secondaryCta: { label: "Request a demo", href: conceptLinks.contact },
  checks: ["Doorstep pickup", "Tracking ID issued instantly", "Full insurance"],
  comparison: {
    label: "Example: comparing five carriers for a 2 kg package from Lagos to London.",
    from: { label: "From", value: "Lagos, NG" },
    to: { label: "To", value: "London, UK" },
    title: "Comparing 5 carriers",
    meta: "Package · 2 kg",
    trackingStrip: { label: "Tracking ID", value: "Issued instantly" },
  },
};
