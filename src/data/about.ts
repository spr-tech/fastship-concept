import courierWithVan from "@/assets/images/photos/courier-with-van.webp";
import type { About } from "@/models/about";

export const about: About = {
  title: "Your logistics shouldn’t depend on multiple systems.",
  intro:
    "Built for businesses that move goods across borders and need reliability, speed and control at scale. Instead of juggling three things for every carrier, you run one system.",
  image: {
    src: courierWithVan,
    alt: "A Fastship courier holding a parcel beside a delivery van",
  },
  problems: [
    {
      title: "Courier providers",
      description: "Every carrier has its own rates, rules and booking flow.",
    },
    {
      title: "Accounts",
      description: "A separate login, invoice and support line for each one.",
    },
    {
      title: "Processes",
      description: "Tracking split across five websites and a spreadsheet.",
    },
  ],
  statement: [
    "We don’t just connect you to couriers.",
    "We give you the infrastructure to run logistics properly.",
  ],
};
