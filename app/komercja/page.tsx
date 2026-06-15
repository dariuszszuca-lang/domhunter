import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building, Briefcase, Warehouse, Hotel } from "lucide-react";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Komercja — Biura, lokale, magazyny",
  description: "Pośrednictwo w obrocie nieruchomościami komercyjnymi w Trójmieście. Biura, lokale handlowe, magazyny, pensjonaty.",
};

const segments = [
  {
    icon: Briefcase,
    title: "Biura",
    body: "Powierzchnie biurowe w Trójmieście. Coworking, biura serwisowane, klasyczne najmy. Dla startupów i dużych firm.",
  },
  {
    icon: Building,
    title: "Lokale handlowe",
    body: "Witryny przy głównych ulicach, lokale w galeriach, restauracje, kawiarnie. Wycena potencjału ruchu pieszego.",
  },
  {
    icon: Warehouse,
    title: "Magazyny i hale",
    body: "Powierzchnie magazynowe, logistyczne, produkcyjne. Bliskość portu w Gdańsku, drogi krajowe, parametry techniczne.",
  },
  {
    icon: Hotel,
    title: "Pensjonaty i obiekty",
    body: "Apartamenty pod wynajem krótkoterminowy, pensjonaty nadmorskie, hotele butikowe. Analiza opłacalności inwestycji.",
  },
];

export default function KomercjaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 lg:pt-16 pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(196,48,119,0.10),transparent_55%)]"
        />
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
              Komercja
            </p>
            <h1 className="font-sans font-semibold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.025em] text-foreground">
              Nieruchomości
              <br />
              <span className="italic text-brand">komercyjne.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-foreground-muted leading-[1.55] max-w-2xl">
              Dedykowany agent dla każdego segmentu. Znamy lokalne realia, mamy bazę najemców i właścicieli z całego Trójmiasta. Wycena, prezentacja, negocjacje, dokumenty.
            </p>
            <Link
              href="/kontakt"
              className="mt-10 inline-flex items-center gap-2.5 pl-7 pr-3 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand transition-all"
            >
              Porozmawiaj z agentem
              <span className="inline-flex items-center justify-center size-9 rounded-full bg-background/15">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Segments */}
      <section className="py-24 lg:py-32">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {segments.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-3xl bg-surface border border-border p-8 lg:p-10 hover:border-brand transition-all"
                >
                  <span className="inline-flex items-center justify-center size-12 rounded-xl bg-brand-light text-brand mb-6">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl tracking-[-0.015em] text-foreground mb-3">
                    {s.title}
                  </h3>
                  <p className="text-base text-foreground-muted leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
