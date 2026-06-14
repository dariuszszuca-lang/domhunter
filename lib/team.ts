/**
 * Zespół Dom Hunter — biuro nieruchomości w Trójmieście.
 *
 * Dane (imię, nazwisko, telefon, e-mail) pochodzą z EstiCRM (kontakty przypisane
 * do ofert, stan 14.06.2026). Kolejność wg liczby prowadzonych ofert.
 * TODO: zdjęcia agentów + indywidualne bio (Esti nie udostępnia zdjęć przez API).
 *   Po dostarczeniu zdjęć uzupełnij pole `photo` (np. /images/team/<slug>.jpg).
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

const BIO = "Agent nieruchomości w biurze Dom Hunter. Wspiera klientów w kupnie, sprzedaży i wynajmie nieruchomości w Trójmieście i okolicy.";
const BIO_PARAS = [
  "Agent nieruchomości w biurze Dom Hunter. Wspiera klientów w kupnie, sprzedaży i wynajmie nieruchomości w Trójmieście i okolicy.",
  "Skontaktuj się bezpośrednio, telefon i e-mail znajdziesz powyżej. Oddzwaniamy w 30 minut w godzinach pracy biura.",
];

export const team: TeamMember[] = [
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
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 2,
  },
  {
    slug: "sylwia-wroblewska",
    firstName: "Sylwia",
    lastName: "Wróblewska",
    fullName: "Sylwia Wróblewska",
    role: "Agent nieruchomości",
    phone: "+48571309209",
    phoneDisplay: "571 309 209",
    email: "swroblewska@domhunter.pl",
    photo: "/images/team/sylwia-wroblewska.jpg",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    isOwner: true,
    order: 1,
  },
  {
    slug: "agnieszka-bodanka",
    firstName: "Agnieszka",
    lastName: "Bodanka",
    fullName: "Agnieszka Bodanka",
    role: "Agent nieruchomości",
    phone: "+48571309207",
    phoneDisplay: "571 309 207",
    email: "abodanka@domhunter.pl",
    photo: "/images/team/agnieszka-bodanka.jpg",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 3,
  },
  {
    slug: "piotr-mieczan",
    firstName: "Piotr",
    lastName: "Mieczan",
    fullName: "Piotr Mieczan",
    role: "Agent nieruchomości",
    phone: "+48783001363",
    phoneDisplay: "783 001 363",
    email: "pmieczan@domhunter.pl",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 4,
  },
  {
    slug: "anna-malez",
    firstName: "Anna",
    lastName: "Mależ",
    fullName: "Anna Mależ",
    role: "Agent nieruchomości",
    phone: "+48571309206",
    phoneDisplay: "571 309 206",
    email: "amalez@domhunter.pl",
    photo: "/images/team/anna-malez.jpg",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 5,
  },
  {
    slug: "sylwia-kojto-labuda",
    firstName: "Sylwia",
    lastName: "Kojto-Labuda",
    fullName: "Sylwia Kojto-Labuda",
    role: "Agent nieruchomości",
    phone: "+48795069848",
    phoneDisplay: "795 069 848",
    email: "slabuda@domhunter.pl",
    photo: "/images/team/sylwia-kojto-labuda.jpg",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 6,
  },
  {
    slug: "mateusz-licznerski",
    firstName: "Mateusz",
    lastName: "Licznerski",
    fullName: "Mateusz Licznerski",
    role: "Agent nieruchomości",
    phone: "+48571309200",
    phoneDisplay: "571 309 200",
    email: "mlicznerski@domhunter.pl",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 7,
  },
  {
    slug: "lukasz-ecimowicz",
    firstName: "Łukasz",
    lastName: "Ecimowicz",
    fullName: "Łukasz Ecimowicz",
    role: "Agent nieruchomości",
    phone: "+48571309200",
    phoneDisplay: "571 309 200",
    email: "lecimowicz@domhunter.pl",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 8,
  },
  {
    slug: "mateusz-wasilewski",
    firstName: "Mateusz",
    lastName: "Wasilewski",
    fullName: "Mateusz Wasilewski",
    role: "Agent nieruchomości",
    phone: "+48571309208",
    phoneDisplay: "571 309 208",
    email: "mwasilewski@domhunter.pl",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 9,
  },
  {
    slug: "lucja-laskowska",
    firstName: "Łucja",
    lastName: "Laskowska",
    fullName: "Łucja Laskowska",
    role: "Agent nieruchomości",
    phone: "+48571309207",
    phoneDisplay: "571 309 207",
    email: "llaskowska@domhunter.pl",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 10,
  },
  {
    slug: "karolina-ciesielska",
    firstName: "Karolina",
    lastName: "Ciesielska",
    fullName: "Karolina Ciesielska",
    role: "Agent nieruchomości",
    phone: "+48571309206",
    phoneDisplay: "571 309 206",
    email: "kciesielska@domhunter.pl",
    bio: BIO,
    bioParagraphs: BIO_PARAS,
    order: 11,
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
