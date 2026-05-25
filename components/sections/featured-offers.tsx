import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Bed, Square, Bath } from "lucide-react";
import { Container } from "@/components/ui/container";
import { readOffers } from "@/lib/esti/store";
import { formatPrice, formatArea } from "@/lib/esti/format";
import type { Offer } from "@/lib/esti/types";

// Fallback sample data — gdy ESTI jeszcze nie podpięte
const sampleOffers = [
  { id: "s1", image: "/images/properties/sample-1.jpg", badge: "Na sprzedaż", title: "Apartament premium", location: "Wrzeszcz, Gdańsk", price: "899 000 zł", beds: 3, baths: 2, area: "52 m²" },
  { id: "s2", image: "/images/properties/sample-2.jpg", badge: "Na wynajem", title: "Lokal biurowy", location: "Kowale, Gdańsk", price: "2 840 zł/mc", beds: 1, baths: 1, area: "60 m²" },
  { id: "s3", image: "/images/properties/sample-3.jpg", badge: "Inwestycja", title: "Mieszkanie 2-pokojowe", location: "Morena, Gdańsk", price: "576 000 zł", beds: 2, baths: 1, area: "49 m²" },
  { id: "s4", image: "/images/properties/sample-4.jpg", badge: "Na sprzedaż", title: "Komfortowe mieszkanie", location: "Suchanino, Gdańsk", price: "475 000 zł", beds: 2, baths: 1, area: "42 m²" },
  { id: "s5", image: "/images/properties/sample-5.jpg", badge: "Inwestycja", title: "Mieszkanie kawalerka", location: "Przymorze, Gdańsk", price: "495 000 zł", beds: 1, baths: 1, area: "38 m²" },
  { id: "s6", image: "/images/properties/sample-6.jpg", badge: "Na wynajem", title: "Apartament rodzinny", location: "Wrzeszcz, Gdańsk", price: "8 000 zł/mc", beds: 4, baths: 2, area: "130 m²" },
];

export async function FeaturedOffers() {
  const cache = await readOffers();
  const esti = (cache?.offers ?? []).slice(0, 6);
  const items = esti.length > 0 ? esti.map(mapOfferToCard) : sampleOffers;

  return (
    <section className="py-24 lg:py-32 bg-surface-muted">
      <Container size="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface border border-border text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
            Nieruchomości
          </div>
          <h2 className="font-sans font-bold uppercase text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            Aktualne oferty z Trójmiasta
          </h2>
          <p className="mt-6 max-w-xl text-base lg:text-lg text-foreground-muted leading-[1.55]">
            Aktualizujemy bazę codziennie. Pełna lista z&nbsp;filtrami w&nbsp;zakładce <Link href="/oferty" className="underline underline-offset-2 text-foreground hover:text-brand">Oferty</Link>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((o) => (
            <Link
              key={o.id}
              href={`/oferty/${o.id}`}
              className="group flex flex-col rounded-3xl overflow-hidden bg-surface hover:shadow-card transition-all"
            >
              <div className="relative aspect-[4/3] bg-foreground/5 overflow-hidden">
                <Image
                  src={o.image}
                  alt={o.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                  {o.badge}
                </div>
                <div className="absolute bottom-4 right-4 inline-flex items-center justify-center size-11 rounded-full bg-white/95 text-foreground group-hover:bg-brand group-hover:text-white transition-all">
                  <ArrowUpRight className="size-5" />
                </div>
              </div>

              <div className="p-6">
                <p className="flex items-center gap-1.5 text-xs text-foreground-muted mb-3">
                  <MapPin className="size-3.5" />
                  {o.location}
                </p>

                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-sans font-bold text-xl tracking-tight text-foreground">
                    {o.title}
                  </h3>
                  <p className="font-sans font-bold text-xl tracking-tight text-foreground tabular-nums whitespace-nowrap">
                    {o.price}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center gap-5 text-sm text-foreground-muted">
                  {o.beds ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Bed className="size-4" />
                      {o.beds}
                    </span>
                  ) : null}
                  {o.baths ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Bath className="size-4" />
                      {o.baths}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Square className="size-4" />
                    {o.area}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/oferty"
            className="group inline-flex items-center gap-3 pl-7 pr-3 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand transition-all"
          >
            Zobacz wszystkie oferty
            <span className="inline-flex items-center justify-center size-9 rounded-full bg-background/15 group-hover:bg-background/25 transition-colors">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function mapOfferToCard(o: Offer) {
  return {
    id: o.id,
    image: o.images?.[0]?.url ?? "/images/properties/sample-1.jpg",
    badge: o.transaction === "najem" ? "Na wynajem" : "Na sprzedaż",
    title: o.title || "Nieruchomość",
    location: [o.city, o.district].filter(Boolean).join(", "),
    price: formatPrice(o.price),
    beds: o.rooms ?? 0,
    baths: 0,
    area: formatArea(o.area),
  };
}
