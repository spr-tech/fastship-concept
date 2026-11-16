import type { LinkItem } from "./shared";

export type FooterColumn = {
  title: string;
  links: LinkItem[];
};

export type Footer = {
  logoAlt: string;
  tagline: string;
  columns: FooterColumn[];
  /** Says again, at the bottom of the page, that this is an unofficial concept. */
  conceptNotice: string;
  wordmark: string;
};
