import type { Navigation } from "@/models/navigation";
import { conceptLinks } from "./links";

export const navigation: Navigation = {
  logoAlt: "Fastship Africa",
  homeHref: conceptLinks.top,
  label: "Main",
  links: [
    { label: "Home", href: conceptLinks.top },
    { label: "About Us", href: conceptLinks.about },
    { label: "Shipping", href: conceptLinks.how },
    { label: "Vehicle Import", href: conceptLinks.more },
    { label: "Tracking", href: conceptLinks.track },
    { label: "Guides", href: conceptLinks.faq },
    { label: "Contact", href: conceptLinks.contact },
  ],
  logIn: { label: "Log in", href: conceptLinks.signIn },
  signUp: { label: "Sign up", href: conceptLinks.signUp },
  openMenuLabel: "Open menu",
  closeMenuLabel: "Close menu",
};
