import { cn } from "@/utilities/helpers/cn";

export type NoticeMessage = {
  /** Text before the link, e.g. "Tracking isn’t connected in this concept." */
  before: string;
  link: {
    label: string;
    href: string;
  };
  /** Text after the link, e.g. "instead." */
  after?: string;
};

type StatusMessageProps = {
  message: NoticeMessage;
  className?: string;
};

/** The dark "not connected" box. Render it inside an always-present role="status" region. */
export default function StatusMessage({ message, className }: StatusMessageProps) {
  return (
    <p
      className={cn(
        "animate-fade-up rounded-[14px] bg-ink px-4 py-3.5 text-sm leading-normal text-text-on-dark [animation-duration:300ms]",
        className,
      )}
    >
      {message.before}{" "}
      <a href={message.link.href} className="font-bold text-accent-on-dark underline">
        {message.link.label}
      </a>
      {message.after && ` ${message.after}`}
    </p>
  );
}
