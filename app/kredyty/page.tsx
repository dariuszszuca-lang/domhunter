import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone, Check, Calculator, Landmark, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kredyty hipoteczne",
  description:
    "Pomożemy Ci sfinansować nieruchomość. Współpracujemy z niezależnym doradcą kredytowym, który porówna oferty banków i przeprowadzi Cię przez cały proces.",
};

const steps = [
  {
    icon: Calculator,
    title: "Sprawdzamy zdolność",
    body: "Zanim zakochasz się w mieszkaniu, wiesz na co Cię realnie stać. Bez niespodzianek przy podpisie.",
  },
  {
    icon: Landmark,
    title: "Porównujemy banki",
    body: "Doradca zestawia oferty kilkunastu banków i wybiera tę z najniższym realnym kosztem, nie tylko najniższą reklamą.",
  },
  {
    icon: ShieldCheck,
    title: "Prowadzimy do końca",
    body: "Kompletujemy dokumenty, pilnujemy terminów i jesteśmy obecni aż do uruchomienia kredytu.",
  },
];

const benefits = [
  "Bezpłatna konsultacja i analiza zdolności kredytowej",
  "Dostęp do ofert kilkunastu banków w jednym miejscu",
  "Pomoc przy zakupie, refinansowaniu i konsolidacji",
  "Doradca prowadzi sprawę razem z agentem Dom Hunter",
];

export default function KredytyPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Hero */}
      <section className="pb-16 lg:pb-24">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand">
              Finansowanie nieruchomości
            </p>
            <h1 className="mt-5 font-display font-normal text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
              Kredyt, który <span className="italic text-brand">naprawdę</span> się spina.
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-[1.6] max-w-xl">
              Nie jesteśmy bankiem ani pośrednikiem na prowizji od jednego z nich. Łączymy Cię z
              niezależnym doradcą kredytowym, który patrzy na cały rynek i Twój interes.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phones[0].href}
                className="group inline-flex items-center gap-2.5 rounded-full bg-foreground text-background pl-6 pr-2 py-2.5 text-sm font-semibold hover:bg-brand transition-colors"
              >
                Porozmawiaj o kredycie
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-background/15 group-hover:rotate-12 transition-transform">
                  <Phone className="size-4" />
                </span>
              </a>
              <Link
                href="/oferty"
                className="inline-flex items-center rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Zobacz oferty
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Kroki */}
      <section className="py-16 lg:py-24 bg-surface-muted">
        <Container size="wide">
          <h2 className="font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground max-w-2xl">
            Jak Ci pomagamy
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="rounded-[8px] bg-surface border border-border p-7">
                <span className="inline-flex items-center justify-center size-12 rounded-full bg-brand/10 text-brand">
                  <s.icon className="size-6" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 font-display text-[1.4rem] font-normal text-foreground">{s.title}</h3>
                <p className="mt-3 text-foreground-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Korzysci + CTA */}
      <section className="py-16 lg:py-28">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand">
                Co zyskujesz
              </p>
              <h2 className="mt-4 font-display font-normal text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
                Jedno biuro, cała transakcja.
              </h2>
              <ul className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 inline-flex items-center justify-center size-6 rounded-full bg-brand/10 text-brand shrink-0">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-base leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[10px] bg-foreground text-background p-9 lg:p-12">
              <p className="font-display text-[1.9rem] leading-[1.15]">
                Sprawdź swoją zdolność kredytową bez zobowiązań.
              </p>
              <p className="mt-4 text-background/70 leading-relaxed">
                Zadzwoń, a umówimy Cię z doradcą. Konsultacja jest bezpłatna.
              </p>
              <a
                href={siteConfig.contact.phones[0].href}
                className="mt-8 inline-flex items-center gap-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none hover:text-brand transition-colors"
              >
                <Phone className="size-6 text-brand" strokeWidth={1.8} />
                {siteConfig.contact.phones[0].displayValue}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
