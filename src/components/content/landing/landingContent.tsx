import SiteFooter from "@/components/layouts/siteFooter";
import SiteHeader from "@/components/layouts/siteHeader";
import Text from "@/components/ui/typography/text";
import { navigation } from "@/data/navigation";
import About from "./about";
import CarrierBands from "./carrierBands";
import Features from "./features";
import Hero from "./hero";
import HowItWorks from "./howItWorks";
import TrackShipment from "./trackShipment";

const builtSections = ["top", "track", "about", "how"];

// TEMPORARY until parts 7 and 8: one tall placeholder per nav anchor not built yet, so the header
// links and scroll offsets can still be tested. Each is replaced by its real section.
const placeholderSections = navigation.links
  .map((link) => ({ id: link.href.replace("/#", ""), label: link.label }))
  .filter((section) => !builtSections.includes(section.id));

export default function LandingContent() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CarrierBands />
        <TrackShipment />
        <About />
        <HowItWorks />
        <Features />
        {placeholderSections.map((section) => (
          <section key={section.id} id={section.id} className="mx-auto min-h-[90vh] max-w-7xl px-5 py-16 md:px-8">
            <Text variant="section">{section.label}</Text>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
