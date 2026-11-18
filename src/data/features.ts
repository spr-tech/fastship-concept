import automatedWorkflows from "@/assets/images/features/automated-workflows.webp";
import dashboard from "@/assets/images/features/dashboard.webp";
import doorstep from "@/assets/images/features/doorstep.webp";
import international from "@/assets/images/features/international.webp";
import multiCarrier from "@/assets/images/features/multi-carrier.webp";
import supportAgent from "@/assets/images/photos/support-agent.webp";
import type { Features } from "@/models/features";
import { conceptLinks, fastshipLinks } from "./links";

// Feature photos have empty alt text: each sits under its own title, so describing the photo
// would only repeat the heading to screen reader users.
export const features: Features = {
  title: ["Everything you need,", "in one platform"],
  items: [
    {
      title: "Multi-carrier integration",
      description: "Compare and book DHL, FedEx, UPS, Aramex and GIG in one place.",
      image: { src: multiCarrier, alt: "" },
    },
    {
      title: "Unified dashboard for all shipments",
      description: "Every shipment from every carrier, in one view.",
      image: { src: dashboard, alt: "" },
    },
    {
      title: "Doorstep pickup and delivery",
      description: "We collect from your door and deliver to theirs.",
      image: { src: doorstep, alt: "" },
    },
    {
      title: "International shipping coverage",
      description: "Ship from Nigeria to destinations around the world.",
      image: { src: international, alt: "" },
    },
    {
      title: "Automated workflows",
      description: "Tracking IDs and status updates happen without the busywork.",
      image: { src: automatedWorkflows, alt: "" },
    },
  ],
  support: {
    eyebrow: "Support · 24/7",
    stat: "24/7",
    title: "Dedicated support team",
    description: "Technical and logistical assistance from experts, any time of day.",
    cta: { label: "Talk to support", href: conceptLinks.contact },
    // The same addresses as the contact section.
    channels: [
      { label: "WhatsApp", href: fastshipLinks.whatsApp, icon: "chat" },
      { label: "Email", href: fastshipLinks.email, icon: "mail" },
      { label: "Call", href: fastshipLinks.phone, icon: "phone" },
    ],
    image: { src: supportAgent, alt: "A Fastship support agent working at a laptop" },
    // Illustrative only.
    chat: {
      question: "Where’s my package to London?",
      agent: "Fastship Support",
      reply: "It landed at LHR this morning and it’s out for delivery today.",
    },
  },
};
