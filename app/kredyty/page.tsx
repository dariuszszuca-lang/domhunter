import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calculator,
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
import { KalkulatorPelny, LeadModal } from "@/components/kredyty/speedfin";
import { OfertyWBudzecie, type OfertaKarta } from "@/components/kredyty/oferty-w-budzecie";

export const metadata: Metadata = {
  title: "Kredyt hipoteczny: kalkulator rat i oferty banków",
  description:
    "Kalkulator kredytu hipotecznego Dom Hunter. Ustaw kwotę, okres i wartość nieruchomości, zobacz raty, oprocentowanie, RRSO i koszt całkowity w bankach. Bezpłatnie, bez logowania. Trójmiasto.",
  alternates: { canonical: "/kredyty" },
};

export const revalidate = 3600;

/** Oferty na sprzedaż do sekcji „Ile chcesz płacić?”: mieszkania i domy ze zdjęciem, rozsądny przedział cen. */
async function ofertyDoBudzetu(): Promise<OfertaKarta[]> {
  const oferty = (await readOffers())?.offers ?? [];
  return oferty
    .filter(
      (o) =>
        o.transaction === "sprzedaz" &&
        (o.type === "mieszkanie" || o.type === "dom") &&
        o.price >= 150_000 &&
        o.price <= 2_500_000 &&
        o.images?.length
    )
    .sort((x, y) => x.price - y.price)
    .filter((_, i, all) => all.length <= 12 || i % Math.ceil(all.length / 12) === 0) // równo z całego przedziału cen
    .slice(0, 12)
    .map((o: Offer) => ({
      id: o.id,
      tytul: o.title,
      cena: o.price,
      metraz: o.area || undefined,
      pokoje: o.rooms || undefined,
      miejsce: [o.district, o.city].filter(Boolean).join(", "),
      zdjecie: (o.images.find((i) => i.primary) ?? o.images[0]).url,
    }));
}

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
  const oferty = await ofertyDoBudzetu();

  return (
    <>
      {/* START: krótki nagłówek i od razu kalkulator */}
      <section id="kalkulator" className="relative scroll-mt-24 overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full bg-brand/10 blur-[120px]" />
        <Container size="wide">
          <div className="relative mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                <Calculator className="size-3.5" />
                Kalkulator kredytu · SpeedFin
              </p>
              <h1 className="font-display font-normal text-[clamp(2.3rem,5.4vw,4rem)] leading-[1.0] tracking-[-0.015em] text-foreground">
                Najpierw rata. <span className="italic text-brand">Potem mieszkanie.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                Ustaw kwotę i kliknij. Zobaczysz ratę, oprocentowanie, RRSO i koszt całkowity w bankach. Bez logowania.
              </p>
            </div>
            <ol className="flex flex-wrap gap-2 text-sm text-foreground">
              {["Ustaw kwotę", "Pokaż oferty banków", "Umów rozmowę"].map((k, i) => (
                <li key={k} className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-white/70 px-4 py-2">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">{i + 1}</span>
                  {k}
                </li>
              ))}
            </ol>
          </div>
          <div className="relative rounded-[30px] border border-brand/15 bg-surface p-5 shadow-[0_50px_100px_-50px_rgba(109,19,84,0.45)] sm:p-8 lg:p-10">
            <KalkulatorPelny />
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-foreground-subtle">
            Wyniki mają charakter orientacyjny i nie są ofertą w rozumieniu przepisów prawa. Ostateczne warunki kredytu
            zależą od decyzji banku. Kalkulator: SpeedFin, Finance Development Sp. z o.o.
          </p>
        </Container>
      </section>

      {/* ILE CHCESZ PŁACIĆ: suwak raty + prawdziwe oferty z ratą od SpeedFin */}
      {oferty.length > 0 && (
        <section className="bg-gradient-to-b from-brand-light to-brand-blush py-20 lg:py-28">
          <Container size="wide">
            <OfertyWBudzecie oferty={oferty} />
            <div className="mt-10 text-center">
              <Link
                href="/oferty"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
              >
                Wszystkie oferty Dom Hunter
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* SPEEDFIN: kto stoi za kalkulatorem */}
      <section className="py-20 lg:py-24">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-[30px] border border-border bg-surface">
            <div className="grid items-end lg:grid-cols-[0.75fr_1.25fr]">
              <div className="relative flex h-[300px] items-end justify-center bg-gradient-to-b from-brand-light to-brand-blush lg:h-full lg:min-h-[420px]">
                <div aria-hidden className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-2xl" />
                <Image
                  src="/images/kredyty/tomasz-tasiemski.webp"
                  alt="Tomasz Tasiemski, twórca SpeedFin"
                  width={560}
                  height={915}
                  className="relative h-[290px] w-auto object-contain lg:h-[410px]"
                />
              </div>
              <div className="p-8 sm:p-10 lg:p-14">
                <Image src="/images/kredyty/speedfin-logo.png" alt="SpeedFin, porównywarka finansowa" width={400} height={113} className="h-11 w-auto" />
                <h2 className="mt-7 font-display font-normal text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] tracking-[-0.01em] text-foreground">
                  Kalkulator działa na silniku <span className="italic text-brand">SpeedFin.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
                  SpeedFin to porównywarka kredytów hipotecznych, którą stworzył Tomasz Tasiemski. Na co dzień
                  pracują na niej eksperci kredytowi w całej Polsce. My podpięliśmy ją pod naszą stronę, żebyś
                  ratę widział od razu, obok mieszkania.
                </p>
                <div className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-border pt-6">
                  <div>
                    <p className="font-display text-4xl text-foreground">4200+</p>
                    <p className="mt-1 text-xs text-foreground-subtle">specjalistów korzysta z SpeedFin</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl text-foreground">2,5 mln</p>
                    <p className="mt-1 text-xs text-foreground-subtle">symulacji kredytów rocznie</p>
                  </div>
                </div>
                <p className="mt-4 text-[11px] text-foreground-subtle">
                  Dane SpeedFin. Twórca: Tomasz Tasiemski, Finance Development Sp. z o.o.{" "}
                  <a href="https://kalkulator-hipoteczny.online/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-brand">
                    kalkulator-hipoteczny.online
                  </a>
                </p>
              </div>
            </div>
          </div>
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
