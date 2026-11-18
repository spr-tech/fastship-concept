import { cn } from "@/utilities/helpers/cn";
import FieldLabel from "./fieldLabel";
import { fieldClassName, fieldGroupClassName } from "./fieldStyles";

type TextareaProps = {
  id: string;
  name: string;
  label: string;
  /** Id of the visible note that says the form is turned off. */
  describedBy: string;
  placeholder?: string;
  rows?: number;
  /** Extra classes for the field itself (not its wrapper), e.g. a shorter height in a compact form. */
  controlClassName?: string;
  className?: string;
};

export default function Textarea({ id, name, label, describedBy, placeholder, rows = 4, controlClassName, className }: TextareaProps) {
  return (
    <div className={cn(fieldGroupClassName, className)}>
      <FieldLabel htmlFor={id} text={label} />
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        aria-describedby={describedBy}
        disabled
        className={cn(fieldClassName, "min-h-22 resize-none py-2.5", controlClassName)}
      />
    </div>
  );
}
