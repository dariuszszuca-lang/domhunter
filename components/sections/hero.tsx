"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative pt-32 lg:pt-44 pb-20 lg:pb-32 overflow-hidden">
      {/* Subtelny gradient w tle */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(196,48,119,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(153,26,117,0.04),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute top-20 right-[-100px] -z-10 w-[500px] h-[500px] rounded-full bg-brand-soft/[0.04] blur-[120px]"
      />

      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Lewa — main copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-light border border-brand/15 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand mb-7">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              DomHunter Nieruchomości · Gdańsk
            </div>

            <h1 className="font-display font-bold text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-foreground">
              Twoje miejsce
              <br />
              <span className="italic text-brand">w Trójmieście.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg lg:text-xl text-foreground-muted leading-[1.55]">
              Lokalne biuro nieruchomości w&nbsp;Gdańsku. Sprzedaż, kupno, wynajem i&nbsp;komercja w&nbsp;Trójmieście i&nbsp;okolicach. Każdą sprawą zajmuje się dedykowany agent.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/oferty"
                className="group inline-flex items-center gap-2.5 pl-7 pr-3 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand transition-all duration-300"
              >
                Zobacz oferty
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-background/15 group-hover:bg-background/25 transition-colors">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
              <a
                href={siteConfig.contact.phones[0].href}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-border-strong text-foreground text-sm font-semibold hover:border-foreground hover:bg-surface transition-all"
              >
                <Phone className="size-4 text-brand" />
                {siteConfig.contact.phones[0].displayValue}
              </a>
            </div>
          </motion.div>

          {/* Prawa — premium info card */}
          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="relative rounded-3xl border border-border bg-surface/80 backdrop-blur-md shadow-soft p-7 lg:p-8">
              <div
                aria-hidden
                className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-brand-soft/60 to-transparent"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
                Liczby, które nas opisują
              </p>

              <dl className="space-y-5 divide-y divide-border">
                {[
                  { label: "Na rynku", value: `${siteConfig.metrics.yearsActive}`, suffix: " lat" },
                  { label: "Transakcji", value: siteConfig.metrics.transactions, suffix: "" },
                  { label: "Ocena klientów", value: siteConfig.metrics.rating, suffix: " / 5" },
                ].map((stat, idx) => (
                  <div key={stat.label} className={`flex items-baseline justify-between ${idx === 0 ? "" : "pt-5"}`}>
                    <dt className="text-sm text-foreground-muted">{stat.label}</dt>
                    <dd className="font-display font-bold text-3xl lg:text-4xl tabular-nums text-foreground tracking-tight">
                      {stat.value}
                      <span className="text-base text-foreground-muted font-normal">{stat.suffix}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 pt-6 border-t border-border flex items-center gap-3 text-sm text-foreground-muted">
                <MapPin className="size-4 text-brand shrink-0" />
                <span>Gdańsk i&nbsp;Trójmiasto · sieć off-market przez NSL</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
