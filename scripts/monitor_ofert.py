#!/usr/bin/env python3
"""
Monitor spójności ofert: EstiCRM (źródło prawdy) kontra domhunter.pl (co widzi klient).

Alarmuje mailem, gdy:
  1. oferta aktywna publikowana w Esti (status 3) nie jest widoczna na stronie,
  2. na stronie wisi oferta, której w Esti już nie ma (np. sprzedana),
  3. oferta siedzi w Esti jako "aktywna wewnętrznie" (status 99) krócej niż PROG_DNI
     — typowy przypadek "agentka dodała, ale nie opublikowała",
  4. strona albo API nie odpowiadają,
  5. strona oferty jest szersza niż ekran telefonu (sprawdz-szerokosc.mjs),
  6. wyszukiwarka nie znajduje oferty po mieście i dzielnicy (sprawdz-wyszukiwarke.py).

Cisza = wszystko się zgadza. Read-only, niczego nie zmienia.
Stan strony czytany z /api/health/offers (komplet numerów, bez stronicowania listingu).
Uruchamiany przez launchd raz dziennie (pl.domhunter.monitor-ofert, 9:20).
"""
import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

PROG_DNI_WEWNETRZNE = 3          # świeżo dodana "wewnętrzna" = pewnie zapomniana publikacja
HEALTH = "https://domhunter.pl/api/health/offers"
STRONA_OFERTY = "https://domhunter.pl/oferty"
TIMEOUT = 45
ODBIORCY = ["dariusz.szuca@gmail.com"]


def wczytaj(sciezka, klucz):
    try:
        with open(os.path.expanduser(sciezka), encoding="utf-8") as f:
            for linia in f:
                linia = linia.strip()
                if linia.startswith(klucz + "="):
                    return linia.split("=", 1)[1].strip().strip('"').strip("'")
    except OSError:
        pass
    return ""


def oferty_z_esti(company, token, status):
    q = urllib.parse.urlencode({"company": company, "token": token, "status": status, "take": 500})
    url = f"https://app.esticrm.pl/apiClient/offer/list?{q}"
    with urllib.request.urlopen(url, timeout=TIMEOUT) as r:
        return json.load(r).get("data", [])


def numery_ze_strony():
    req = urllib.request.Request(HEALTH, headers={"User-Agent": "domhunter-monitor/1.0"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        dane = json.load(r)
    if not dane.get("ok"):
        raise RuntimeError(f"health zwrócił ok=false: {dane}")
    return set(dane.get("numbers") or []), dane.get("lastSync", "")


def wyslij_alert(temat, tresc):
    klucz = wczytaj("~/.secrets/ai-team-lead-email.env", "RESEND_API_KEY")
    nadawca = wczytaj("~/.secrets/ai-team-lead-email.env", "LEAD_EMAIL_FROM") or "AI-Team <onboarding@resend.dev>"
    if not klucz:
        print("BRAK klucza Resend — alert tylko na konsoli")
        return
    payload = json.dumps({"from": nadawca, "to": ODBIORCY, "subject": temat, "text": tresc}).encode()
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": "Bearer " + klucz,
            "Content-Type": "application/json",
            "User-Agent": "domhunter-monitor/1.0",   # bez tego Cloudflare zwraca 403
            "Accept": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print("Alert wysłany:", r.status)
    except urllib.error.HTTPError as e:
        print("Błąd Resend:", e.code, e.read().decode("utf-8", "ignore")[:200])

JAK_CZYTAC = (
    "\nCo zwykle to znaczy:\n"
    "  - 'NIE MA NA STRONIE' → oferta jest w Esti aktywna publikowana, a klient jej nie widzi.\n"
    "    Sprawdź synchronizację strony i ustawienie w Esti; po poprawce strona zaciągnie ją do godziny.\n"
    "  - 'AKTYWNA WEWNĘTRZNIE' → świeża oferta nieopublikowana w EstiCRM. To nie błąd strony:\n"
    "    biuro ustawia ją jako aktywną publikowaną.\n"
    "  - 'WISI NA STRONIE' → oferta zniknęła z Esti, a strona jeszcze jej nie odświeżyła (do godziny).\n"
    "    Jeśli utrzymuje się dłużej, to problem po stronie strony.\n"
    "  - 'ROZJEŻDŻA SIĘ NA TELEFONIE' → coś w ofercie (zwykle długi link w opisie) rozpycha stronę.\n"
    "    Problem po stronie strony: sprawdź `node scripts/sprawdz-szerokosc.mjs`.\n"
    "  - 'WYSZUKIWARKA' → klient nie znajdzie oferty po mieście i dzielnicy. Problem po stronie strony:\n"
    "    sprawdź `python3 scripts/sprawdz-wyszukiwarke.py`.\n"
)


def main():
    company = wczytaj("~/.secrets/domhunter-esti.env", "ESTI_API_COMPANY")
    token = wczytaj("~/.secrets/domhunter-esti.env", "ESTI_API_TOKEN")
    if not (company and token):
        wyslij_alert("BŁĄD, DO NAPRAWY! Monitor ofert Dom Hunter: brak konfiguracji", "Nie znaleziono ESTI_API_COMPANY/ESTI_API_TOKEN w ~/.secrets/domhunter-esti.env")
        sys.exit(1)

    problemy = []

    # 1. Esti kontra strona
    try:
        aktywne = oferty_z_esti(company, token, "3")
    except Exception as e:
        wyslij_alert("BŁĄD, DO NAPRAWY! Monitor ofert Dom Hunter: API EstiCRM nie odpowiada", f"{type(e).__name__}: {e}")
        sys.exit(1)

    try:
        na_stronie, last_sync = numery_ze_strony()
    except Exception as e:
        wyslij_alert("BŁĄD, DO NAPRAWY! Monitor ofert Dom Hunter: strona nie odpowiada", f"{HEALTH}\n{type(e).__name__}: {e}")
        sys.exit(1)

    nr_esti = {str(o.get("number")): o for o in aktywne if o.get("number")}

    brakuje = [o for n, o in nr_esti.items() if n not in na_stronie]
    for o in brakuje:
        problemy.append(
            f"NIE MA NA STRONIE: {o.get('number')} — {o.get('locationCityName','')} "
            f"{o.get('locationStreetType','')} {o.get('locationStreetName','')} "
            f"(dodana {str(o.get('addDate',''))[:10]}, id {o.get('id')})"
        )

    zbedne = na_stronie - set(nr_esti)
    for n in sorted(zbedne):
        problemy.append(f"WISI NA STRONIE, A NIE MA W ESTI: {n} — {STRONA_OFERTY}")

    # 2. Świeże oferty zawieszone jako wewnętrzne (status 99)
    try:
        wszystkie = oferty_z_esti(company, token, "3,99")
        prog = datetime.now() - timedelta(days=PROG_DNI_WEWNETRZNE)
        for o in wszystkie:
            if o.get("status") != 99:
                continue
            dodana = str(o.get("addDate") or "")[:19]
            if not dodana:
                continue
            try:
                kiedy = datetime.strptime(dodana, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                continue
            if kiedy < prog:
                continue  # stara wewnętrzna = świadomie schowana, nie zawracamy głowy
            gdzie = " ".join(x for x in [o.get("locationCityName"), o.get("locationStreetName")] if x)
            problemy.append(
                f"AKTYWNA WEWNĘTRZNIE (nie trafi na stronę): {o.get('number')} — "
                f"{gdzie} (dodana {dodana[:10]})"
            )
    except Exception as e:
        problemy.append(f"Nie udało się sprawdzić ofert wewnętrznych: {type(e).__name__}")

    # 3. Oferty szersze niż ekran telefonu (np. długi link w opisie z Esti)
    straznik = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sprawdz-szerokosc.mjs")
    try:
        wynik = subprocess.run(["/usr/local/bin/node", straznik], capture_output=True, text=True, timeout=600)
        for linia in wynik.stdout.splitlines():
            if linia.startswith("ZLE"):
                problemy.append(f"ROZJEŻDŻA SIĘ NA TELEFONIE: {linia[4:].strip()}")
        if wynik.returncode not in (0, 1):
            problemy.append(f"Strażnik szerokości nie zadziałał (kod {wynik.returncode}): {wynik.stderr.strip()[:200]}")
    except Exception as e:
        problemy.append(f"Strażnik szerokości nie zadziałał: {type(e).__name__}")

    # 4. Wyszukiwarka znajduje każdą aktywną ofertę po mieście i dzielnicy
    wyszukiwarka = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sprawdz-wyszukiwarke.py")
    try:
        wynik = subprocess.run([sys.executable, wyszukiwarka], capture_output=True, text=True, timeout=600)
        for linia in wynik.stdout.splitlines():
            if linia.startswith("ZLE"):
                problemy.append(f"WYSZUKIWARKA: {linia[4:].strip()}")
        if wynik.returncode not in (0, 1):
            problemy.append(f"Strażnik wyszukiwarki nie zadziałał (kod {wynik.returncode}): {wynik.stderr.strip()[:200]}")
    except Exception as e:
        problemy.append(f"Strażnik wyszukiwarki nie zadziałał: {type(e).__name__}")

    stempel = datetime.now().strftime("%d.%m.%Y %H:%M")
    print(f"[{stempel}] Esti aktywnych: {len(nr_esti)} | na stronie: {len(na_stronie)} | problemów: {len(problemy)}")

    if not problemy:
        return  # cisza znaczy porządek

    # Tylko „aktywna wewnętrznie” to ustawienie w CRM (biuro publikuje ofertę). Reszta to błąd do naprawy.
    w_crm = [p for p in problemy if p.startswith("AKTYWNA WEWNĘTRZNIE")]
    bledy = [p for p in problemy if p not in w_crm]

    tresc = ""
    if bledy:
        tresc += (
            "BŁĄD, DO NAPRAWY!\n"
            "==================\n"
            + "\n".join(f"  ✗ {p}" for p in bledy) +
            "\n\n"
        )
    tresc += (
        f"Monitor ofert domhunter.pl — {stempel}\n\n"
        f"Aktywnych w EstiCRM: {len(nr_esti)}\nWidocznych na stronie: {len(na_stronie)} (lastSync {last_sync})\n\n"
    )
    if w_crm:
        tresc += (
            "\nDO USTAWIENIA W ESTICRM (to nie błąd strony, biuro publikuje ofertę):\n"
            + "\n".join(f"  • {p}" for p in w_crm) + "\n"
        )
    tresc += JAK_CZYTAC
    if bledy:
        temat = f"BŁĄD, DO NAPRAWY! domhunter.pl: {len(bledy)} " + ("błąd" if len(bledy) == 1 else "błędy" if 2 <= len(bledy) % 10 <= 4 and not 12 <= len(bledy) % 100 <= 14 else "błędów")
    else:
        temat = f"domhunter.pl: {len(w_crm)} do ustawienia w EstiCRM (strona działa)"
    wyslij_alert(temat, tresc)


if __name__ == "__main__":
    main()
