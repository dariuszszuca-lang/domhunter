# DomHunter

Strona biura nieruchomości **DomHunter** (Sylwia Wróblewska). Lokalne biuro w Gdańsku, działa w Trójmieście i okolicach.

**Domena:** [domhunter.pl](https://domhunter.pl)
**Deploy:** Vercel (auto z `main`)
**Stack:** Next.js 16 + React 19 + Tailwind v4 + ESTI CRM (FTP sync)

## Struktura strony

- **Hero** + wyszukiwarka ofert
- **Wybrane oferty** (z ESTI, top 8)
- **Co robimy** (Kupno / Sprzedaż / Wynajem / Komercja)
- **Darmowa wycena** (formularz)
- **Dlaczego my** (lokalna wiedza, NSL off-market, doświadczenie)
- **Kontakt**

## Setup ESTI

1. Uzyskać dane FTP od Sylwii (panel EstiCRM → eksport portali):
   - `ESTI_FTP_HOST`
   - `ESTI_FTP_USER`
   - `ESTI_FTP_PASSWORD`
   - `ESTI_FTP_REMOTE_DIR`

2. Wrzucić w Vercel → Project Settings → Environment Variables (z `.env.example`).

3. Wygenerować GitHub Personal Access Token (fine-grained, contents=write w `domhunter`) i wrzucić jako `GITHUB_TOKEN`.

4. Wygenerować `CRON_SECRET` (np. `openssl rand -hex 32`) i wrzucić w Vercel.

5. Cron Vercel zsynchronizuje oferty raz dziennie (`30 5 * * *` — 5:30 UTC = 6:30 CET).
   Można uruchomić ręcznie: `curl https://domhunter.pl/api/cron/sync-esti?secret=$CRON_SECRET`

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
