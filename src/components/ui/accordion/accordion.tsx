import { cn } from "@/utilities/helpers/cn";
import { PlusIcon } from "../icons/icons";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  /**
   * Shared by every item. Browsers keep only one <details> with the same name open at a time,
   * so this needs to be unique on the page.
   */
  name: string;
  /** Index of the item open on load. Pass -1 to start with all closed. */
  defaultOpenIndex?: number;
  className?: string;
};

/**
 * Built on native <details> elements instead of React state: opening, closing, keyboard use and
 * "only one open" all come from the browser, so this ships no JavaScript. The answers also stay in
 * the HTML when closed, so in-page search finds them and opens the right one.
 */
export default function Accordion({ items, name, defaultOpenIndex = 0, className }: AccordionProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => (
        <details
          key={item.id}
          name={name}
          open={index === defaultOpenIndex}
          className="group rounded-[18px] border border-border bg-surface"
        >
          <summary className="flex min-h-11 cursor-pointer rounded-[18px] list-none items-center justify-between gap-4 px-6 py-5.5 text-left text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.title}
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg text-ink transition-[rotate] duration-300 ease-out group-open:rotate-45 group-open:bg-accent"
            >
              <PlusIcon size={18} />
            </span>
          </summary>
          <p className="px-6 pb-5.5 leading-[1.6] text-text-body group-open:animate-fade-up group-open:[animation-duration:350ms]">
            {item.content}
          </p>
        </details>
      ))}
    </div>
  );
}
