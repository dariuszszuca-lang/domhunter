import { NextResponse } from "next/server";
import { fetchEstiOffersJson } from "@/lib/esti/api-client";
import { mapApiOffersToOffers } from "@/lib/esti/api-mapper";
import { commitFiles, type FileChange } from "@/lib/github/commit";
import type { Offer } from "@/lib/esti/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const OWNER = "dariuszszuca-lang";
const REPO = "domhunter";
const BRANCH = "main";
const DATA_PATH = "data/offers.json";

/**
 * Sync ofert z EstiCRM API (metoda company + token) — odpowiednik
 * cron/sync-esti, ale źródłem jest API zamiast FTP.
 *
 * Źródło endpointu: oficjalny PDF "EstiAPI v1.5"
 *   https://przetestuj.esticrm.pl/docs/EstiCRM-API-dokumentacja-techniczna.pdf
 *   Base: https://app.esticrm.pl/apiClient, GET /offer/list, params company+token.
 *
 * Tryby:
 *   GET /api/esti/sync-api            → TEST: pobiera + mapuje, zwraca licznik + próbkę.
 *                                       NIE zapisuje (bezpieczne do weryfikacji tokenu).
 *   GET /api/esti/sync-api?commit=1   → zapisuje data/offers.json przez commit do repo
 *                                       (jak cron FTP). Wymaga GITHUB_TOKEN.
 *
 * Autoryzacja: jeśli ustawiony CRON_SECRET, wymaga ?secret=... lub
 *   Authorization: Bearer <CRON_SECRET> (spójnie z cron/sync-esti).
 *
 * TODO (zdjęcia): cron FTP pobiera i commituje zdjęcia do public/oferty/.
 *   Tu zdjęć NIE zapisujemy, bo kształt pola zdjęć w odpowiedzi /offer/list nie
 *   jest w pełni opisany w PDF. Po pierwszym wywołaniu z realnym tokenem trzeba
 *   zweryfikować strukturę (patrz mapImages w api-mapper.ts) i dopiąć upload
 *   zdjęć analogicznie do cron/sync-esti.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const wantCommit = url.searchParams.get("commit") === "1";
  const statusParam = url.searchParams.get("status") || undefined;

  const isAuthorized =
    !cronSecret ||
    querySecret === cronSecret ||
    authHeader === `Bearer ${cronSecret}`;

  if (!isAuthorized) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const start = Date.now();
  try {
    // 1. Pobierz oferty z API (z paginacją) i zmapuj na nasz typ Offer.
    const rawOffers = await fetchEstiOffersJson({ status: statusParam });
    const offers: Offer[] = mapApiOffersToOffers(rawOffers);

    // 2a. Tryb WRITE-LOCAL: zapis data/offers.json na lokalny dysk (manualny sync w dev).
    //     UWAGA: na Vercel filesystem jest efemeryczny — do produkcji użyj ?commit=1 (GitHub).
    if (url.searchParams.get("write") === "1") {
      const { writeFile } = await import("node:fs/promises");
      const { join } = await import("node:path");
      const payload = { lastSync: new Date().toISOString(), offers };
      await writeFile(
        join(process.cwd(), "data", "offers.json"),
        JSON.stringify(payload, null, 2),
        "utf8"
      );
      return NextResponse.json({
        ok: true,
        mode: "write-local",
        offersCount: offers.length,
        withImages: offers.filter((o) => o.images.length > 0).length,
      });
    }

    // 2. Tryb TEST (domyślny): tylko raport, bez zapisu.
    if (!wantCommit) {
      return NextResponse.json({
        ok: true,
        mode: "test",
        source: "esti-api",
        rawCount: rawOffers.length,
        offersCount: offers.length,
        withImages: offers.filter((o) => o.images.length > 0).length,
        sample: offers.slice(0, 3).map((o) => ({
          id: o.id,
          type: o.type,
          transaction: o.transaction,
          city: o.city,
          price: o.price,
          area: o.area,
          images: o.images.length,
        })),
        note: "Tryb testowy — nie zapisano. Dodaj ?commit=1 aby zapisać data/offers.json.",
        durationMs: Date.now() - start,
      });
    }

    // 3. Tryb COMMIT: zapis data/offers.json przez GitHub (jak cron FTP).
    //    UWAGA: zdjęć nie commitujemy (patrz TODO w nagłówku pliku).
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "github_token_missing" },
        { status: 500 }
      );
    }

    const payload = { lastSync: new Date().toISOString(), offers };
    const changes: FileChange[] = [
      { path: DATA_PATH, contentUtf8: JSON.stringify(payload, null, 2) },
    ];

    const commit = await commitFiles({
      owner: OWNER,
      repo: REPO,
      branch: BRANCH,
      message: `sync esti-api: ${offers.length} ofert`,
      files: changes,
    });

    return NextResponse.json({
      ok: true,
      mode: "commit",
      source: "esti-api",
      rawCount: rawOffers.length,
      offersCount: offers.length,
      commitSha: commit.sha.slice(0, 7),
      note: "Zapisano data/offers.json. Zdjęcia NIE zapisane (TODO — weryfikacja kształtu pola zdjęć w API).",
      durationMs: Date.now() - start,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "unknown",
        stack: err instanceof Error ? err.stack?.split("\n").slice(0, 6) : undefined,
      },
      { status: 500 }
    );
  }
}
