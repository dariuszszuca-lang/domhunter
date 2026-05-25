"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const reasons = [
  {
    num: "01",
    title: "Lokalna wiedza",
    body: "Pracujemy w Trójmieście od lat. Każdą dzielnicę Gdańska znamy z rozmów z klientami, nie z portali.",
    pull: "Każda dzielnica ma swój charakter, swoją cenę i swoich ludzi.",
  },
  {
    num: "02",
    title: "Off-market przez NSL",
    body: "Należymy do sieci Nieruchomości Spod Lady. Ponad 1600 agentów w Polsce. Masz dostęp do ofert, których nie zobaczysz na portalach.",
    pull: "Najlepsze nieruchomości nigdy nie trafiają do publicznej sprzedaży.",
  },
  {
    num: "03",
    title: "Doświadczenie i kontakty",
    body: "Setki zrealizowanych transakcji. Wyrobione relacje z bankami, kancelariami notarialnymi, deweloperami i administratorami.",
    pull: "Dzwonimy do osoby, nie do działu.",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 lg:py-32 bg-surface-blush relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand-soft/[0.06] blur-[100px]"
      />

      <Container size="wide" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 lg:mb-24"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
            Dlaczego my
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
            Trzy rzeczy, których
            <br />
            <span className="italic">nie da się podrobić.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <span className="font-display text-7xl lg:text-8xl text-brand/25 tabular-nums leading-none tracking-tight mb-5">
                {r.num}
              </span>
              <h3 className="font-display text-2xl lg:text-3xl tracking-[-0.015em] text-foreground mb-4">
                {r.title}
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6">{r.body}</p>
              <blockquote className="mt-auto pl-5 border-l-2 border-brand/40 text-base italic text-foreground-muted leading-snug">
                {r.pull}
              </blockquote>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
