/**
 * Blog Dom Hunter. Dane artykułów + helpery.
 *
 * Treść artykułu trzymamy jako strukturę sekcji (Block[]), żeby strona artykułu
 * mogła ją wyrenderować z własną typografią, a sekcje FAQ wykorzystać też w JSON-LD.
 *
 * ZASADA: bez zmyślonych liczb, cen i statystyk. Orientacje cenowe zawsze ogólnie.
 */

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type FaqItem = {
  q: string;
  a: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Krótszy nagłówek na kartę/teaser, gdy pełny tytuł jest długi. */
  cardTitle?: string;
  description: string;
  /** Data publikacji w formacie ISO (YYYY-MM-DD). */
  date: string;
  /** Czytelna data po polsku, do wyświetlenia. */
  dateLabel: string;
  readingTime: string;
  /** Słowo wyróżnione kursywą w nagłówku artykułu (akcent magenta). */
  accent: string;
  /** Zdjęcie tematyczne artykułu (nagłówek + karta na liście i stronie głównej). */
  image: string;
  /** Opis alternatywny zdjęcia po polsku, dla dostępności i SEO. */
  imageAlt: string;
  /** Treść główna jako sekcje. */
  content: Block[];
  /** Sekcja pytań i odpowiedzi. Odbita też w JSON-LD FAQPage. */
  faq: FaqItem[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "jak-sprzedac-mieszkanie-w-gdansku-krok-po-kroku",
    title: "Jak sprzedać mieszkanie w Gdańsku krok po kroku",
    cardTitle: "Jak sprzedać mieszkanie w Gdańsku",
    description:
      "Praktyczny przewodnik po sprzedaży mieszkania w Gdańsku: przygotowanie lokalu, wycena, prezentacja, ogłoszenie, negocjacje i akt notarialny. Konkretnie, bez lania wody.",
    date: "2026-06-02",
    dateLabel: "2 czerwca 2026",
    readingTime: "8 min czytania",
    accent: "krok po kroku",
    image: "/images/blog/jak-sprzedac-mieszkanie-w-gdansku-krok-po-kroku.jpg",
    imageAlt:
      "Jasny, zadbany salon z szarą kanapą, drewnianym stolikiem i roślinami, mieszkanie gotowe do sprzedaży",
    content: [
      {
        type: "p",
        text: "Sprzedaż mieszkania w Gdańsku da się przeprowadzić spokojnie i bez stresu, jeśli zrobisz to po kolei. Najpierw przygotowujesz lokal i dokumenty, potem ustalasz realną cenę, robisz dobre zdjęcia i ogłoszenie, prowadzisz pokazy, negocjujesz, a na końcu podpisujesz umowę u notariusza. Poniżej rozkładamy każdy z tych etapów na czynniki pierwsze.",
      },
      { type: "h2", text: "1. Przygotuj mieszkanie i dokumenty" },
      {
        type: "p",
        text: "Zanim cokolwiek ogłosisz, zrób porządek. Kupujący w Gdańsku oglądają wiele ofert i decydują w kilka sekund, więc pierwsze wrażenie waży najwięcej. Usuń zbędne rzeczy, napraw drobiazgi, które rzucają się w oczy, odśwież ściany jeśli trzeba. Mieszkanie ma wyglądać na zadbane i gotowe do wprowadzenia.",
      },
      {
        type: "p",
        text: "Równolegle skompletuj papiery, bo ich brak najczęściej opóźnia transakcję. Najważniejsze dokumenty to:",
      },
      {
        type: "ul",
        items: [
          "numer księgi wieczystej i podstawa nabycia mieszkania, na przykład akt notarialny zakupu, darowizny albo postanowienie o spadku",
          "zaświadczenie ze spółdzielni lub wspólnoty o braku zaległości w opłatach",
          "zaświadczenie, że w lokalu nikt nie jest zameldowany, albo informacja o osobach zameldowanych",
          "rzut mieszkania i informacja o metrażu, do ogłoszenia i dla kupującego na kredyt",
        ],
      },
      { type: "h2", text: "2. Ustal realną cenę" },
      {
        type: "p",
        text: "Cena to najważniejsza decyzja w całym procesie. Zawyżona odstrasza kupujących i sprawia, że oferta wisi miesiącami, a potem i tak schodzisz z ceny, tylko już z gorszej pozycji. Zaniżona oznacza, że oddajesz pieniądze za darmo.",
      },
      {
        type: "p",
        text: "Cenę ustala się na podstawie faktów, a nie życzeń. Porównaj swoje mieszkanie z lokalami o podobnym metrażu, standardzie i lokalizacji w tej samej dzielnicy. Zwróć uwagę na piętro, stan kamienicy lub bloku, układ pomieszczeń i to, czy do mieszkania należy miejsce postojowe albo komórka. Orientacyjne stawki za metr mocno różnią się między dzielnicami Gdańska, więc nie przenoś ceny ze Śródmieścia na Chełm czy Orunię. Bezpłatna wycena u pośrednika, który zna lokalny rynek, daje punkt odniesienia oparty na realnych transakcjach.",
      },
      { type: "h2", text: "3. Zadbaj o prezentację i zdjęcia" },
      {
        type: "p",
        text: "Dobre przygotowanie mieszkania do sprzedaży to nic skomplikowanego. Chodzi o to, żeby lokal wyglądał jasno, przestronnie i neutralnie, tak aby kupujący łatwo wyobraził sobie w nim siebie. Schowaj prywatne drobiazgi, odsłoń okna, wpuść światło, postaw kilka prostych dodatków. Zdjęcia rób w ciągu dnia, przy naturalnym świetle, z poziomu klatki piersiowej i tak, żeby pokazać przestrzeń, a nie sufit.",
      },
      {
        type: "p",
        text: "Jeśli zależy Ci na szybkiej sprzedaży, warto dołożyć krótki film z przejścia po mieszkaniu albo rzut z wymiarami. To filtruje przypadkowych oglądających i przyciąga osoby naprawdę zainteresowane.",
      },
      { type: "h2", text: "4. Napisz dobre ogłoszenie i opublikuj je" },
      {
        type: "p",
        text: "Treść ogłoszenia ma odpowiadać na pytania, które kupujący zada i tak. Podaj metraż, liczbę pokoi, piętro, rok budowy lub remontu, wysokość opłat, dostępność miejsca parkingowego i to, co jest w okolicy: szkoła, przystanek, sklep, las czy plaża. W Gdańsku dojazd i bliskość komunikacji to częsty argument, więc napisz o tym wprost. Pisz konkretnie i uczciwie, bez przesady, bo każda nieścisłość wyjdzie na pokazie i tylko zniechęci.",
      },
      {
        type: "p",
        text: "Ogłoszenie publikujesz na popularnych portalach z nieruchomościami. Część ofert sprzedaje się też poza portalami, w gronie współpracujących pośredników, co bywa wygodne, gdy zależy Ci na dyskrecji.",
      },
      { type: "h2", text: "5. Prowadź pokazy i negocjacje" },
      {
        type: "p",
        text: "Pokaz to moment, w którym kupujący podejmuje decyzję. Umawiaj wizyty tak, żeby nie nakładały się na siebie, przewietrz mieszkanie i bądź gotowy odpowiedzieć na pytania o opłaty, sąsiadów, ogrzewanie i ewentualne remonty. Nie ukrywaj wad, bo i tak wyjdą, a uczciwość buduje zaufanie i przyspiesza decyzję.",
      },
      {
        type: "p",
        text: "Negocjacje to normalna część sprzedaży. Wcześniej ustal sobie cenę minimalną, poniżej której nie schodzisz, i trzymaj się jej. Jeśli kupujący prosi o ustępstwo, możesz zaproponować coś innego niż obniżka, na przykład pozostawienie części wyposażenia albo dogodny termin wydania mieszkania.",
      },
      { type: "h2", text: "6. Umowa przedwstępna i akt notarialny" },
      {
        type: "p",
        text: "Gdy dogadasz się co do ceny, najczęściej podpisujecie umowę przedwstępną, zwłaszcza jeśli kupujący bierze kredyt i potrzebuje czasu na decyzję banku. W umowie ustalacie cenę, termin podpisania umowy końcowej i zwykle zadatek. Następnie u notariusza podpisujecie umowę przenoszącą własność, czyli akt notarialny. To notariusz pilnuje formalności i bezpieczeństwa transakcji.",
      },
      {
        type: "p",
        text: "Pamiętaj, że sprzedaż mieszkania może wiązać się z podatkiem dochodowym, jeśli sprzedajesz przed upływem określonego czasu od nabycia. To zależy od Twojej sytuacji, więc skonsultuj ją z księgowym lub doradcą podatkowym, zanim podpiszesz umowę.",
      },
    ],
    faq: [
      {
        q: "Ile trwa sprzedaż mieszkania w Gdańsku?",
        a: "Najczęściej od kilku tygodni do kilku miesięcy. Najwięcej zależy od ceny ustawionej pod rynek, stanu mieszkania i lokalizacji. Dobrze przygotowana oferta z realną ceną sprzedaje się znacznie szybciej niż oferta zawyżona, która z czasem traci na atrakcyjności.",
      },
      {
        q: "Czy muszę zatrudniać pośrednika, żeby sprzedać mieszkanie?",
        a: "Nie musisz, możesz sprzedać samodzielnie. Pośrednik bierze na siebie wycenę, przygotowanie oferty, pokazy, negocjacje i pilnowanie dokumentów, co oszczędza czas i zmniejsza ryzyko błędów. Jeśli masz czas i doświadczenie, poradzisz sobie sam. Jeśli zależy Ci na spokoju i bezpieczeństwie, wsparcie agenta bywa wygodniejsze.",
      },
      {
        q: "Jakie dokumenty są potrzebne do sprzedaży mieszkania?",
        a: "Najczęściej numer księgi wieczystej, podstawa nabycia, czyli akt notarialny zakupu, darowizny albo postanowienie o spadku, zaświadczenie o braku zaległości w opłatach oraz zaświadczenie o zameldowaniu. Notariusz powie dokładnie, co przygotować w Twoim przypadku, bo szczegóły zależą od historii mieszkania.",
      },
      {
        q: "Czy od sprzedaży mieszkania zapłacę podatek?",
        a: "To zależy od tego, jak dawno nabyłeś nieruchomość i co zrobisz z pieniędzmi ze sprzedaży. W niektórych sytuacjach podatku nie ma, w innych trzeba go rozliczyć. Najlepiej sprawdzić swój przypadek u doradcy podatkowego lub księgowego przed podpisaniem umowy, żeby uniknąć niespodzianek.",
      },
    ],
  },
  {
    slug: "kupno-mieszkania-z-rynku-wtornego-na-co-zwrocic-uwage",
    title: "Kupno mieszkania z rynku wtórnego, na co zwrócić uwagę",
    cardTitle: "Kupno mieszkania z rynku wtórnego",
    description:
      "Kupujesz mieszkanie z drugiej ręki w Trójmieście? Sprawdź stan techniczny, księgę wieczystą, koszty, okolicę i formalności. Lista rzeczy, które warto zweryfikować przed podpisem.",
    date: "2026-06-08",
    dateLabel: "8 czerwca 2026",
    readingTime: "9 min czytania",
    accent: "na co zwrócić uwagę",
    image: "/images/blog/kupno-mieszkania-z-rynku-wtornego-na-co-zwrocic-uwage.jpg",
    imageAlt:
      "Jasne, nowoczesne wnętrze mieszkania z telewizorem, lustrem i obrazkami na ścianie, lokal do oceny przed zakupem",
    content: [
      {
        type: "p",
        text: "Mieszkanie z rynku wtórnego ma jedną dużą zaletę: widzisz od razu, co kupujesz. Budynek już stoi, sąsiedzi są, okolica działa. Trzeba tylko dokładnie sprawdzić stan lokalu, sytuację prawną i koszty utrzymania, żeby nie odziedziczyć cudzych problemów. Poniżej przechodzimy przez najważniejsze obszary do weryfikacji.",
      },
      { type: "h2", text: "Stan techniczny mieszkania" },
      {
        type: "p",
        text: "Na pokazie nie patrz tylko na ładne meble, bo te i tak zostaną zabrane. Sprawdź to, co naprawdę kosztuje i czego nie widać na pierwszy rzut oka:",
      },
      {
        type: "ul",
        items: [
          "okna i drzwi, czy się domykają i nie przewiewają, bo wymiana to spory wydatek",
          "instalacja elektryczna i hydrauliczna, wiek rur i tablicy bezpieczników",
          "ogrzewanie, rodzaj i koszt, oraz jak ciepło trzyma mieszkanie zimą",
          "ślady wilgoci i grzyba w kątach, przy oknach i w łazience, zwłaszcza w starym budownictwie",
          "stan podłóg, ścian i sufitów pod świeżą farbą, która czasem coś maskuje",
        ],
      },
      {
        type: "p",
        text: "Jeśli nie czujesz się pewnie, możesz poprosić o pokaz osobę znającą się na budownictwie albo zamówić fachowca na oględziny. Koszt takiej wizyty jest niewielki w porównaniu z naprawami, które mogłyby Cię zaskoczyć po zakupie.",
      },
      { type: "h2", text: "Księga wieczysta i sytuacja prawna" },
      {
        type: "p",
        text: "To etap, którego nie wolno pominąć. Księgę wieczystą sprawdzisz online po numerze, który podaje sprzedający. Zwróć uwagę na trzy rzeczy. Po pierwsze, czy osoba sprzedająca jest faktycznie właścicielem i czy jest tam wpisana. Po drugie, czy mieszkanie nie ma hipoteki lub innego obciążenia, a jeśli ma kredyt, jak zostanie on spłacony przy transakcji. Po trzecie, czy nie ma wpisów o roszczeniach, służebnościach albo postępowaniach.",
      },
      {
        type: "p",
        text: "Sprawdź też, czy mieszkanie jest własnościowe, czy spółdzielcze, bo to wpływa na formalności i na to, czy w ogóle istnieje dla niego księga wieczysta. Jeśli coś budzi wątpliwości, lepiej wyjaśnić to przed podpisaniem umowy przedwstępnej niż po niej.",
      },
      { type: "h2", text: "Koszty utrzymania, nie tylko cena zakupu" },
      {
        type: "p",
        text: "Cena na ogłoszeniu to nie wszystko. Zapytaj o miesięczny czynsz administracyjny i o to, co on obejmuje, bo w jednym budynku w cenie jest woda i ogrzewanie, a w innym dochodzą one osobno. Sprawdź wysokość opłat za media i to, czy wspólnota lub spółdzielnia nie planuje większego remontu, na przykład dachu albo elewacji, który podniesie opłaty.",
      },
      {
        type: "p",
        text: "Do budżetu doliczy też koszty samej transakcji. Przy zakupie z rynku wtórnego pojawia się między innymi podatek od czynności cywilnoprawnych, taksa notarialna i opłaty sądowe za wpis do księgi wieczystej. Jeśli korzystasz z pośrednika lub doradcy kredytowego, uwzględnij również te kwestie. Warto policzyć całość zawczasu, żeby nie zabrakło środków na finiszu.",
      },
      { type: "h2", text: "Okolica i budynek" },
      {
        type: "p",
        text: "W Trójmieście ta sama liczba metrów może oznaczać zupełnie inny komfort życia, w zależności od dzielnicy i adresu. Przejdź się po okolicy o różnych porach, sprawdź dojazd komunikacją miejską, dostępność sklepów, szkoły i przedszkola, parking pod budynkiem oraz to, jak głośno jest wieczorem. Zwróć uwagę na klatkę schodową, stan części wspólnych i to, czy budynek wygląda na zadbany, bo to mówi sporo o wspólnocie.",
      },
      {
        type: "p",
        text: "Pomyśl też o przyszłości. Jeśli kiedyś będziesz chciał sprzedać to mieszkanie, dobra lokalizacja, blisko komunikacji i potrzebnych miejsc, zwykle łatwiej znajduje kupca.",
      },
      { type: "h2", text: "Formalności i finalizacja" },
      {
        type: "p",
        text: "Gdy mieszkanie Ci odpowiada, a księga wieczysta jest czysta, zwykle podpisujecie umowę przedwstępną. To w niej ustalacie cenę, termin podpisania umowy końcowej i zadatek. Jeśli kupujesz na kredyt, na tym etapie składasz wniosek do banku i czekasz na decyzję, dlatego termin w umowie przedwstępnej powinien być realny.",
      },
      {
        type: "p",
        text: "Własność przechodzi na Ciebie dopiero przy podpisaniu umowy końcowej u notariusza. Notariusz sprawdza dokumenty, czyta umowę i dba o to, żeby transakcja była bezpieczna dla obu stron. Po wszystkim zostaje już tylko przepisanie liczników i opłat na siebie oraz odbiór kluczy.",
      },
    ],
    faq: [
      {
        q: "Co sprawdzić w księdze wieczystej przed zakupem mieszkania?",
        a: "Przede wszystkim, czy sprzedający jest wpisany jako właściciel, czy mieszkanie nie ma hipoteki lub innych obciążeń oraz czy nie ma wpisów o roszczeniach i służebnościach. Jeśli na mieszkaniu jest kredyt, ustal, jak zostanie spłacony i wykreślony przy transakcji. Każdą wątpliwość wyjaśnij przed podpisaniem umowy.",
      },
      {
        q: "Jakie koszty dochodzą do ceny mieszkania z rynku wtórnego?",
        a: "Najczęściej podatek od czynności cywilnoprawnych, taksa notarialna i opłaty sądowe za wpis do księgi wieczystej. Do tego dochodzą bieżące koszty utrzymania, czyli czynsz administracyjny i media. Jeśli korzystasz z doradcy kredytowego lub pośrednika, uwzględnij także te ustalenia. Warto policzyć całość przed decyzją.",
      },
      {
        q: "Czy warto zamówić fachowca na oględziny mieszkania?",
        a: "Jeśli nie znasz się na budownictwie, to dobry pomysł, zwłaszcza przy starszych budynkach. Specjalista oceni instalacje, wilgoć i stan, którego nie widać pod świeżą farbą. Koszt takiej wizyty jest niewielki przy potencjalnych naprawach i daje spokój, że kupujesz mieszkanie bez ukrytych wad.",
      },
      {
        q: "Czym różni się mieszkanie własnościowe od spółdzielczego?",
        a: "Mieszkanie własnościowe daje Ci pełne prawo własności i zwykle ma własną księgę wieczystą. Spółdzielcze prawo do lokalu to inna forma, która wiąże się ze spółdzielnią i nieco innymi formalnościami. To wpływa na przebieg transakcji i kredyt, więc warto wiedzieć, co dokładnie kupujesz, jeszcze przed umową przedwstępną.",
      },
    ],
  },
  {
    slug: "wynajem-mieszkania-w-trojmiescie-poradnik-dla-wlasciciela",
    title: "Wynajem mieszkania w Trójmieście, poradnik dla właściciela",
    cardTitle: "Wynajem mieszkania, poradnik dla właściciela",
    description:
      "Wynajmujesz mieszkanie w Gdańsku, Gdyni lub Sopocie? Zobacz, jak przygotować lokal, zweryfikować najemcę, spisać umowę, ustalić kaucję i prowadzić rozliczenia, żeby spać spokojnie.",
    date: "2026-06-12",
    dateLabel: "12 czerwca 2026",
    readingTime: "8 min czytania",
    accent: "poradnik dla właściciela",
    image: "/images/blog/wynajem-mieszkania-w-trojmiescie-poradnik-dla-wlasciciela.jpg",
    imageAlt:
      "Przytulny, jasny salon z szarą kanapą, drewnianym stolikiem, regałem z książkami i roślinami, mieszkanie przygotowane pod wynajem",
    content: [
      {
        type: "p",
        text: "Wynajem mieszkania w Trójmieście potrafi być spokojnym źródłem dochodu, jeśli na starcie zrobisz cztery rzeczy dobrze: przygotujesz lokal, sprawdzisz najemcę, spiszesz porządną umowę i ustalisz jasne zasady rozliczeń. To na początku oszczędza najwięcej nerwów i pieniędzy później. Przejdźmy po kolei.",
      },
      { type: "h2", text: "Przygotuj mieszkanie do wynajmu" },
      {
        type: "p",
        text: "Mieszkanie pod wynajem ma być czyste, sprawne i bezpieczne. Najemcy w Trójmieście mają w czym wybierać, więc zadbany lokal szybciej znajdzie dobrego lokatora i pozwala uczciwie ustalić stawkę. Zanim wystawisz ofertę, zrób kilka rzeczy:",
      },
      {
        type: "ul",
        items: [
          "sprawdź, czy wszystko działa, czyli krany, spłuczka, gniazdka, ogrzewanie i sprzęty w cenie najmu",
          "zadbaj o czystość i drobne naprawy, bo to one budują pierwsze wrażenie",
          "zrób zdjęcia przy świetle dziennym, jasne i pokazujące przestrzeń",
          "przygotuj komplet kluczy i spisz, co dokładnie zostaje w mieszkaniu",
        ],
      },
      {
        type: "p",
        text: "Zastanów się też, czy wynajmujesz lokal umeblowany, czy pusty. W Trójmieście umeblowane mieszkania częściej wynajmują osoby pracujące i studenci, którzy szukają gotowego rozwiązania na rok lub dwa. To wpływa na grupę najemców i na stawkę.",
      },
      { type: "h2", text: "Zweryfikuj najemcę" },
      {
        type: "p",
        text: "Dobry najemca to podstawa spokojnego wynajmu. Nie chodzi o przesłuchanie, tylko o zwykłą rozmowę i kilka pytań: gdzie pracuje lub studiuje, na jak długo szuka mieszkania, ile osób będzie mieszkać i czy są zwierzęta. Sposób, w jaki ktoś odpowiada i jak traktuje rozmowę, mówi sporo.",
      },
      {
        type: "p",
        text: "Możesz poprosić o potwierdzenie zatrudnienia albo o referencje od poprzedniego właściciela. Najemca też ma prawo Cię sprawdzić, więc pokaż, że jesteś rzetelnym wynajmującym, który traktuje sprawę poważnie. Zaufanie działa w obie strony i zwykle przekłada się na dłuższy, spokojny najem.",
      },
      { type: "h2", text: "Spisz umowę najmu" },
      {
        type: "p",
        text: "Umowa na piśmie chroni obie strony i porządkuje zasady. Nigdy nie wynajmuj na słowo. W umowie powinny znaleźć się przynajmniej te elementy:",
      },
      {
        type: "ul",
        items: [
          "dane stron, dokładny adres i opis mieszkania",
          "czas trwania najmu i zasady wypowiedzenia",
          "wysokość czynszu, termin płatności i sposób przekazania pieniędzy",
          "co wchodzi w czynsz, a co najemca opłaca osobno, na przykład media",
          "wysokość kaucji i zasady jej zwrotu",
          "zasady korzystania z mieszkania i kto odpowiada za drobne naprawy",
        ],
      },
      {
        type: "p",
        text: "Warto dołączyć protokół zdawczo odbiorczy ze stanem mieszkania i licznikami w dniu wydania kluczy, najlepiej ze zdjęciami. To ten dokument rozstrzyga ewentualne spory przy zwrocie kaucji. Jeśli zależy Ci na większej ochronie, dopytaj specjalistę o formy najmu dające właścicielowi mocniejszą pozycję, bo różnią się one formalnościami.",
      },
      { type: "h2", text: "Ustal kaucję i rozliczenia" },
      {
        type: "p",
        text: "Kaucja to zabezpieczenie na wypadek zaległości lub zniszczeń. Zwykle odpowiada równowartości jedno lub kilkukrotności miesięcznego czynszu. Zapisz w umowie jej wysokość oraz to, w jakich sytuacjach i w jakim terminie ją zwracasz. Po zakończeniu najmu zwracasz kaucję pomniejszoną tylko o uzasadnione koszty, a nie o zwykłe ślady codziennego używania.",
      },
      {
        type: "p",
        text: "Rozliczenia trzymaj w jednym miejscu i prowadź je tak samo co miesiąc. Ustal stałą datę płatności i jeden sposób przekazania pieniędzy, najlepiej przelew, bo zostaje ślad. Jasno rozdziel, co jest w czynszu, a co najemca płaci za zużycie, na przykład prąd czy wodę według liczników. Pamiętaj również, że dochód z najmu rozlicza się z urzędem skarbowym, więc warto z góry wiedzieć, jak to zrobić w Twoim przypadku.",
      },
      { type: "h2", text: "Dbaj o relację przez cały najem" },
      {
        type: "p",
        text: "Najlepszy najem to taki, o którym po podpisaniu umowy prawie nie myślisz. Reaguj na zgłoszenia o usterkach, bądź dostępny i traktuj najemcę uczciwie, a w zamian najczęściej dostaniesz to samo. Zadowolony lokator zostaje dłużej, dba o mieszkanie i płaci na czas, a to dla właściciela warte więcej niż kilka złotych więcej na stawce.",
      },
    ],
    faq: [
      {
        q: "Jak wysoka powinna być kaucja przy wynajmie mieszkania?",
        a: "Najczęściej kaucja odpowiada równowartości jedno lub kilkukrotności miesięcznego czynszu. Jej wysokość ustalasz w umowie razem z zasadami zwrotu. Po zakończeniu najmu zwracasz ją pomniejszoną tylko o uzasadnione koszty, na przykład zaległości lub zniszczenia, a nie o zwykłe zużycie wynikające z normalnego mieszkania.",
      },
      {
        q: "Jak sprawdzić najemcę przed podpisaniem umowy?",
        a: "Porozmawiaj i zapytaj, gdzie pracuje lub studiuje, na jak długo szuka mieszkania i ile osób będzie mieszkać. Możesz poprosić o potwierdzenie zatrudnienia albo o referencje od poprzedniego właściciela. Zwróć uwagę na to, jak ktoś podchodzi do rozmowy, bo rzetelność widać już na tym etapie.",
      },
      {
        q: "Co powinno znaleźć się w umowie najmu?",
        a: "Dane stron i opis mieszkania, czas trwania najmu i zasady wypowiedzenia, wysokość czynszu i termin płatności, podział na to, co jest w czynszu, a co najemca opłaca osobno, wysokość kaucji oraz zasady korzystania z lokalu. Warto dołączyć protokół zdawczo odbiorczy ze stanem mieszkania i licznikami.",
      },
      {
        q: "Czy muszę rozliczać dochód z wynajmu z urzędem skarbowym?",
        a: "Tak, dochód z najmu zasadniczo podlega rozliczeniu z urzędem skarbowym. Sposób rozliczenia zależy od Twojej sytuacji, dlatego najlepiej ustalić go z góry, na przykład z księgowym, żeby uniknąć zaległości i niespodzianek. Dzięki temu wynajem zostaje czysty formalnie i spokojny przez cały czas trwania umowy.",
      },
    ],
  },
];

/** Wszystkie wpisy, najnowsze na górze (sortowanie po dacie malejąco). */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Pojedynczy wpis po slugu albo undefined, gdy nie istnieje. */
export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Lista slugów do generateStaticParams. */
export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
