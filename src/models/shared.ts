import type { StaticImageData } from "next/image";

export type LinkItem = {
  label: string;
  href: string;
};

/** The message shown after pressing a button that isn't connected in this concept. */
export type DemoMessage = {
  before: string;
  link: LinkItem;
  after?: string;
};

/** A sentence with one link in the middle, e.g. "The rest are on the [full FAQ page]." */
export type LinkedSentence = {
  before: string;
  link: LinkItem;
  after: string;
};

export type ImageItem = {
  src: StaticImageData;
  /** Empty when the image is decorative and the text next to it says everything. */
  alt: string;
};

/** A heading drawn on two lines, where the second line usually takes the accent colour. */
export type TwoLineHeading = [string, string];
