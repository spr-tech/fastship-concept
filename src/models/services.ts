import type { ImageItem, TwoLineHeading } from "./shared";

type ServiceCardBase = {
  title: string;
  description: string;
  /**
   * Where the card leads. Left out when neither the concept nor Fastship has a page for it; a card
   * without one renders no arrow button, so it doesn't look clickable.
   */
  href?: string;
  /** Read by screen readers in place of the drawing. */
  illustrationLabel?: string;
};

export type AirCargoCard = ServiceCardBase & {
  badge: string;
  origin: string;
  destinations: string[];
};

export type FoodItem = {
  label: string;
  image: ImageItem;
};

export type FoodCard = ServiceCardBase & {
  kicker: string;
  itemsLabel: string;
  items: FoodItem[];
};

export type VehicleCard = ServiceCardBase & {
  destination: string;
  steps: string[];
};

export type CustomsCard = ServiceCardBase & {
  documentCode: string;
  stamp: string;
  topics: string[];
};

export type Services = {
  eyebrow: string;
  title: TwoLineHeading;
  airCargo: AirCargoCard;
  food: FoodCard;
  vehicle: VehicleCard;
  customs: CustomsCard;
};
