import type { Testimonials } from "@/models/testimonials";

// Fastship's own customer quotes, kept as their customers wrote them. Only typos and the brand
// name are fixed.
export const testimonials: Testimonials = {
  title: "What our customers say",
  items: [
    {
      quote:
        "Fastship has been a game changer for us. Their service is always on time and hassle-free. We couldn’t ask for a more reliable partner!",
      name: "Ade A.",
      initials: "AA",
      location: "Lagos",
    },
    {
      quote:
        "Sending parcels used to be a hassle, but with Fastship, it’s now effortless and smooth, fast and reliable.",
      name: "Favour O.",
      initials: "FO",
      location: "Jos",
    },
    {
      quote:
        "Your commitment to excellence and attention to detail is greatly appreciated. Thank you for your consistent, top-tier service!",
      name: "Daniel I.",
      initials: "DI",
      location: "Abuja",
    },
  ],
};
