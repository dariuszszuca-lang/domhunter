import Link from "next/link";
import { Home, Search, KeyRound, Building, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const services = [
  {
    icon: Search,
    title: "Kupno",
    body: "Znajdziemy nieruchomość dopasowaną do Twoich potrzeb. Reprezentujemy Twój interes na każdym etapie.",
    href: "/strefa-kupujacego",
  },
  {
    icon: Home,
    title: "Sprzedaż",
    body: "Wycena, sesja, publikacja, pokazy, dokumenty. Zajmujemy się wszystkim od pierwszej rozmowy do aktu.",
    href: "/strefa-sprzedajacego",
  },
  {
    icon: KeyRound,
    title: "Wynajem",
    body: "Pokazujemy oferty dopasowane do budżetu i lokalizacji. Sprawdzamy umowy. Pomagamy się wprowadzić.",
    href: "/oferty?transakcja=najem",
  },
  {
    icon: Building,
    title: "Komercja",
    body: "Biura, lokale, magazyny i pensjonaty. Dedykowany doradca dla każdego segmentu.",
    href: "/komercja",
  },
];

export function Services() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <Container size="wide">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest mb-4">
            Co robimy
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-foreground">
            Cztery obszary. Jedno biuro.
          </h2>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
            Każdą sprawą zajmuje się dedykowany agent. Niezależnie od tego, czy szukasz mieszkania w Gdańsku, sprzedajesz dom czy wynajmujesz lokal pod biuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group relative flex flex-col gap-4 p-7 lg:p-8 rounded-2xl bg-background border border-border hover:border-brand-forest hover:shadow-card transition-all"
              >
                <span className="inline-flex items-center justify-center size-12 rounded-xl bg-brand-forest/8 text-brand-forest">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl lg:text-2xl tracking-tight text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{s.body}</p>
                </div>
                <ArrowUpRight className="size-5 text-foreground-subtle group-hover:text-brand-forest absolute top-7 right-7 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
