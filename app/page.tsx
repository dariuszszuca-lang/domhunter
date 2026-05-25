import { Hero } from "@/components/sections/hero";
import { FeaturedOffers } from "@/components/sections/featured-offers";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { WycenaCta } from "@/components/sections/wycena-cta";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedOffers />
      <WhyUs />
      <WycenaCta />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
