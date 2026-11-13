import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calculator,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { readOffers } from "@/lib/esti/store";
import type { Offer } from "@/lib/esti/types";
import { KalkulatorPelny, LeadModal } from "@/components/kredyty/speedfin";
import { OfertyWBudzecie, type OfertaKarta } from "@/components/kredyty/oferty-w-budzecie";
import { JakToDziala, DlaKogo, PrzedIPo, Pytania, Zaproszenie } from "@/components/kredyty/sekcje";

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
              <div className="relative flex h-[320px] items-end justify-center overflow-hidden bg-brand-deep lg:h-full lg:min-h-[440px]">
                {/* tło: rozmyty ekran SpeedFin w kolorach marki + poświata i pierścienie */}
                <Image src="/images/kredyty/speedfin-ekran.jpg" alt="" fill sizes="40vw" className="object-cover opacity-40 mix-blend-luminosity" aria-hidden />
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,rgba(211,30,192,0.85)_0%,rgba(109,19,84,0.75)_45%,rgba(40,8,32,0.92)_100%)]" />
                <div aria-hidden className="absolute left-1/2 top-[42%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
                <div aria-hidden className="absolute left-1/2 top-[42%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                <div aria-hidden className="absolute left-1/2 top-[45%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/50 blur-[70px]" />
                <span className="absolute left-5 top-5 z-10 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-deep">
                  Twórca SpeedFin
                </span>
                <span className="absolute bottom-5 left-5 z-10 font-display text-xl text-white drop-shadow lg:text-2xl">Tomasz Tasiemski</span>
                <Image
                  src="/images/kredyty/tomasz-tasiemski.webp"
                  alt="Tomasz Tasiemski, twórca SpeedFin"
                  width={560}
                  height={915}
                  className="relative h-[300px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] lg:h-[420px]"
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

      <JakToDziala />
      <DlaKogo zdjecia={[1, 5, 3, oferty.length - 1].map((i) => oferty[i]?.zdjecie).filter(Boolean) as string[]} />
      <PrzedIPo />
      <Pytania />
      <Zaproszenie zdjecie={oferty[7]?.zdjecie} />

      <LeadModal />
    </>
  );
}
