import type { Faqs } from "@/models/faqs";
import { fastshipLinks } from "./links";

// Fastship's own questions and answers, word for word as in the approved design.
export const faqs: Faqs = {
  title: "Questions?",
  intro: {
    before: "The short answers. The rest are on the",
    link: { label: "full FAQ page", href: fastshipLinks.faqs },
    after: ".",
  },
  items: [
    {
      id: "track-shipment",
      question: "How do I track my shipment?",
      answer:
        "Track any shipment in real time on the tracking page. Enter your tracking ID to get live status updates from pickup to final delivery.",
    },
    {
      id: "lost-or-damaged",
      question: "What happens if a shipment is lost or damaged?",
      answer:
        "If your package is lost or damaged, contact the support team immediately and they will investigate and resolve the issue as quickly as possible.",
    },
    {
      id: "air-cargo",
      question: "What is Fastship air cargo shipping?",
      answer:
        "Fastship air cargo is another way to ship by air. It is a consolidated shipping option using airlines from and to Nigeria.",
    },
    {
      id: "can-i-track",
      question: "Can I track my shipment?",
      answer: "Yes. Fastship gives you tracking details so you can follow your shipment from dispatch to delivery.",
    },
    {
      id: "handling-fee",
      question: "What is a handling fee?",
      answer:
        "A handling fee covers processing, sorting, labelling and preparation of your cargo, so it ships safely and efficiently.",
    },
    {
      id: "what-items",
      question: "What items can be shipped by Fastship?",
      answer:
        "Fastship handles most personal and commercial goods, such as fashion items, cosmetics and dried food items, except restricted or prohibited items.",
    },
  ],
};
