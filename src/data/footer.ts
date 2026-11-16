import type { Footer } from "@/models/footer";
import { conceptLinks, fastshipLinks } from "./links";
import { site } from "./site";

export const footer: Footer = {
  logoAlt: "Fastship Africa",
  tagline: "Powering logistics across borders.",
  columns: [
    {
      title: "Products",
      links: [
        { label: "Shipping", href: conceptLinks.how },
        { label: "Tracking", href: conceptLinks.track },
        { label: "Car import", href: conceptLinks.more },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Contact us", href: conceptLinks.contact },
        { label: "Guides", href: conceptLinks.faq },
        { label: "FAQs", href: fastshipLinks.faqs },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: fastshipLinks.privacyPolicy },
        { label: "Terms of service", href: fastshipLinks.termsOfService },
        { label: "HS code lookup", href: fastshipLinks.hsCode },
      ],
    },
  ],
  conceptNotice: site.conceptNotice,
  wordmark: "FASTSHIP",
};
