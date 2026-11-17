"use client";

import { useState } from "react";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/field/input";
import { ArrowRightIcon, GoogleIcon } from "@/components/ui/icons/icons";
import InfoNote from "@/components/ui/notice/infoNote";
import StatusMessage from "@/components/ui/notice/statusMessage";
import Text from "@/components/ui/typography/text";
import type { SignUp } from "@/models/auth";
import { OrDivider, TextLink } from "./authParts";
import PasswordToggle from "./passwordToggle";

const NOTE_ID = "signup-note";
const PASSWORD_HINT_ID = "signup-password-hint";

type SignUpFormProps = {
  form: SignUp["form"];
};

export default function SignUpForm({ form }: SignUpFormProps) {
  const [isNoticeShown, setIsNoticeShown] = useState(false);
  const showNotice = () => setIsNoticeShown(true);

  return (
    <>
      <Text variant="formTitle">{form.title}</Text>
      <Text variant="body" tone="body" className="mt-2">
        {form.switchPrompt.text} <TextLink href={form.switchPrompt.link.href}>{form.switchPrompt.link.label}</TextLink>
      </Text>
      <InfoNote id={NOTE_ID} variant="callout" text={form.note} className="mt-5" />

      <Button
        text={form.googleButton}
        variant="surface"
        size="xl"
        shape="rounded"
        isFullWidth
        startIcon={<GoogleIcon size={18} />}
        onClick={showNotice}
        className="mt-6"
      />

      <OrDivider text={form.divider} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        <Input id="su-first" name="firstName" label={form.firstNameLabel} autoComplete="given-name" describedBy={NOTE_ID} />
        <Input id="su-last" name="lastName" label={form.lastNameLabel} autoComplete="family-name" describedBy={NOTE_ID} />
        <Input
          id="su-email"
          name="email"
          type="email"
          label={form.emailLabel}
          placeholder={form.emailPlaceholder}
          autoComplete="email"
          describedBy={NOTE_ID}
          className="col-span-full"
        />
        <Input
          id="su-phone"
          name="phone"
          type="tel"
          label={form.phoneLabel}
          prefix={form.phonePrefix}
          autoComplete="tel-national"
          describedBy={NOTE_ID}
          className="col-span-full"
        />
        <div className="col-span-full flex flex-col gap-1.5">
          <Input
            id="su-pass"
            name="password"
            type="password"
            label={form.passwordLabel}
            autoComplete="new-password"
            describedBy={`${NOTE_ID} ${PASSWORD_HINT_ID}`}
            trailing={<PasswordToggle label={form.showPasswordLabel} />}
          />
          {/* A static hint, not a strength meter: the field is disabled, so a meter could never move. */}
          <p id={PASSWORD_HINT_ID} className="text-label text-text-muted">
            {form.passwordHint}
          </p>
        </div>
        <Input
          id="su-ref"
          name="referralCode"
          label={form.referralLabel}
          optionalText={form.referralOptional}
          describedBy={NOTE_ID}
          className="col-span-full"
        />
      </div>

      <Button
        text={form.submitText}
        variant="dark"
        size="xl"
        shape="rounded"
        isFullWidth
        endIcon={<ArrowRightIcon size={16} />}
        onClick={showNotice}
        className="mt-7"
      />
      <div role="status" className="mt-3.5">
        {isNoticeShown && <StatusMessage message={form.notice} />}
      </div>

      <p className="mt-4.5 text-center text-label text-text-muted">
        {form.legal.before} <TextLink href={form.legal.terms.href} className="font-semibold">{form.legal.terms.label}</TextLink>{" "}
        {form.legal.middle}{" "}
        <TextLink href={form.legal.privacy.href} className="font-semibold">
          {form.legal.privacy.label}
        </TextLink>
        {form.legal.after}
      </p>
    </>
  );
}
