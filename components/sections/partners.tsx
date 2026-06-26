import Image from "next/image";
import { Container } from "@/components/ui/container";

type Partner = { name: string; logo: string; url: string | null };

const partners: Partner[] = [
  { name: "Nieruchomości Spod Lady", logo: "/images/partners/nsl.png", url: "https://nieruchomoscispodlady.pl" },
  { name: "OLX", logo: "/images/partners/olx.png", url: "https://www.olx.pl" },
  { name: "Otodom", logo: "/images/partners/otodom.png", url: "https://www.otodom.pl" },
  { name: "nieruchomości-online", logo: "/images/partners/nieruchomosci-online.png", url: "https://www.nieruchomosci-online.pl" },
  { name: "EstiCRM", logo: "/images/partners/esti.png", url: "https://esticrm.pl" },
  { name: "Polska Federacja Rynku Nieruchomości (SPPON)", logo: "/images/partners/sppon.png", url: null },
];

export function Partners() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-cream to-surface py-20 lg:py-28">
      {/* subtelny brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(211,30,192,0.06),transparent_60%)]"
      />

      <Container size="wide">
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand">
            Zaufali nam
          </p>
          <h2 className="mt-4 font-display font-normal text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
            Działamy z <span className="italic text-brand">najlepszymi.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-foreground-muted">
            Portale, sieci i organizacje branżowe, z którymi współpracujemy każdego dnia.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {partners.map((p) => {
            const logo = (
              <Image
                src={p.logo}
                alt={p.name}
                width={260}
                height={130}
                className="max-h-14 w-auto max-w-[155px] object-contain opacity-75 grayscale transition-all duration-500 ease-out group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0"
              />
            );
            const cls =
              "group relative flex h-24 items-center justify-center rounded-[20px] border border-border/70 bg-surface px-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_30px_64px_-32px_rgba(211,30,192,0.4)]";
            return p.url ? (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name} className={cls}>
                {logo}
              </a>
            ) : (
              <div key={p.name} aria-label={p.name} className={cls}>
                {logo}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
