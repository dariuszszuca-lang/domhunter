import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { readOffers } from "@/lib/esti/store";
import { formatPrice, formatArea } from "@/lib/esti/format";

export async function FeaturedOffers() {
  const cache = await readOffers();
  const offers = (cache?.offers ?? []).slice(0, 8);

  if (offers.length === 0) {
    return (
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest mb-4">
              Wybrane oferty
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-foreground">
              Najnowsze oferty pojawią się tutaj.
            </h2>
            <p className="mt-4 text-foreground-muted">
              Synchronizujemy bazę z naszym CRM. Pierwsze oferty będą widoczne wkrótce. W międzyczasie zadzwoń, znajdziemy coś dopasowanego.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest mb-4">
              Wybrane oferty
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-foreground">
              Aktualne propozycje z Trójmiasta.
            </h2>
          </div>
          <Link
            href="/oferty"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border-strong text-sm font-semibold text-foreground hover:border-brand-forest hover:text-brand-forest transition-colors"
          >
            Wszystkie oferty
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {offers.map((o) => (
            <Link
              key={o.id}
              href={`/oferty/${o.id}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-brand-forest hover:shadow-card transition-all"
            >
              <div className="relative aspect-[4/3] bg-surface-muted overflow-hidden">
                {o.images && o.images.length > 0 ? (
                  <Image
                    src={o.images[0].url}
                    alt={o.title || "Oferta"}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-foreground-subtle text-xs">
                    Brak zdjęcia
                  </div>
                )}
                <div className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[11px] font-semibold text-brand-forest uppercase tracking-wider">
                  {o.transaction === "najem" ? "Wynajem" : "Sprzedaż"}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="font-display font-bold text-lg lg:text-xl tracking-tight text-foreground leading-tight">
                  {formatPrice(o.price)}
                </p>
                <p className="mt-1.5 text-sm text-foreground-muted leading-snug">
                  {formatArea(o.area)} · {o.rooms} {o.rooms === 1 ? "pokój" : "pokoje"}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-foreground-subtle">
                  <MapPin className="size-3.5 shrink-0" />
                  {[o.city, o.district].filter(Boolean).join(", ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
