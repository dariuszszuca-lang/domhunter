"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const reasons = [
  {
    num: "01",
    title: "Lokalna wiedza",
    body: "Każdą dzielnicę Gdańska znamy z rozmów z klientami, nie z portali. Wiemy gdzie warto kupić, gdzie poczekać, a gdzie cena rośnie najszybciej.",
    pull: "Każda dzielnica ma swój charakter, swoją cenę i swoich ludzi.",
  },
  {
    num: "02",
    title: "Off-market przez NSL",
    body: "Należymy do sieci Nieruchomości Spod Lady — ponad 2000 agentów w Polsce. Masz dostęp do ofert, których nie zobaczysz na portalach.",
    pull: "Najlepsze nieruchomości nigdy nie trafiają do publicznej sprzedaży.",
  },
  {
    num: "03",
    title: "Doświadczenie i kontakty",
    body: "Setki zrealizowanych transakcji. Wyrobione relacje z bankami, kancelariami, deweloperami, administratorami nieruchomości.",
    pull: "Dzwonimy do osoby, nie do działu.",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-soft/[0.05] blur-[120px]"
      />

      <Container size="wide" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 lg:mb-20 lg:ml-auto lg:text-right"
        >
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface-muted border border-border text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
            O nas
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            Dlaczego klienci nam ufają
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <span className="font-display italic text-7xl lg:text-8xl text-brand/40 leading-none tracking-tight mb-5">
                {r.num}
              </span>
              <h3 className="font-sans font-semibold text-2xl lg:text-3xl tracking-[-0.015em] text-foreground mb-4">
                {r.title}
              </h3>
              <p className="text-base text-foreground leading-relaxed mb-6">{r.body}</p>
              <blockquote className="mt-auto pl-5 border-l-2 border-brand/40 font-display italic text-lg text-foreground-muted leading-snug">
                {r.pull}
              </blockquote>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
