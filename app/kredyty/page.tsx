import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDown,
  Calculator,
  MapPin,
  Home,
  KeyRound,
  TrendingUp,
  Users,
  Check,
  Landmark,
  SlidersHorizontal,
  PhoneCall,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { readOffers } from "@/lib/esti/store";
import type { Offer } from "@/lib/esti/types";
import { KalkulatorPelny, RataPrzyOfercie, LeadModal } from "@/components/kredyty/speedfin";

export const metadata: Metadata = {
  title: "Kredyt hipoteczny: kalkulator rat i oferty banków",
  description:
    "Kalkulator kredytu hipotecznego Dom Hunter. Ustaw kwotę, okres i wartość nieruchomości, zobacz raty, oprocentowanie, RRSO i koszt całkowity w bankach. Bezpłatnie, bez logowania. Trójmiasto.",
  alternates: { canonical: "/kredyty" },
};

export const revalidate = 3600;

/** Prawdziwa oferta z Esti do karty w hero: mieszkanie na sprzedaż ze zdjęciem. */
async function ofertaDoHero(): Promise<Offer | null> {
  const oferty = (await readOffers())?.offers ?? [];
  const naSprzedaz = oferty.filter((o) => o.transaction === "sprzedaz" && o.price > 0 && o.images?.length);
  return (
    naSprzedaz.find((o) => o.type === "mieszkanie" && o.price >= 350_000 && o.price <= 1_200_000) ??
    naSprzedaz.find((o) => o.type === "mieszkanie") ??
    naSprzedaz[0] ??
    null
  );
}

const zl = (n: number) => new Intl.NumberFormat("pl-PL").format(n) + " zł";

const kroki = [
  {
    icon: SlidersHorizontal,
    title: "Ustawiasz swoje liczby",
    body: "Kwota kredytu, okres spłaty, wartość nieruchomości i Twój wiek. Suwakiem albo wpisując wprost.",
  },
  {
    icon: Landmark,
    title: "Widzisz oferty banków",
    body: "Ratę, oprocentowanie, RRSO i koszt całkowity w kilkunastu bankach naraz, ułożone od najniższej raty.",
  },
  {
    icon: PhoneCall,
    title: "Umawiasz rozmowę",
    body: "Klikasz przy wybranym banku, zostawiasz numer, a my oddzwaniamy. Bez zobowiązań.",
  },
];

const dlaKogo = [
  {
    icon: KeyRound,
    title: "Kupujesz pierwsze mieszkanie",
    body: "Sprawdzasz, na jaką ratę Cię stać, zanim zaczniesz oglądać. Szukasz w realnym budżecie, nie w marzeniach z portalu.",
  },
  {
    icon: Home,
    title: "Zmieniasz mieszkanie na większe",
    body: "Liczysz, ile dołożyć do sprzedaży obecnego mieszkania i jak zmieni się rata. Jeden plan na sprzedaż i zakup.",
  },
  {
    icon: TrendingUp,
    title: "Kupujesz pod wynajem",
    body: "Porównujesz ratę z czynszem, jaki da się uzyskać w Trójmieście. Od razu widać, czy inwestycja się spina.",
  },
  {
    icon: Users,
    title: "Sprzedajesz z nami",
    body: "Twój kupujący bierze kredyt? Pokazujemy mu ratę przy ofercie, więc szybciej wie, czy to mieszkanie dla niego.",
  },
];

const zyski = [
  "Raty z kilkunastu banków w jednym miejscu, bez chodzenia po oddziałach",
  "Oprocentowanie, RRSO i koszt całkowity obok siebie, łatwo porównać",
  "Rata obok ceny mieszkania, zanim umówisz oglądanie",
  "Bez logowania i bez podawania danych, dopóki sam nie zechcesz rozmowy",
  "Agent, który zna rynek w Trójmieście i rozumie etap finansowania",
];

const pytania = [
  {
    q: "Czy kalkulator jest płatny?",
    a: "Nie. Liczysz bez logowania i bez podawania danych. Numer telefonu zostawiasz tylko wtedy, gdy chcesz, żebyśmy oddzwonili.",
  },
  {
    q: "Czy wynik to oferta banku?",
    a: "Nie. Wyniki są orientacyjne i nie są ofertą w rozumieniu prawa. Ostateczne warunki, w tym oprocentowanie i zdolność, ustala bank po analizie wniosku.",
  },
  {
    q: "Skąd są dane o ratach?",
    a: "Kalkulator działa na silniku SpeedFin, porównywarki kredytów hipotecznych firmy Finance Development z Poznania. Raty liczy na podstawie aktualnych ofert banków.",
  },
  {
    q: "Muszę kupować mieszkanie przez Dom Hunter?",
    a: "Nie. Z kalkulatora możesz korzystać, nawet jeśli kupujesz gdzie indziej. Jeśli szukasz w Trójmieście, chętnie pomożemy też z wyborem nieruchomości.",
  },
  {
    q: "Co się dzieje po wysłaniu zapytania?",
    a: "Zapytanie trafia do biura Dom Hunter. Oddzwaniamy, rozmawiamy o Twojej sytuacji i ustalamy kolejne kroki.",
  },
];

export default async function KredytyPage() {
  const oferta = await ofertaDoHero();
  const zdjecie = oferta?.images.find((i) => i.primary)?.url ?? oferta?.images[0]?.url;
  const miejsce = oferta ? [oferta.district, oferta.city].filter(Boolean).join(", ") : "";

  return (
    <>
      {/* HERO: hasło + prawdziwa oferta z ratą liczoną na żywo */}
      <section className="relative overflow-hidden pt-16 pb-16 lg:pt-24 lg:pb-24">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/10 blur-[120px]" />
        <Container size="wide">
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                <Calculator className="size-3.5" />
                Kredyty · Trójmiasto
              </p>
              <h1 className="font-display font-normal text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.0] tracking-[-0.015em] text-foreground">
                Najpierw rata.{" "}
                <span className="italic text-brand">Potem mieszkanie.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
                Policz kredyt hipoteczny w kilkanaście sekund. Zobaczysz ratę, oprocentowanie, RRSO i koszt
                całkowity w bankach, a gdy coś Ci się spodoba, oddzwonimy i poprowadzimy dalej.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#kalkulator"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-brand py-2 pl-7 pr-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Policz swoją ratę
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                    <ArrowDown className="size-4" />
                  </span>
                </a>
                <Link
                  href="/oferty"
                  className="inline-flex items-center rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
                >
                  Zobacz oferty
                </Link>
              </div>
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7">
                <div>
                  <p className="font-display text-4xl text-foreground">250+</p>
                  <p className="mt-1 text-xs leading-snug text-foreground-subtle">ofert kredytów hipotecznych</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-foreground">150+</p>
                  <p className="mt-1 text-xs leading-snug text-foreground-subtle">parametrów w obliczeniach</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-brand">0 zł</p>
                  <p className="mt-1 text-xs leading-snug text-foreground-subtle">za liczenie i rozmowę</p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-foreground-subtle">Liczby ofert i parametrów według SpeedFin.</p>
            </div>

            {/* Karta oferty z ratą na żywo */}
            <div className="relative mx-auto w-full max-w-[460px]">
              <div aria-hidden className="absolute -inset-4 rotate-[-3deg] rounded-[34px] bg-brand-blush" />
              <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_40px_80px_-40px_rgba(109,19,84,0.45)]">
                {oferta && zdjecie ? (
                  <Link href={`/oferty/${oferta.id}`} className="group relative block aspect-[2/1] overflow-hidden bg-foreground/5">
                    <Image src={zdjecie} alt={oferta.title} fill sizes="460px" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" priority />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
                      Oferta Dom Hunter
                    </span>
                  </Link>
                ) : null}
                <div className="p-5 sm:p-6">
                  {oferta ? (
                    <>
                      <p className="flex items-center gap-1.5 text-xs text-foreground-subtle">
                        <MapPin className="size-3.5" /> {miejsce}
                      </p>
                      <p className="mt-1 line-clamp-1 font-display text-xl text-foreground">{oferta.title}</p>
                      <p className="mt-1 text-sm text-foreground-muted">
                        Cena <b className="font-semibold text-foreground">{zl(oferta.price)}</b>
                        {oferta.area ? <> · {oferta.area} m²</> : null}
                      </p>
                    </>
                  ) : (
                    <p className="font-display text-xl text-foreground">Mieszkanie za 600 000 zł</p>
                  )}
                  <div className="mt-4 rounded-2xl bg-surface-cream p-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Rata liczona teraz, na żywo</p>
                    <RataPrzyOfercie cena={oferta?.price ?? 600_000} />
                  </div>
                </div>
              </div>
              <p className="relative mt-5 text-center text-xs text-foreground-subtle">
                Tak liczymy ratę przy prawdziwej ofercie. Przy 20% wkładu własnego.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* KALKULATOR */}
      <section id="kalkulator" className="scroll-mt-24 bg-surface-dark py-20 lg:py-28">
        <Container size="wide">
          <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-soft">Kalkulator kredytu hipotecznego</p>
              <h2 className="font-display font-normal text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-0.01em] text-white">
                Twoje liczby. <span className="italic text-brand-soft">Prawdziwe oferty banków.</span>
              </h2>
            </div>
            <ol className="flex flex-wrap gap-2 text-sm text-white/75">
              {["Ustaw kwotę", "Pokaż oferty", "Umów rozmowę"].map((k, i) => (
                <li key={k} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">{i + 1}</span>
                  {k}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[30px] bg-surface-cream p-5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)] sm:p-8 lg:p-10">
            <KalkulatorPelny />
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/55">
            Wyniki mają charakter orientacyjny i nie są ofertą w rozumieniu przepisów prawa. Ostateczne warunki kredytu
            zależą od decyzji banku. Kalkulator: SpeedFin, Finance Development Sp. z o.o.
          </p>
        </Container>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Jak to działa</p>
            <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Trzy kroki, <span className="italic text-brand">zero logowania.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {kroki.map((k, i) => {
              const Icon = k.icon;
              return (
                <div key={k.title} className="relative rounded-[24px] border border-border bg-surface p-8 lg:p-10">
                  <span className="absolute right-8 top-7 font-display text-6xl leading-none text-brand/15">{i + 1}</span>
                  <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-3 font-display text-2xl tracking-[-0.015em] text-foreground">{k.title}</h3>
                  <p className="text-base leading-relaxed text-foreground-muted">{k.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* DLA KOGO */}
      <section className="bg-surface-cream py-20 lg:py-28">
        <Container size="wide">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Dla kogo</p>
            <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Dla każdego, kto kupuje <span className="italic text-brand">z głową.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {dlaKogo.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="group rounded-[24px] border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px] hover:shadow-brand/40 lg:p-10"
                >
                  <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-3 font-display text-2xl tracking-[-0.015em] text-foreground lg:text-3xl">{d.title}</h3>
                  <p className="text-base leading-relaxed text-foreground-muted">{d.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CO ZYSKUJESZ */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Co zyskujesz</p>
              <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Kupujesz spokojnie, <span className="italic text-brand">bo wiesz, na co Cię stać.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground-muted">
                Najwięcej nerwów przy zakupie bierze się z niewiedzy o finansowaniu. Gdy rata jest policzona przed
                oglądaniem, rozmowa o mieszkaniu wygląda zupełnie inaczej.
              </p>
            </div>
            <ul className="space-y-3.5 lg:pt-12">
              {zyski.map((z) => (
                <li key={z} className="flex items-start gap-3 rounded-2xl border border-border bg-surface px-5 py-4 text-base text-foreground">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Check className="size-3.5" strokeWidth={2.4} />
                  </span>
                  {z}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* PYTANIA */}
      <section className="bg-surface-cream py-20 lg:py-28">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Pytania</p>
              <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Krótko i <span className="italic text-brand">konkretnie.</span>
              </h2>
            </div>
            <div className="divide-y divide-border rounded-[24px] border border-border bg-surface">
              {pytania.map((p) => (
                <details key={p.q} className="group px-6 py-5 lg:px-8">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-foreground">
                    {p.q}
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-brand transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-foreground-muted">{p.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-[28px] border border-brand/30 bg-surface-cream px-8 py-14 text-center sm:px-12 lg:py-20">
            <div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-[90px]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display font-normal text-[clamp(1.9rem,4.4vw,3.3rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Masz już ratę? <span className="italic text-brand">Znajdźmy mieszkanie.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-foreground-muted">
                Powiedz, w jakim budżecie szukasz. Pokażemy oferty w Trójmieście, także te, których nie ma na portalach.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+48585334323"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Zadzwoń, 58 533 43 23
                </a>
                <Link
                  href="/oferty"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
                >
                  Przeglądaj oferty
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LeadModal />
    </>
  );
}
