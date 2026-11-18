import type { ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";
import FieldLabel from "./fieldLabel";
import { fieldClassName, fieldGroupClassName } from "./fieldStyles";

type InputProps = {
  id: string;
  name: string;
  label: string;
  /** Id of the visible note that says the form is turned off. Every field must point at one. */
  describedBy: string;
  type?: "text" | "email" | "tel" | "password";
  placeholder?: string;
  autoComplete?: string;
  optionalText?: string;
  labelAside?: ReactNode;
  isLabelHidden?: boolean;
  /** Fixed text in its own box before the input, e.g. a "+234" dialling code. */
  prefix?: string;
  /** Sits inside the right edge of the input, e.g. the password show/hide toggle. */
  trailing?: ReactNode;
  shape?: "rounded" | "pill";
  /** Extra classes for the field itself (not its wrapper), e.g. a shorter height in a compact form. */
  controlClassName?: string;
  className?: string;
};

export default function Input({
  id,
  name,
  label,
  describedBy,
  type = "text",
  placeholder,
  autoComplete,
  optionalText,
  labelAside,
  isLabelHidden = false,
  prefix,
  trailing,
  shape = "rounded",
  controlClassName,
  className,
}: InputProps) {
  const input = (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-describedby={describedBy}
      // Always disabled: this concept has no backend, and a working-looking form would mislead.
      disabled
      className={cn(
        fieldClassName,
        shape === "pill" && "rounded-full px-4.5",
        prefix && "min-w-0 flex-1",
        trailing && "pr-13",
        controlClassName,
      )}
    />
  );

  return (
    <div className={cn(fieldGroupClassName, className)}>
      <FieldLabel
        htmlFor={id}
        text={label}
        optionalText={optionalText}
        aside={labelAside}
        isHidden={isLabelHidden}
      />

      {prefix ? (
        <div className="flex gap-2">
          <span
            className={cn(fieldClassName, "flex w-auto shrink-0 items-center px-3 font-semibold", controlClassName)}
          >
            {prefix}
          </span>
          {input}
        </div>
      ) : trailing ? (
        <div className="relative">
          {input}
          <div className="absolute top-0 right-0.5">{trailing}</div>
        </div>
      ) : (
        input
      )}
    </div>
  );
}
