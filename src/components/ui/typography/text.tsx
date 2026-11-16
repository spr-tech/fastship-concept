import type { ElementType, ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";

// Anton has one weight, so display styles set font-normal: otherwise h1-h3 would ask for bold and
// the browser would fake it by smearing the glyphs.
const display = "font-display font-normal uppercase";

const variantClasses = {
  // Anton display styles
  hero: `${display} text-[clamp(56px,9vw,136px)] leading-[0.95] tracking-[0.5px]`,
  authTitle: `${display} text-[clamp(56px,7vw,108px)] leading-[0.95]`,
  closing: `${display} text-[clamp(44px,7vw,100px)] leading-[0.98]`,
  section: `${display} text-[clamp(44px,6vw,84px)] leading-none`,
  sectionCompact: `${display} text-[clamp(44px,5vw,72px)] leading-[0.95]`,
  statement: `${display} text-[clamp(28px,3.4vw,44px)] leading-[1.15]`,
  displaySm: `${display} text-[40px] leading-none`,
  cardTitleLg: `${display} text-[34px] leading-[1.05]`,
  cardTitle: `${display} text-[28px] leading-[1.1]`,
  stat: "font-display font-normal text-[clamp(72px,9vw,120px)] leading-[0.9]",
  number: "font-display font-normal text-[56px] leading-none",

  // Inter styles
  formTitle: "text-[32px] font-bold tracking-[-0.5px]",
  quote: "text-[22px] leading-[1.45] font-medium",
  title: "text-2xl leading-[1.2] font-bold",
  titleSm: "text-xl leading-[1.3] font-bold",
  leadLg: "text-xl leading-[1.55]",
  lead: "text-lg leading-[1.55]",
  body: "text-base leading-[1.55]",
  small: "text-sm leading-normal",
  caption: "text-[13px] leading-normal",
  eyebrow: "text-sm font-bold tracking-[1.5px] uppercase",
  eyebrowSm: "text-[13px] font-bold tracking-[0.08em] uppercase",
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
