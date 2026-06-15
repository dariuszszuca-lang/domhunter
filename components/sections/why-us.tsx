"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  HandshakeIcon,
  Compass,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { MemberPhoto } from "@/components/team/member-photo";
import { getAllMembersSorted } from "@/lib/team";
import { siteConfig } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: EASE },
};

// Krótkie, naturalne opisy roli w gridzie agentów (bez zmyślania faktów).
const memberBlurbs: Record<string, string> = {
  "sylwia-wroblewska":
    "Prowadzi biuro i osobiście opiekuje się klientami. Setki transakcji na trójmiejskim rynku, opinie mówią same za siebie.",
  "janusz-stojaczyk":
    "Spokojnie przeprowadzi Cię przez całą transakcję, od pierwszej rozmowy po klucze w dłoni.",
  "agnieszka-bodanka":
    "Mieszkania i wynajem to jej żywioł. Klienci chwalą ją za cierpliwość i konkretne podejście.",
  "piotr-mieczan":
    "Zna trójmiejski rynek od podszewki i wie, kiedy warto kupić, a kiedy jeszcze poczekać.",
  "anna-malez":
    "Doradza przy kupnie i sprzedaży tak, jakby chodziło o jej własne mieszkanie.",
  "sylwia-kojto-labuda":
    "Dba o każdy szczegół umowy i o to, żeby po drugiej stronie nie było żadnych niespodzianek.",
  "mateusz-licznerski":
    "Łączy ludzi z odpowiednią nieruchomością i pilnuje terminów od początku do końca.",
  "lukasz-ecimowicz":
    "Pomaga kupującym i sprzedającym dogadać się na warunkach, które są dobre dla obu stron.",
  "mateusz-wasilewski":
    "Sprawnie prowadzi sprzedaż i wynajem, zawsze z telefonem pod ręką dla klienta.",
  "lucja-laskowska":
    "Cierpliwie tłumaczy każdy krok i jest obok aż do podpisania aktu.",
  "karolina-ciesielska":
    "Z uśmiechem pomoże znaleźć mieszkanie albo dom, który po prostu pasuje.",
};

const values = [
  {
    icon: MapPin,
    title: "Najpierw oddzwaniamy",
    body: "Telefon nie dzwoni w próżnię. Odbieramy, a jak nie zdążymy, oddzwaniamy tego samego dnia. Bez automatów i bez czekania trzy dni na odpowiedź.",
  },
  {
    icon: Compass,
    title: "Mówimy jak jest",
    body: "Jeśli cena jest za wysoka, powiemy to wprost. Jeśli z ofertą coś jest nie tak, dowiesz się od nas, a nie od notariusza. Wolimy uczciwą rozmowę niż szybki podpis.",
  },
  {
    icon: HandshakeIcon,
    title: "Jeden agent, cała sprawa",
    body: "Od pierwszej rozmowy po klucze prowadzi Cię ta sama osoba. Nie przerzucamy Cię między działami i nie musisz tłumaczyć sprawy od nowa za każdym razem.",
  },
];

export function OnasContent() {
  const members = getAllMembersSorted();

  return (
    <>
      {/* HERO: tekst + jedno wspólne zdjęcie trzech agentek */}
      <section className="relative overflow-hidden pt-10 lg:pt-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(211,30,192,0.10),transparent_55%)]"
        />
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div {...fadeUp}>
              <div className="mb-6 inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Nasz zespół
              </div>
              <h1 className="font-display font-normal text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em] text-foreground">
                Ludzie, którzy
                <br />
                <span className="italic text-brand">prowadzą Twoją sprawę.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-[1.6] text-foreground-muted lg:text-xl">
                Dom Hunter to biuro nieruchomości z Trójmiasta, stworzone przez doświadczonych
                pośredników. Ludzi, którzy zrealizowali setki transakcji i naprawdę znają Gdańsk,
                Gdynię i Sopot. Poznaj agentów, którzy poprowadzą Cię od pierwszej rozmowy po
                klucze w dłoni.
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
                  href="#zespol"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
                >
                  Poznaj zespół
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            {/* Jedno mocne, wspólne zdjęcie zespołu w ramce */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-2 shadow-soft">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                  <Image
                    src="/images/hero-team.jpg"
                    alt="Zespół Dom Hunter, trzy agentki przy laptopie podczas pracy nad ofertą"
                    fill
                    priority
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent"
                  />
                  <div className="absolute bottom-5 left-6 right-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                      Zespół Dom Hunter
                    </p>
                    <p className="mt-1.5 font-display text-lg leading-snug text-white">
                      Trójmiasto, każda sprawa prowadzona osobiście.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* HISTORIA: zdjęcie z podpisem + tekst */}
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
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                    Trójmiasto
                  </p>
                  <p className="mt-2 font-display text-xl leading-snug text-white">
                    Razem nad każdą sprawą, od pierwszej rozmowy po podpisanie aktu.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Skąd się wzięliśmy
              </p>
              <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Biuro, w którym
                <br />
                <span className="italic text-brand">odbieramy telefon.</span>
              </h2>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
                <p>
                  Dom Hunter zaczął się od prostego przekonania. Kupno albo sprzedaż mieszkania to
                  jedna z najważniejszych decyzji w życiu, a nie pozycja w tabelce. Zebraliśmy
                  pośredników, którzy lata wcześniej współtworzyli sukces dużych agencji w Polsce, i
                  postawiliśmy na zwykły, ludzki kontakt.
                </p>
                <p>
                  Mieszkamy tutaj. Gdańsk, Gdynię i Sopot znamy nie z opisów ofert, tylko z
                  codziennych rozmów. Wiemy, która kamienica ma cichą stronę podwórza, gdzie ceny
                  dopiero ruszają w górę, a gdzie warto się jeszcze potargować.
                </p>
                <p>
                  Dla nas dobra współpraca to taka, po której klient wraca i poleca nas dalej. I
                  akurat to zdarza się u nas najczęściej.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-8">
                <div>
                  <p className="font-display text-4xl leading-none text-brand tabular-nums">
                    {siteConfig.metrics.transactions}
                  </p>
                  <p className="mt-2 text-sm text-foreground-muted">transakcji na koncie</p>
                </div>
                <span aria-hidden className="hidden w-px self-stretch bg-border sm:block" />
                <div>
                  <p className="font-display text-4xl leading-none text-brand tabular-nums">
                    {siteConfig.metrics.teamSize}
                  </p>
                  <p className="mt-2 text-sm text-foreground-muted">agentów w biurze</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* GRID AGENTÓW: serce strony */}
      <section id="zespol" className="scroll-mt-24 bg-surface-cream py-20 lg:py-28">
        <Container size="wide">
          <motion.div {...fadeUp} className="mb-14 max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Poznaj nas
            </p>
            <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
              Za każdą transakcją stoi <span className="italic text-brand">konkretna osoba.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
              Agentki i agenci z dużym doświadczeniem na rynku Trójmiasta. Wybierz osobę, z którą
              chcesz porozmawiać, i zadzwoń bezpośrednio. Bez infolinii i bez czekania.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {members.map((member, i) => {
              const blurb = memberBlurbs[member.slug] ?? member.bio;
              return (
                <motion.article
                  key={member.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-border bg-surface shadow-[0_2px_8px_-2px_rgba(25,25,25,0.06)] transition-all duration-400 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_28px_64px_-22px_rgba(211,30,192,0.28)]"
                >
                  <div className="relative border-b border-border/70">
                    <MemberPhoto
                      member={member}
                      forceMonogram
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="aspect-[5/4] w-full"
                    />
                    {member.isOwner && (
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-soft">
                        Właścicielka
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
                      {member.role}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-foreground">
                      {member.fullName}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{blurb}</p>

                    <div className="mt-auto flex flex-col gap-2.5 pt-6">
                      {member.phone && member.phoneDisplay && (
                        <a
                          href={`tel:${member.phone}`}
                          className="inline-flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors hover:text-brand"
                        >
                          <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                            <Phone className="size-3.5" strokeWidth={2} />
                          </span>
                          {member.phoneDisplay}
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center gap-2.5 break-all text-sm text-foreground-muted transition-colors hover:text-brand"
                        >
                          <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                            <Mail className="size-3.5" strokeWidth={2} />
                          </span>
                          {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WARTOŚCI: trzy karty */}
      <section className="py-20 lg:py-28">
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
                Należymy do sieci NSL, jednej z największych w Polsce społeczności agentów
                obracających ofertami spoza ogłoszeń. Ponad 2000 pośredników z całego kraju wymienia
                się nieruchomościami, których nie ma w publicznych portalach. Dla Ciebie to
                bezpośredni dostęp do mieszkań i domów, które normalnie nigdy nie trafiłyby do
                Twoich rąk.
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

      {/* CTA KOŃCOWE: subtelna karta z magentową ramką */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-[26px] border border-brand/30 bg-surface px-8 py-14 text-center shadow-soft sm:px-12 lg:px-16 lg:py-20"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(211,30,192,0.08),transparent_60%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Zacznijmy
              </p>
              <h2 className="font-display font-normal text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Porozmawiajmy o Twojej <span className="italic text-brand">nieruchomości.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted">
                Sprzedajesz, kupujesz, a może tylko sprawdzasz, ile dziś warta jest Twoja
                nieruchomość. Zadzwoń, doradzimy bez zobowiązań.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+48571309209"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_34px_-12px] shadow-brand/60 transition-all hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  <Phone className="size-4" strokeWidth={2} />
                  571 309 209
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
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
