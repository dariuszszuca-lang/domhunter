import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Zespół",
  description: "Poznaj zespół DomHunter. Doświadczeni pośrednicy nieruchomości w Trójmieście.",
};

export default function ZespolPage() {
  return (
    <>
      <section className="relative pt-32 lg:pt-44 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(196,48,119,0.08),transparent_55%)]" />
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">Zespół</p>
            <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.025em] text-foreground">
              Ludzie, którzy
              <br />
              <span className="italic text-brand">znają Trójmiasto.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-foreground-muted leading-[1.55] max-w-2xl">
              Dedykowany agent dla każdej transakcji. Setki zrealizowanych sprzedaży, wyrobione kontakty, lokalna wiedza. Karty agentów dodamy w&nbsp;najbliższych dniach.
            </p>
          </div>
        </Container>
      </section>

      {/* Placeholder na karty zespołu — dodamy po dostarczeniu zdjęć/bio */}
      <section className="py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-3xl bg-surface-muted border border-border flex items-center justify-center text-foreground-subtle text-sm"
              >
                Agent {i} — w przygotowaniu
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Contact />
    </>
  );
}
