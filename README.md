# DomHunter

Strona biura nieruchomości **DomHunter** (Sylwia Wróblewska). Lokalne biuro w Gdańsku, działa w Trójmieście i okolicach.

**Domena:** [domhunter.pl](https://domhunter.pl)
**Deploy:** Vercel (auto z `main`)
**Stack:** Next.js 16 + React 19 + Tailwind v4 + ESTI CRM (live API)

## Struktura strony

- **Hero** + wyszukiwarka ofert
- **Wybrane oferty** (z ESTI, top 8)
- **Co robimy** (Kupno / Sprzedaż / Wynajem / Komercja)
- **Darmowa wycena** (formularz)
- **Dlaczego my** (lokalna wiedza, NSL off-market, doświadczenie)
- **Kontakt**

## Setup ESTI (live API)

Oferty ciągnięte NA ŻYWO z EstiCRM przez API (company + token), z odświeżaniem
ISR (revalidate 1h) i fallbackiem na snapshot `data/offers.json`. Stary tor FTP +
cron jest w kodzie jako martwy fallback (bez configu i bez harmonogramu w `vercel.json`).

1. Uzyskać dane API od Sylwii (panel EstiCRM):
   - `ESTI_API_COMPANY` (identyfikator firmy)
   - `ESTI_API_TOKEN` (token; base `https://app.esticrm.pl/apiClient`, `GET /offer/list`, status filtrowany na `3`)

2. Wrzucić w Vercel → Project Settings → Environment Variables (Sensitive).

3. Wygenerować GitHub Personal Access Token (fine-grained, contents=write w `domhunter`) i wrzucić jako `GITHUB_TOKEN` — potrzebny do regeneracji snapshotu przez commit.

4. Wygenerować `CRON_SECRET` (np. `openssl rand -hex 32`) i wrzucić w Vercel. **Wymagany** do ręcznej regeneracji snapshotu (endpoint zapisu jest fail-closed — bez sekretu odmawia zapisu).

5. Ręczna regeneracja snapshotu (fallbacku):
   `curl "https://domhunter.pl/api/esti/sync-api?commit=1&secret=$CRON_SECRET"`
   Bieżące oferty na stronie działają bez tego (ISR czyta API bezpośrednio); snapshot to tylko awaryjny fallback.

## Lokalny dev

```bash
cp .env.example .env.local
# uzupełnij ESTI + GITHUB_TOKEN + CRON_SECRET
npm install
npm run dev
```

## Powiązane

- Sylwia osobista: [sylwiawroblewska.pl](https://sylwiawroblewska.pl)
- NSL community: [nieruchomoscispodlady.pl](https://nieruchomoscispodlady.pl)
- Klub Komercji (B2B): w budowie
