import type { ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";

type FieldLabelProps = {
  htmlFor: string;
  text: string;
  /** Shown after the label in a lighter weight, e.g. "(optional)". */
  optionalText?: string;
  /** Something at the far end of the label row, e.g. a "Forgot password?" link. */
  aside?: ReactNode;
  /** Keeps the label for screen readers when the design shows none, e.g. the tracking input. */
  isHidden?: boolean;
};

export default function FieldLabel({ htmlFor, text, optionalText, aside, isHidden = false }: FieldLabelProps) {
  const label = (
    <label htmlFor={htmlFor} className={cn("text-label font-semibold text-ink", isHidden && "sr-only")}>
      {text}
      {optionalText && <span className="font-medium text-text-muted"> {optionalText}</span>}
    </label>
  );

  if (!aside) return label;

  return (
    <div className="flex items-baseline justify-between gap-4">
      {label}
      {aside}
    </div>
  );
}
