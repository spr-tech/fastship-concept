export type SiteInfo = {
  title: string;
  /** Applied to child pages' titles, e.g. "Sign in · Fastship.Africa redesign concept". */
  titleTemplate: string;
  description: string;
  /** The deployed address, so Open Graph and canonical URLs are absolute. */
  url: string;
  /** Shown in the banner at the top of every page, so nobody mistakes this for Fastship's site. */
  conceptNotice: string;
  pageTitles: {
    signIn: string;
    signUp: string;
  };
};
