import { Hero } from "@/components/sections/hero";
import { SolutionsShowcase } from "@/components/sections/solutions-showcase";
import { Services } from "@/components/sections/services";
import { FeaturedOffers } from "@/components/sections/featured-offers";
import { TeamBento } from "@/components/sections/team-bento";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { OfficeBento } from "@/components/sections/office-bento";
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
      <TeamBento />
      <WhoWeAre />
      <OfficeBento />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
