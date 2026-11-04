#!/usr/bin/env python3
"""
Strażnik wyszukiwarki domhunter.pl: każda aktywna oferta z Esti musi dać się znaleźć tak, jak szuka człowiek.

Wyszukiwarka na stronie: miasto wybierane z listy (pole `miasto`), dzielnica wpisywana ręcznie (pole `dzielnica`).
Dla każdej oferty z dzielnicą sprawdza na żywej stronie:
  - miasto z listy + dzielnica,
  - sama dzielnica,
  - dzielnica bez polskich znaków.
Dla każdego miasta: wybór miasta pokazuje wszystkie jego oferty i żadnej z innego miasta.

Wypisuje linie "ZLE ...", kod 1 gdy coś nie działa. Read-only.
Użycie: sprawdz-wyszukiwarke.py [adres strony]
"""
import os
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from monitor_ofert import TIMEOUT, oferty_z_esti, wczytaj

STRONA = "https://domhunter.pl"


def bez_znakow(tekst):
    tekst = (tekst or "").lower().replace("ł", "l")
    return "".join(z for z in unicodedata.normalize("NFD", tekst) if not unicodedata.combining(z))


def znalezione(baza, **pola):
    adres = f"{baza}/oferty?{urllib.parse.urlencode(pola)}"
    req = urllib.request.Request(adres, headers={"User-Agent": "domhunter-monitor/1.0"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        html = r.read().decode("utf-8", "ignore")
    time.sleep(0.3)
    return set(re.findall(r'href="/oferty/(\d+)"', html))


def main():
    baza = (sys.argv[1] if len(sys.argv) > 1 else STRONA).rstrip("/")
    company = wczytaj("~/.secrets/domhunter-esti.env", "ESTI_API_COMPANY")
    token = wczytaj("~/.secrets/domhunter-esti.env", "ESTI_API_TOKEN")
    oferty = oferty_z_esti(company, token, "3")
    zle = []
    miasta = {}
    sprawdzone = 0

    for o in oferty:
        miasto = o.get("locationCityName") or o.get("locationCity") or ""
        dzielnica = o.get("locationPrecinctName") or o.get("locationDistrictName") or ""
        if not miasto:
            continue
        miasta.setdefault(miasto, set()).add(str(o["id"]))
        if not dzielnica or dzielnica == miasto:
            continue
        for pola in (
            {"miasto": miasto, "dzielnica": dzielnica},
            {"dzielnica": dzielnica},
            {"dzielnica": bez_znakow(dzielnica)},
        ):
            sprawdzone += 1
            if str(o["id"]) not in znalezione(baza, **pola):
                zle.append(f"{o.get('number')} nie znaleziona przez {pola}")

    for miasto, swoje in miasta.items():
        wynik = znalezione(baza, miasto=miasto)
        for i in sorted(swoje - wynik):
            o = next((x for x in oferty if str(x["id"]) == i), {})
            zle.append(f"{o.get('number', i)} nie pokazuje się po wyborze miasta {miasto}")
        for i in sorted(wynik - swoje):
            zle.append(f"wybór miasta {miasto} pokazuje ofertę {i} z innego miasta")

    if sprawdzone == 0:
        zle.append("nie sprawdzono żadnej oferty, Esti nie podaje dzielnic pod oczekiwaną nazwą pola")
    for linia in zle:
        print("ZLE", linia)
    print(f"Ofert: {len(oferty)} | wyszukiwań: {sprawdzone} | błędów: {len(zle)}")
    sys.exit(1 if zle else 0)


if __name__ == "__main__":
    main()
