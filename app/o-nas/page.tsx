import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WhyUs } from "@/components/sections/why-us";
import { Contact } from "@/components/sections/contact";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nas",
  description: "Poznaj DomHunter — lokalne biuro nieruchomości w Gdańsku. Pośrednicy z setkami transakcji, sieć off-market NSL, doświadczenie i pasja.",
};

export default function ONasPage() {
  return (
    <>
      <section className="relative pt-10 lg:pt-16 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(196,48,119,0.08),transparent_55%)]" />
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">O nas</p>
              <h1 className="font-sans font-semibold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.025em] text-foreground">
                Lokalne biuro
                <br />
                <span className="italic text-brand">z duszą.</span>
              </h1>
              <p className="mt-8 text-lg lg:text-xl text-foreground-muted leading-[1.55] max-w-2xl">
                DomHunter to lokalne biuro nieruchomości w&nbsp;Gdańsku, stworzone przez doświadczonych pośredników. Ludzi, którzy zrealizowali setki transakcji i&nbsp;byli częścią sukcesu czołowych agencji w&nbsp;Polsce. Łączy nas pasja do tego, co robimy, i&nbsp;szacunek do klientów.
              </p>
            </div>
            <aside className="lg:col-span-4 rounded-3xl bg-surface border border-border p-7 shadow-soft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-4">Liczby</p>
              <dl className="space-y-4 divide-y divide-border">
                <div className="flex items-baseline justify-between pt-0">
                  <dt className="text-sm text-foreground-muted">Lata na rynku</dt>
                  <dd className="font-display text-3xl tabular-nums">{siteConfig.metrics.yearsActive}</dd>
                </div>
                <div className="flex items-baseline justify-between pt-4">
                  <dt className="text-sm text-foreground-muted">Transakcje</dt>
                  <dd className="font-display text-3xl tabular-nums">{siteConfig.metrics.transactions}</dd>
                </div>
                <div className="flex items-baseline justify-between pt-4">
                  <dt className="text-sm text-foreground-muted">Ocena</dt>
                  <dd className="font-display text-3xl tabular-nums">
                    {siteConfig.metrics.rating}<span className="text-base text-foreground-muted font-normal"> / 5</span>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <WhyUs />

      {/* NSL partnership */}
      <section className="py-24 lg:py-32 bg-surface-cream">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">Partnerstwa</p>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              Nieruchomości <span className="italic">Spod Lady.</span>
            </h2>
            <p className="mt-7 text-lg text-foreground-muted leading-[1.55]">
              Należymy do sieci NSL — największej w&nbsp;Polsce społeczności agentów rynku off-market. Ponad 2000 pośredników z&nbsp;całego kraju wymienia oferty, których nie ma w&nbsp;publicznych portalach. Dla Ciebie to bezpośredni dostęp do nieruchomości, które normalnie nigdy nie trafiłyby do Twoich rąk.
            </p>
            <Link
              href={siteConfig.partners.nsl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-deep transition-colors"
            >
              Poznaj NSL
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <Contact />
    </>
  );
}
