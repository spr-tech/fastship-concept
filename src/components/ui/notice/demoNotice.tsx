"use client";

import { useState } from "react";
import { cn } from "@/utilities/helpers/cn";
import Button, { type ButtonProps } from "../button/button";

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

type DemoNoticeProps = {
  /** The submit-style button. It stays enabled so the click can explain itself. */
  button: Omit<ButtonProps, "href" | "onClick" | "type">;
  message: NoticeMessage;
  className?: string;
};

/**
 * A button that, instead of submitting, says this concept isn't connected and links to the real place.
 * The status region is always in the page, so screen readers announce the message when it appears.
 */
export default function DemoNotice({ button, message, className }: DemoNoticeProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <Button {...button} onClick={() => setIsShown(true)} />

      <div role="status">
        {isShown && (
          <p className="animate-fade-up rounded-[14px] bg-ink px-4 py-3.5 text-sm leading-normal text-text-on-dark [animation-duration:300ms]">
            {message.before}{" "}
            <a href={message.link.href} className="font-bold text-accent-on-dark underline">
              {message.link.label}
            </a>
            {message.after && ` ${message.after}`}
          </p>
        )}
      </div>
    </div>
  );
}
