import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative pt-32 lg:pt-44 pb-16 lg:pb-24">
      <Container size="wide">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest mb-5">
            DomHunter Nieruchomości
          </p>
          <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-tight text-foreground">
            Lokalne biuro nieruchomości
            <br />
            <span className="text-foreground-muted italic">w Gdańsku.</span>
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-foreground-muted leading-relaxed max-w-2xl">
            Sprzedaż, kupno, wynajem i komercja. Trójmiasto i okolice. Indywidualne podejście do każdej transakcji.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/oferty"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest-hover transition-all"
            >
              Zobacz oferty
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={siteConfig.contact.phones[0].href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border-strong text-foreground text-sm font-semibold hover:bg-surface-muted hover:border-foreground transition-all"
            >
              <Phone className="size-4" />
              {siteConfig.contact.phones[0].displayValue}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
