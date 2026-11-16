import type { Contact } from "@/models/contact";
import { fastshipLinks } from "./links";

export const contact: Contact = {
  eyebrow: "Support",
  title: "Talk to us",
  intro:
    "Have a question? Send a message and the team will reply within 24 hours. For anything urgent, reach them directly.",
  details: [
    { icon: "mail", label: "Email", value: "support@fastshipafrica.com", href: fastshipLinks.email },
    { icon: "chat", label: "WhatsApp", value: "+234 816 444 8168", href: fastshipLinks.whatsApp },
    { icon: "phone", label: "Phone", value: "+234 816 444 8168", href: fastshipLinks.phone },
    { icon: "pin", label: "Office", value: "Highlink Royal Castle Estate, Harris Drive, VGC, Lagos" },
  ],
  form: {
    title: "Send a message",
    note: "This form is turned off in this concept. Nothing is collected, stored or sent.",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    phoneLabel: "Phone number",
    phonePrefix: "+234",
    reasonLabel: "Reason",
    reasonPlaceholder: "Choose a reason",
    reasons: [
      { value: "quote", label: "Shipping quote" },
      { value: "tracking", label: "Tracking a shipment" },
      { value: "vehicle", label: "Vehicle import" },
      { value: "other", label: "Something else" },
    ],
    messageLabel: "Message",
    buttonText: "Send message",
    notice: {
      before: "The form isn’t connected in this concept. Email",
      link: { label: "support@fastshipafrica.com", href: fastshipLinks.email },
      after: "instead.",
    },
  },
};
