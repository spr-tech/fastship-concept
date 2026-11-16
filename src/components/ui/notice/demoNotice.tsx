"use client";

import { useState } from "react";
import { cn } from "@/utilities/helpers/cn";
import Button, { type ButtonProps } from "../button/button";
import StatusMessage, { type NoticeMessage } from "./statusMessage";

export type { NoticeMessage };

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
      <div role="status">{isShown && <StatusMessage message={message} />}</div>
    </div>
  );
}
