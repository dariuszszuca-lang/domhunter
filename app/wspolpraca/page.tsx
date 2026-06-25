import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { WspolpracaForm } from "@/components/sections/wspolpraca-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Współpraca, dołącz do zespołu Dom Hunter",
  description:
    "Jesteś agentem nieruchomości i szukasz miejsca, gdzie liczy się relacja z klientem i uczciwa robota? Poznajmy się. Zostaw dane, odezwiemy się i spokojnie pogadamy.",
  alternates: { canonical: `${siteConfig.url}/wspolpraca` },
};

const benefits = [
  {
    title: "Jeden agent, pełna obsługa",
    text: "Prowadzisz klienta od pierwszej rozmowy aż po klucze w dłoni. Bez przerzucania ludzi między działami.",
  },
  {
    title: "Oferty spoza portali",
    text: "Dostęp do sieci Nieruchomości Spod Lady, ponad 2000 agentów i ofert, których nie znajdziesz na Otodom czy OLX.",
  },
  {
    title: "Lokalny rynek, który znamy",
    text: "Gdańsk, Gdynia, Sopot i okolice. Działamy tam, gdzie naprawdę czujemy się jak w domu.",
  },
  {
    title: "Zespół, nie maszyna",
    text: "Wsparcie, wspólne case'y i normalni ludzie obok. Liczy się robota i relacje, nie tylko słupki.",
  },
];

export default function WspolpracaPage() {
  return (
    <div className="pt-10 lg:pt-16">
      {/* Hero */}
      <section className="py-12 lg:py-20">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Współpraca
            </p>
            <h1 className="font-display font-normal text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.03] tracking-[-0.01em] text-foreground">
              Zostań częścią{" "}
              <span className="italic text-brand">Dom Hunter.</span>
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground-muted">
              <p>
                Podoba Ci się to, co robimy i jak pracujemy? Jesteś agentem
                i chciałbyś być częścią naszego zespołu? Zostaw swoje dane,
                a my się odezwiemy i spokojnie pogadamy.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Co u nas znajdziesz */}
      <section className="pb-12 lg:pb-16">
        <Container size="wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-[28px] border border-border bg-surface p-7 lg:p-8"
              >
                <h2 className="font-display text-2xl font-normal text-foreground">
                  {b.title}
                </h2>
                <p className="mt-3 leading-relaxed text-foreground-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formularz */}
      <section className="pb-20 lg:pb-28">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
            <div className="max-w-md">
              <h2 className="font-display font-normal text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.06] tracking-[-0.01em] text-foreground">
                Zostaw dane,
                <br />
                <span className="italic text-brand">odezwiemy się.</span>
              </h2>
              <p className="mt-5 leading-relaxed text-foreground-muted">
                Bez zobowiązań. Po prostu poznajmy się i zobaczmy, czy nasze podejście
                do tej roboty gra w tę samą stronę.
              </p>
            </div>
            <WspolpracaForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
