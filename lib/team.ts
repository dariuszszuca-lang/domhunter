/**
 * Zespół Dom Hunter — biuro nieruchomości w Trójmieście.
 *
 * Dane (imię, nazwisko, telefon, e-mail) pochodzą z EstiCRM (kontakty przypisane
 * do ofert, stan 14.06.2026). Kolejność wg liczby prowadzonych ofert.
 * Zespół: 5 aktywnych agentów, każdy ze zdjęciem HD w /images/team/<slug>.jpg.
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
    order: 4,
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
    photo: "/images/team/taisiia-shulga-2.jpg",
    bio: "Agentka nieruchomości w biurze Dom Hunter. Pomaga klientom w kupnie, sprzedaży i wynajmie nieruchomości w Trójmieście i okolicy.",
    bioParagraphs: [
      "Agentka nieruchomości w biurze Dom Hunter. Pomaga klientom w kupnie, sprzedaży i wynajmie nieruchomości w Trójmieście i okolicy.",
      "Skontaktuj się bezpośrednio, telefon i e-mail znajdziesz powyżej. Oddzwaniamy w 30 minut w godzinach pracy biura.",
    ],
    order: 5,
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
