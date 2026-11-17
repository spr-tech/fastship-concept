"use client";

import { useState } from "react";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/field/input";
import { ArrowRightIcon, GoogleIcon } from "@/components/ui/icons/icons";
import InfoNote from "@/components/ui/notice/infoNote";
import StatusMessage from "@/components/ui/notice/statusMessage";
import Text from "@/components/ui/typography/text";
import type { SignIn } from "@/models/auth";
import type { DemoMessage } from "@/models/shared";
import { OrDivider, TextLink } from "./authParts";
import PasswordToggle from "./passwordToggle";

const NOTE_ID = "signin-note";

type SignInFormProps = {
  form: SignIn["form"];
};

// Google, "Forgot password?" and Sign in all report into one status region under the submit
// button. Each click replaces the message, so the last thing pressed is what gets announced.
export default function SignInForm({ form }: SignInFormProps) {
  const [notice, setNotice] = useState<DemoMessage | null>(null);
  const showSignInNotice = () => setNotice(form.notice);

  return (
    <>
      <Text variant="formTitle">{form.title}</Text>
      <Text variant="body" tone="body" className="mt-2">
        {form.subtitle}
      </Text>
      <InfoNote id={NOTE_ID} variant="callout" text={form.note} className="mt-5" />

      <Button
        text={form.googleButton}
        variant="surface"
        size="xl"
        shape="rounded"
        isFullWidth
        startIcon={<GoogleIcon size={18} />}
        onClick={showSignInNotice}
        className="mt-7"
      />

      <OrDivider text={form.divider} />

      <div className="flex flex-col gap-4">
        <Input
          id="si-email"
          name="email"
          type="email"
          label={form.emailLabel}
          placeholder={form.emailPlaceholder}
          autoComplete="email"
          describedBy={NOTE_ID}
        />
        <Input
          id="si-pass"
          name="password"
          type="password"
          label={form.passwordLabel}
          autoComplete="current-password"
          describedBy={NOTE_ID}
          labelAside={
            // A button, not a link: on the auth pages the only way out to fastship.africa is the
            // link inside a notice.
            <button
              type="button"
              onClick={() => setNotice(form.forgotPassword.notice)}
              className="inline-flex min-h-11 cursor-pointer items-center text-small font-semibold text-accent-text underline underline-offset-2"
            >
              {form.forgotPassword.label}
            </button>
          }
          trailing={<PasswordToggle label={form.showPasswordLabel} />}
        />
      </div>

      <Button
        text={form.submitText}
        variant="accent"
        size="xl"
        shape="rounded"
        isFullWidth
        endIcon={<ArrowRightIcon size={16} />}
        onClick={showSignInNotice}
        className="mt-7"
      />
      <div role="status" className="mt-3.5">
        {/* The key replays the fade when a different button swaps the message. */}
        {notice && <StatusMessage key={notice.before} message={notice} />}
      </div>

      <Text variant="body" tone="body" className="mt-7 text-center">
        {form.switchPrompt.text} <TextLink href={form.switchPrompt.link.href}>{form.switchPrompt.link.label}</TextLink>
      </Text>
    </>
  );
}
