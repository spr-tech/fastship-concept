import type { LinkedSentence } from "./shared";

export type Faq = {
  /** Stable key, also used in the element id. */
  id: string;
  question: string;
  answer: string;
};

export type Faqs = {
  title: string;
  intro: LinkedSentence;
  items: Faq[];
};
