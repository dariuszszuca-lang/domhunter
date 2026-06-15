import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Regulamin",
  description:
    "Regulamin korzystania z serwisu internetowego domhunter.pl. Zasady korzystania z serwisu, rodzaj usług, prawa autorskie i reklamacje.",
};

export default function RegulaminPage() {
  return (
    <LegalDoc
      eyebrow="Zasady serwisu"
      title="Regulamin"
      updated="15 czerwca 2026"
    >
      <p>
        Ten regulamin opisuje zasady korzystania z serwisu internetowego
        dostępnego pod adresem domhunter.pl. Korzystając z serwisu, akceptujesz
        poniższe postanowienia.
      </p>

      <h2>Postanowienia ogólne</h2>
      <p>
        Operatorem serwisu jest Dom Hunter Biuro Nieruchomości, ul. Jana Pawła
        II 6e/5, 80-462 Gdańsk, NIP 9571073617, REGON 222082718. Z operatorem skontaktujesz się telefonicznie pod
        numerem <a href="tel:+48585334323">58 533 43 23</a> oraz mailowo pod
        adresem <a href="mailto:biuro@domhunter.pl">biuro@domhunter.pl</a>.
        Serwis służy do prezentacji ofert nieruchomości oraz do nawiązania
        kontaktu z biurem.
      </p>

      <h2>Definicje</h2>
      <p>Ilekroć w regulaminie używamy poniższych pojęć, rozumiemy przez nie:</p>
      <ul>
        <li>
          <strong>Serwis</strong>, czyli strona internetowa dostępna pod adresem
          domhunter.pl wraz z wszystkimi jej podstronami,
        </li>
        <li>
          <strong>Użytkownik</strong>, czyli każdą osobę korzystającą z serwisu,
        </li>
        <li>
          <strong>Operator</strong>, czyli Dom Hunter Biuro Nieruchomości,
          prowadzące i utrzymujące serwis.
        </li>
      </ul>

      <h2>Rodzaj usług</h2>
      <p>
        W ramach serwisu operator prezentuje oferty nieruchomości oraz umożliwia
        nawiązanie kontaktu z biurem, na przykład przez formularz kontaktowy,
        telefon lub e-mail. Korzystanie z serwisu jest bezpłatne.
      </p>

      <h2>Charakter prezentowanych ofert</h2>
      <p>
        Oferty i opisy nieruchomości prezentowane w serwisie mają wyłącznie
        charakter informacyjny i nie stanowią oferty w rozumieniu art. 66
        Kodeksu cywilnego. Mają one zachęcić do kontaktu i poznania szczegółów.
        Operator dokłada starań, aby informacje były aktualne i rzetelne, jednak
        warunki transakcji, cena oraz stan nieruchomości każdorazowo wymagają
        potwierdzenia w bezpośrednim kontakcie z biurem.
      </p>

      <h2>Zasady korzystania z serwisu</h2>
      <p>
        Użytkownik zobowiązuje się korzystać z serwisu zgodnie z prawem oraz z
        zasadami współżycia społecznego. Zabronione jest dostarczanie treści o
        charakterze bezprawnym, a także działania, które mogłyby zakłócić
        prawidłowe funkcjonowanie serwisu lub naruszyć prawa innych osób.
      </p>

      <h2>Prawa autorskie</h2>
      <p>
        Treści zamieszczone w serwisie, w tym opisy, zdjęcia, grafiki, układ i
        wygląd strony, są chronione prawem i stanowią własność operatora lub
        zostały wykorzystane na podstawie odpowiednich uprawnień. Korzystanie z
        nich w sposób wykraczający poza dozwolony użytek osobisty, w
        szczególności kopiowanie i rozpowszechnianie, wymaga zgody operatora.
      </p>

      <h2>Reklamacje</h2>
      <p>
        Jeśli korzystanie z serwisu budzi Twoje zastrzeżenia, możesz złożyć
        reklamację, pisząc na adres{" "}
        <a href="mailto:biuro@domhunter.pl">biuro@domhunter.pl</a>. Opisz w niej
        czego dotyczy sprawa oraz podaj dane kontaktowe, żebyśmy mogli się z Tobą
        skontaktować. Odpowiemy bez zbędnej zwłoki.
      </p>

      <h2>Dane kontaktowe</h2>
      <p>
        We wszystkich sprawach związanych z serwisem skontaktujesz się z
        operatorem telefonicznie pod numerem{" "}
        <a href="tel:+48585334323">58 533 43 23</a>, mailowo pod adresem{" "}
        <a href="mailto:biuro@domhunter.pl">biuro@domhunter.pl</a> lub listownie
        na adres ul. Jana Pawła II 6e/5, 80-462 Gdańsk.
      </p>

      <h2>Postanowienia końcowe</h2>
      <p>
        W sprawach nieuregulowanych w regulaminie stosuje się przepisy prawa
        polskiego. Operator może zmienić regulamin, na przykład gdy zmieni się
        zakres usług lub przepisy prawa. Aktualna wersja regulaminu jest zawsze
        dostępna w serwisie.
      </p>
    </LegalDoc>
  );
}
