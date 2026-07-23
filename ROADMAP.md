# ROADMAP — Dom Hunter (klient)

> Wzór: `AITeam/PROJEKTY/AUTOFIRMA/ROADMAP.md`. Prowadzi: Darek. Wdraża: @cto. Utworzona 2026-07-23.
> Repo: `dariuszszuca-lang/domhunter` · lokalnie `~/dev/wlasne/domhunter`. Status: AKTYWNY (ostatni commit 2026-07-20).

## 🎯 CEL

**Po co ten projekt istnieje:** strona www butikowego biura nieruchomości Dom Hunter (Sylwia Wróblewska, Trójmiasto, „ludzie z Trójmiasta, a nie z portali") — pokazuje na żywo oferty z EstiCRM i pozyskuje leady (wycena / „zgłoś nieruchomość", kontakt, rekrutacja agentów przez `/wspolpraca`).
**Miara sukcesu:** obecność online niezależna od Otodom/OLX; leady z formularza wyceny; komplet ofert ESTI live na własnej domenie.
**Dla kogo:** klientka Sylwia + jej klienci i agenci.
**Model:** kliencki (strona + obsługa).

**Infra (bez sekretów):** Next.js 16 + React 19 + Tailwind v4, Vercel (auto-deploy `main`). ESTI przez API (company 18? — w kodzie company 16, status „3"), base `app.esticrm.pl/apiClient`, ISR 1h + fallback `data/offers.json`. Poczta: nodemailer + SMTP IQ.pl (`smtp.iq.pl:465`). Health `/api/health/offers`. Sekrety w `~/.secrets/` — NIE w tym pliku.

## Jak czytać ten plik

Goła lista DO ZROBIENIA. Rzecz zrobiona znika stąd i ląduje w changelogu. Liczby i stan sprawdzamy w żywym systemie, nie w roadmapie.

---

## PRIORYTET WYSOKI

- [ ] [BEZPIECZEŃSTWO], zabezpieczyć sekretem publiczny endpoint `/api/esti/sync-api` (`?write=1` / `?commit=1`)
      priorytet: wysoki
      po co: dziś da się go wywołać z zewnątrz — ktoś może wymusić zapis/commit. To realna dziura, nie kosmetyka. Rozwiązanie: CRON_SECRET / nagłówek.
      status: nowy

- [ ] [DOMENA], podpiąć produkcyjną domenę `domhunter.pl` (live wciąż na `domhunter.vercel.app`)
      priorytet: wysoki
      po co: własna domena = SEO, canonical, zaufanie klienta. Vercel domyślny alias nie jest docelowy.
      status: nowy

## PRIORYTET ŚREDNI

- [ ] [DOKUMENTACJA], zaktualizować README do rzeczywistości (mówi „ESTI FTP sync" + setup FTP/cron/CRON_SECRET, a realnie działa ESTI API, cron FTP martwy)
      priorytet: średni
      po co: nieaktualny README wprowadza w błąd przy każdej kolejnej sesji i onboardingu. Dług dokumentacyjny kosztuje czas.
      status: nowy

- [ ] [B2B], dokończyć sekcję „Klub Komercji (B2B)" oznaczoną w README jako „w budowie"
      priorytet: średni
      po co: domknięcie zapowiedzianej oferty komercyjnej.
      status: nowy

## PRIORYTET NISKI

- [ ] [TREŚĆ], uzupełnić brakujące zdjęcia agentów (6/11 to monogramy)
      priorytet: niski
      po co: karty zespołu wiarygodne i spójne wizualnie.
      status: nowy (czeka na zdjęcia od klientki)

- [ ] [DANE], potwierdzić telefon agentki Sylwia Kojto-Labuda (badge vs API) i status Taisiii Shulgi (na portalu, brak w ESTI)
      priorytet: niski
      po co: dane kontaktowe na stronie muszą być poprawne.
      status: nowy

---

## RYZYKA / PUŁAPKI (nie zadania — do świadomości)

- Fallback `data/offers.json` NIE jest już auto-odświeżany (cron usunięty) — przy dłuższej awarii ESTI strona pokaże gasnący zestaw ofert. Ręczna regeneracja: `/api/esti/sync-api?write=1`.
- ISR 3600s: po deployu `/oferty` może do 1h serwować stary HTML.
- SMTP IQ.pl: wychodzący TYLKO `smtp.iq.pl` (inne hosty timeout/odrzut).

## CZEKA NA OK WŁAŚCICIELA (skrót)

1. Decyzja o podpięciu `domhunter.pl` (moment przełączenia).
2. Zdjęcia agentów od klientki.
