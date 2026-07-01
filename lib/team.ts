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
    bio: "Domy i działki pod Gdańskiem oraz mieszkania w mieście. Dobrze czuje się poza centrum.",
    bioParagraphs: [
      "Najlepiej czuje się w domach i działkach pod Gdańskiem, w miejscowościach takich jak Warzenko, Miszewo czy Kczewo, ale prowadzi też mieszkania w samym mieście.",
      "Łączy sprzedaż z wynajmem. Jeśli szukasz nieruchomości poza centrum, to dobry adres.",
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
