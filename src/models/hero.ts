import type { LinkItem, TwoLineHeading } from "./shared";

export type LabelledValue = {
  label: string;
  value: string;
};

export type Hero = {
  badge: string;
  title: TwoLineHeading;
  intro: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  checks: string[];
  comparison: {
    /** Describes the card for screen readers, since its moving parts are decorative. */
    label: string;
    from: LabelledValue;
    to: LabelledValue;
    title: string;
    meta: string;
    trackingStrip: LabelledValue;
  };
};
