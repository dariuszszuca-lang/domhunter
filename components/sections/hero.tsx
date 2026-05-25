"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

const avatars = [
  "/images/team-1.jpg",
  "/images/team-2.jpg",
  "/images/properties/stock-1.jpg",
  "/images/properties/stock-2.jpg",
];

export function Hero() {
  return (
    <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20">
      <Container size="wide">
        <div className="relative min-h-[650px] overflow-hidden rounded-[28px] bg-foreground sm:overflow-visible lg:min-h-[720px] lg:rounded-[42px]">
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden rounded-[28px] lg:rounded-[42px]">
            <Image
              src="/images/hero-luxury-2.jpg"
              alt="Luksusowa nieruchomość w Trójmieście"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/42 to-foreground/5"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-foreground/78 via-foreground/20 to-transparent"
            />
          </div>

          {/* Floating agents chip + corner cutouts — bottom right */}
          <div className="absolute bottom-0 right-0 hidden sm:block">
            {/* Cutout: top of chip (concave corner top-right of chip area) */}
            <div className="absolute -top-5 right-0 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <path d="M20 20L0 20C11.0457 20 20 11.0457 20 0L20 20Z" fill="var(--color-background)" />
              </svg>
            </div>
            {/* Cutout: left of chip (concave corner bottom-left of chip area) */}
            <div className="absolute bottom-0 -left-5 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <path d="M0 0L20 0C8.95431 0 0 8.95431 0 20L0 0Z" fill="var(--color-background)" />
              </svg>
            </div>

            {/* Chip content */}
            <div className="flex items-center gap-3 rounded-tl-[28px] bg-background px-5 py-3 shadow-soft">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <span key={src} className="relative size-10 overflow-hidden rounded-full bg-surface-muted ring-2 ring-background">
                    <Image
                      src={src}
                      alt={`Agent DomHunter ${i + 1}`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <div className="pr-2">
                <p className="text-xs font-semibold text-foreground leading-tight">10+ Agentów</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-[11px] font-medium text-foreground-muted">5.0 / 5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex min-h-[650px] h-full flex-col justify-end p-7 sm:p-10 lg:min-h-[720px] lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[1040px]"
            >
              <h1 className="max-w-full text-balance font-sans text-[clamp(1.95rem,8.1vw,5.35rem)] font-bold uppercase leading-[0.98] tracking-normal text-white">
                <span className="block sm:inline">Znajdź</span>
                <span className="block sm:inline"> swoje wymarzone</span>
                <span className="block sm:inline"> miejsce</span>
              </h1>
              <p className="mt-6 max-w-xl text-base lg:text-lg text-white/85 leading-[1.55]">
                Lokalne biuro nieruchomości w&nbsp;Trójmieście. Dedykowany agent dla każdej transakcji. Dostęp do ofert off-market przez sieć NSL.
              </p>

              <Link
                href="/oferty"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-7 pr-3 text-sm font-semibold text-foreground transition-all hover:bg-brand hover:text-white"
              >
                Zobacz oferty
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-foreground/10 group-hover:bg-white/15 transition-colors">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>

              {/* 3 stats counters */}
              <div className="mt-10 lg:mt-14 flex flex-wrap items-start gap-8 lg:gap-12">
                {[
                  { value: "300", suffix: "+", label: "Zrealizowanych transakcji" },
                  { value: "5", suffix: "+", label: "Lat doświadczenia" },
                  { value: "1600", suffix: "+", label: "Agentów w sieci NSL" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-start gap-0.5">
                      <span className="font-sans font-semibold text-4xl lg:text-5xl text-white tracking-normal tabular-nums leading-none">
                        {stat.value}
                      </span>
                      <span className="font-sans font-semibold text-xl lg:text-2xl text-white/85 leading-none">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs text-white/65">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
