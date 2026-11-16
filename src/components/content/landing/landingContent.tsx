import SiteFooter from "@/components/layouts/siteFooter";
import SiteHeader from "@/components/layouts/siteHeader";
import Text from "@/components/ui/typography/text";
import { navigation } from "@/data/navigation";

// TEMPORARY until parts 5 to 8: one tall placeholder per nav anchor, so the header links,
// scroll offsets and mobile menu can be tested. Each is replaced by its real section.
const placeholderSections = navigation.links.map((link) => ({
  id: link.href.replace("/#", ""),
  label: link.label,
}));

export default function LandingContent() {
  return (
    <>
      <SiteHeader />
      <main>
        {placeholderSections.map((section) => (
          <section key={section.id} id={section.id} className="mx-auto min-h-[90vh] max-w-7xl px-5 py-16 md:px-8">
            <Text variant="section" as={section.id === "top" ? "h1" : "h2"}>
              {section.label}
            </Text>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
