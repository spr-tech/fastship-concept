import { cn } from "@/utilities/helpers/cn";
import FieldLabel from "./fieldLabel";
import { fieldClassName, fieldGroupClassName } from "./fieldStyles";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  name: string;
  label: string;
  /** Id of the visible note that says the form is turned off. */
  describedBy: string;
  options: SelectOption[];
  /** First, empty option shown before a choice is made, e.g. "Choose a reason". */
  placeholder?: string;
  className?: string;
};

export default function Select({ id, name, label, describedBy, options, placeholder, className }: SelectProps) {
  return (
    <div className={cn(fieldGroupClassName, className)}>
      <FieldLabel htmlFor={id} text={label} />
      <select id={id} name={name} aria-describedby={describedBy} disabled defaultValue="" className={fieldClassName}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
