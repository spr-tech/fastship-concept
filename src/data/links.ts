// Every real Fastship address in one place. Pages this concept doesn't build link out to these.
export const fastshipLinks = {
  home: "https://fastship.africa",
  tracking: "https://fastship.africa/tracking",
  shipping: "https://fastship.africa/shipping",
  carImport: "https://fastship.africa/car-import",
  guides: "https://fastship.africa/guides",
  faqs: "https://fastship.africa/frequently-asked-questions",
  hsCode: "https://fastship.africa/hs-code",
  privacyPolicy: "https://fastship.africa/legal/privacy-policy",
  termsOfService: "https://fastship.africa/legal/terms-of-service",
  email: "mailto:support@fastshipafrica.com",
  whatsApp: "https://wa.me/2348164448168",
  phone: "tel:+2348164448168",
} as const;

// Routes and sections inside this concept. Sections are written "/#id" so they also work from other pages.
export const conceptLinks = {
  home: "/",
  top: "/#top",
  about: "/#about",
  how: "/#how",
  more: "/#more",
  track: "/#track",
  faq: "/#faq",
  contact: "/#contact",
  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;
