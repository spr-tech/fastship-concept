import type { ReactNode } from "react";
import Input from "@/components/ui/field/input";
import Select from "@/components/ui/field/select";
import Textarea from "@/components/ui/field/textarea";
import { ArrowRightIcon, ChatIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons/icons";
import DemoNotice from "@/components/ui/notice/demoNotice";
import InfoNote from "@/components/ui/notice/infoNote";
import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { contact } from "@/data/contact";
import type { ContactDetail, ContactIcon } from "@/models/contact";

const NOTE_ID = "contact-note";

const icons: Record<ContactIcon, ReactNode> = {
  mail: <MailIcon size={20} />,
  chat: <ChatIcon size={20} />,
  phone: <PhoneIcon size={20} />,
  pin: <MapPinIcon size={20} />,
};

/** One contact row. Rows with an address are links with an arrow; the office address is plain text. */
function DetailRow({ detail }: { detail: ContactDetail }) {
  const content = (
    <>
      {/* On hover the square fills orange and tilts a little. */}
      <span className="flex size-10 shrink-0 items-center justify-center rounded-field bg-ink-line text-accent-on-dark transition-[background-color,color,rotate] duration-300 ease-hover group-hover:bg-accent group-hover:text-ink motion-safe:group-hover:-rotate-6">
        {icons[detail.icon]}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-label text-text-on-dark-subtle">{detail.label}</span>
        <span className="font-semibold break-words">{detail.value}</span>
      </span>
    </>
  );
  const rowClasses = "flex items-center gap-3 border-t border-ink-line px-2 py-3";

  if (!detail.href) return <div className={rowClasses}>{content}</div>;

  return (
    <a href={detail.href} className={`group relative isolate ${rowClasses}`}>
      {/* A highlight that slides in from the left behind the row while it's hovered. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-field bg-ink-raised transition-[scale] duration-350 ease-hover group-hover:scale-x-100"
      />
      {content}
      {/* Slides right and turns orange while the row is hovered. */}
      <span
        aria-hidden="true"
        className="ml-auto text-text-on-dark-subtle transition-[translate,color] duration-300 ease-hover group-hover:text-accent-on-dark motion-safe:group-hover:translate-x-1.5"
      >
        <ArrowRightIcon size={16} />
      </span>
    </a>
  );
}

export default function Contact() {
  const { form } = contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-5 pb-section-xl md:px-8">
      <Reveal className="flex flex-wrap overflow-hidden rounded-card-lg border border-border bg-surface">
        <div className="flex flex-[1_1_360px] flex-col gap-6 bg-ink p-[clamp(1.25rem,2.6vw,2rem)] text-text-on-dark">
          <div>
            <Text variant="eyebrowSm" tone="accentOnDark">
              {contact.eyebrow}
            </Text>
            <Text variant="sectionCompact" id="contact-title" className="mt-2.5">
              {contact.title}
            </Text>
            <Text variant="lead" tone="onDarkMuted" className="mt-3.5 max-w-105">
              {contact.intro}
            </Text>
          </div>
          <ul>
            {contact.details.map((detail) => (
              <li key={detail.label}>
                <DetailRow detail={detail} />
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-[1.3_1_420px] p-[clamp(1.25rem,2.6vw,2rem)]">
          <Text variant="titleLg">{form.title}</Text>
          <InfoNote id={NOTE_ID} text={form.note} className="mt-1.5 text-small" />

          <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            <Input id="ct-first" name="firstName" label={form.firstNameLabel} autoComplete="given-name" describedBy={NOTE_ID} />
            <Input id="ct-last" name="lastName" label={form.lastNameLabel} autoComplete="family-name" describedBy={NOTE_ID} />
            <Input
              id="ct-email"
              name="email"
              type="email"
              label={form.emailLabel}
              placeholder={form.emailPlaceholder}
              autoComplete="email"
              describedBy={NOTE_ID}
              className="col-span-full"
            />
            <Input
              id="ct-phone"
              name="phone"
              type="tel"
              label={form.phoneLabel}
              prefix={form.phonePrefix}
              autoComplete="tel-national"
              describedBy={NOTE_ID}
              className="col-span-full"
            />
            <Select
              id="ct-reason"
              name="reason"
              label={form.reasonLabel}
              placeholder={form.reasonPlaceholder}
              options={form.reasons}
              describedBy={NOTE_ID}
              className="col-span-full"
            />
            <Textarea id="ct-msg" name="message" label={form.messageLabel} rows={3} describedBy={NOTE_ID} className="col-span-full" />
          </div>

          <DemoNotice
            className="mt-5"
            button={{
              text: form.buttonText,
              variant: "accent",
              size: "xl",
              isFullWidth: true,
              endIcon: <ArrowRightIcon size={16} />,
            }}
            message={form.notice}
          />
        </div>
      </Reveal>
    </section>
  );
}
