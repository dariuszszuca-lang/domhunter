"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Home,
  Search,
  KeyRound,
  Building,
  Calculator,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const services = [
  { icon: Home, num: "01", title: "Sprzedaż", body: "Wycena, sesja, publikacja, pokazy. Pełna obsługa do aktu.", href: "/strefa-sprzedajacego" },
  { icon: Search, num: "02", title: "Kupno", body: "Reprezentujemy Twój interes. Oferty off-market przez NSL.", href: "/strefa-kupujacego" },
  { icon: KeyRound, num: "03", title: "Wynajem", body: "Mieszkania do wynajęcia. Sprawdzamy umowy i właścicieli.", href: "/oferty?transakcja=najem" },
  { icon: Building, num: "04", title: "Najem", body: "Wynajmij swoje mieszkanie. Weryfikacja najemcy, umowa, protokół.", href: "/oferty?transakcja=najem" },
  { icon: Building, num: "05", title: "Komercja", body: "Biura, lokale, magazyny, pensjonaty. Dedykowany doradca.", href: "/komercja" },
  { icon: Calculator, num: "06", title: "Darmowa wycena", body: "Wycena oparta na faktach. Odpowiedź w 24 godziny.", href: "/wycena" },
];

export function Services() {
  return (
    <section className="py-24 lg:py-32 bg-surface-muted">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
              <Sparkles className="size-3" />
              Co oferujemy
            </div>
            <h2 className="font-sans font-semibold text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-foreground">
              Sześć obszarów,
              <br />
              <span className="font-display italic font-normal text-foreground-muted">jedno biuro.</span>
            </h2>
          </div>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand transition-colors"
          >
            Skontaktuj się
            <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={s.href}
                  className="group relative flex flex-col gap-6 p-7 lg:p-8 rounded-3xl bg-surface border border-border hover:border-brand hover:shadow-card transition-all h-full"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center justify-center size-12 rounded-xl bg-brand-light text-brand">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-subtle tabular-nums">
                      {s.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-2xl tracking-[-0.015em] text-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{s.body}</p>
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-brand group-hover:gap-3 transition-all">
                    Dowiedz się więcej
                    <ArrowUpRight className="size-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
