import type { ReactNode, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Width and height in pixels. */
  size?: number;
};

type IconBaseProps = IconProps & {
  children: ReactNode;
  isFilled?: boolean;
};

// Icons take their colour from the text colour (currentColor), so a parent's text-* class sets it.
// They are decorative by default; pass aria-hidden={false} and an aria-label when one carries meaning.
function IconBase({ size = 20, strokeWidth = 2, isFilled = false, children, ...rest }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={2.4} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 19 19 5" />
      <path d="M9 5h10v10" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={2.2} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={2.2} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={2.4} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={2.2} {...props}>
      <path d="M5 8h14" />
      <path d="M5 16h14" />
    </IconBase>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={2.2} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </IconBase>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a16 16 0 0 1-2.6 3.2" />
      <path d="M6.6 6.6C4.3 8.2 3 12 3 12s4 6 9 6a8.6 8.6 0 0 0 4.3-1.2" />
    </IconBase>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </IconBase>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20.5 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h4.8a4.1 4.1 0 0 1-1.8 2.7" />
      <path d="M12 21a9 9 0 1 1 6.1-15.6" />
    </IconBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </IconBase>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4.1A8 8 0 1 1 20 12z" />
    </IconBase>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18h2" />
    </IconBase>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </IconBase>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={1.6} {...props}>
      <path d="M5 16H3v-4l2-5h11l3 5h2v4h-2" />
      <circle cx="7.5" cy="16.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
      <path d="M9.5 16.5h5" />
    </IconBase>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <IconBase strokeWidth={1.6} {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z" />
      <path d="M8 7h6" />
      <path d="M8 11h6" />
    </IconBase>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <IconBase isFilled {...props}>
      <path d="M4 18v-5.5C4 8.4 6.2 6 10 5.5v2.7C8 8.7 7.2 10 7 11.5h3V18Zm10 0v-5.5c0-4.1 2.2-6.5 6-7v2.7c-2 .5-2.8 1.8-3 3.3h3V18Z" />
    </IconBase>
  );
}
