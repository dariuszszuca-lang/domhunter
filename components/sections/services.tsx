"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const services = [
  {
    num: "01",
    title: "Kupno",
    lead: "Reprezentujemy Twój interes, nie sprzedającego.",
    body: "Znajdujemy nieruchomości dopasowane do Twoich potrzeb. Sprawdzamy stan prawny i techniczny, negocjujemy cenę. Mamy też dostęp do ofert off-market przez sieć NSL.",
    bullets: ["Off-market przez NSL", "Sprawdzenie stanu prawnego", "Negocjacje ceny"],
    href: "/strefa-kupujacego",
  },
  {
    num: "02",
    title: "Sprzedaż",
    lead: "Od pierwszej rozmowy do aktu notarialnego.",
    body: "Wycena rynkowa, sesja zdjęciowa, publikacja w 30+ portalach, pokazy, negocjacje i dokumenty. Ty podpisujesz tylko umowę i odbierasz pieniądze.",
    bullets: ["Wycena po wizji lokalnej", "Sesja i plan 2D", "Akt notarialny"],
    href: "/strefa-sprzedajacego",
  },
  {
    num: "03",
    title: "Wynajem",
    lead: "Mieszkanie do wynajęcia w Trójmieście.",
    body: "Pokazujemy oferty z naszej bazy i z rynku. Sprawdzamy stan techniczny i umowę najmu. Pomagamy negocjować warunki.",
    bullets: ["Oferty z bazy i rynku", "Sprawdzenie umowy", "Pomoc we wprowadzce"],
    href: "/oferty?transakcja=najem",
  },
  {
    num: "04",
    title: "Komercja",
    lead: "Biura, lokale, magazyny i pensjonaty.",
    body: "Dedykowany doradca dla każdego segmentu komercji. Znamy lokalne realia, mamy kontakty do najemców i właścicieli z całego Trójmiasta.",
    bullets: ["Biura i lokale handlowe", "Magazyny i hale", "Pensjonaty i obiekty"],
    href: "/komercja",
  },
];

export function Services() {
  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
            Cztery obszary, jedno biuro
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
            Co dla Ciebie <span className="italic">zrobimy.</span>
          </h2>
        </motion.div>

        <div className="divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={s.href}
                className="group block py-10 lg:py-14 transition-colors hover:bg-brand-light/40 -mx-6 px-6 lg:-mx-8 lg:px-8 rounded-2xl"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  <div className="lg:col-span-2 flex items-center gap-3">
                    <span className="font-display text-4xl lg:text-5xl text-brand/40 tabular-nums tracking-tight">
                      {s.num}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-foreground mb-2 group-hover:text-brand transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-base lg:text-lg text-foreground-muted italic">{s.lead}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-base text-foreground leading-relaxed">{s.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="inline-flex items-center gap-2 text-sm text-foreground-muted"
                        >
                          <span className="size-1 rounded-full bg-brand/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-1 flex lg:justify-end">
                    <span className="inline-flex items-center justify-center size-12 rounded-full bg-surface border border-border group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
