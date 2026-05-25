import { Hero } from "@/components/sections/hero";
import { SolutionsShowcase } from "@/components/sections/solutions-showcase";
import { Services } from "@/components/sections/services";
import { FeaturedOffers } from "@/components/sections/featured-offers";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SolutionsShowcase />
      <Services />
      <FeaturedOffers />
      <WhoWeAre />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
