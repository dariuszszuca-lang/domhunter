import Link from "next/link";
import { ArrowUpRight, Home, Search, KeyRound, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";

const solutions = [
  {
    num: "01",
    icon: Home,
    title: "Sprzedaż",
    body: "Wystawiamy i sprzedajemy mieszkania, domy i działki w Gdańsku i Trójmieście. Zaczynamy od darmowej wyceny, prowadzimy aż do aktu notarialnego.",
    href: "/oferty?transakcja=sprzedaz",
  },
  {
    num: "02",
    icon: Search,
    title: "Kupno",
    body: "Znajdziemy nieruchomość pod Twoje kryteria i budżet, także z ofert spoza portali.",
    href: "/oferty",
  },
  {
    num: "03",
    icon: KeyRound,
    title: "Wynajem",
    body: "Najem długoterminowy: bezpieczna umowa, weryfikacja najemcy, zarządzanie nieruchomością.",
    href: "/oferty?transakcja=najem",
  },
  {
    num: "04",
    icon: Building2,
    title: "Komercja",
    body: "Lokale, biura, magazyny i grunty inwestycyjne w Trójmieście i okolicy.",
    href: "/komercja",
  },
];

export function SolutionsShowcase() {
  return (
    <section id="service" className="py-20 lg:py-28">
      <Container size="wide">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Co oferujemy
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Kompleksowe rozwiązania
              <br />
              <span className="italic text-brand">dla nieruchomości.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
              Sprzedaż, kupno, wynajem, lokale komercyjne i darmowa wycena nieruchomości w Gdańsku i całym Trójmieście. Każdym obszarem zajmuje się agent, który zna lokalny rynek.
            </p>
          </div>
          <Link
            href="/oferty"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand/45 hover:bg-brand/5"
          >
            Wszystkie oferty
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.num}
                href={s.href}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_26px_60px_-32px_rgba(20,21,21,0.5)] lg:p-8"
              >
                <span className="absolute right-6 top-6 font-mono text-xs text-foreground-subtle">
                  {s.num}
                </span>
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-7" strokeWidth={1.6} />
                </span>
                <h3 className="mt-7 font-display text-[1.8rem] font-normal leading-none text-foreground">
                  {s.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {s.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
                  Zobacz oferty
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
