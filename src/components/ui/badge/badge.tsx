import { cn } from "@/utilities/helpers/cn";

export type BadgeVariant = "surface" | "outline" | "dark" | "light" | "accent";

type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
  /** A pulsing orange dot before the text, for something that is live or available now. */
  hasPulse?: boolean;
  /** "li" when the badges form a list, e.g. a row of tags. */
  as?: "span" | "li";
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  surface: "border border-border bg-surface px-3.5 py-1.5 text-label font-medium text-ink",
  outline: "border-[1.5px] border-ink px-2.5 py-1 text-label font-bold text-ink",
  dark: "bg-ink-line px-2.5 py-1.5 text-label font-semibold text-text-on-dark",
  light: "border border-border-strong bg-bg px-2.5 py-1.5 text-label font-semibold text-ink",
  accent: "bg-accent px-2.5 py-1 text-label font-bold text-ink",
};

export default function Badge({ text, variant = "surface", hasPulse = false, as: Tag = "span", className }: BadgeProps) {
  return (
    <Tag className={cn("inline-flex items-center gap-2.5 rounded-full", variantClasses[variant], className)}>
      {hasPulse && (
        <span aria-hidden="true" className="relative inline-flex size-2 shrink-0">
          {/* A ring that scales out and fades, rather than an animated box-shadow, so it stays on the compositor. */}
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
          <span className="relative size-2 rounded-full bg-accent" />
        </span>
      )}
      {text}
    </Tag>
  );
}
