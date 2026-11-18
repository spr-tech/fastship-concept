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
  // Illustrative only: sample routes and the order a shipment moves through. No prices, counts or stats.
  visual: {
    label:
      "Illustration of the Fastship dashboard: shipments from Lagos and Abuja to London, Dubai and New York moving from booked to delivered, a phone tracking a parcel to London, and a card comparing DHL, FedEx, UPS, Aramex and GIG.",
    dashboard: {
      title: "Shipments",
      search: "Search tracking ID",
      tabs: ["All", "In transit", "Delivered"],
      statuses: ["Booked", "Picked up", "In transit", "Delivered"],
      origin: "LOS",
      shipments: [
        { from: "LOS", to: "LHR", carrier: "DHL" },
        { from: "LOS", to: "DXB", carrier: "ARX" },
        { from: "ABV", to: "JFK", carrier: "FDX" },
      ],
    },
    phone: {
      title: "Tracking",
      route: "LOS → LHR",
      status: "In transit",
      steps: ["Picked up, Lagos", "Departed Lagos", "Arrived London", "Delivered"],
    },
    compare: {
      title: "Compare carriers",
      weight: "2 kg",
      bookLabel: "Book with",
    },
  },
  comparison: {
    label: "Example: comparing five carriers for a 2 kg package from Lagos to London.",
    from: { label: "From", value: "Lagos, NG" },
    to: { label: "To", value: "London, UK" },
    title: "Comparing 5 carriers",
    meta: "Package · 2 kg",
    trackingStrip: { label: "Tracking ID", value: "Issued instantly" },
  },
};
