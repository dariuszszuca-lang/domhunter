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
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Lewa kolumna — chip + H2 + opis + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface-muted border border-border text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-6">
              O nas
            </div>
            <h2 className="font-sans font-bold uppercase text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] tracking-[-0.035em] text-foreground">
              Pasja
              <br />
              i&nbsp;doświadczenie
              <br />
              na lokalnym rynku
            </h2>

            <div className="mt-12 space-y-4 text-base text-foreground-muted leading-[1.65] max-w-md">
              <p>
                Doświadczeni pośrednicy z&nbsp;setkami zrealizowanych transakcji. Byli częścią sukcesu czołowych agencji w&nbsp;Polsce, dziś budują DomHunter.
              </p>
              <p>
                Łączy nas pasja do tego, co robimy, i&nbsp;szacunek do klientów. Każda sprawa ma dedykowanego agenta.
              </p>
            </div>

            {/* Stats 2x2 — vista large numbers */}
            <div className="mt-14 grid grid-cols-2 gap-y-10 gap-x-8 max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-sans font-bold text-5xl lg:text-6xl text-foreground tracking-tight tabular-nums leading-none">
                    {s.value}
                  </div>
                  <p className="mt-4 text-sm text-foreground-muted">{s.label}</p>
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
            className="lg:col-span-4"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-muted">
              <Image
                src="/images/team-1.jpg"
                alt="Zespół DomHunter Nieruchomości"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
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
            className="lg:col-span-4 space-y-10 lg:space-y-12"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="size-5 text-foreground" strokeWidth={1.8} />
                    <h3 className="font-sans font-bold text-xl lg:text-2xl tracking-tight text-foreground">
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
