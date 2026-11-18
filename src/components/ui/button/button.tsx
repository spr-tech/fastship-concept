import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";

export type ButtonVariant = "accent" | "dark" | "outline" | "subtle" | "outlineOnDark" | "surface" | "glassOnDark";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonShape = "pill" | "rounded";

type ButtonBaseProps = {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Pills everywhere except the auth forms, whose buttons are 14px-rounded to match their inputs. */
  shape?: ButtonShape;
  isFullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
};

type ButtonAsLinkProps = ButtonBaseProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonAsButtonProps = ButtonBaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-describedby"?: string;
};

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

// Text on the orange fill is always ink: white on that orange fails contrast.
const variantClasses: Record<ButtonVariant, string> = {
  accent: "bg-accent text-ink",
  dark: "bg-ink text-text-on-dark",
  outline: "border-2 border-ink text-ink",
  subtle: "border border-ink/15 font-semibold text-ink hover:bg-ink/5",
  outlineOnDark: "border-[1.5px] border-text-on-dark text-text-on-dark",
  surface: "border-[1.5px] border-border-strong bg-surface font-semibold text-ink",
  // Frosted glass over a dark section or photo.
  glassOnDark: "border border-text-on-dark/25 bg-text-on-dark/10 font-semibold text-text-on-dark backdrop-blur-md hover:bg-text-on-dark/20",
};

// Every size is at least 44px tall, the minimum touch target, with 14px text. "sm" is the nav size;
// the rest differ in side padding. "xl" is the full-width form submit.
const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 gap-2 px-4 text-small font-semibold",
  md: "min-h-11 gap-2 px-4.5 text-small",
  lg: "min-h-11 gap-2 px-5 text-small",
  xl: "min-h-12 gap-2 px-5 text-small",
};

const shapeClasses: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-field",
};

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export default function Button(props: ButtonProps) {
  const {
    text,
    variant = "dark",
    size = "lg",
    shape = "pill",
    isFullWidth = false,
    startIcon,
    endIcon,
    className,
  } = props;

  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center text-center font-bold no-underline",
    "transition-[translate,background-color] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-none",
    sizeClasses[size],
    variantClasses[variant],
    shapeClasses[shape],
    isFullWidth && "flex w-full",
    className,
  );

  const content = (
    <>
      {startIcon}
      <span>{text}</span>
      {endIcon}
    </>
  );

  if (props.href !== undefined) {
    // Next's Link only helps for routes inside this app; real Fastship pages and mailto links are plain anchors.
    if (isExternal(props.href)) {
      return (
        <a href={props.href} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      aria-describedby={props["aria-describedby"]}
      className={classes}
    >
      {content}
    </button>
  );
}
