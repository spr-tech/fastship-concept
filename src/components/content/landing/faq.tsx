import Accordion from "@/components/ui/accordion/accordion";
import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { faqs } from "@/data/faqs";

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="mx-auto flex max-w-7xl flex-wrap gap-10 px-5 pt-section-xs pb-section-xl md:px-8"
    >
      <Reveal className="flex-[1_1_300px]">
        <Text variant="section" id="faq-title">
          {faqs.title}
        </Text>
        <Text variant="lead" tone="body" className="mt-4">
          {faqs.intro.before}{" "}
          <a href={faqs.intro.link.href} className="font-semibold text-accent-text underline underline-offset-2">
            {faqs.intro.link.label}
          </a>
          {faqs.intro.after}
        </Text>
      </Reveal>

      {/* Native <details> elements: one open at a time, keyboard support and in-page search with no JavaScript. */}
      <Reveal index={1} className="min-w-0 flex-[2_1_480px]">
        <Accordion
          name="faq"
          items={faqs.items.map((faq) => ({ id: faq.id, title: faq.question, content: faq.answer }))}
        />
      </Reveal>
    </section>
  );
}
