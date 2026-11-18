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

const icons: Record<ContactIcon, (size: number) => ReactNode> = {
  mail: (size) => <MailIcon size={size} />,
  chat: (size) => <ChatIcon size={size} />,
  phone: (size) => <PhoneIcon size={size} />,
  pin: (size) => <MapPinIcon size={size} />,
};

// Fields are 44px on phones (touch targets) and 40px on desktop; the message box 88px and 96px.
// 12px side padding (not 14) so placeholders fit the half- and third-width fields.
const FIELD = "px-3 lg:min-h-10";
// The select also gives up some room after its arrow, so "Choose a reason" fits a third of the row.
const SELECT = "px-3 lg:min-h-10 lg:pr-1.5";

/** One contact row on desktop: a link with an icon square, label, value and arrow. */
function DetailRow({ detail }: { detail: ContactDetail }) {
  const content = (
    <>
      {/* On hover the square fills orange and tilts a little. */}
      <span className="flex size-9 shrink-0 items-center justify-center rounded-field bg-ink-line text-accent-on-dark transition-[background-color,color,rotate] duration-300 ease-hover group-hover:bg-accent group-hover:text-ink motion-safe:group-hover:-rotate-6">
        {icons[detail.icon](18)}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-label text-text-on-dark-subtle">{detail.label}</span>
        <span className="text-body font-semibold break-words">{detail.value}</span>
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

/**
 * Email, WhatsApp and phone: one row of icon buttons on phones and tablets, full rows on desktop.
 * The office address is a small line under them on both, which keeps the panel short.
 */
function ContactDetails({ details }: { details: ContactDetail[] }) {
  const links = details.filter((detail) => detail.href);
  const office = details.find((detail) => !detail.href);

  return (
    <div>
      <ul className="flex gap-2 lg:hidden">
        {links.map((detail) => (
          <li key={detail.label} className="flex-1">
            <a
              href={detail.href}
              aria-label={`${detail.label}: ${detail.value}`}
              className="flex min-h-11 items-center justify-center rounded-field bg-ink-line text-accent-on-dark transition-colors duration-200 hover:bg-accent hover:text-ink"
            >
              {icons[detail.icon](20)}
            </a>
          </li>
        ))}
      </ul>
      <ul className="hidden lg:block">
        {links.map((detail) => (
          <li key={detail.label}>
            <DetailRow detail={detail} />
          </li>
        ))}
      </ul>
      {office && (
        <p className="mt-3 flex items-start gap-2 text-label text-text-on-dark-subtle">
          <span className="mt-0.5 shrink-0 text-accent-on-dark">{icons[office.icon](14)}</span>
          <span>
            <span className="sr-only">{office.label}: </span>
            {office.value}
          </span>
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const { form } = contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-5 pb-section-md md:px-8">
      <Reveal className="mx-auto flex max-w-260 flex-wrap overflow-hidden rounded-card-lg border border-border bg-surface">
        <div className="flex flex-[1_1_320px] flex-col gap-5 bg-ink p-5 text-text-on-dark lg:p-8">
          <div>
            <Text variant="eyebrowSm" tone="accentOnDark">
              {contact.eyebrow}
            </Text>
            <Text variant="sectionCompact" id="contact-title" className="mt-2">
              {contact.title}
            </Text>
            <Text variant="body" tone="onDarkMuted" className="mt-2.5 max-w-95">
              {contact.intro}
            </Text>
          </div>

          <ContactDetails details={contact.details} />
        </div>

        <div className="min-w-0 flex-[1.5_1_420px] p-5 lg:p-8">
          <Text variant="title">{form.title}</Text>
          <InfoNote id={NOTE_ID} text={form.note} className="mt-1 text-label" />

          {/* Two columns on phones; on desktop names in one row, then email, phone and reason three across. */}
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-6">
            <Input id="ct-first" name="firstName" label={form.firstNameLabel} autoComplete="given-name" describedBy={NOTE_ID} controlClassName={FIELD} className="lg:col-span-3" />
            <Input id="ct-last" name="lastName" label={form.lastNameLabel} autoComplete="family-name" describedBy={NOTE_ID} controlClassName={FIELD} className="lg:col-span-3" />
            <Input
              id="ct-email"
              name="email"
              type="email"
              label={form.emailLabel}
              placeholder={form.emailPlaceholder}
              autoComplete="email"
              describedBy={NOTE_ID}
              controlClassName={FIELD}
              className="lg:col-span-2"
            />
            <Input
              id="ct-phone"
              name="phone"
              type="tel"
              label={form.phoneLabel}
              prefix={form.phonePrefix}
              autoComplete="tel-national"
              describedBy={NOTE_ID}
              controlClassName={FIELD}
              className="lg:col-span-2"
            />
            <Select
              id="ct-reason"
              name="reason"
              label={form.reasonLabel}
              placeholder={form.reasonPlaceholder}
              options={form.reasons}
              describedBy={NOTE_ID}
              controlClassName={SELECT}
              className="col-span-full lg:col-span-2"
            />
            <Textarea
              id="ct-msg"
              name="message"
              label={form.messageLabel}
              rows={2}
              describedBy={NOTE_ID}
              controlClassName="h-22 min-h-0 px-3 lg:h-24"
              className="col-span-full"
            />
          </div>

          <DemoNotice
            className="mt-4"
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
