import type { ImageItem, LinkItem, TwoLineHeading } from "./shared";

export type Feature = {
  title: string;
  description: string;
  image: ImageItem;
};

export type Support = {
  stat: string;
  title: string;
  description: string;
  cta: LinkItem;
  image: ImageItem;
};

export type Features = {
  title: TwoLineHeading;
  items: Feature[];
  support: Support;
};
