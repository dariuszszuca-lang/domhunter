import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności serwisu domhunter.pl. Dowiedz się, jakie dane zbiera Dom Hunter Biuro Nieruchomości, w jakim celu i jakie masz prawa zgodnie z RODO.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalDoc
      eyebrow="Dane i prywatność"
      title="Polityka prywatności"
      updated="15 czerwca 2026"
    >
      <p>
        Zależy nam, żebyś czuł się bezpiecznie, korzystając z naszego serwisu.
        Poniżej w prostych słowach wyjaśniamy, kto odpowiada za Twoje dane, jakie
        informacje zbieramy, po co i jakie masz wobec nich prawa.
      </p>

      <h2>Kto jest administratorem danych</h2>
      <p>
        Administratorem Twoich danych osobowych jest{" "}
        <strong>Dom Hunter Biuro Nieruchomości</strong>, ul. Jana Pawła II 6e/5,
        80-462 Gdańsk, NIP 9571073617, REGON 222082718. W sprawach związanych z danymi możesz się z nami
        skontaktować telefonicznie pod numerem{" "}
        <a href="tel:+48585334323">58 533 43 23</a> lub mailowo, pisząc na adres{" "}
        <a href="mailto:biuro@domhunter.pl">biuro@domhunter.pl</a>.
      </p>

      <h2>Jakie dane zbieramy</h2>
      <p>
        Sam serwis nie zbiera o Tobie żadnych danych automatycznie, poza tymi,
        które trafiają do plików cookies. Dane osobowe podajesz nam dobrowolnie,
        kiedy chcesz się z nami skontaktować. Zbieramy wtedy:
      </p>
      <ul>
        <li>
          dane z formularza kontaktowego, czyli imię, numer telefonu, adres
          e-mail oraz treść wiadomości, którą do nas wysyłasz,
        </li>
        <li>
          dane zapisane w plikach cookies, czyli informacje o tym, jak
          korzystasz z serwisu.
        </li>
      </ul>
      <p>
        Operatorem umieszczającym pliki cookies na Twoim urządzeniu jest Dom
        Hunter Biuro Nieruchomości z siedzibą pod wskazanym wyżej adresem.
      </p>

      <h2>W jakim celu i na jakiej podstawie przetwarzamy dane</h2>
      <p>
        Twoje dane przetwarzamy wyłącznie po to, żeby odpowiedzieć na Twoje
        zapytanie i obsłużyć sprawę, z którą się do nas zgłaszasz. Robimy to na
        następujących podstawach prawnych:
      </p>
      <ul>
        <li>
          <strong>art. 6 ust. 1 lit. a RODO</strong>, czyli na podstawie Twojej
          zgody, którą wyrażasz, wysyłając do nas wiadomość przez formularz,
        </li>
        <li>
          <strong>art. 6 ust. 1 lit. b RODO</strong>, gdy kontakt prowadzi do
          podjęcia działań przed zawarciem umowy lub do jej wykonania,
        </li>
        <li>
          <strong>art. 6 ust. 1 lit. f RODO</strong>, czyli na podstawie naszego
          prawnie uzasadnionego interesu, jakim jest obsługa korespondencji,
          udzielenie odpowiedzi i utrzymanie kontaktu z osobą zainteresowaną
          naszą ofertą.
        </li>
      </ul>

      <h2>Pliki cookies</h2>
      <p>
        Nasz serwis korzysta z plików cookies, czyli małych plików zapisywanych
        na Twoim urządzeniu. Pomagają nam one zapewnić poprawne działanie strony
        oraz lepiej dopasować jej zawartość. Szczegóły opisaliśmy w osobnej{" "}
        <a href="/polityka-cookies">Polityce cookies</a>, gdzie znajdziesz też
        informację, jak nimi zarządzać.
      </p>

      <h2>Komu udostępniamy dane</h2>
      <p>
        Twoich danych nie sprzedajemy i nie udostępniamy nikomu dla zysku. Mogą
        do nich mieć dostęp wyłącznie podmioty, które wspierają nas w bieżącej
        działalności, na przykład firmy zajmujące się obsługą informatyczną,
        hostingiem serwisu czy obsługą poczty. Działają one na nasze zlecenie i
        są zobowiązane do ochrony Twoich danych. Dane możemy też przekazać
        organom państwowym, jeżeli wymagają tego przepisy prawa.
      </p>

      <h2>Jak długo przechowujemy dane</h2>
      <p>
        Dane przechowujemy tylko tak długo, jak jest to potrzebne do obsługi
        Twojej sprawy, a po jej zakończeniu przez czas wynikający z przepisów
        prawa lub do momentu wycofania zgody albo zgłoszenia skutecznego
        sprzeciwu. Później je usuwamy.
      </p>

      <h2>Jakie masz prawa</h2>
      <p>
        W związku z przetwarzaniem Twoich danych masz prawo do:
      </p>
      <ul>
        <li>dostępu do swoich danych i otrzymania ich kopii,</li>
        <li>sprostowania, czyli poprawienia danych, gdy są nieprawidłowe,</li>
        <li>usunięcia danych,</li>
        <li>ograniczenia ich przetwarzania,</li>
        <li>wniesienia sprzeciwu wobec przetwarzania,</li>
        <li>przenoszenia danych,</li>
        <li>
          wycofania zgody w dowolnym momencie, bez wpływu na zgodność z prawem
          przetwarzania, którego dokonaliśmy przed jej wycofaniem,
        </li>
        <li>
          wniesienia skargi do organu nadzorczego, czyli Prezesa Urzędu Ochrony
          Danych Osobowych.
        </li>
      </ul>

      <h2>Kontakt w sprawie danych</h2>
      <p>
        Jeśli chcesz skorzystać ze swoich praw lub masz pytania dotyczące tego,
        jak chronimy Twoje dane, napisz do nas na adres{" "}
        <a href="mailto:biuro@domhunter.pl">biuro@domhunter.pl</a> albo zadzwoń
        pod numer <a href="tel:+48585334323">58 533 43 23</a>. Odpowiemy tak
        szybko, jak to możliwe.
      </p>
    </LegalDoc>
  );
}
