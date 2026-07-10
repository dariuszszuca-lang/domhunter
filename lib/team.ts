/**
 * Zespół Dom Hunter — biuro nieruchomości w Trójmieście.
 *
 * Dane (imię, nazwisko, telefon, e-mail) oraz specjalizacje pochodzą z EstiCRM
 * (kontakty i oferty przypisane do agentów, stan 25.06.2026). Opisy oparte na
 * realnych typach i lokalizacjach prowadzonych ofert — bez zmyślania.
 * Kolejność: właścicielka, dalej wg liczby prowadzonych ofert.
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

const CONTACT_PARA =
  "Skontaktuj się bezpośrednio, telefon i e-mail znajdziesz powyżej. Oddzwaniamy w 30 minut w godzinach pracy biura.";

export const team: TeamMember[] = [
  {
    slug: "sylwia-wroblewska",
    firstName: "Sylwia",
    lastName: "Wróblewska",
    fullName: "Sylwia Wróblewska",
    role: "Właścicielka biura",
    phone: "+48571309209",
    phoneDisplay: "571 309 209",
    email: "swroblewska@domhunter.pl",
    photo: "/images/team/sylwia-wroblewska.jpg",
    specializations: ["Mieszkania", "Domy", "Działki", "Lokale"],
    bio: "Właścicielka Dom Hunter i twórczyni społeczności Nieruchomości Spod Lady. Prowadzi pełen przekrój nieruchomości w Gdańsku i Trójmieście.",
    bioParagraphs: [
      "Właścicielka Dom Hunter i twórczyni społeczności Nieruchomości Spod Lady. Na trójmiejskim rynku prowadzi pełen przekrój nieruchomości, od mieszkań i lokali po domy i działki.",
      "Pracuje głównie w Gdańsku i okolicy, łączy sprzedaż z wynajmem i pilnuje, żeby każdy klient był prowadzony od pierwszej rozmowy aż po akt notarialny.",
    ],
    isOwner: true,
    order: 1,
  },
  {
    slug: "janusz-stojaczyk",
    firstName: "Janusz",
    lastName: "Stojaczyk",
    fullName: "Janusz Stojaczyk",
    role: "Agent nieruchomości",
    phone: "+48571309204",
    phoneDisplay: "571 309 204",
    email: "jstojaczyk@domhunter.pl",
    photo: "/images/team/janusz-stojaczyk.jpg",
    specializations: ["Mieszkania", "Lokale", "Gdańsk"],
    bio: "Specjalista od mieszkań w Gdańsku, prowadzi najwięcej ofert w całym biurze. Sprzedaż i wynajem.",
    bioParagraphs: [
      "Specjalizuje się w mieszkaniach w Gdańsku i prowadzi najwięcej ofert w całym biurze. Obsługuje zarówno sprzedaż, jak i wynajem, również lokale użytkowe.",
      CONTACT_PARA,
    ],
    order: 2,
  },
  {
    slug: "agnieszka-bodanka",
    firstName: "Agnieszka",
    lastName: "Bodanka",
    fullName: "Agnieszka Bodanka",
    role: "Agentka nieruchomości",
    phone: "+48571309207",
    phoneDisplay: "571 309 207",
    email: "abodanka@domhunter.pl",
    photo: "/images/team/agnieszka-bodanka.jpg",
    specializations: ["Mieszkania", "Lokale", "Domy"],
    bio: "Agentka od spraw trudnych i skomplikowanych transakcji wiązanych. Prowadzi klientów przez cały proces bez stresu, zamieniając wyzwania w konkretne i bezpieczne rozwiązania.",
    bioParagraphs: [
      "Jestem agentką do spraw trudnych i zwyczajnie kocham to, co robię.",
      "Nie ma dla mnie rzeczy niemożliwych, specjalizuję się w skomplikowanych transakcjach wiązanych i pomagam układać puzzle z ludzkich marzeń oraz potrzeb. Przeprowadzam moich klientów przez cały proces bez stresu, zamieniając wyzwania w konkretne i bezpieczne rozwiązania.",
      "Wierzę, że dobra energia przyciąga dobre rzeczy. Kocham ludzi, kocham świat, co sprawia, że do każdej sprawy podchodzę z ogromnym sercem i pełnym zaangażowaniem.",
      "Twoje cele to mój priorytet, stwórzmy Twój bezpieczny plan marzeń.",
    ],
    order: 3,
  },
  {
    slug: "anna-malez",
    firstName: "Anna",
    lastName: "Mależ",
    fullName: "Anna Mależ",
    role: "Agentka nieruchomości",
    phone: "+48571309206",
    phoneDisplay: "571 309 206",
    email: "amalez@domhunter.pl",
    photo: "/images/team/anna-malez.jpg",
    specializations: ["Domy", "Działki", "Mieszkania"],
    bio: "Specjalizuję się w lokalizacjach w bezpośrednim sąsiedztwie aglomeracji gdańskiej: Banino, Żukowo, Kielno. Znam też dobrze rynek Trójmiasta.",
    bioParagraphs: [
      "Jestem pośrednikiem w obrocie nieruchomościami i specjalizuję się przede wszystkim w lokalizacjach położonych w bezpośrednim sąsiedztwie aglomeracji gdańskiej, takich jak Banino, Żukowo, Kielno. Doskonale znam również rynek Trójmiasta, ze szczególnym uwzględnieniem południowych dzielnic Gdańska.",
      "Pracuję zarówno na rynku wtórnym, jak i pierwotnym, choć to właśnie nieruchomości deweloperskie są mi szczególnie bliskie. Uwielbiam towarzyszyć klientom w całym procesie zakupu, od pierwszych rozmów i wyboru mieszkania spośród wielu możliwości, przez odbiór kluczy i urządzanie własnej przestrzeni, aż po moment przeniesienia własności. To wyjątkowe doświadczenie obserwować, jak marzenia o własnym miejscu stopniowo stają się rzeczywistością, a na końcu pojawia się ogromna satysfakcja i radość.",
      "W swojej pracy cenię relacje, zaufanie i indywidualne podejście. Chętnie pomagam również w transakcjach związanych z gruntami, które stanowią jeden z obszarów moich zainteresowań na rynku nieruchomości.",
      "Wierzę, że każda nieruchomość to nie tylko metry kwadratowe, ale przede wszystkim nowy etap w życiu jej właścicieli. Dlatego stawiam na zaangażowanie, uważność i wsparcie na każdym etapie transakcji.",
    ],
    order: 4,
  },
  {
    slug: "sylwia-kojto-labuda",
    firstName: "Sylwia",
    lastName: "Kojto-Labuda",
    fullName: "Sylwia Kojto-Labuda",
    role: "Agentka nieruchomości",
    phone: "+48795069848",
    phoneDisplay: "795 069 848",
    email: "slabuda@domhunter.pl",
    photo: "/images/team/sylwia-kojto-labuda.jpg",
    specializations: ["Mieszkania", "Gdańsk", "Sopot"],
    bio: "Mieszkania w Gdańsku i Sopocie, sprzedaż i wynajem.",
    bioParagraphs: [
      "Zajmuje się mieszkaniami w Gdańsku i Sopocie, w sprzedaży i wynajmie.",
      CONTACT_PARA,
    ],
    order: 5,
  },
  {
    slug: "taisiia-shulga",
    firstName: "Taisiia",
    lastName: "Shulga",
    fullName: "Taisiia Shulga",
    role: "Agentka nieruchomości",
    phone: "+48533530130",
    phoneDisplay: "533 530 130",
    email: "tshulga@domhunter.pl",
    photo: "/images/team/taisiia-shulga-3.jpg",
    specializations: ["Mieszkania", "Trójmiasto"],
    bio: "Agentka nieruchomości w biurze Dom Hunter. Pomaga klientom w kupnie, sprzedaży i wynajmie nieruchomości w Trójmieście i okolicy.",
    bioParagraphs: [
      "Agentka nieruchomości w biurze Dom Hunter. Pomaga klientom w kupnie, sprzedaży i wynajmie nieruchomości w Trójmieście i okolicy.",
      CONTACT_PARA,
    ],
    order: 6,
  },
  {
    slug: "barbara-weiner",
    firstName: "Barbara",
    lastName: "Weiner",
    fullName: "Barbara Weiner",
    role: "Pośredniczka w obrocie nieruchomościami",
    phone: "+48660509507",
    phoneDisplay: "660 509 507",
    email: "bweiner@domhunter.pl",
    photo: "/images/team/barbara-weiner.jpg",
    specializations: ["Kupno", "Sprzedaż", "Wynajem długoterminowy"],
    bio: "Pośredniczka z licencją państwową (nr 16995). Prowadzi klientów przez kupno, sprzedaż i wynajem długoterminowy na każdym etapie, spokojnie i z dbałością o dokumenty.",
    bioParagraphs: [
      "Z pasją pomagam klientom zrealizować marzenia o idealnej nieruchomości i towarzyszę im na każdym etapie. Wyznaję jedną zasadę: nieruchomości to ludzie, a nie mury. Dlatego stawiam na współpracę, nie rywalizację, i działam transparentnie.",
      "Mam licencję państwową pośrednictwa w obrocie nieruchomościami (nr 16995) oraz duże doświadczenie w kupnie, sprzedaży i wynajmie długoterminowym. Zapewniam rzetelne wsparcie od pierwszej rozmowy aż po finał transakcji.",
      "Klienci i współpracownicy cenią mnie za dobrą organizację i przygotowanie dokumentów oraz za cierpliwość. Na każde pytanie odpowiadam wyczerpująco i rzeczowo, żeby decyzja była spokojna i przemyślana.",
      "Prywatnie lubię poznawać nowe technologie dla zdrowia i lepszego stylu życia, delektować się kulinarnymi smakami i podróżować, zarówno blisko, jak i daleko.",
    ],
    order: 7,
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

export function getMemberByName(fullName: string): TeamMember | undefined {
  const n = fullName.trim().toLowerCase();
  return team.find((m) => m.fullName.toLowerCase() === n);
}
