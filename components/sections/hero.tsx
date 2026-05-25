"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative pt-24 lg:pt-28">
      <Container size="wide">
        {/* Hero card z background image i overlay */}
        <div className="relative rounded-[28px] lg:rounded-[36px] overflow-hidden bg-foreground min-h-[640px] lg:min-h-[760px]">
          {/* Tło — zdjęcie + gradient overlay */}
          <Image
            src="/images/properties/sample-1.jpg"
            alt="Nieruchomość premium w Trójmieście"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-65"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-transparent to-foreground/30"
          />

          {/* Hero content */}
          <div className="relative h-full flex flex-col justify-between p-7 lg:p-14 min-h-[640px] lg:min-h-[760px]">
            {/* Top: rating chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-between gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                <span className="size-1.5 rounded-full bg-brand-soft animate-pulse" />
                DomHunter · Gdańsk · od 2020
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-3 fill-white text-white" />
                  ))}
                </div>
                <span className="text-xs font-medium text-white">5.0 · opinie klientów</span>
              </div>
            </motion.div>

            {/* Middle: H1 + opis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mt-auto pb-12"
            >
              <h1 className="font-sans font-semibold text-[clamp(2.75rem,7vw,6rem)] leading-[1.02] tracking-[-0.035em] text-white">
                Znajdź swoje miejsce
                <br />
                <span className="font-display italic font-normal">w&nbsp;Trójmieście.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base lg:text-lg text-white/80 leading-[1.55]">
                Sprzedaż, kupno, wynajem i&nbsp;komercja. Lokalne biuro nieruchomości w&nbsp;Gdańsku. Dostęp do ofert off-market przez sieć NSL.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/oferty"
                  className="group inline-flex items-center gap-2.5 pl-7 pr-3 py-2.5 rounded-full bg-white text-foreground text-sm font-semibold hover:bg-brand hover:text-white transition-all"
                >
                  Zobacz oferty
                  <span className="inline-flex items-center justify-center size-9 rounded-full bg-foreground/8 group-hover:bg-white/15 transition-colors">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
                <Link
                  href="/wycena"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold hover:bg-white/15 transition-all"
                >
                  Darmowa wycena
                </Link>
              </div>
            </motion.div>

            {/* Bottom: 3 stats counters (jak Vista achieves) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 lg:gap-10 pt-7 border-t border-white/15"
            >
              {[
                { value: "300+", label: "Zrealizowanych transakcji" },
                { value: "5", label: "Lat doświadczenia" },
                { value: "1600+", label: "Agentów w sieci NSL" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-display italic text-4xl lg:text-6xl text-white tracking-tight tabular-nums">
                      {stat.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] lg:text-xs font-medium uppercase tracking-[0.18em] text-white/65">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Marquee scrolling property cards */}
      <div className="mt-12 lg:mt-16">
        <PropertyMarquee />
      </div>
    </section>
  );
}

const sampleProperties = [
  { img: "/images/properties/sample-1.jpg", title: "Wrzeszcz", price: "899 000 zł", area: "52 m²", type: "Mieszkanie" },
  { img: "/images/properties/sample-2.jpg", title: "Kowale", price: "2 840 zł/mc", area: "60 m²", type: "Lokal biurowy" },
  { img: "/images/properties/sample-3.jpg", title: "Morena", price: "576 000 zł", area: "49 m²", type: "Mieszkanie" },
  { img: "/images/properties/sample-4.jpg", title: "Suchanino", price: "475 000 zł", area: "42 m²", type: "Mieszkanie" },
  { img: "/images/properties/sample-5.jpg", title: "Przymorze", price: "495 000 zł", area: "38 m²", type: "Mieszkanie" },
  { img: "/images/properties/sample-6.jpg", title: "Wrzeszcz", price: "8 000 zł/mc", area: "130 m²", type: "Mieszkanie" },
  { img: "/images/properties/sample-7.jpg", title: "Stare Miasto", price: "699 000 zł", area: "44 m²", type: "Mieszkanie" },
  { img: "/images/properties/sample-8.jpg", title: "Oliwa", price: "1 250 000 zł", area: "78 m²", type: "Mieszkanie" },
];

function PropertyMarquee() {
  return (
    <div className="relative overflow-hidden py-2">
      {/* Edge fades */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"
      />

      <div className="flex gap-5 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
        {[...sampleProperties, ...sampleProperties].map((p, i) => (
          <Link
            key={i}
            href="/oferty"
            className="group relative w-[280px] lg:w-[320px] shrink-0 rounded-2xl overflow-hidden bg-surface border border-border hover:border-brand transition-all"
          >
            <div className="relative aspect-[4/3] bg-surface-muted overflow-hidden">
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="320px"
                className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                {p.type}
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-sans font-semibold text-foreground">{p.title}</p>
                <p className="text-xs text-foreground-muted mt-0.5">{p.area}</p>
              </div>
              <div className="text-right">
                <p className="font-sans font-semibold text-sm text-brand tabular-nums">{p.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_45s_linear_infinite\\] {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
