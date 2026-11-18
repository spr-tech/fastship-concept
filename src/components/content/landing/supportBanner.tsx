import Image from "next/image";
import type { ReactNode } from "react";
import Button from "@/components/ui/button/button";
import { ArrowRightIcon, ChatIcon, MailIcon, PhoneIcon } from "@/components/ui/icons/icons";
import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { features } from "@/data/features";
import type { SupportChannel } from "@/models/features";

const channelIcons: Record<SupportChannel["icon"], ReactNode> = {
  chat: <ChatIcon size={16} />,
  mail: <MailIcon size={16} />,
  phone: <PhoneIcon size={16} />,
};

/**
 * Decorative support chat over the photo, playing on a loop: the question, typing dots, then the
 * reply (see .support-chat in globals.css). Hidden from screen readers. Under reduced motion both
 * bubbles simply show. On phones only the reply shows, low on the left of the photo, clear of the face.
 */
function SupportChat({ question, agent, reply }: { question: string; agent: string; reply: string }) {
  return (
    <div aria-hidden="true" className="support-chat absolute bottom-5 left-4 flex w-56 flex-col gap-2 lg:top-5 lg:right-5 lg:bottom-auto lg:left-auto">
      <p className="support-chat-question self-end rounded-2xl rounded-br-md border border-text-on-dark/20 bg-ink/50 px-3.5 py-2.5 text-small font-medium text-text-on-dark backdrop-blur-md max-lg:hidden">
        {question}
      </p>
      {/* The typing dots and the reply share one grid cell, so the chat never changes height. */}
      <div className="grid">
        <span className="support-chat-typing col-start-1 row-start-1 flex w-fit gap-1 self-start rounded-2xl rounded-bl-md bg-surface/80 px-3.5 py-3 backdrop-blur-md max-lg:hidden">
          <span className="support-chat-dot size-1.5 rounded-full bg-ink/60" />
          <span className="support-chat-dot size-1.5 rounded-full bg-ink/60 [animation-delay:150ms]" />
          <span className="support-chat-dot size-1.5 rounded-full bg-ink/60 [animation-delay:300ms]" />
        </span>
        <p className="support-chat-reply col-start-1 row-start-1 rounded-2xl rounded-bl-md bg-surface/95 px-3.5 py-2.5 text-ink shadow-card lg:bg-surface/85 lg:backdrop-blur-md">
          <span className="block text-label font-bold text-accent-text">{agent}</span>
          <span className="mt-0.5 block text-small">{reply}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * The 24/7 support card at the foot of the dark features section. On desktop the photo fills the
 * right two-thirds and fades into the dark card on the left, under the text. On phones the photo
 * sits on top and fades downwards into the content.
 */
export default function SupportBanner() {
  const { support } = features;

  return (
    <Reveal as="article" className="relative mt-3 isolate overflow-hidden rounded-card-lg border border-ink-line bg-ink-raised">
      {/* Photo: on top on phones, the right two-thirds on desktop. */}
      <div className="relative h-60 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-2/3">
        <Image
          src={support.image.src}
          alt={support.image.alt}
          fill
          sizes="(min-width: 1280px) 860px, (min-width: 1024px) 66vw, 100vw"
          className="object-cover object-[60%_25%]"
        />
        {/* Fades the photo into the card: downwards on phones, leftwards on desktop. */}
        <span className="absolute inset-0 bg-linear-to-b from-transparent via-ink-raised/20 to-ink-raised lg:bg-linear-to-r lg:from-ink-raised lg:via-ink-raised/55 lg:via-35% lg:to-transparent lg:to-70%" />
        <SupportChat {...support.chat} />
      </div>

      {/* The outlined "24/7", sitting behind the content at the bottom left. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.12em] -left-[0.04em] -z-10 font-display text-display-outline text-transparent opacity-35 [-webkit-text-stroke:1.5px_var(--accent)] select-none"
      >
        {support.stat}
      </span>

      <div className="relative flex flex-col gap-8 p-[clamp(1.5rem,3.2vw,2.5rem)] lg:min-h-100 lg:max-w-[54%] lg:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-label font-bold tracking-[0.08em] text-accent-on-dark uppercase">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {support.eyebrow}
          </p>
          <Text variant="sectionCompact" as="h3" className="mt-3 text-text-on-dark">
            {support.title}
          </Text>
          <Text variant="lead" tone="onDarkMuted" className="mt-3 max-w-90">
            {support.description}
          </Text>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            text={support.cta.label}
            href={support.cta.href}
            variant="accent"
            size="md"
            endIcon={<ArrowRightIcon size={16} />}
            className="max-sm:w-full"
          />
          {support.channels.map((channel) => (
            <Button
              key={channel.label}
              text={channel.label}
              href={channel.href}
              variant="glassOnDark"
              size="md"
              startIcon={channelIcons[channel.icon]}
              className="max-sm:flex-1 max-sm:px-3"
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
