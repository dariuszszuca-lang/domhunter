/* Dolne sekcje /kredyty: jak to działa, dla kogo, przed i po, pytania, zaproszenie.
 * Każda sekcja pokazuje rzecz, a nie ikonę: mini ekrany kalkulatora, zdjęcia prawdziwych ofert, porównanie. */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, X, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const Znak = ({ children, jasny = false }: { children: React.ReactNode; jasny?: boolean }) => (
  <p className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] ${jasny ? "text-white/70" : "text-brand"}`}>{children}</p>
);

/* ---------- JAK TO DZIAŁA: trzy kroki, każdy z małym ekranem ---------- */

function EkranSuwaki() {
  return (
    <div className="space-y-4 rounded-2xl bg-surface-cream p-5">
      {[
        ["Kwota kredytu", "480 000", 46],
        ["Okres", "30 lat", 82],
        ["Wartość mieszkania", "600 000", 38],
      ].map(([l, w, p]) => (
        <div key={l as string}>
          <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.14em] text-brand-deep">
            {l}
            <span className="font-display text-lg normal-case tracking-normal text-foreground">{w}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[#ece6ea]">
            <div className="relative h-full rounded-full bg-brand" style={{ width: `${p}%` }}>
              <span className="absolute -right-2 -top-[5px] size-4 rounded-full border-2 border-brand bg-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EkranBanki() {
  const wiersze = [
    { w: 92, naj: true },
    { w: 78, naj: false },
    { w: 66, naj: false },
  ];
  return (
    <div className="space-y-2.5 rounded-2xl bg-surface-cream p-4">
      {wiersze.map((r, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 rounded-xl border bg-white px-3 py-3 ${r.naj ? "border-brand shadow-[0_12px_30px_-18px_rgba(211,30,192,0.8)]" : "border-[#ece6ea]"}`}
        >
          <span className="size-8 shrink-0 rounded-lg bg-[#ece6ea]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 rounded-full bg-[#ece6ea]" style={{ width: `${r.w}%` }} />
            <div className="h-2 w-1/3 rounded-full bg-[#f3eff1]" />
          </div>
          <span className={`h-6 w-14 shrink-0 rounded-full ${r.naj ? "bg-brand" : "bg-[#ece6ea]"}`} />
        </div>
      ))}
      <p className="pt-1 text-center text-[11px] uppercase tracking-[0.16em] text-brand-deep">od najniższej raty</p>
    </div>
  );
}

function EkranTelefon() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-surface-cream p-5">
      <div className="w-[170px] rounded-[26px] border-[6px] border-foreground bg-white p-3 shadow-xl">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-foreground/80" />
        <div className="flex flex-col items-center py-3 text-center">
          <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-brand text-white">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
            <Phone className="relative size-5" />
          </span>
          <p className="mt-3 text-[11px] text-foreground-subtle">Dzwoni</p>
          <p className="font-display text-base text-foreground">Dom Hunter</p>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <span className="rounded-full bg-[#f3eff1] py-1.5 text-center text-[10px] text-foreground-subtle">Później</span>
          <span className="rounded-full bg-brand py-1.5 text-center text-[10px] font-semibold text-white">Odbierz</span>
        </div>
      </div>
    </div>
  );
}

export function JakToDziala() {
  const kroki = [
    { t: "Ustawiasz swoje liczby", o: "Kwota, okres, wartość mieszkania i wiek. Suwakiem albo wpisując wprost.", e: <EkranSuwaki /> },
    { t: "Widzisz banki obok siebie", o: "Rata, oprocentowanie, RRSO i koszt całkowity, od najniższej raty.", e: <EkranBanki /> },
    { t: "Oddzwaniamy", o: "Klikasz przy banku, zostawiasz numer. Rozmawiamy o Twojej sytuacji, bez zobowiązań.", e: <EkranTelefon /> },
  ];
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Container size="wide">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Znak>Jak to działa</Znak>
            <h2 className="font-display font-normal text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-foreground">
              Od suwaka do rozmowy <span className="italic text-brand">w trzech ruchach.</span>
            </h2>
          </div>
          <p className="max-w-sm text-foreground-muted">Bez logowania, bez zakładania konta i bez podawania danych, dopóki sam nie zechcesz rozmowy.</p>
        </div>
        <div className="relative grid gap-6 md:grid-cols-3">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-[38px] hidden border-t-2 border-dashed border-brand/30 md:block" />
          {kroki.map((k, i) => (
            <Reveal key={k.t} delay={i * 0.12}>
              <div className="relative">
                <span className="relative z-10 mb-6 inline-flex size-[76px] items-center justify-center rounded-full border border-brand/25 bg-surface font-display text-4xl text-brand shadow-[0_18px_40px_-24px_rgba(211,30,192,0.8)]">
                  {i + 1}
                </span>
                <div className="rounded-[26px] border border-border bg-surface p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-40px_rgba(109,19,84,0.55)]">
                  {k.e}
                  <h3 className="mt-6 font-display text-2xl tracking-[-0.015em] text-foreground">{k.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{k.o}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- DLA KOGO: kafle na zdjęciach prawdziwych ofert ---------- */

export function DlaKogo({ zdjecia }: { zdjecia: string[] }) {
  const osoby = [
    { t: "Kupujesz pierwsze mieszkanie", o: "Sprawdzasz, na jaką ratę Cię stać, zanim zaczniesz oglądać. Szukasz w realnym budżecie.", k: "lg:col-span-2 lg:row-span-2", duzy: true },
    { t: "Zmieniasz na większe", o: "Liczysz, ile dołożyć do sprzedaży obecnego mieszkania i jak zmieni się rata.", k: "" },
    { t: "Kupujesz pod wynajem", o: "Porównujesz ratę z czynszem, jaki da się uzyskać w Trójmieście.", k: "" },
    { t: "Sprzedajesz z nami", o: "Kupujący bierze kredyt? Pokazujemy mu ratę przy Twojej ofercie, więc szybciej decyduje.", k: "lg:col-span-2" },
  ];
  return (
    <section className="bg-gradient-to-b from-surface-cream to-brand-light py-20 text-white lg:py-28">
      <Container size="wide">
        <div className="mb-12 max-w-2xl">
          <Znak>Dla kogo</Znak>
          <h2 className="font-display font-normal text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-foreground">
            Dla każdego, kto kupuje <span className="italic text-brand">z głową.</span>
          </h2>
        </div>
        <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-4">
          {osoby.map((os, i) => (
            <Reveal key={os.t} delay={i * 0.08} className={os.k}>
              <div className="group relative h-full overflow-hidden rounded-[26px]">
                {zdjecia[i] ? (
                  <Image src={zdjecia[i]} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07]" />
                ) : (
                  <div className="absolute inset-0 bg-brand-deep" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0716]/95 via-[#1a0716]/45 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-brand/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-brand/25" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                  <span className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-brand">
                    <ArrowUpRight className="size-4" />
                  </span>
                  <h3 className={`font-display tracking-[-0.015em] ${os.duzy ? "text-3xl lg:text-5xl" : "text-2xl"}`}>{os.t}</h3>
                  <p className={`mt-2 max-w-md text-[15px] leading-relaxed text-white/80 ${os.duzy ? "" : "lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-32 lg:group-hover:opacity-100"}`}>
                    {os.o}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-foreground-subtle">Zdjęcia: aktualne oferty Dom Hunter.</p>
      </Container>
    </section>
  );
}

/* ---------- PRZED I PO: zwykle vs najpierw rata ---------- */

export function PrzedIPo() {
  const zwykle = [
    "Oglądasz kilkanaście mieszkań",
    "Zakochujesz się w jednym",
    "Bank liczy zdolność dopiero teraz",
    "Rata wychodzi wyższa, niż myślałeś",
    "Szukasz od nowa",
  ];
  const zNami = [
    "Liczysz ratę w minutę",
    "Widzisz oferty banków obok siebie",
    "Oglądasz tylko mieszkania w budżecie",
    "Rozmawiasz o kredycie z kimś, kto zna rynek",
    "Kupujesz spokojnie",
  ];
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="mb-12 max-w-3xl">
          <Znak>Co zyskujesz</Znak>
          <h2 className="font-display font-normal text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-foreground">
            Ta sama droga. <span className="italic text-brand">Inna kolejność.</span>
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[28px] border border-border bg-surface-muted p-8 lg:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-subtle">Tak jest zwykle</p>
              <ol className="mt-6 space-y-4">
                {zwykle.map((z, i) => (
                  <li key={z} className="flex items-center gap-4 text-lg text-foreground-muted">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-sm text-foreground-subtle">{i + 1}</span>
                    <span className={i === 4 ? "line-through decoration-foreground-subtle/60" : ""}>{z}</span>
                    {i === 3 && <X className="ml-auto size-5 shrink-0 text-foreground-subtle" />}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-[28px] bg-gradient-to-br from-brand to-brand-deep p-8 text-white shadow-[0_40px_90px_-45px_rgba(211,30,192,0.9)] lg:p-10">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
              <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">Najpierw rata, z Dom Hunter</p>
              <ol className="relative mt-6 space-y-4">
                {zNami.map((z) => (
                  <li key={z} className="flex items-center gap-4 text-lg">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    {z}
                  </li>
                ))}
              </ol>
              <a href="#kalkulator" className="relative mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-deep transition-transform hover:-translate-y-0.5">
                Policz ratę teraz <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------- PYTANIA ---------- */

const pytania = [
  { q: "Czy kalkulator jest płatny?", a: "Nie. Liczysz bez logowania i bez podawania danych. Numer telefonu zostawiasz tylko wtedy, gdy chcesz, żebyśmy oddzwonili." },
  { q: "Czy wynik to oferta banku?", a: "Nie. Wyniki są orientacyjne i nie są ofertą w rozumieniu prawa. Ostateczne warunki, w tym oprocentowanie i zdolność, ustala bank po analizie wniosku." },
  { q: "Skąd są dane o ratach?", a: "Kalkulator działa na silniku SpeedFin, porównywarki kredytów hipotecznych firmy Finance Development z Poznania. Raty liczy na podstawie aktualnych ofert banków." },
  { q: "Dlaczego nie widzę żadnego banku?", a: "Najczęściej kwota kredytu jest za wysoka w stosunku do wartości nieruchomości. Banki pożyczają zwykle do 80 lub 90% wartości. Zmień kwotę albo wartość i kliknij jeszcze raz." },
  { q: "Muszę kupować mieszkanie przez Dom Hunter?", a: "Nie. Z kalkulatora możesz korzystać, nawet jeśli kupujesz gdzie indziej. Jeśli szukasz w Trójmieście, chętnie pomożemy też z wyborem nieruchomości." },
  { q: "Co się dzieje po wysłaniu zapytania?", a: "Zapytanie trafia do biura Dom Hunter. Oddzwaniamy, rozmawiamy o Twojej sytuacji i ustalamy kolejne kroki." },
];

export function Pytania() {
  return (
    <section className="bg-surface-cream py-20 lg:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Znak>Pytania</Znak>
            <h2 className="font-display font-normal text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-foreground">
              Krótko i <span className="italic text-brand">konkretnie.</span>
            </h2>
            <div className="mt-8 rounded-[24px] border border-brand/20 bg-surface p-6">
              <p className="text-foreground-muted">Nie ma tu Twojego pytania?</p>
              <a href="tel:+48585334323" className="mt-2 inline-flex items-center gap-2 font-display text-3xl text-foreground hover:text-brand">
                <Phone className="size-6 text-brand" /> 58 533 43 23
              </a>
            </div>
          </div>
          <div className="space-y-3">
            {pytania.map((p, i) => (
              <Reveal key={p.q} delay={i * 0.05}>
                <details className="group rounded-[22px] border border-border bg-surface px-6 py-5 transition-all open:border-brand/40 open:shadow-[0_24px_60px_-40px_rgba(211,30,192,0.7)] lg:px-8">
                  <summary className="flex cursor-pointer list-none items-center gap-5 text-lg font-medium text-foreground">
                    <span className="font-display text-2xl text-brand/40 transition-colors group-open:text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{p.q}</span>
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-lg text-brand transition-all group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">+</span>
                  </summary>
                  <p className="mt-3 pl-[52px] text-base leading-relaxed text-foreground-muted">{p.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- ZAPROSZENIE: pełna szerokość, magenta ---------- */

export function Zaproszenie({ zdjecie }: { zdjecie?: string }) {
  return (
    <section className="px-3 py-16 sm:px-5 lg:py-24">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[36px] bg-brand">
        {zdjecie && <Image src={zdjecie} alt="" fill sizes="100vw" className="object-cover opacity-25 mix-blend-multiply" />}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_120%_at_85%_0%,rgba(255,255,255,0.25),transparent_55%),linear-gradient(120deg,rgba(109,19,84,0.85),rgba(211,30,192,0.55))]" />
        <div className="relative px-7 py-16 text-white sm:px-12 lg:px-20 lg:py-24">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">Następny krok</p>
          <h2 className="max-w-4xl font-display font-normal text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.98] tracking-[-0.02em]">
            Masz już ratę? <span className="italic">Znajdźmy mieszkanie.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Powiedz, w jakim budżecie szukasz. Pokażemy oferty w Trójmieście, także te, których nie ma na portalach.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="tel:+48585334323" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand-deep transition-transform hover:-translate-y-0.5">
              <Phone className="size-4" /> Zadzwoń, 58 533 43 23
            </a>
            <Link href="/oferty" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-deep">
              Przeglądaj oferty <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
