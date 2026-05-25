"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-background">
      {/* Grid pattern w tle z radial mask */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(43,42,41,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(43,42,41,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black 50%, transparent 100%)",
        }}
      />

      {/* Magenta orb akcent */}
      <motion.div
        aria-hidden
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[26%] right-[18%] -z-10 size-[420px] lg:size-[560px] rounded-full bg-gradient-to-br from-brand-soft/30 via-brand/15 to-transparent blur-[80px]"
      />

      <Container size="wide" className="relative flex-1 flex flex-col justify-center pt-28 lg:pt-32 pb-12 lg:pb-16">
        {/* Górny eyebrow + meta */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10 lg:mb-16"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
            Estab. 2020 · Gdańsk · No. 001
          </div>
          <div className="hidden md:block text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
            Lokalne biuro nieruchomości
          </div>
        </motion.div>

        {/* GŁÓWNA ZAWARTOŚĆ — editorial magazine layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10 items-center flex-1">
          {/* Lewa kolumna — opis + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 z-20 order-2 lg:order-1"
          >
            <div className="max-w-[280px]">
              <p className="text-sm leading-[1.6] text-foreground/80 mb-6">
                Sprzedaż, kupno, wynajem i&nbsp;komercja w&nbsp;Trójmieście. Dedykowany agent dla każdej transakcji. Dostęp do ofert off-market przez NSL.
              </p>
              <Link
                href="/oferty"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand transition-colors"
              >
                <span className="underline decoration-1 underline-offset-4">Zobacz oferty</span>
                <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* ŚRODEK — gigantyczny editorial H1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 z-10 order-1 lg:order-2 flex flex-col items-center justify-center text-center relative"
          >
            <h1 className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.88] tracking-[-0.045em] text-foreground">
              Twoje
              <br />
              <span className="italic text-brand">miejsce.</span>
            </h1>
            <p className="mt-7 text-base font-semibold uppercase tracking-[0.18em] text-foreground-muted">
              w&nbsp;Trójmieście · od 2020
            </p>
          </motion.div>

          {/* Prawa kolumna — featured property card */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 z-20 order-3"
          >
            <Link
              href="/oferty"
              className="group block relative rounded-2xl overflow-hidden bg-surface border border-border shadow-soft hover:shadow-card transition-all"
            >
              {/* Mockup image placeholder */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-light via-surface-cream to-brand-blush overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 20%, rgba(196,48,119,0.15), transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(153,26,117,0.10), transparent 50%)
                    `,
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="inline-flex self-start items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                    Wybrana oferta
                  </div>
                  <div className="inline-flex self-end items-center justify-center size-12 rounded-full bg-white/95 text-foreground group-hover:bg-brand group-hover:text-white transition-all">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted mb-2 flex items-center gap-1.5">
                  <MapPin className="size-3" />
                  Gdańsk · Trójmiasto
                </p>
                <p className="font-display text-lg text-foreground leading-tight">
                  Przeglądaj naszą bazę
                </p>
                <p className="text-xs text-foreground-muted mt-1">
                  Off-market przez NSL
                </p>
              </div>
            </Link>
          </motion.aside>
        </div>

        {/* Dolna belka — kontakt + stats inline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 lg:mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground-subtle mb-1">
                Na rynku
              </div>
              <div className="font-display text-2xl tracking-tight tabular-nums">
                {siteConfig.metrics.yearsActive} <span className="text-base text-foreground-muted">lat</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground-subtle mb-1">
                Transakcji
              </div>
              <div className="font-display text-2xl tracking-tight tabular-nums">
                {siteConfig.metrics.transactions}
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground-subtle mb-1">
                Ocena
              </div>
              <div className="font-display text-2xl tracking-tight tabular-nums">
                {siteConfig.metrics.rating}<span className="text-base text-foreground-muted"> / 5</span>
              </div>
            </div>
          </div>

          <a
            href={siteConfig.contact.phones[0].href}
            className="group inline-flex items-center gap-2.5 pl-6 pr-3 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand transition-all"
          >
            <Phone className="size-4" />
            {siteConfig.contact.phones[0].displayValue}
            <span className="inline-flex items-center justify-center size-9 rounded-full bg-background/15 group-hover:bg-background/25 transition-colors">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
