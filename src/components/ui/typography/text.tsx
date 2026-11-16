import type { ElementType, ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";

// Sizes and line heights come from the --text-* tokens in globals.css, so the whole site's scale
// is set in one place. Anton has one weight, so display styles set font-normal: otherwise h1-h3
// would ask for bold and the browser would fake it by smearing the glyphs.
const display = "font-display font-normal uppercase";

const variantClasses = {
  // Anton display styles
  hero: `${display} text-display-hero tracking-[0.5px]`,
  authTitle: `${display} text-display-auth`,
  closing: `${display} text-display-closing`,
  section: `${display} text-display-section`,
  sectionCompact: `${display} text-display-contact`,
  statement: `${display} text-display-statement`,
  displaySm: `${display} text-display-sm`,
  cardTitleLg: `${display} text-card-title-lg`,
  cardTitle: `${display} text-card-title`,
  stat: "font-display font-normal text-display-stat",
  number: "font-display font-normal text-display-number",

  // Inter styles
  formTitle: "text-form-title font-bold tracking-[-0.5px]",
  quote: "text-quote font-medium",
  titleLg: "text-title-lg font-bold",
  title: "text-title font-bold",
  titleSm: "text-title-sm font-bold",
  leadLg: "text-lead-lg",
  lead: "text-lead",
  body: "text-body",
  small: "text-small",
  caption: "text-label",
  eyebrow: "text-label font-bold tracking-[1.5px] uppercase",
  eyebrowSm: "text-label font-bold tracking-[0.08em] uppercase",
} as const;

const toneClasses = {
  inherit: "",
  ink: "text-ink",
  body: "text-text-body",
  muted: "text-text-muted",
  accent: "text-accent-text",
  onDark: "text-text-on-dark",
  onDarkMuted: "text-text-on-dark-muted",
  onDarkSubtle: "text-text-on-dark-subtle",
  accentOnDark: "text-accent-on-dark",
  accentFill: "text-accent",
} as const;

export type TextVariant = keyof typeof variantClasses;
export type TextTone = keyof typeof toneClasses;

const defaultElement: Record<TextVariant, ElementType> = {
  hero: "h1",
  authTitle: "h1",
  closing: "h2",
  section: "h2",
  sectionCompact: "h2",
  statement: "p",
  displaySm: "h2",
  cardTitleLg: "h3",
  cardTitle: "h3",
  stat: "p",
  number: "span",
  formTitle: "h2",
  quote: "blockquote",
  titleLg: "h3",
  title: "h3",
  titleSm: "h3",
  leadLg: "p",
  lead: "p",
  body: "p",
  small: "p",
  caption: "p",
  eyebrow: "p",
  eyebrowSm: "span",
};

type TextProps = {
  variant: TextVariant;
  /** Text colour by role. "accent" is the orange that passes contrast on cream; "accentFill" is for big display numbers only. */
  tone?: TextTone;
  /** The element to render, when the heading level or tag differs from the variant's default. */
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function Text({ variant, tone = "inherit", as, id, className, children }: TextProps) {
  const Tag = as ?? defaultElement[variant];

  return (
    <Tag id={id} className={cn(variantClasses[variant], toneClasses[tone], className)}>
      {children}
    </Tag>
  );
}
