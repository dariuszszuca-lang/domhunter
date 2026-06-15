/**
 * Centralne dane firmy DomHunter.
 * Każda zmiana (telefon, adres, social). TYLKO tutaj.
 */

export const siteConfig = {
  name: "DomHunter",
  shortName: "DomHunter",
  fullName: "DomHunter Nieruchomości",
  tagline: "Lokalne biuro nieruchomości w Gdańsku",
  description:
    "Dom Hunter to biuro nieruchomości w Gdańsku i całym Trójmieście. Pomagamy sprzedać, kupić i wynająć mieszkania, domy, działki i lokale w Gdańsku, Gdyni, Sopocie i okolicy. Robimy też darmową wycenę nieruchomości. Jeden agent prowadzi Cię od pierwszej rozmowy do aktu notarialnego.",
  url: "https://domhunter.pl",
  ogImage: "/og.jpg",

  /** Adres biura */
  address: {
    street: "",
    postalCode: "",
    city: "Gdańsk",
    country: "Polska",
    full: "Gdańsk",
  },

  /** Kontakt */
  contact: {
    phones: [
      { label: "Biuro", value: "+48 58 533 43 23", displayValue: "58 533 43 23", href: "tel:+48585334323" },
    ],
    email: "kontakt@domhunter.pl",
  },

  /** Profile zewnętrzne */
  social: {
    facebook: "",
    instagram: "",
  },

  /** Geo (centrum Gdańska, do dopracowania po adresie biura) */
  geo: {
    latitude: 54.3520,
    longitude: 18.6466,
  },

  /** Rok założenia */
  foundedYear: 2020,

  /** Liczby na hero. Placeholdery do potwierdzenia */
  metrics: {
    yearsActive: 13,
    transactions: "600+",
    rating: "5.0",
    teamSize: 11,
  },

  /** Powiązania z ekosystemem Sylwii */
  partners: {
    nsl: {
      name: "Nieruchomości Spod Lady",
      url: "https://nieruchomoscispodlady.pl",
      description: "Sieć off-market 2000+ agentów w Polsce",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
