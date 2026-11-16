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
  className?: string;
};

export default function Textarea({ id, name, label, describedBy, placeholder, rows = 4, className }: TextareaProps) {
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
        className={cn(fieldClassName, "min-h-26 resize-none py-3")}
      />
    </div>
  );
}
