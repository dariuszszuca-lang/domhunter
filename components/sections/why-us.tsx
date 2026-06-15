"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Phone, MapPin, Users, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: EASE },
};

const reasons = [
  {
    num: "01",
    title: "Lokalna wiedza",
    body: "Każdą dzielnicę Trójmiasta znamy z rozmów z klientami, nie z portali. Wiemy gdzie warto kupić, gdzie poczekać, a gdzie cena rośnie najszybciej.",
    pull: "Każda dzielnica ma swój charakter, swoją cenę i swoich ludzi.",
  },
  {
    num: "02",
    title: "Oferty spod lady",
    body: "Należymy do sieci Nieruchomości Spod Lady, ponad 2000 agentów w Polsce. Masz dostęp do ofert, których nie zobaczysz na portalach.",
    pull: "Najlepsze nieruchomości nigdy nie trafiają do publicznej sprzedaży.",
  },
  {
    num: "03",
    title: "Doświadczenie i kontakty",
    body: "Setki zrealizowanych transakcji. Wyrobione relacje z bankami, kancelariami, deweloperami i administratorami nieruchomości.",
    pull: "Dzwonimy do osoby, nie do działu.",
  },
];

const values = [
  {
    icon: MapPin,
    title: "Ludzie z Trójmiasta",
    body: "Nie z portali. Mieszkamy tu, znamy te ulice, te ceny i tych ludzi. Doradzamy tak, jak doradzilibyśmy rodzinie.",
  },
  {
    icon: Heart,
    title: "Szacunek do klienta",
    body: "Twoja sprawa to nie kolejny numer w systemie. Oddzwaniamy, tłumaczymy, jesteśmy obok do podpisu aktu i po nim.",
  },
  {
    icon: Users,
    title: "Jeden agent, cała sprawa",
    body: "Od pierwszej rozmowy po klucze prowadzi Cię jedna osoba. Bez przerzucania między działami, bez chaosu.",
  },
];

export function OnasContent() {
  return (
    <>
      {/* HERO: tekst + kolaż zdjęć */}
      <section className="relative overflow-hidden pt-10 lg:pt-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(211,30,192,0.10),transparent_55%)]"
        />
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div {...fadeUp}>
              <div className="mb-6 inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                O firmie
              </div>
              <h1 className="font-display font-normal text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em] text-foreground">
                Lokalne biuro
                <br />
                <span className="italic text-brand">z duszą.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-[1.6] text-foreground-muted lg:text-xl">
                Dom Hunter to biuro nieruchomości z Trójmiasta, stworzone przez doświadczonych
                pośredników. Ludzi, którzy zrealizowali setki transakcji i byli częścią sukcesu
                czołowych agencji w Polsce. Łączy nas pasja do tego, co robimy, i szacunek do
                klientów.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+48571309209"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_34px_-12px] shadow-brand/60 transition-all hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_20px_40px_-12px] hover:shadow-brand/70"
                >
                  <Phone className="size-4" strokeWidth={2} />
                  Porozmawiajmy
                </a>
                <Link
                  href="/zespol"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
                >
                  Poznaj zespół
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            {/* Kolaż zdjęć */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-10">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] border border-border shadow-soft">
                    <Image
                      src="/images/team/zespol-2.jpg"
                      alt="Agentka Dom Hunter z teczką ofertową biura"
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-[24px] border border-border shadow-soft">
                    <Image
                      src="/images/teczka-domhunter.jpg"
                      alt="Teczka ofertowa z logo Dom Hunter Nieruchomości"
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-[24px] border border-border shadow-soft">
                    <Image
                      src="/images/team/zespol-4.jpg"
                      alt="Agentka Dom Hunter w biurze w Gdańsku"
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] border border-border shadow-soft">
                    <Image
                      src="/images/o-firmie.jpg"
                      alt="Agentka Dom Hunter podczas pracy nad ofertami"
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Pływająca plakietka z liczbami */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-soft">
                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <p className="font-display text-2xl leading-none tabular-nums text-foreground">
                      {siteConfig.metrics.transactions}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-foreground-subtle">
                      Transakcji
                    </p>
                  </div>
                  <span aria-hidden className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="font-display text-2xl leading-none tabular-nums text-brand">
                      {siteConfig.metrics.rating}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-foreground-subtle">
                      Ocena
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* HISTORIA: zdjęcie + tekst */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-border shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/hero-team.jpg"
                  alt="Zespół Dom Hunter podczas pracy nad ofertą"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-foreground/55 to-transparent"
                />
                <p className="absolute bottom-5 left-6 right-6 font-display text-xl leading-tight text-white">
                  Razem nad każdą sprawą, od oferty po akt notarialny.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Nasza historia
              </p>
              <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Ludzie z Trójmiasta,
                <br />
                <span className="italic text-brand">a nie z portali.</span>
              </h2>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
                <p>
                  Dom Hunter powstał z prostego przekonania: kupno i sprzedaż nieruchomości to
                  jedna z najważniejszych decyzji w życiu, a nie transakcja w tabelce. Zebraliśmy
                  pośredników, którzy lata wcześniej współtworzyli sukces czołowych agencji w
                  Polsce, i postawiliśmy na bliski, ludzki kontakt.
                </p>
                <p>
                  Mieszkamy tutaj. Znamy Gdańsk, Gdynię, Sopot i okolice nie z opisów ofert, tylko
                  z codziennych rozmów. Wiemy, która kamienica ma cichą stronę podwórza, gdzie
                  ceny dopiero ruszają w górę, a gdzie warto się jeszcze targować.
                </p>
                <p>
                  Dla nas dobra współpraca to taka, po której klient wraca i poleca nas dalej. I to
                  zdarza się najczęściej.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* WARTOŚCI: karty */}
      <section className="bg-surface-cream py-20 lg:py-28">
        <Container size="wide">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              W co wierzymy
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Trzy rzeczy, których <span className="italic text-brand">nie odpuszczamy.</span>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
                  className="group rounded-[24px] border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-normal leading-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-foreground-muted">{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* DLACZEGO NAM UFAJĄ: numerowane */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-soft/[0.05] blur-[120px]"
        />
        <Container size="wide" className="relative">
          <motion.div {...fadeUp} className="mb-14 max-w-3xl lg:ml-auto lg:mb-20 lg:text-right">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Dlaczego my
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Dlaczego klienci <span className="italic text-brand">nam ufają.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
            {reasons.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="flex flex-col"
              >
                <span className="mb-5 font-display text-7xl italic leading-none tracking-tight text-brand/40 lg:text-8xl">
                  {r.num}
                </span>
                <h3 className="mb-4 font-display text-2xl font-normal leading-tight tracking-[-0.01em] text-foreground lg:text-3xl">
                  {r.title}
                </h3>
                <p className="mb-6 text-base leading-relaxed text-foreground">{r.body}</p>
                <blockquote className="mt-auto border-l-2 border-brand/40 pl-5 font-display text-lg italic leading-snug text-foreground-muted">
                  {r.pull}
                </blockquote>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ZESPÓŁ: teaser do /zespol */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-[24px] border border-border bg-surface px-8 py-12 sm:px-12 lg:px-16 lg:py-16"
          >
            <div
              aria-hidden
              className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/20 blur-[110px]"
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                  Zespół
                </p>
                <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                  Za każdą transakcją stoi <span className="italic text-brand">konkretna osoba.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted lg:text-lg">
                  Agentki i agenci z dużym doświadczeniem na rynku Trójmiasta. Zobacz kto poprowadzi
                  Twoją sprawę i wybierz osobę, z którą chcesz porozmawiać.
                </p>
                <Link
                  href="/zespol"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Poznaj cały zespół
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-border">
                <Image
                  src="/images/team/zespol-1.jpg"
                  alt="Agentka Dom Hunter"
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* PARTNER NSL */}
      <section className="bg-surface-cream py-20 lg:py-28">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative overflow-hidden rounded-[24px] border border-border shadow-soft"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/nsl-wspolpraca.jpg"
                  alt="Agentki Dom Hunter z tabliczką Nieruchomości Spod Lady, najlepsi agenci współpracują"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Partnerstwo
              </p>
              <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Nieruchomości <span className="italic text-brand">Spod Lady.</span>
              </h2>
              <p className="mt-7 text-lg leading-[1.6] text-foreground-muted">
                Należymy do sieci NSL, jednej z największych w Polsce społeczności agentów obracających
                ofertami spoza ogłoszeń. Ponad 2000 pośredników z całego kraju wymienia się
                nieruchomościami, których nie ma w publicznych portalach. Dla Ciebie to bezpośredni
                dostęp do mieszkań i domów, które normalnie nigdy nie trafiłyby do Twoich rąk.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
                <span className="font-display text-3xl leading-none tabular-nums text-brand">
                  2000+
                </span>
                <span className="text-sm leading-snug text-foreground-muted">
                  agentów w sieci,
                  <br />z którymi wymieniamy oferty
                </span>
              </div>

              <div>
                <Link
                  href={siteConfig.partners.nsl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
                >
                  Poznaj Nieruchomości Spod Lady
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA KOŃCOWE */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-[24px] bg-brand px-8 py-14 text-center sm:px-12 lg:px-16 lg:py-20"
          >
            <div
              aria-hidden
              className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-[90px]"
            />
            <div
              aria-hidden
              className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-brand-deep/30 blur-[90px]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display font-normal text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.01em] text-white">
                Porozmawiajmy o Twojej nieruchomości.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/90">
                Sprzedajesz, kupujesz, a może tylko sprawdzasz ile dziś warta jest Twoja
                nieruchomość. Zadzwoń, doradzimy bez zobowiązań.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+48571309209"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand shadow-[0_16px_34px_-12px] shadow-brand-deep/50 transition-all hover:-translate-y-0.5"
                >
                  <Phone className="size-4" strokeWidth={2} />
                  571 309 209
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Napisz do nas
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

// Zachowane dla kompatybilności wstecznej (sekcja "Dlaczego nam ufają").
export function WhyUs() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-soft/[0.05] blur-[120px]"
      />
      <Container size="wide" className="relative">
        <motion.div
          {...fadeUp}
          className="mb-16 max-w-3xl lg:ml-auto lg:mb-20 lg:text-right"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-border bg-surface-muted px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            O nas
          </div>
          <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
            Dlaczego klienci <span className="italic text-brand">nam ufają.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="flex flex-col"
            >
              <span className="mb-5 font-display text-7xl italic leading-none tracking-tight text-brand/40 lg:text-8xl">
                {r.num}
              </span>
              <h3 className="mb-4 font-display text-2xl font-normal leading-tight tracking-[-0.015em] text-foreground lg:text-3xl">
                {r.title}
              </h3>
              <p className="mb-6 text-base leading-relaxed text-foreground">{r.body}</p>
              <blockquote className="mt-auto border-l-2 border-brand/40 pl-5 font-display text-lg italic leading-snug text-foreground-muted">
                {r.pull}
              </blockquote>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
