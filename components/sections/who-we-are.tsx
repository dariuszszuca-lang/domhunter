"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Users, Hand } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const stats = [
  { value: siteConfig.metrics.transactions, label: "Zrealizowanych transakcji" },
  { value: `${siteConfig.metrics.yearsActive}+`, label: "Lat doświadczenia" },
  { value: "1600+", label: "Agentów w sieci NSL" },
  { value: "95%", label: "Klientów z polecenia" },
];

const values = [
  {
    icon: Eye,
    title: "Lokalna wiedza",
    body: "Każdą dzielnicę Gdańska znamy z rozmów z klientami, nie z portali. Wiemy gdzie warto kupić, gdzie poczekać, a gdzie cena rośnie najszybciej.",
  },
  {
    icon: Users,
    title: "Doświadczony zespół",
    body: "Pośrednicy z setkami zrealizowanych transakcji, byli częścią sukcesu czołowych agencji w Polsce. Każdy ma swoją specjalizację.",
  },
  {
    icon: Hand,
    title: "Indywidualne podejście",
    body: "Każdy klient ma dedykowanego agenta. Plan działania szyty na miarę, nie z gotowego skryptu. Twoje cele są naszym priorytetem.",
  },
];

export function WhoWeAre() {
  return (
    <section id="o-nas" className="py-20 lg:py-28">
      <Container size="wide" className="max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.1fr_1fr] lg:items-start lg:gap-10 xl:gap-12">
          {/* Lewa kolumna — chip + H2 + opis + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-normal text-foreground">
              O nas
            </div>
            <h2 className="max-w-[430px] font-sans font-bold uppercase text-[clamp(1.95rem,3vw,3.15rem)] leading-[1.04] tracking-normal text-foreground">
              Pasja i
              <br />
              doświadczenie
              <br />
              na lokalnym
              <br />
              rynku
            </h2>

            <div className="mt-10 max-w-sm space-y-4 text-base leading-[1.65] text-foreground-muted">
              <p>
                Doświadczeni pośrednicy z&nbsp;setkami zrealizowanych transakcji. Byli częścią sukcesu czołowych agencji w&nbsp;Polsce, dziś budują DomHunter.
              </p>
              <p>
                Łączy nas pasja do tego, co robimy, i&nbsp;szacunek do klientów. Każda sprawa ma dedykowanego agenta.
              </p>
            </div>

            {/* Stats 2x2 — vista large numbers */}
            <div className="mt-12 grid max-w-sm grid-cols-2 gap-x-7 gap-y-9">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-sans text-4xl font-bold leading-none tracking-normal text-foreground tabular-nums lg:text-5xl">
                    {s.value}
                  </div>
                  <p className="mt-3 text-sm leading-snug text-foreground-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Środek — duże zdjęcie */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-surface-muted">
              <Image
                src="/images/team-1.jpg"
                alt="Zespół DomHunter Nieruchomości"
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Prawa kolumna — 3 punkty z ikonami */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 space-y-9 lg:space-y-11"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="size-5 text-foreground" strokeWidth={1.8} />
                    <h3 className="font-sans text-xl font-bold tracking-normal text-foreground lg:text-[1.4rem]">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-base text-foreground-muted leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
