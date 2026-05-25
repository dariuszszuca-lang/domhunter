import { MapPin, Network, Award } from "lucide-react";
import { Container } from "@/components/ui/container";

const reasons = [
  {
    icon: MapPin,
    title: "Lokalna wiedza",
    body: "Pracujemy w Trójmieście od lat. Każdą dzielnicę Gdańska znamy z rozmów z klientami, nie z portali.",
  },
  {
    icon: Network,
    title: "Off-market przez NSL",
    body: "Należymy do sieci Nieruchomości Spod Lady (1600+ agentów). Masz dostęp do ofert, których nie ma w portalach.",
  },
  {
    icon: Award,
    title: "Doświadczenie i kontakty",
    body: "Pośrednicy z setkami zrealizowanych transakcji. Wyrobione relacje z bankami, kancelariami, deweloperami.",
  },
];

export function WhyUs() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand mb-4">
            Dlaczego my
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-foreground">
            Trzy rzeczy, których nie da się podrobić.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="flex flex-col gap-4">
                <span className="inline-flex items-center justify-center size-12 rounded-xl bg-brand text-white">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl tracking-tight text-foreground mb-2">
                    {r.title}
                  </h3>
                  <p className="text-base text-foreground-muted leading-relaxed">{r.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
