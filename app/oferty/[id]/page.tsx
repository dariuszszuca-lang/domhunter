import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  BedDouble,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  Mail,
  Check,
  Hash,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MemberPhoto } from "@/components/team/member-photo";
import { getOfferById } from "@/lib/esti/store";
import { getMemberBySlug, getMemberByName } from "@/lib/team";
import { siteConfig } from "@/lib/site";
import type { Offer } from "@/lib/esti/types";
import {
  formatPrice,
  formatPricePerSqm,
  formatArea,
  offerTitle,
  typeLabel,
  typeLabels,
  transactionLabels,
} from "@/lib/esti/format";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

/** Lokalizacja w jednym zdaniu, od najbardziej szczegółowej do miasta. */
function offerLocation(o: Offer): string {
  return [o.district, o.city].filter(Boolean).join(", ");
}

/** Opisowy alt zdjęcia z typem nieruchomości i lokalizacją. */
function offerImageAlt(o: Offer, position?: string): string {
  const base = `${typeLabel(o)}, ${transactionLabels[o.transaction].toLowerCase()}, ${offerLocation(o)}`;
  return position ? `${base}. ${position}` : base;
}

/** Tytuł meta: oferta plus cena, gdy się zmieści. */
function offerMetaTitle(o: Offer): string {
  const base = offerTitle(o);
  const withPrice = `${base}, ${formatPrice(o.price)}`;
  return withPrice.length <= 65 ? withPrice : base;
}

/** Opis meta z realnych pól oferty (bez zmyślania). */
function offerMetaDescription(o: Offer): string {
  if (o.shortDescription) return o.shortDescription.slice(0, 160);

  const parts: string[] = [
    `${typeLabel(o)} na ${o.transaction === "najem" ? "wynajem" : "sprzedaż"}`,
    offerLocation(o),
    `powierzchnia ${formatArea(o.area)}`,
  ];
  if (o.rooms !== undefined) {
    parts.push(`${o.rooms} ${o.rooms === 1 ? "pokój" : o.rooms < 5 ? "pokoje" : "pokoi"}`);
  }
  parts.push(`cena ${formatPrice(o.price)}`);

  let desc = parts.join(", ") + ". Sprawdź zdjęcia i szczegóły, umów oglądanie z Dom Hunter.";
  if (desc.length > 160 && o.description) {
    desc = parts.join(", ") + ".";
  }
  return desc.slice(0, 160);
}

/** Naturalny opis zastępczy z realnych pól, gdy oferta nie ma własnego opisu. */
function fallbackDescription(o: Offer): string {
  const zd = []; // zdania
  const lokal = offerLocation(o);
  const typ = typeLabel(o).toLowerCase();
  const cel = o.transaction === "najem" ? "do wynajęcia" : "na sprzedaż";

  zd.push(`Prezentujemy ${typ} ${cel} w lokalizacji ${lokal}.`);

  const detale: string[] = [`powierzchnia to ${formatArea(o.area)}`];
  if (o.rooms !== undefined) {
    detale.push(`${o.rooms} ${o.rooms === 1 ? "pokój" : o.rooms < 5 ? "pokoje" : "pokoi"}`);
  }
  if (o.floor !== undefined && o.type === "mieszkanie") {
    detale.push(o.floor === 0 ? "parter" : `piętro ${o.floor}`);
  }
  if (o.landArea) detale.push(`działka ${formatArea(o.landArea)}`);
  if (o.yearBuilt) detale.push(`rok budowy ${o.yearBuilt}`);
  if (o.state) detale.push(`stan: ${o.state.toLowerCase()}`);
  zd.push(`Najważniejsze parametry: ${detale.join(", ")}.`);

  zd.push(
    `Cena wynosi ${formatPrice(o.price)}${o.transaction === "najem" ? " miesięcznie" : ""}. Chętnie pokażemy nieruchomość i odpowiemy na pytania. Zadzwoń lub zostaw kontakt.`,
  );
  return zd.join(" ");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const offer = await getOfferById(id);
  if (!offer) return { title: "Oferta nie znaleziona" };

  const title = offerMetaTitle(offer);
  const description = offerMetaDescription(offer);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: offer.images.slice(0, 1).map((img) => ({
        url: img.url,
        alt: img.alt ?? offerImageAlt(offer),
      })),
    },
  };
}

export default async function OfferDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const offer = await getOfferById(id);
  if (!offer) notFound();

  const teamAgent =
    (offer.agent?.slug ? getMemberBySlug(offer.agent.slug) : undefined) ??
    (offer.agent?.fullName ? getMemberByName(offer.agent.fullName) : undefined) ??
    null;
  const agentDigits = offer.agent?.phone ? offer.agent.phone.replace(/\D/g, "").slice(-9) : "";
  const agentTel = agentDigits ? `tel:+48${agentDigits}` : undefined;
  const agentPhoneDisplay = agentDigits
    ? agentDigits.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
    : offer.agent?.phone ?? "";
  const primary = offer.images.find((i) => i.primary) ?? offer.images[0];
  const gallery = offer.images.filter((i) => i !== primary);

  // Dane strukturalne JSON-LD. Tylko realne pola oferty, bez zmyślania.
  const canonicalUrl = `${siteConfig.url}/oferty/${offer.id}`;

  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: offer.city,
    addressCountry: "PL",
  };
  if (offer.district) address.addressRegion = offer.district;
  if (offer.street) address.streetAddress = offer.street;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Product", "RealEstateListing"],
    name: offerTitle(offer),
    url: canonicalUrl,
    address,
    offers: {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
      businessFunction:
        offer.transaction === "najem"
          ? "http://purl.org/goodrelations/v1#LeaseOut"
          : "http://purl.org/goodrelations/v1#Sell",
    },
  };

  schema.description = offer.description ? offer.description : fallbackDescription(offer);
  if (offer.images.length > 0) schema.image = offer.images.map((i) => i.url);
  if (offer.area) {
    schema.floorSize = { "@type": "QuantitativeValue", value: offer.area, unitCode: "MTK" };
  }
  if (offer.rooms !== undefined) schema.numberOfRooms = offer.rooms;
  if (offer.yearBuilt) schema.yearBuilt = offer.yearBuilt;
  if (offer.offerNumber) schema.sku = offer.offerNumber;
  if (offer.lat !== undefined && offer.lng !== undefined) {
    schema.geo = { "@type": "GeoCoordinates", latitude: offer.lat, longitude: offer.lng };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero gallery */}
      <section className="pt-10 lg:pt-16 pb-8">
        <Container size="wide">
          <Link
            href="/oferty"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Wszystkie oferty
          </Link>

          {offer.images.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="lg:col-span-3 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100">
                {primary && (
                  <Image
                    src={primary.url}
                    alt={primary.alt ?? offerImageAlt(offer, "zdjęcie główne")}
                    fill
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="hidden lg:grid grid-rows-3 gap-3">
                {gallery.slice(0, 3).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={img.url}
                      alt={img.alt ?? offerImageAlt(offer, `zdjęcie ${i + 2}`)}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Building2 className="size-16 text-gray-400" />
            </div>
          )}
        </Container>
      </section>

      {/* Title + price */}
      <section className="pb-8">
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/15 text-brand-deep text-[10px] font-semibold uppercase tracking-wider">
                  {transactionLabels[offer.transaction]}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-foreground text-[10px] font-semibold uppercase tracking-wider">
                  {typeLabel(offer)}
                </span>
                {offer.market && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-foreground text-[10px] font-semibold uppercase tracking-wider">
                    {offer.market === "pierwotny" ? "Rynek pierwotny" : "Rynek wtórny"}
                  </span>
                )}
                {offer.offerNumber && (
                  <span className="inline-flex items-center gap-1 text-xs text-foreground-subtle">
                    <Hash className="size-3" />
                    {offer.offerNumber}
                  </span>
                )}
              </div>

              <h1 className="font-bold tracking-tight text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-foreground mb-4">
                {offerTitle(offer)}
              </h1>

              <p className="text-base text-foreground-muted flex items-center gap-2">
                <MapPin className="size-4 text-brand-hover" />
                {offer.street && <>{offer.street}, </>}
                {offer.district && <>{offer.district}, </>}
                {offer.city}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <p className="text-xs uppercase tracking-wider text-foreground-muted mb-1">
                Cena
              </p>
              <p className="font-bold text-3xl lg:text-4xl text-foreground tabular-nums">
                {formatPrice(offer.price)}
                {offer.transaction === "najem" && (
                  <span className="text-base font-normal text-foreground-muted"> / mc</span>
                )}
              </p>
              {offer.pricePerSqm && (
                <p className="text-sm text-foreground-muted mt-1">
                  {formatPricePerSqm(offer.pricePerSqm)}
                </p>
              )}
              {offer.rent && (
                <p className="text-xs text-foreground-subtle mt-2">
                  + czynsz adm.: {formatPrice(offer.rent)} / mc
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Specs + description + agent */}
      <section className="py-8">
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 space-y-8">
              {/* Key specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Spec icon={Maximize2} label="Powierzchnia" value={formatArea(offer.area)} />
                {offer.rooms !== undefined && (
                  <Spec icon={BedDouble} label="Pokoje" value={String(offer.rooms)} />
                )}
                {offer.floor !== undefined && offer.type === "mieszkanie" && (
                  <Spec
                    icon={Layers}
                    label="Piętro"
                    value={
                      offer.floor === 0
                        ? "Parter"
                        : `${offer.floor}${offer.totalFloors ? ` / ${offer.totalFloors}` : ""}`
                    }
                  />
                )}
                {offer.yearBuilt && (
                  <Spec icon={Calendar} label="Rok budowy" value={String(offer.yearBuilt)} />
                )}
                {offer.landArea && (
                  <Spec icon={Maximize2} label="Działka" value={formatArea(offer.landArea)} />
                )}
                {offer.state && <Spec icon={Sparkles} label="Stan" value={offer.state} />}
              </div>

              {/* Description. Gdy oferta nie ma własnego opisu, składamy krótki z realnych pól. */}
              <div className="rounded-3xl bg-surface border border-border p-7 lg:p-8">
                <h2 className="font-bold tracking-tight text-xl text-foreground mb-4">
                  Opis nieruchomości
                </h2>
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {offer.description ? offer.description : fallbackDescription(offer)}
                </div>
              </div>

              {/* Features */}
              {offer.features && offer.features.length > 0 && (
                <div className="rounded-3xl bg-surface border border-border p-7 lg:p-8">
                  <h2 className="font-bold tracking-tight text-xl text-foreground mb-4">
                    Wyposażenie i cechy
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {offer.features.map((f) => (
                      <li key={f} className="inline-flex items-start gap-2 text-sm text-foreground">
                        <Check className="size-4 text-brand-hover shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery rest */}
              {gallery.length > 3 && (
                <div>
                  <h2 className="font-bold tracking-tight text-xl text-foreground mb-4">
                    Galeria
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {gallery.slice(3).map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt ?? offerImageAlt(offer, `zdjęcie ${i + 5}`)}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: pośrednik + CTA */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-4">
                {offer.agent ? (
                  <div className="rounded-3xl bg-surface border border-border p-6">
                    <p className="text-xs uppercase tracking-wider text-foreground-muted mb-4">
                      Pośrednik prowadzący
                    </p>
                    <div className="flex items-center gap-4">
                      {teamAgent && (
                        <MemberPhoto
                          member={teamAgent}
                          sizes="64px"
                          className="size-16 rounded-full shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-foreground">{offer.agent.fullName}</p>
                        <p className="text-xs text-foreground-muted">Dom Hunter Nieruchomości</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2.5">
                      {agentTel && (
                        <a
                          href={agentTel}
                          className="flex items-center gap-3 rounded-xl bg-brand text-white px-4 py-3 text-sm font-semibold hover:bg-brand-hover transition-colors"
                        >
                          <Phone className="size-4" />
                          {agentPhoneDisplay}
                        </a>
                      )}
                      {offer.agent.email && (
                        <a
                          href={`mailto:${offer.agent.email}`}
                          className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-brand hover:text-brand transition-colors break-all"
                        >
                          <Mail className="size-4 shrink-0 text-brand" />
                          {offer.agent.email}
                        </a>
                      )}
                    </div>
                    {teamAgent && (
                      <Link
                        href={`/zespol/${teamAgent.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all"
                      >
                        Zobacz profil pośrednika
                        <ArrowLeft className="size-3.5 rotate-180" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="rounded-3xl bg-surface border border-border p-6">
                    <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
                      Kontakt
                    </p>
                    <a
                      href={siteConfig.contact.phones[0].href}
                      className="font-bold text-2xl text-foreground tabular-nums"
                    >
                      {siteConfig.contact.phones[0].displayValue}
                    </a>
                  </div>
                )}

                <div className="rounded-3xl bg-surface border border-border text-foreground p-6">
                  <p className="text-sm font-semibold mb-3">Zapytaj o tę nieruchomość</p>
                  <p className="text-xs text-foreground-muted mb-5 leading-relaxed">
                    Zostaw kontakt, oddzwonimy z dodatkowymi informacjami i umówimy oglądanie.
                  </p>
                  <Button asChild variant="primary" size="md" className="w-full">
                    <Link href={`/konsultacja?intent=kup&oferta=${offer.id}`}>
                      Zostaw zapytanie
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-surface border border-border p-4">
      <div className="flex items-center gap-2 text-xs text-foreground-muted mb-2">
        <Icon className="size-3.5 text-brand-hover" />
        {label}
      </div>
      <p className="font-bold text-foreground text-base lg:text-lg tabular-nums">{value}</p>
    </div>
  );
}
