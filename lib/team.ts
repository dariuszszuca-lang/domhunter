/**
 * Zespół DomHunter — biuro nieruchomości w Trójmieście.
 *
 * Dane placeholder. Po dostarczeniu zdjęć + bio podmień `photo`, `bio`, `bioParagraphs`.
 */

export type TeamMember = {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  shortRole?: string;
  credentialLines?: string[];
  photo?: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  languages?: string[];
  specializations?: string[];
  bio: string;
  bioParagraphs: string[];
  isOwner?: boolean;
  yearsExperience?: number;
  order: number;
};

export const team: TeamMember[] = [
  {
    slug: "marta-kowalczyk",
    firstName: "Marta",
    lastName: "Kowalczyk",
    fullName: "Marta Kowalczyk",
    role: "Pośrednik nieruchomości premium",
    shortRole: "Współzałożycielka",
    credentialLines: ["Pośrednik nieruchomości", "Współzałożycielka DomHunter"],
    phone: "+48 530 100 200",
    phoneDisplay: "530 100 200",
    email: "marta.kowalczyk@domhunter.pl",
    languages: ["angielski"],
    specializations: ["Mieszkania premium", "Sopot, Gdynia Orłowo"],
    bio: "Specjalizuję się w nieruchomościach premium w Trójmieście. Apartamenty z widokiem na morze, kamienice w Sopocie, prestiżowe lokalizacje w Gdyni Orłowie.",
    bioParagraphs: [
      "Specjalizuję się w nieruchomościach premium w Trójmieście. Apartamenty z widokiem na morze, kamienice w Sopocie, prestiżowe lokalizacje w Gdyni Orłowie.",
      "12 lat doświadczenia w obrocie nieruchomościami. Współzałożycielka DomHunter. Wierzę, że za każdą transakcją stoi człowiek, a dobry agent to ten, który słucha zanim pokaże.",
      "Prywatnie miłośniczka żeglarstwa i kawy w Centralnym Sopocie. Płynnie po angielsku obsługuję klientów z zagranicy.",
    ],
    isOwner: true,
    yearsExperience: 12,
    order: 1,
  },
  {
    slug: "tomasz-lewandowski",
    firstName: "Tomasz",
    lastName: "Lewandowski",
    fullName: "Tomasz Lewandowski",
    role: "Pośrednik komercyjny, inwestycje",
    shortRole: "Współzałożyciel",
    credentialLines: ["Pośrednik nieruchomości", "Współzałożyciel DomHunter"],
    phone: "+48 530 100 201",
    phoneDisplay: "530 100 201",
    email: "tomasz.lewandowski@domhunter.pl",
    languages: ["angielski", "niemiecki"],
    specializations: ["Komercja", "Inwestycje", "Najem instytucjonalny"],
    bio: "Lokale komercyjne, biurowce, najem instytucjonalny w Trójmieście. Wspieram inwestorów krajowych i zagranicznych w wyborze nieruchomości o najlepszym potencjale zwrotu.",
    bioParagraphs: [
      "Lokale komercyjne, biurowce, najem instytucjonalny w Trójmieście. Wspieram inwestorów krajowych i zagranicznych w wyborze nieruchomości o najlepszym potencjale zwrotu.",
      "10 lat na rynku. Współzałożyciel DomHunter. Wcześniej w międzynarodowych firmach doradztwa nieruchomościowego.",
      "Prywatnie squash i podróże off-roadowe. Niemiecki i angielski w pracy z klientami zagranicznymi.",
    ],
    isOwner: true,
    yearsExperience: 10,
    order: 2,
  },
  {
    slug: "anna-wojciechowska",
    firstName: "Anna",
    lastName: "Wojciechowska",
    fullName: "Anna Wojciechowska",
    role: "Pośrednik nieruchomości",
    credentialLines: ["Pośrednik nieruchomości"],
    phone: "+48 530 100 202",
    phoneDisplay: "530 100 202",
    email: "anna.wojciechowska@domhunter.pl",
    specializations: ["Rynek pierwotny", "Deweloperzy", "Nowe inwestycje"],
    bio: "Rynek pierwotny i współpraca z deweloperami w Trójmieście. Pomagam wybrać mieszkanie w nowej inwestycji bez błędów, które ujawnią się dopiero po latach.",
    bioParagraphs: [
      "Rynek pierwotny i współpraca z deweloperami w Trójmieście. Pomagam wybrać mieszkanie w nowej inwestycji bez błędów, które ujawnią się dopiero po latach.",
      "8 lat doświadczenia, znam większość trójmiejskich deweloperów osobiście. Wiem, który dom kończony jest terminowo, a który warto omijać.",
      "Prywatnie joga, gotowanie i długie spacery po plaży w Sobieszewie.",
    ],
    yearsExperience: 8,
    order: 3,
  },
  {
    slug: "piotr-nowak",
    firstName: "Piotr",
    lastName: "Nowak",
    fullName: "Piotr Nowak",
    role: "Pośrednik nieruchomości",
    credentialLines: ["Pośrednik nieruchomości"],
    phone: "+48 530 100 203",
    phoneDisplay: "530 100 203",
    email: "piotr.nowak@domhunter.pl",
    specializations: ["Domy", "Działki", "Pomorskie"],
    bio: "Domy i działki w Trójmieście i Pomorskim. 15 lat doświadczenia, znam każdy zakątek od Kaszub po Mierzeję Wiślaną.",
    bioParagraphs: [
      "Domy i działki w Trójmieście i Pomorskim. 15 lat doświadczenia, znam każdy zakątek od Kaszub po Mierzeję Wiślaną.",
      "Wcześniej projektant terenu, dziś łączę wiedzę o gruncie z umiejętnościami pośrednika. Sprawdzę stan prawny działki, dostęp do mediów i potencjał zabudowy.",
      "Prywatnie wędkarstwo i renowacja starych domów z duszą.",
    ],
    yearsExperience: 15,
    order: 4,
  },
  {
    slug: "joanna-wisniewska",
    firstName: "Joanna",
    lastName: "Wiśniewska",
    fullName: "Joanna Wiśniewska",
    role: "Pośrednik nieruchomości — najem",
    credentialLines: ["Pośrednik nieruchomości"],
    phone: "+48 530 100 204",
    phoneDisplay: "530 100 204",
    email: "joanna.wisniewska@domhunter.pl",
    languages: ["angielski"],
    specializations: ["Najem długoterminowy", "Mieszkania premium"],
    bio: "Najem długoterminowy w Trójmieście, w tym mieszkania premium dla ekspatów i firm. 7 lat doświadczenia w obsłudze najemców i właścicieli.",
    bioParagraphs: [
      "Najem długoterminowy w Trójmieście, w tym mieszkania premium dla ekspatów i firm. 7 lat doświadczenia w obsłudze najemców i właścicieli.",
      "Specjalizuję się w bezpiecznych umowach najmu, weryfikacji najemcy i przejmowaniu zarządzania mieszkaniem.",
      "Prywatnie czytanie, sztuki teatralne w Operze Bałtyckiej, kawa w nowych miejscach na Wrzeszczu.",
    ],
    yearsExperience: 7,
    order: 5,
  },
  {
    slug: "marcin-adamski",
    firstName: "Marcin",
    lastName: "Adamski",
    fullName: "Marcin Adamski",
    role: "Pośrednik nieruchomości",
    credentialLines: ["Pośrednik nieruchomości"],
    phone: "+48 530 100 205",
    phoneDisplay: "530 100 205",
    email: "marcin.adamski@domhunter.pl",
    specializations: ["Gdańsk Stare Miasto", "Wrzeszcz", "Kamienice"],
    bio: "Stare Miasto, Wrzeszcz, kamienice z duszą. Gdańsk jest moim mikrokosmosem, znam tu każdy podwórzec i historię większości kamienic.",
    bioParagraphs: [
      "Stare Miasto, Wrzeszcz, kamienice z duszą. Gdańsk jest moim mikrokosmosem, znam tu każdy podwórzec i historię większości kamienic.",
      "6 lat na rynku, ale wcześniej 10 lat jako przewodnik turystyczny po Gdańsku. Połączenie pasji do historii z biznesem nieruchomości.",
      "Prywatnie fotografia analogowa i jazz w Klubie Żak.",
    ],
    yearsExperience: 6,
    order: 6,
  },
  {
    slug: "agata-pawlowska",
    firstName: "Agata",
    lastName: "Pawłowska",
    fullName: "Agata Pawłowska",
    role: "Pośrednik nieruchomości",
    credentialLines: ["Pośrednik nieruchomości"],
    phone: "+48 530 100 206",
    phoneDisplay: "530 100 206",
    email: "agata.pawlowska@domhunter.pl",
    specializations: ["Mierzeja Wiślana", "Działki rekreacyjne", "Domy letnie"],
    bio: "Mierzeja Wiślana, Stegna, Sztutowo, Krynica Morska. Działki rekreacyjne, domy letnie i całoroczne nad morzem.",
    bioParagraphs: [
      "Mierzeja Wiślana, Stegna, Sztutowo, Krynica Morska. Działki rekreacyjne, domy letnie i całoroczne nad morzem.",
      "9 lat doświadczenia, dorastałam na Mierzei. Wiem, gdzie kupić, a gdzie nie, bo wiele działek z ogłoszeń to grunt zalewowy lub bez dostępu do drogi publicznej.",
      "Prywatnie kitesurfing i ogrodnictwo permakulturowe.",
    ],
    yearsExperience: 9,
    order: 7,
  },
  {
    slug: "karolina-zielinska",
    firstName: "Karolina",
    lastName: "Zielińska",
    fullName: "Karolina Zielińska",
    role: "Office Manager",
    credentialLines: ["Office Manager", "Wsparcie administracyjne"],
    phone: "+48 530 100 207",
    phoneDisplay: "530 100 207",
    email: "biuro@domhunter.pl",
    bio: "Łączę zespół z klientami. Umawiam spotkania, koordynuję dokumenty, dbam o sprawne funkcjonowanie biura DomHunter w Gdańsku.",
    bioParagraphs: [
      "Łączę zespół z klientami. Umawiam spotkania, koordynuję dokumenty, dbam o sprawne funkcjonowanie biura DomHunter w Gdańsku.",
      "Pierwsza osoba z którą rozmawiasz dzwoniąc do biura. Pomogę umówić wizytę, odpowiedzieć na ogólne pytania, połączyć z odpowiednim agentem.",
      "Prywatnie pieczenie chleba i bieganie po Parku Oliwskim.",
    ],
    order: 8,
  },
];

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}

export function getOwners(): TeamMember[] {
  return team.filter((m) => m.isOwner).sort((a, b) => a.order - b.order);
}

export function getAgents(): TeamMember[] {
  return team.filter((m) => !m.isOwner).sort((a, b) => a.order - b.order);
}

export function getAllMembersSorted(): TeamMember[] {
  return [...team].sort((a, b) => a.order - b.order);
}
