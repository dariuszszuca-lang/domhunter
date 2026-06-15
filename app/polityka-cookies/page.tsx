import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description:
    "Polityka plików cookies serwisu domhunter.pl. Sprawdź, czym są cookies, jakich rodzajów używamy i jak zarządzać nimi w swojej przeglądarce.",
};

export default function PolitykaCookiesPage() {
  return (
    <LegalDoc
      eyebrow="Pliki cookies"
      title="Polityka cookies"
      updated="15 czerwca 2026"
    >
      <p>
        Korzystając z naszego serwisu, spotkasz się z plikami cookies. Poniżej
        wyjaśniamy w prostych słowach, czym one są, jakich używamy i jak możesz
        nimi sterować.
      </p>

      <h2>Czym są pliki cookies</h2>
      <p>
        Pliki cookies to niewielkie pliki tekstowe, które serwis zapisuje na
        Twoim urządzeniu, gdy odwiedzasz stronę. Zawierają informacje, które
        pomagają stronie działać poprawnie, zapamiętać Twoje ustawienia i
        rozpoznać, że to znów Ty. Nie szkodzą urządzeniu i nie zawierają
        wirusów.
      </p>

      <h2>Rodzaje plików cookies</h2>
      <p>Ze względu na czas, przez jaki pozostają na urządzeniu, dzielimy je na:</p>
      <ul>
        <li>
          <strong>cookies sesyjne</strong>, które są tymczasowe i znikają, gdy
          zamkniesz przeglądarkę,
        </li>
        <li>
          <strong>cookies stałe</strong>, które pozostają na urządzeniu przez
          określony czas lub do momentu, aż samodzielnie je usuniesz.
        </li>
      </ul>

      <h2>Kategorie plików cookies</h2>
      <p>Ze względu na cel, jakiemu służą, wyróżniamy:</p>
      <ul>
        <li>
          <strong>cookies niezbędne</strong>, bez których serwis nie zadziała
          poprawnie, odpowiadające między innymi za podstawową nawigację,
        </li>
        <li>
          <strong>cookies wydajnościowe</strong>, które pomagają nam zrozumieć,
          jak odwiedzający korzystają ze strony, dzięki czemu możemy ją
          ulepszać,
        </li>
        <li>
          <strong>cookies funkcjonalne</strong>, które zapamiętują Twoje wybory
          i ustawienia, żeby korzystanie z serwisu było wygodniejsze,
        </li>
        <li>
          <strong>cookies reklamowe</strong>, które mogą służyć dopasowaniu
          treści i komunikatów do Twoich zainteresowań.
        </li>
      </ul>

      <h2>W jakim celu używamy cookies</h2>
      <p>
        Pliki cookies wykorzystujemy po to, żeby serwis działał prawidłowo, żeby
        zapamiętać Twoje preferencje, a także żeby lepiej zrozumieć, jak
        korzystasz ze strony, i stopniowo ją poprawiać.
      </p>

      <h2>Cookies partnerów i reklamodawców</h2>
      <p>
        Część plików cookies może być umieszczana i wykorzystywana przez naszych
        partnerów oraz reklamodawców, na przykład w związku z prezentowaniem
        dopasowanych treści. Zasady korzystania z takich plików określają
        odrębne polityki tych podmiotów.
      </p>

      <h2>Wpływ ograniczenia cookies na działanie serwisu</h2>
      <p>
        Możesz w każdej chwili ograniczyć lub wyłączyć obsługę plików cookies w
        ustawieniach swojej przeglądarki. Pamiętaj jednak, że niektóre funkcje
        serwisu mogą wtedy działać gorzej, a część elementów może przestać być
        dostępna.
      </p>

      <h2>Jak zarządzać cookies w przeglądarce</h2>
      <p>
        Każda popularna przeglądarka pozwala sprawdzić, usunąć i zablokować pliki
        cookies. Zwykle znajdziesz te opcje w ustawieniach, w sekcji dotyczącej
        prywatności:
      </p>
      <ul>
        <li>
          <strong>Google Chrome</strong>: ustawienia, sekcja prywatności i
          bezpieczeństwa, a następnie pliki cookies i inne dane witryn,
        </li>
        <li>
          <strong>Safari</strong>: preferencje, zakładka prywatność, gdzie
          zarządzasz plikami cookies i danymi witryn,
        </li>
        <li>
          <strong>Mozilla Firefox</strong>: ustawienia, sekcja prywatność i
          bezpieczeństwo, gdzie znajdziesz opcje dotyczące ciasteczek i danych
          witryn,
        </li>
        <li>
          <strong>Microsoft Edge</strong>: ustawienia, sekcja pliki cookie i
          uprawnienia witryn.
        </li>
      </ul>

      <h2>Kontakt</h2>
      <p>
        Jeśli masz pytania dotyczące plików cookies, napisz do nas na adres{" "}
        <a href="mailto:biuro@domhunter.pl">biuro@domhunter.pl</a> lub zadzwoń pod
        numer <a href="tel:+48585334323">58 533 43 23</a>. Więcej o tym, jak
        chronimy Twoje dane, przeczytasz w naszej{" "}
        <a href="/polityka-prywatnosci">Polityce prywatności</a>.
      </p>
    </LegalDoc>
  );
}
