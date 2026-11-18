import type { LinkItem, TwoLineHeading } from "./shared";

export type LabelledValue = {
  label: string;
  value: string;
};

/** One sample shipment row in the hero dashboard. Airport codes and a carrier monogram only. */
export type HeroShipment = {
  from: string;
  to: string;
  carrier: string;
};

/** Copy for the layered drawing beside the hero text. Every part of it is decorative. */
export type HeroVisual = {
  /** The one description screen readers get for the whole drawing. */
  label: string;
  dashboard: {
    title: string;
    search: string;
    tabs: string[];
    /** The steps a shipment moves through, in order. */
    statuses: string[];
    origin: string;
    shipments: HeroShipment[];
  };
  phone: {
    title: string;
    route: string;
    status: string;
    steps: string[];
  };
  compare: {
    title: string;
    weight: string;
    /** Followed by the carrier's short name, e.g. "Book with DHL". */
    bookLabel: string;
  };
};

export type Hero = {
  badge: string;
  title: TwoLineHeading;
  intro: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  checks: string[];
  visual: HeroVisual;
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
