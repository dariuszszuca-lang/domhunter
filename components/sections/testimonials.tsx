"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

const testimonials = [
  {
    quote:
      "Sprzedaż mieszkania w Oliwie zajęła nam 3 tygodnie zamiast pół roku. Profesjonalne podejście od pierwszej rozmowy.",
    author: "Anna M.",
    role: "Sprzedaż mieszkania, Gdańsk Oliwa",
  },
  {
    quote:
      "Znaleźli mi dom z ogrodem w Suchaninie, który nigdy nie trafił do portali. Negocjacje za mnie, ja podpisałem akt i dostałem klucze.",
    author: "Marek S.",
    role: "Kupno domu, Gdańsk Suchanino",
  },
  {
    quote:
      "Doradzili mi przy wyborze lokalu na biuro startupu. Znali parametry techniczne, ceny rynkowe, mieli kontakty do administratora.",
    author: "Tomek K.",
    role: "Najem lokalu komercyjnego",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand/20 blur-[120px]"
      />

      <Container size="wide" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[11px] font-semibold uppercase tracking-[0.22em] text-white mb-5">
            <Star className="size-3 fill-white" />
            Opinie klientów
          </div>
          <h2 className="font-sans font-semibold text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-white">
            Co mówią o&nbsp;nas
            <br />
            <span className="font-display italic font-normal text-white/60">ludzie, którym pomogliśmy.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col p-7 lg:p-8 rounded-3xl bg-white/[0.04] backdrop-blur border border-white/10 hover:bg-white/[0.08] transition-colors"
            >
              <Quote className="size-7 text-brand-soft mb-5" strokeWidth={1.6} />
              <p className="text-base lg:text-lg leading-[1.55] text-white mb-7 flex-1">
                {t.quote}
              </p>
              <div className="pt-5 border-t border-white/10">
                <p className="font-sans font-semibold text-white">{t.author}</p>
                <p className="text-xs text-white/60 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
