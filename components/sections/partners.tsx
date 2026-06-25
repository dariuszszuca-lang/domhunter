import Image from "next/image";
import { Container } from "@/components/ui/container";

type Partner = { name: string; logo: string | null; url: string | null };

const partners: Partner[] = [
  { name: "Nieruchomości Spod Lady", logo: "/images/partners/nsl.png", url: "https://nieruchomoscispodlady.pl" },
  { name: "OLX", logo: "/images/partners/olx.png", url: "https://www.olx.pl" },
  { name: "nieruchomości-online", logo: "/images/partners/nieruchomosci-online.png", url: "https://www.nieruchomosci-online.pl" },
  { name: "Otodom", logo: null, url: "https://www.otodom.pl" },
  { name: "Esti", logo: null, url: "https://esticrm.pl" },
  { name: "Stowarzyszenie Pośredników Pomorskich", logo: null, url: null },
];

const cardClass =
  "group flex h-24 items-center justify-center rounded-2xl border border-border bg-surface p-4 transition-all hover:border-brand/40 hover:shadow-[0_18px_40px_-22px_rgba(20,21,21,0.3)]";

export function Partners() {
  return (
    <section className="bg-surface-cream py-16 lg:py-20">
      <Container size="wide">
        <div className="mb-10 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Partnerzy
          </p>
          <h2 className="mt-3 font-display font-normal text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.06] tracking-[-0.01em] text-foreground">
            Współpracujemy z <span className="italic text-brand">najlepszymi.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {partners.map((p) => {
            const inner = p.logo ? (
              <Image
                src={p.logo}
                alt={p.name}
                width={200}
                height={100}
                className="h-11 w-auto max-w-[140px] object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            ) : (
              <span className="text-center text-sm font-semibold leading-tight text-foreground-subtle transition-colors group-hover:text-brand">
                {p.name}
              </span>
            );
            return p.url ? (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {inner}
              </a>
            ) : (
              <div key={p.name} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
