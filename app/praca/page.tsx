import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Praca i współpraca",
  description:
    "Dołącz do zespołu Dom Hunter. Szukamy agentów nieruchomości z Trójmiasta, którzy stawiają ludzi przed portalami. Sprawdź, co oferujemy.",
};

const offer = [
  "Dostęp do sieci NSL i bazy ponad 1600 agentów w Polsce",
  "Realne wsparcie marketingu, sesje zdjęciowe i profesjonalne oferty",
  "System CRM i narzędzia, które robią robotę za Ciebie",
  "Atrakcyjny podział prowizji i jasne zasady, bez gier",
  "Biuro w sercu Wrzeszcza i zespół, który gra do jednej bramki",
];

const profile = [
  "Lubisz ludzi i potrafisz słuchać, zanim zaczniesz sprzedawać",
  "Jesteś z Trójmiasta albo znasz ten rynek na pamięć",
  "Masz prawo jazdy i własną organizację pracy",
  "Doświadczenie w nieruchomościach mile widziane, ale nie wymagane",
];

export default function PracaPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Hero */}
      <section className="pb-16 lg:pb-24">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand">
              Dołącz do zespołu
            </p>
            <h1 className="mt-5 font-display font-normal text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.04] tracking-[-0.01em] text-foreground">
              Pracuj z ludźmi, <span className="italic text-brand">nie z portalem.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-[1.6] max-w-xl">
              Budujemy lokalne biuro, w którym agent ma realne wsparcie, a klient prawdziwą opiekę.
              Jeśli tak właśnie chcesz pracować, jesteśmy po to samo.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Praca w Dom Hunter`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-foreground text-background pl-6 pr-2 py-2.5 text-sm font-semibold hover:bg-brand transition-colors"
              >
                Wyślij CV
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-background/15 group-hover:rotate-12 transition-transform">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
              <a
                href={siteConfig.contact.phones[0].href}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <Phone className="size-4 text-brand" />
                Zadzwoń i zapytaj
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Co oferujemy + profil */}
      <section className="py-16 lg:py-24 bg-surface-muted">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 text-brand px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                <Sparkles className="size-3.5" />
                Co oferujemy
              </div>
              <h2 className="mt-5 font-display font-normal text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] tracking-[-0.01em] text-foreground">
                Wsparcie, nie tylko biurko.
              </h2>
              <ul className="mt-7 space-y-4">
                {offer.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 inline-flex items-center justify-center size-6 rounded-full bg-brand/10 text-brand shrink-0">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-base leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                Kogo szukamy
              </div>
              <h2 className="mt-5 font-display font-normal text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] tracking-[-0.01em] text-foreground">
                Ludzi z charakterem.
              </h2>
              <ul className="mt-7 space-y-4">
                {profile.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 inline-flex items-center justify-center size-6 rounded-full bg-foreground/5 text-foreground shrink-0">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-base leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-28">
        <Container size="wide">
          <div className="rounded-[10px] bg-foreground text-background p-9 lg:p-14 text-center">
            <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.2rem)] leading-[1.08]">
              Poznajmy się.
            </h2>
            <p className="mt-4 text-background/70 leading-relaxed max-w-xl mx-auto">
              Wyślij CV albo po prostu zadzwoń. Pierwsza rozmowa do niczego nie zobowiązuje.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Praca w Dom Hunter`}
                className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-semibold hover:bg-brand-hover transition-colors"
              >
                <Mail className="size-4" />
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.contact.phones[0].href}
                className="inline-flex items-center gap-2 rounded-full border border-background/25 px-6 py-3 text-sm font-semibold hover:bg-background hover:text-foreground transition-colors"
              >
                <Phone className="size-4" />
                {siteConfig.contact.phones[0].displayValue}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
