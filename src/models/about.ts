import type { ImageItem, LinkItem, TwoLineHeading } from "./shared";

export type Problem = {
  title: string;
  description: string;
};

export type About = {
  title: string;
  intro: string;
  image: ImageItem;
  problems: Problem[];
  statement: TwoLineHeading;
};

export type Step = {
  title: string;
  description: string;
};

export type HowItWorks = {
  eyebrow: string;
  title: TwoLineHeading;
  cta: LinkItem;
  steps: Step[];
};
