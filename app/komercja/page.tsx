import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building, Briefcase, Warehouse, Hotel, MapPin, Check } from "lucide-react";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Nieruchomości komercyjne Trójmiasto i Gdańsk",
  description:
    "Dom Hunter pośredniczy w obrocie nieruchomościami komercyjnymi w Gdańsku i całym Trójmieście. Biura, lokale handlowe, magazyny, hale, grunty inwestycyjne. Wycena, prezentacja, negocjacje, dokumenty.",
};

const segments = [
  {
    icon: Briefcase,
    title: "Biura",
    body: "Powierzchnie biurowe w całym Trójmieście. Biura współdzielone, serwisowane i klasyczne najmy. Dla młodych firm i dużych organizacji.",
  },
  {
    icon: Building,
    title: "Lokale handlowe",
    body: "Witryny przy głównych ulicach, lokale w galeriach, restauracje i kawiarnie. Oceniamy potencjał ruchu pieszego i widoczność.",
  },
  {
    icon: Warehouse,
    title: "Magazyny i hale",
    body: "Powierzchnie magazynowe, logistyczne i produkcyjne. Bliskość portu w Gdańsku, dróg krajowych i parametry techniczne.",
  },
  {
    icon: Hotel,
    title: "Pensjonaty i obiekty",
    body: "Mieszkania pod wynajem krótkoterminowy, pensjonaty nad morzem i kameralne hotele. Liczymy opłacalność inwestycji.",
  },
];

const atuty = [
  "Własna baza najemców i właścicieli z całego Trójmiasta",
  "Analiza opłacalności i potencjału lokalizacji przed decyzją",
  "Bliskość portu w Gdańsku, lotniska i tras krajowych",
  "Pełna obsługa, od wyceny przez negocjacje po podpis umowy",
];

export default function KomercjaPage() {
  return (
    <>
      {/* HERO — jasne, w stylu pozostałych podstron */}
      <section className="pt-20 pb-4 lg:pt-28 lg:pb-8">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              <MapPin className="size-3.5" />
              Komercja · Trójmiasto
            </p>
            <h1 className="font-display font-normal text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.03] tracking-[-0.01em] text-foreground">
              Przestrzeń, w której <span className="italic text-brand">rośnie biznes.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
              Biura, lokale handlowe, magazyny i grunty inwestycyjne w całym Trójmieście. Każdy segment
              prowadzi osobny agent z bazą najemców i właścicieli oraz znajomością lokalnych realiów.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand py-2 pl-7 pr-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hover"
              >
                Porozmawiaj z agentem
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
              <Link
                href="/oferty"
                className="inline-flex items-center rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
              >
                Zobacz oferty
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* SEGMENTY */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Segmenty
            </p>
            <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Cztery rynki, <span className="italic text-brand">jedno biuro.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {segments.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="group rounded-[24px] border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px] hover:shadow-brand/40 lg:p-10"
                >
                  <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-3 font-display text-2xl tracking-[-0.015em] text-foreground lg:text-3xl">
                    {s.title}
                  </h3>
                  <p className="text-base leading-relaxed text-foreground-muted">{s.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* DLACZEGO MY — zdjęcie + atuty */}
      <section className="bg-surface-cream py-20 lg:py-28">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-border shadow-soft">
              <Image
                src="/images/komercja-biuro.jpg"
                alt="Biuro z dużymi oknami i widokiem na ulicę w Trójmieście"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Dlaczego my
              </p>
              <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Komercja to inna gra. <span className="italic text-brand">Gramy w nią od lat.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground-muted">
                Lokal pod gastronomię, biuro dla zespołu, hala przy porcie czy grunt pod inwestycję.
                Każdy z tych tematów ma inne pułapki i innych kupujących. Znamy je z setek rozmów na
                trójmiejskim rynku.
              </p>
              <ul className="mt-8 space-y-3.5">
                {atuty.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-base text-foreground">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Check className="size-3.5" strokeWidth={2.4} />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-[28px] border border-brand/30 bg-surface-cream px-8 py-14 text-center sm:px-12 lg:py-20">
            <div
              aria-hidden
              className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-[90px]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display font-normal text-[clamp(1.9rem,4.4vw,3.3rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Masz lokal, biuro albo grunt? <span className="italic text-brand">Pogadajmy.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-foreground-muted">
                Powiedz, co masz albo czego szukasz. Dobierzemy agenta od konkretnego segmentu i
                ruszamy bez zobowiązań.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+48571309209"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Zadzwoń, 571 309 209
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
                >
                  Napisz do nas
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
