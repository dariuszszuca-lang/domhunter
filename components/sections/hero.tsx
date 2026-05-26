"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

const avatars = [
  "/images/team-1.jpg",
  "/images/team-2.jpg",
  "/images/properties/stock-1.jpg",
  "/images/properties/stock-2.jpg",
];

export function Hero() {
  return (
    <section className="relative pt-28 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
      {/* Tło subtelne */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(153,26,117,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(196,48,119,0.06),transparent_60%)]"
      />

      <Container size="wide">
        {/* BENTO HERO: 12-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* LEWA: content card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative rounded-[32px] bg-surface border border-border p-7 sm:p-10 lg:p-14 overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/25 px-3.5 py-1.5 mb-7">
              <Sparkles className="size-3.5 text-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                Lokalne biuro · Trójmiasto
              </span>
            </div>

            <h1 className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.025em] text-foreground">
              Znajdź swoje
              <br />
              <span className="italic text-brand">wymarzone miejsce.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base lg:text-lg text-foreground-muted leading-[1.6]">
              Lokalne biuro nieruchomości w Trójmieście. Dedykowany agent dla każdej transakcji.
              Dostęp do ofert off-market przez sieć NSL.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/oferty"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-6 pr-2 py-2 text-sm font-semibold hover:bg-brand transition-all"
              >
                Zobacz oferty
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-background/15 group-hover:bg-white/20 group-hover:rotate-12 transition-all">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
              <Link
                href="/wycena"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-brand/45 hover:bg-brand/5 transition-all"
              >
                Bezpłatna wycena
              </Link>
            </div>

            {/* Stats counters - bottom */}
            <div className="mt-12 lg:mt-16 pt-8 border-t border-border grid grid-cols-3 gap-5 lg:gap-8">
              {[
                { value: "300", suffix: "+", label: "Transakcji" },
                { value: "5", suffix: "+", label: "Lat" },
                { value: "1600", suffix: "+", label: "Agentów w sieci NSL" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-sans font-bold text-3xl lg:text-4xl text-foreground tabular-nums leading-none tracking-tight">
                      {stat.value}
                    </span>
                    <span className="font-sans font-bold text-lg lg:text-xl text-brand leading-none">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] lg:text-xs text-foreground-subtle leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtle accent decoration */}
            <div
              aria-hidden
              className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-brand/[0.06] blur-3xl pointer-events-none"
            />
          </motion.div>

          {/* PRAWA: foto + floating chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative rounded-[32px] overflow-hidden bg-foreground min-h-[420px] lg:min-h-0"
          >
            <Image
              src="/images/hero-luxury-2.jpg"
              alt="Luksusowa nieruchomość w Trójmieście"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent"
            />

            {/* Location chip - top */}
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-background/95 backdrop-blur-sm px-3.5 py-2 text-xs font-semibold text-foreground border border-white/40">
              <MapPin className="size-3.5 text-brand" />
              Gdańsk · Gdynia · Sopot
            </div>

            {/* Agents floating card - bottom */}
            <div className="absolute bottom-5 left-5 right-5 rounded-[20px] bg-background/95 backdrop-blur-sm border border-white/40 p-4 flex items-center gap-3">
              <div className="flex -space-x-2 shrink-0">
                {avatars.map((src, i) => (
                  <span
                    key={src}
                    className="relative size-9 overflow-hidden rounded-full bg-surface-muted ring-2 ring-background"
                  >
                    <Image
                      src={src}
                      alt={`Agent DomHunter ${i + 1}`}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground leading-tight">
                  8 agentów w zespole
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-[10px] font-medium text-foreground-muted">
                    5.0 / 5
                  </span>
                </div>
              </div>
              <Link
                href="/zespol"
                className="shrink-0 inline-flex items-center justify-center size-9 rounded-full bg-brand text-white hover:bg-brand-hover transition-colors"
                aria-label="Zobacz zespół"
              >
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
