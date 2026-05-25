"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative pt-24 lg:pt-28 pb-16">
      <Container size="wide">
        <div className="relative rounded-[28px] lg:rounded-[40px] overflow-hidden bg-foreground min-h-[640px] lg:min-h-[760px]">
          {/* Background image */}
          <Image
            src="/images/hero-luxury-2.jpg"
            alt="Luksusowa nieruchomość w Trójmieście"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />

          {/* Gradient overlay (bottom-up + left-right) */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/45 to-foreground/15"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/20 to-transparent"
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-8 lg:p-14 min-h-[640px] lg:min-h-[760px]">
            {/* Featured agents chip — prawy dolny róg */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-8 lg:bottom-14 right-8 lg:right-14 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur shadow-card"
            >
              <div className="flex -space-x-2">
                {["from-pink-300 to-orange-300", "from-blue-300 to-purple-300", "from-amber-300 to-rose-300", "from-emerald-300 to-cyan-300"].map((g, i) => (
                  <span
                    key={i}
                    className={`size-8 rounded-full bg-gradient-to-br ${g} ring-2 ring-white`}
                  />
                ))}
              </div>
              <div className="pr-1">
                <p className="text-xs font-semibold text-foreground leading-tight">10+ Agentów</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-[11px] font-medium text-foreground-muted">5.0 / 5</span>
                </div>
              </div>
            </motion.div>

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <h1 className="font-sans font-bold uppercase text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-white">
                Znajdź swoje
                <br />
                wymarzone miejsce
              </h1>
              <p className="mt-7 max-w-xl text-base lg:text-lg text-white/85 leading-[1.55]">
                Lokalne biuro nieruchomości w&nbsp;Trójmieście. Dedykowany agent dla każdej transakcji. Dostęp do ofert off-market przez sieć NSL.
              </p>

              <Link
                href="/oferty"
                className="group mt-9 inline-flex items-center gap-3 pl-7 pr-3 py-2.5 rounded-full bg-white text-foreground text-sm font-semibold hover:bg-brand hover:text-white transition-all"
              >
                Zobacz oferty
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-foreground/10 group-hover:bg-white/15 transition-colors">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>

              {/* 3 stats counters */}
              <div className="mt-12 lg:mt-14 flex flex-wrap items-start gap-8 lg:gap-14">
                {[
                  { value: "300", suffix: "+", label: "Zrealizowanych transakcji" },
                  { value: "5", suffix: "+", label: "Lat doświadczenia" },
                  { value: "1600", suffix: "+", label: "Agentów w sieci NSL" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-start gap-0.5">
                      <span className="font-sans font-semibold text-5xl lg:text-6xl text-white tracking-tight tabular-nums leading-none">
                        {stat.value}
                      </span>
                      <span className="font-sans font-semibold text-2xl lg:text-3xl text-white/85 leading-none">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="mt-3 text-xs lg:text-sm text-white/65">{stat.label}</p>
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
