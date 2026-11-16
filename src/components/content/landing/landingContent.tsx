import SiteFooter from "@/components/layouts/siteFooter";
import SiteHeader from "@/components/layouts/siteHeader";
import About from "./about";
import CarrierBands from "./carrierBands";
import ClosingCta from "./closingCta";
import Contact from "./contact";
import Faq from "./faq";
import Features from "./features";
import Hero from "./hero";
import HowItWorks from "./howItWorks";
import Services from "./services";
import Testimonials from "./testimonials";
import TrackShipment from "./trackShipment";

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
        <Services />
        <Testimonials />
        <Faq />
        <Contact />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
