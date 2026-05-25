"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <Container size="wide">
        {/* Top tagline + rating */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10 lg:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground-muted">
            <span className="size-1.5 rounded-full bg-brand animate-pulse" />
            Lokalne biuro nieruchomości · Gdańsk
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-muted border border-border">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-3 fill-brand text-brand" />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground">
              5.0 / 5 — opinie klientów
            </span>
          </div>
        </motion.div>

        {/* Hero main */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Lewa — duży H1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <h1 className="font-sans font-semibold text-[clamp(2.75rem,7vw,6rem)] leading-[1.02] tracking-[-0.035em] text-foreground">
              Znajdź swoje miejsce
              <br />
              <span className="font-display italic font-normal text-brand">w&nbsp;Trójmieście.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-foreground-muted leading-[1.55]">
              Sprzedaż, kupno, wynajem i&nbsp;komercja. Dedykowany agent dla każdej transakcji. Dostęp do ofert off-market przez sieć NSL.
            </p>
          </motion.div>

          {/* Prawa — CTA stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <Link
              href="/oferty"
              className="group inline-flex items-center justify-between gap-3 pl-6 pr-3 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand transition-all"
            >
              <span>Zobacz wszystkie oferty</span>
              <span className="inline-flex items-center justify-center size-10 rounded-full bg-background/15 group-hover:bg-background/25 transition-colors">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
            <Link
              href="/wycena"
              className="group inline-flex items-center justify-between gap-3 pl-6 pr-3 py-3 rounded-full bg-surface border border-border text-foreground text-sm font-semibold hover:border-foreground transition-all"
            >
              <span>Darmowa wycena</span>
              <span className="inline-flex items-center justify-center size-10 rounded-full bg-surface-muted group-hover:bg-brand-light transition-colors">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Property type cards (3 kafle z editorial-magazine vibe) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5"
        >
          {[
            {
              tag: "Apartamenty premium",
              title: "Mieszkania",
              body: "Apartamenty butikowe w&nbsp;sercu Trójmiasta — Wrzeszcz, Oliwa, Stare Miasto.",
              href: "/oferty?typ=mieszkanie",
              gradient: "from-brand-blush via-brand-light to-surface-cream",
            },
            {
              tag: "Domy z duszą",
              title: "Domy i&nbsp;rezydencje",
              body: "Domy jednorodzinne, rezydencje nadmorskie, działki budowlane na Pomorzu.",
              href: "/oferty?typ=dom",
              gradient: "from-surface-cream via-brand-light to-brand-blush",
            },
            {
              tag: "Off-market przez NSL",
              title: "Komercja",
              body: "Biura, lokale handlowe, magazyny, pensjonaty. Dedykowany doradca.",
              href: "/komercja",
              gradient: "from-brand-light via-surface-muted to-brand-blush",
            },
          ].map((card, i) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface hover:border-brand transition-all"
            >
              <div className={`relative aspect-[5/4] bg-gradient-to-br ${card.gradient} overflow-hidden`}>
                <div className="absolute top-5 left-5 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {card.tag}
                </div>
                <div className="absolute bottom-5 right-5 inline-flex items-center justify-center size-12 rounded-full bg-white/95 text-foreground group-hover:bg-brand group-hover:text-white transition-all">
                  <ArrowUpRight className="size-5" />
                </div>
              </div>
              <div className="p-6 lg:p-7">
                <h3
                  className="font-sans font-semibold text-2xl tracking-[-0.015em] text-foreground mb-2"
                  dangerouslySetInnerHTML={{ __html: card.title }}
                />
                <p
                  className="text-sm text-foreground-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: card.body }}
                />
              </div>
            </Link>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
