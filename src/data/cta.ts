import type { ClosingCta } from "@/models/cta";
import { conceptLinks } from "./links";

export const closingCta: ClosingCta = {
  title: "Run your logistics from one place.",
  text: "Join businesses using Fastship.Africa to simplify operations and deliver globally with confidence.",
  primary: { label: "Get a shipping quote", href: conceptLinks.signUp },
  secondary: { label: "Create a free account", href: conceptLinks.signUp },
};
