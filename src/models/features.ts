import type { ImageItem, LinkItem, TwoLineHeading } from "./shared";

export type Feature = {
  title: string;
  description: string;
  image: ImageItem;
};

export type SupportChannel = LinkItem & {
  icon: "chat" | "mail" | "phone";
};

export type Support = {
  eyebrow: string;
  /** Drawn very large and outlined behind the banner. Decorative. */
  stat: string;
  title: string;
  description: string;
  cta: LinkItem;
  /** WhatsApp, email and phone, with Fastship's real addresses. */
  channels: SupportChannel[];
  image: ImageItem;
  /** The illustrative support chat over the photo. Decorative, so hidden from screen readers. */
  chat: {
    question: string;
    agent: string;
    reply: string;
  };
};

export type Features = {
  title: TwoLineHeading;
  items: Feature[];
  /** The swipeable card row on phones and tablets. */
  carousel: {
    /** Names the scroll area for screen readers. */
    label: string;
    /** Start of each dot's label, followed by the card's title, e.g. "Show Automated workflows". */
    dotLabel: string;
    hint: string;
  };
  support: Support;
};
