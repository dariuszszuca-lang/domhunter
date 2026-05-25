"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section className="py-24 lg:py-32 bg-surface-cream relative overflow-hidden">
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Lewa — main copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
              Kontakt
            </p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              Porozmawiajmy o&nbsp;Twojej
              <br />
              <span className="italic">nieruchomości.</span>
            </h2>
            <p className="mt-7 text-lg text-foreground-muted leading-[1.55] max-w-xl">
              Bezpłatna rozmowa, bez zobowiązań. Słuchamy najpierw, potem ustalamy plan działania. Oddzwaniamy w&nbsp;30 minut w&nbsp;godzinach pracy biura.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phones[0].href}
                className="group inline-flex items-center gap-2.5 pl-7 pr-3 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand transition-all"
              >
                <Phone className="size-4" />
                Zadzwoń teraz
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-background/15 group-hover:bg-background/25 transition-colors">
                  <ArrowRight className="size-4" />
                </span>
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-border-strong text-foreground text-sm font-semibold hover:bg-surface hover:border-foreground transition-all"
              >
                Formularz kontaktowy
              </Link>
            </div>
          </motion.div>

          {/* Prawa — info cards */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <InfoCard
              icon={Phone}
              label="Telefon"
              value={siteConfig.contact.phones[0].displayValue}
              href={siteConfig.contact.phones[0].href}
              featured
            />
            <InfoCard
              icon={Mail}
              label="E-mail"
              value={siteConfig.contact.email}
              href={`mailto:${siteConfig.contact.email}`}
            />
            <InfoCard
              icon={MapPin}
              label="Lokalizacja"
              value={siteConfig.address.city + " · Trójmiasto"}
            />
            <InfoCard
              icon={Clock}
              label="Odpowiedź"
              value="W 30 minut w godzinach pracy"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  href,
  featured,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  featured?: boolean;
}) {
  const inner = (
    <div
      className={`group flex items-center gap-5 rounded-2xl p-5 lg:p-6 border transition-all ${
        featured
          ? "bg-foreground text-background border-foreground hover:bg-brand hover:border-brand"
          : "bg-surface border-border hover:border-brand"
      }`}
    >
      <span
        className={`inline-flex items-center justify-center size-12 rounded-xl shrink-0 ${
          featured ? "bg-background/15" : "bg-brand-light text-brand"
        }`}
      >
        <Icon className="size-5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] mb-1 ${featured ? "text-background/60" : "text-foreground-subtle"}`}>
          {label}
        </p>
        <p className={`text-lg font-medium ${featured ? "text-background" : "text-foreground"} truncate`}>
          {value}
        </p>
      </div>
    </div>
  );

  return href ? <a href={href}>{inner}</a> : inner;
}
