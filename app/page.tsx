import { Hero } from "@/components/sections/hero";
import { SearchBar } from "@/components/sections/search-bar";
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
      <SearchBar />
      <FeaturedOffers />
      <Services />
      <WycenaCta />
      <WhyUs />
      <Contact />
    </>
  );
}
