"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "300+", label: "sfinalizowanych transakcji" },
  { value: "6 lat", label: "na trójmiejskim rynku" },
  { value: "1600+", label: "agentów w sieci NSL" },
  { value: "95%", label: "poleceń od klientów" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36 pb-10 lg:pb-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(211,30,192,0.07),transparent_55%)]"
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Lewa: treść */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-6"
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand">
              Biuro nieruchomości · Trójmiasto
            </p>

            <h1 className="mt-5 font-display font-normal text-[clamp(2.6rem,6vw,5rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
              Twój agent nieruchomości
              <br />
              <span className="italic text-brand">w Trójmieście.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base lg:text-lg text-foreground-muted leading-[1.6]">
              Pomagamy kupić, sprzedać i wynająć mieszkania, domy i działki w Gdańsku, Gdyni
              i Sopocie. Jeden agent prowadzi Twoją sprawę od pierwszej rozmowy do aktu
              u notariusza.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/oferty"
                className="group inline-flex items-center gap-2.5 rounded-full bg-foreground text-background pl-6 pr-2 py-2.5 text-sm font-semibold hover:bg-brand transition-colors"
              >
                Zobacz oferty
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-background/15 group-hover:rotate-12 transition-transform">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
              <Link
                href="/wycena"
                className="inline-flex items-center rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Darmowa wycena
              </Link>
            </div>

            {/* Statystyki */}
            <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl lg:text-[2.4rem] leading-none text-brand">{s.value}</div>
                  <p className="mt-2 text-xs text-foreground-subtle leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Prawa: zdjęcie zespołu */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] overflow-hidden rounded-[8px] bg-foreground/5">
              <Image
                src="/images/hero-team.jpg"
                alt="Zespół Dom Hunter Nieruchomości"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                priority
                className="object-cover"
              />
              {/* Lokalizacja */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/95 backdrop-blur-sm px-3.5 py-2 text-xs font-semibold text-foreground">
                <MapPin className="size-3.5 text-brand" />
                Gdańsk · Gdynia · Sopot
              </div>
            </div>

            {/* Pływający kafelek */}
            <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-surface border border-border rounded-[6px] px-5 py-4 shadow-[0_18px_40px_-20px_rgba(20,21,21,0.35)]">
              <div className="font-display text-2xl text-foreground leading-none">30 minut</div>
              <p className="mt-1 text-xs text-foreground-muted">tyle czekasz na naszą odpowiedź</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
