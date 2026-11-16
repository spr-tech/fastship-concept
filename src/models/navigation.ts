import type { LinkItem } from "./shared";

export type Navigation = {
  logoAlt: string;
  homeHref: string;
  /** Accessible name of the <nav> landmark. */
  label: string;
  links: LinkItem[];
  logIn: LinkItem;
  signUp: LinkItem;
  openMenuLabel: string;
  closeMenuLabel: string;
};
