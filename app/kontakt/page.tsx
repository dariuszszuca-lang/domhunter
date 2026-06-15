import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowRight, PenLine } from "lucide-react";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Kontakt, biuro nieruchomości Dom Hunter w Gdańsku",
  description:
    "Skontaktuj się z Dom Hunter. Zadzwoń do Sylwii Wróblewskiej pod 571 309 209 albo napisz, a pomożemy przy kupnie, sprzedaży i wynajmie nieruchomości w Gdańsku i całym Trójmieście.",
};

export default function KontaktPage() {
  return (
    <section className="pb-24 pt-12 lg:pb-32 lg:pt-20">
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Kontakt
          </p>
          <h1 className="font-display font-normal text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.03] tracking-[-0.01em] text-foreground">
            Zadzwoń albo <span className="italic text-brand">napisz.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-[1.55] text-foreground-muted">
            Najprościej, jak się da. Odezwij się, a resztą zajmiemy się my.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {/* Telefon Sylwii */}
          <a
            href="tel:+48571309209"
            className="group flex flex-col rounded-[26px] border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-brand lg:p-8"
          >
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Phone className="size-5" strokeWidth={2} />
            </span>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Telefon
            </p>
            <p className="font-display text-2xl font-normal leading-none text-foreground transition-colors group-hover:text-brand">
              571 309 209
            </p>
            <p className="mt-2 text-sm text-foreground-muted">Sylwia Wróblewska</p>
          </a>

          {/* Email */}
          <a
            href="mailto:kontakt@domhunter.pl"
            className="group flex flex-col rounded-[26px] border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-brand lg:p-8"
          >
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Mail className="size-5" strokeWidth={2} />
            </span>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              E-mail
            </p>
            <p className="break-all font-display text-xl font-normal leading-snug text-foreground transition-colors group-hover:text-brand">
              kontakt@domhunter.pl
            </p>
            <p className="mt-2 text-sm text-foreground-muted">Odpowiadamy tego samego dnia</p>
          </a>
        </div>

        <div className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-3">
          <a
            href="tel:+48571309209"
            className="group inline-flex items-center gap-2.5 rounded-full bg-brand py-2 pl-7 pr-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hover"
          >
            <Phone className="size-4" />
            Zadzwoń teraz
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
              <ArrowRight className="size-4" />
            </span>
          </a>
          <a
            href="mailto:kontakt@domhunter.pl"
            className="inline-flex items-center gap-2.5 rounded-full border border-border-strong px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-brand hover:text-brand"
          >
            <PenLine className="size-4" />
            Napisz wiadomość
          </a>
        </div>
      </Container>
    </section>
  );
}
