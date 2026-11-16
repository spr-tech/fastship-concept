import egusi from "@/assets/images/food/egusi.jpeg";
import garri from "@/assets/images/food/garri.jpeg";
import palmOil from "@/assets/images/food/palm-oil.jpeg";
import snacks from "@/assets/images/food/snacks.jpeg";
import spices from "@/assets/images/food/spices.jpeg";
import yamFlour from "@/assets/images/food/yam-flour.jpeg";
import type { Services } from "@/models/services";
import { fastshipLinks } from "./links";

export const services: Services = {
  eyebrow: "More from Fastship",
  title: ["Not a business?", "We ship for you too."],
  airCargo: {
    badge: "Air cargo · Live",
    title: "Air cargo from Nigeria to the world",
    description: "Doorstep delivery, instant tracking and full insurance.",
    href: fastshipLinks.shipping,
    illustrationLabel: "Illustration: air cargo routes from Lagos to London, Dubai and New York",
    origin: "LOS",
    destinations: ["LHR", "DXB", "JFK"],
  },
  food: {
    kicker: "To the UK",
    title: "Send food home",
    description: "Send what home means to the people who miss it.",
    // The design links this card to its own section. Fastship has no food page to send people to,
    // so the card is left without a link rather than pointing at itself.
    itemsLabel: "What you can send",
    // Empty alt: each photo has its label printed right under it.
    items: [
      { label: "Palm oil", image: { src: palmOil, alt: "" } },
      { label: "Garri", image: { src: garri, alt: "" } },
      { label: "Yam flour", image: { src: yamFlour, alt: "" } },
      { label: "Egusi", image: { src: egusi, alt: "" } },
      { label: "Spices", image: { src: spices, alt: "" } },
      { label: "Snacks", image: { src: snacks, alt: "" } },
    ],
  },
  vehicle: {
    title: "Vehicle import",
    description: "Cars, trucks and equipment, sourced, shipped, cleared and delivered anywhere in Nigeria.",
    href: fastshipLinks.carImport,
    illustrationLabel: "Illustration: a car shipped by container vessel to Lagos",
    destination: "Lagos",
    steps: ["Source", "Ship", "Clear customs", "Deliver"],
  },
  customs: {
    title: "Customs help",
    description: "Shipping guides, HS (Harmonised System) code lookup and answers to common questions.",
    href: fastshipLinks.guides,
    illustrationLabel: "Illustration: a shipping document with an HS code and a cleared stamp",
    documentCode: "HS 0904.11",
    stamp: "CLEARED",
    topics: ["Shipping guides", "HS code lookup", "FAQs"],
  },
};
