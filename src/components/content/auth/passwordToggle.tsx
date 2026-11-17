import { EyeIcon } from "@/components/ui/icons/icons";

type PasswordToggleProps = {
  label: string;
};

/**
 * The show/hide password button, disabled along with its input. It can never change state, so it is
 * a plain server-rendered button rather than a client component: no JavaScript ships for it.
 */
export default function PasswordToggle({ label }: PasswordToggleProps) {
  return (
    <button
      type="button"
      disabled
      aria-label={label}
      className="flex size-11 cursor-not-allowed items-center justify-center rounded-field text-field-disabled-text"
    >
      <EyeIcon size={20} />
    </button>
  );
}
