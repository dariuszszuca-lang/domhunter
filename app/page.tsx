import { Hero } from "@/components/sections/hero";
import { QuickSearch } from "@/components/sections/quick-search";
import { SolutionsShowcase } from "@/components/sections/solutions-showcase";
import { Services } from "@/components/sections/services";
import { FeaturedOffers } from "@/components/sections/featured-offers";
import { TeamBento } from "@/components/sections/team-bento";
import { Testimonials } from "@/components/sections/testimonials";
import { Partners } from "@/components/sections/partners";
import { BlogTeaser } from "@/components/sections/blog-teaser";
import { FAQ } from "@/components/sections/faq";

// ISR: strona główna cache'owana 1h — wyróżnione oferty z cache, nie z API co wejście.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <FeaturedOffers />
      <SolutionsShowcase />
      <Services />
      <TeamBento />
      <Testimonials />
      <Partners />
      <BlogTeaser />
      <FAQ />
    </>
  );
}
