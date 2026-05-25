import { Hero } from "@/components/sections/hero";
import { FeaturedOffers } from "@/components/sections/featured-offers";
import { Services } from "@/components/sections/services";
import { WycenaCta } from "@/components/sections/wycena-cta";
import { WhyUs } from "@/components/sections/why-us";
import { Contact } from "@/components/sections/contact";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedOffers />
      <Services />
      <WhyUs />
      <WycenaCta />
      <Contact />
    </>
  );
}
