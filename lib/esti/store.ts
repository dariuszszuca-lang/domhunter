import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Offer, OfferFilters, OffersResult } from "./types";
import { fetchEstiOffersJson } from "./api-client";
import { mapApiOffersToOffers } from "./api-mapper";

/**
 * Storage ofert: lokalny plik data/offers.json w repo.
 *
 * Cron sync (Vercel) zapisuje plik przez commit do GitHuba.
 * Tu tylko czytamy z lokalnego filesystem. Zero zewnętrznych usług.
 */

const OFFERS_FILE = path.join(process.cwd(), "data", "offers.json");

export type CacheShape = {
  lastSync: string;
  offers: Offer[];
};

let memCache: { data: CacheShape; loadedAt: number } | null = null;
const MEM_TTL_MS = 60_000;

// ISR: jak długo Next cache'uje odpowiedź API Esti (auto-odświeżanie ofert bez crona).
const OFFERS_REVALIDATE_S = 3600; // 1h

/**
 * Pobiera oferty NA ŻYWO z API Esti (gdy ustawione ESTI_API_COMPANY + ESTI_API_TOKEN).
 * status="3" = TYLKO aktywne PUBLIKOWANE. Oferty "aktywne wewnętrznie" (status 99)
 * NIE są pobierane, więc nie trafiają na stronę (potwierdzone przez klienta 13.07.2026).
 * Status podajemy JAWNIE, żeby nie zależeć od wartości domyślnej w api-client.
 * Cache fetch (revalidate) odświeża dane automatycznie. Błąd/brak konfiguracji → null,
 * wtedy readOffers użyje snapshotu z pliku data/offers.json jako fallbacku.
 */
async function loadFromApi(): Promise<CacheShape | null> {
  if (!process.env.ESTI_API_COMPANY || !process.env.ESTI_API_TOKEN) return null;
  try {
    const raw = await fetchEstiOffersJson({ status: "3", revalidateSeconds: OFFERS_REVALIDATE_S });
    const offers = mapApiOffersToOffers(raw);
    if (offers.length === 0) return null;
    return { lastSync: new Date().toISOString(), offers };
  } catch {
    return null;
  }
}

function isPublishable(offer: Offer): boolean {
  // Esti czasem zwraca szkielety bez danych (price=0, area=0, type=inne,
  // brak agentki). Nie pokazujemy ich na stronie.
  if (!offer.price || offer.price <= 0) return false;
  if (!offer.area || offer.area <= 0) return false;
  return true;
}

export async function readOffers(): Promise<CacheShape | null> {
  // In-memory cache w obrębie jednej instancji (60s).
  if (memCache && Date.now() - memCache.loadedAt < MEM_TTL_MS) {
    return memCache.data;
  }

  // 1. Na żywo z API Esti (auto-odświeżanie). 2. Fallback: snapshot z data/offers.json.
  let source: CacheShape | null = await loadFromApi();
  if (!source) {
    try {
      const text = await readFile(OFFERS_FILE, "utf8");
      source = JSON.parse(text) as CacheShape;
    } catch {
      source = null;
    }
  }
  if (!source) return null;

  const filtered: CacheShape = {
    lastSync: source.lastSync,
    offers: source.offers.filter(isPublishable),
  };
  memCache = { data: filtered, loadedAt: Date.now() };
  return filtered;
}

export async function getFilteredOffers(filters: OfferFilters): Promise<OffersResult> {
  const cache = await readOffers();
  if (!cache) {
    return { items: [], total: 0, lastSync: new Date(0).toISOString() };
  }

  let items = cache.offers;

  if (filters.transaction) items = items.filter((o) => o.transaction === filters.transaction);
  if (filters.type) items = items.filter((o) => o.type === filters.type);
  if (filters.market) items = items.filter((o) => o.market === filters.market);
  if (filters.city)
    items = items.filter((o) => o.city.toLowerCase().includes(filters.city!.toLowerCase()));
  if (filters.district)
    items = items.filter((o) =>
      o.district?.toLowerCase().includes(filters.district!.toLowerCase())
    );
  if (filters.priceMin) items = items.filter((o) => o.price >= filters.priceMin!);
  if (filters.priceMax) items = items.filter((o) => o.price <= filters.priceMax!);
  if (filters.areaMin) items = items.filter((o) => o.area >= filters.areaMin!);
  if (filters.areaMax) items = items.filter((o) => o.area <= filters.areaMax!);
  if (filters.rooms?.length)
    items = items.filter((o) => o.rooms !== undefined && filters.rooms!.includes(o.rooms));
  if (filters.floorMin !== undefined)
    items = items.filter((o) => (o.floor ?? 0) >= filters.floorMin!);
  if (filters.floorMax !== undefined)
    items = items.filter((o) => (o.floor ?? 0) <= filters.floorMax!);
  if (filters.yearMin)
    items = items.filter((o) => (o.yearBuilt ?? 0) >= filters.yearMin!);
  if (filters.state?.length)
    items = items.filter((o) => o.state && filters.state!.includes(o.state));
  if (filters.offerId)
    items = items.filter(
      (o) =>
        o.id.toLowerCase().includes(filters.offerId!.toLowerCase()) ||
        o.offerNumber?.toLowerCase().includes(filters.offerId!.toLowerCase())
    );

  switch (filters.sort) {
    case "price-asc":
      items = [...items].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items = [...items].sort((a, b) => b.price - a.price);
      break;
    case "area-asc":
      items = [...items].sort((a, b) => a.area - b.area);
      break;
    case "area-desc":
      items = [...items].sort((a, b) => b.area - a.area);
      break;
    default:
      items = [...items].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return {
    items,
    total: items.length,
    lastSync: cache.lastSync,
  };
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const cache = await readOffers();
  if (!cache) return null;
  return cache.offers.find((o) => o.id === id) ?? null;
}

export async function getLatestOffers(limit = 4): Promise<Offer[]> {
  const cache = await readOffers();
  if (!cache) return [];
  return [...cache.offers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getOffersByAgentSlug(slug: string, limit = 6): Promise<Offer[]> {
  const cache = await readOffers();
  if (!cache) return [];
  return cache.offers.filter((o) => o.agent?.slug === slug).slice(0, limit);
}

// Miejscowości do wyszukiwarki: TYLKO te, w których aktualnie SĄ oferty
// (miasto z 0 ofert znika z dropdownu — koniec "Brak ofert" po wybraniu Rumi).
// Sort: liczba ofert malejąco, potem alfabetycznie (pl). Odświeża się z readOffers (1h).
export async function getCityOptions(): Promise<string[]> {
  const cache = await readOffers();
  if (!cache) return [];
  const counts = new Map<string, number>();
  for (const o of cache.offers) {
    const city = o.city?.trim();
    if (!city) continue;
    counts.set(city, (counts.get(city) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pl"))
    .map(([city]) => city);
}
