import type { DemoMessage } from "./shared";

export type ContactIcon = "mail" | "chat" | "phone" | "pin";

export type ContactDetail = {
  icon: ContactIcon;
  label: string;
  value: string;
  /** Left out for details that aren't a link, like the office address. */
  href?: string;
};

export type ContactForm = {
  title: string;
  note: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePrefix: string;
  reasonLabel: string;
  reasonPlaceholder: string;
  reasons: { value: string; label: string }[];
  messageLabel: string;
  buttonText: string;
  notice: DemoMessage;
};

export type Contact = {
  eyebrow: string;
  title: string;
  intro: string;
  details: ContactDetail[];
  form: ContactForm;
};
