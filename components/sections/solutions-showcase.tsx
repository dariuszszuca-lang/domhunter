import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Home, Building, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";

const solutions = [
  {
    num: "01",
    label: "Mieszkania",
    icon: Home,
    title: "Mieszkania",
    body: "Sprzedaż i kupno mieszkań w Trójmieście. Apartamenty, lokale w kamienicach, nowe inwestycje. Wynajem długoterminowy.",
    image: "/images/hero-luxury-3.jpg",
    href: "/oferty?type=mieszkanie",
  },
  {
    num: "02",
    label: "Domy i działki",
    icon: Building2,
    title: "Domy i działki",
    body: "Domy jednorodzinne i działki budowlane w Gdańsku, Pomorskim, na Mierzei Wiślanej. Sprzedaż i wynajem.",
    image: "/images/hero-luxury-2.jpg",
    href: "/oferty?type=dom",
  },
  {
    num: "03",
    label: "Komercja",
    icon: Building,
    title: "Komercja",
    body: "Biura, lokale handlowe, magazyny, pensjonaty. Dedykowany agent dla każdego segmentu, znajomość lokalnego rynku.",
    image: "/images/hero-luxury-1.jpg",
    href: "/komercja",
  },
];

export function SolutionsShowcase() {
  return (
    <section id="service" className="py-20 lg:py-28">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-4">
              Co oferujemy
            </p>
            <h2 className="font-sans font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.04] tracking-[-0.02em] text-foreground">
              Kompleksowe rozwiązania
              <br />
              <span className="italic text-brand">dla nieruchomości.</span>
            </h2>
            <p className="mt-5 text-base lg:text-lg text-foreground-muted leading-relaxed">
              Sprzedaż, kupno, wynajem i komercja w Trójmieście. Każdy segment, dedykowany agent.
            </p>
          </div>
          <Link
            href="/oferty"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:border-brand/45 hover:bg-brand/5 transition-all shrink-0"
          >
            Wszystkie oferty
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* BENTO 3 KART: featured (mieszkania) + 2 mniejsze */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 auto-rows-[minmax(280px,auto)]">
          {solutions.map((sol, index) => {
            const isFeatured = index === 0;
            const colSpan = isFeatured ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-6";

            return (
              <Link
                key={sol.num}
                href={sol.href}
                className={`group relative overflow-hidden rounded-[32px] bg-foreground text-white border border-border shadow-[0_2px_8px_-2px_rgba(25,25,25,0.06)] hover:shadow-[0_28px_72px_-20px_rgba(153,26,117,0.25)] hover:-translate-y-1 transition-all duration-500 flex flex-col ${colSpan}`}
              >
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  sizes={isFeatured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay - subtle */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-foreground/10 group-hover:from-foreground/90 transition-all duration-500"
                />
                {/* Brand accent on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-brand/0 via-transparent to-brand/0 group-hover:from-brand/10 group-hover:to-brand/0 transition-all duration-500"
                />

                {/* Top: number */}
                <div className="relative z-10 p-7 lg:p-9 flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                    {sol.num}
                  </span>
                  <div className="size-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-brand/40 group-hover:border-brand/60 transition-all duration-300">
                    <sol.icon className="size-5 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Spacer push */}
                <div className="flex-1" />

                {/* Bottom: title + body + CTA */}
                <div className="relative z-10 p-7 lg:p-9 pt-0">
                  <h3 className={`font-sans font-bold leading-[1.05] tracking-tight text-white mb-4 ${
                    isFeatured ? "text-3xl lg:text-5xl" : "text-2xl lg:text-3xl"
                  }`}>
                    {sol.title}
                  </h3>
                  <p className={`text-white/80 leading-relaxed mb-6 ${
                    isFeatured ? "text-base lg:text-lg max-w-md" : "text-sm lg:text-base max-w-sm"
                  }`}>
                    {sol.body}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                    Zobacz ofertę
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
