import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Bed, Square } from "lucide-react";
import { Container } from "@/components/ui/container";
import { readOffers } from "@/lib/esti/store";
import { formatPrice, formatArea } from "@/lib/esti/format";
import type { Offer } from "@/lib/esti/types";

export async function FeaturedOffers() {
  const cache = await readOffers();
  const offers = (cache?.offers ?? []).slice(0, 7);

  if (offers.length === 0) {
    return <EmptyState />;
  }

  const [featured, ...rest] = offers;

  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
              Wybrane oferty
            </p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              Aktualne propozycje
              <br />
              <span className="italic">z&nbsp;Trójmiasta.</span>
            </h2>
          </div>
          <Link
            href="/oferty"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand transition-colors"
          >
            Wszystkie oferty
            <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Featured card duża */}
          <FeaturedCard offer={featured} />

          {/* Mniejsze karty */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {rest.slice(0, 4).map((o) => (
              <OfferCard key={o.id} offer={o} compact />
            ))}
          </div>
        </div>

        {/* Druga rzędem */}
        {rest.length > 4 && (
          <div className="mt-5 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {rest.slice(4).map((o) => (
              <OfferCard key={o.id} offer={o} compact />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function FeaturedCard({ offer }: { offer: Offer }) {
  return (
    <Link
      href={`/oferty/${offer.id}`}
      className="group lg:col-span-7 relative flex flex-col rounded-3xl overflow-hidden bg-surface border border-border hover:border-brand transition-all"
    >
      <div className="relative aspect-[16/11] bg-surface-muted overflow-hidden">
        {offer.images && offer.images.length > 0 ? (
          <Image
            src={offer.images[0].url}
            alt={offer.title || "Oferta"}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-foreground-subtle text-xs">
            Brak zdjęcia
          </div>
        )}
        <div className="absolute top-5 left-5 inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          {offer.transaction === "najem" ? "Wynajem" : "Sprzedaż"}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-white/90 text-xs uppercase tracking-[0.18em] flex items-center gap-1.5 mb-1.5">
              <MapPin className="size-3.5" />
              {[offer.city, offer.district].filter(Boolean).join(", ")}
            </p>
          </div>
          <span className="inline-flex items-center justify-center size-11 rounded-full bg-white/95 text-foreground group-hover:bg-brand group-hover:text-white transition-all">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
      <div className="p-7 lg:p-8 flex-1 flex flex-col">
        <p className="font-display text-3xl lg:text-4xl tracking-tight text-foreground">
          {formatPrice(offer.price)}
        </p>
        <div className="mt-4 flex items-center gap-5 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-1.5">
            <Square className="size-4" />
            {formatArea(offer.area)}
          </span>
          {offer.rooms ? (
            <span className="inline-flex items-center gap-1.5">
              <Bed className="size-4" />
              {offer.rooms} {offer.rooms === 1 ? "pokój" : "pokoje"}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function OfferCard({ offer, compact }: { offer: Offer; compact?: boolean }) {
  return (
    <Link
      href={`/oferty/${offer.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-brand hover:shadow-card transition-all"
    >
      <div className="relative aspect-[4/3] bg-surface-muted overflow-hidden">
        {offer.images && offer.images.length > 0 ? (
          <Image
            src={offer.images[0].url}
            alt={offer.title || "Oferta"}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-foreground-subtle text-xs">
            Brak zdjęcia
          </div>
        )}
        <div className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full bg-white/95 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
          {offer.transaction === "najem" ? "Wynajem" : "Sprzedaż"}
        </div>
      </div>
      <div className={compact ? "p-5" : "p-6"}>
        <p className="font-display text-xl lg:text-2xl tracking-tight text-foreground">
          {formatPrice(offer.price)}
        </p>
        <div className="mt-2.5 flex items-center gap-4 text-xs text-foreground-muted">
          <span className="inline-flex items-center gap-1">
            <Square className="size-3.5" />
            {formatArea(offer.area)}
          </span>
          {offer.rooms ? (
            <span className="inline-flex items-center gap-1">
              <Bed className="size-3.5" />
              {offer.rooms} {offer.rooms === 1 ? "pokój" : "pokoje"}
            </span>
          ) : null}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-foreground-subtle">
          <MapPin className="size-3 shrink-0" />
          {[offer.city, offer.district].filter(Boolean).join(", ")}
        </p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <section className="py-24 lg:py-32">
      <Container size="wide">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand mb-5">
            Wybrane oferty
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
            Najnowsze oferty pojawią się tutaj.
          </h2>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
            Synchronizujemy bazę z naszym CRM. Pierwsze oferty będą widoczne wkrótce. W&nbsp;międzyczasie zadzwoń, znajdziemy coś dopasowanego.
          </p>
        </div>
      </Container>
    </section>
  );
}
