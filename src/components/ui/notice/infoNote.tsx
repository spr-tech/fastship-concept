import { cn } from "@/utilities/helpers/cn";
import { InfoIcon } from "../icons/icons";

type InfoNoteProps = {
  /** Fields point at this id with aria-describedby, so the note is read along with them. */
  id: string;
  text: string;
  /** "callout" is the bordered box on the auth pages; "plain" is the line of small print under a form. */
  variant?: "callout" | "plain";
  className?: string;
};

/** The always-visible note saying a form is turned off in this concept. */
export default function InfoNote({ id, text, variant = "plain", className }: InfoNoteProps) {
  if (variant === "plain") {
    return (
      <p id={id} className={cn("text-label text-text-muted", className)}>
        {text}
      </p>
    );
  }

  return (
    <p
      id={id}
      className={cn(
        "flex items-start gap-2.5 rounded-field border border-border bg-surface px-3.5 py-2.5 text-small text-text-body",
        className,
      )}
    >
      <InfoIcon size={18} className="mt-0.5 shrink-0 text-accent-text" />
      <span>{text}</span>
    </p>
  );
}
