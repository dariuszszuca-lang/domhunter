import type { Metadata } from "next";
import { Suspense } from "react";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { siteConfig } from "@/lib/site";

// Fonty Dom Hunter: Spectral = nagłówki (elegancki serif editorial),
// Manrope = tekst (nowoczesny, czytelny grotesk).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}, biuro nieruchomości w Gdańsku i Trójmieście`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "biuro nieruchomości Gdańsk",
    "nieruchomości Gdańsk",
    "biuro nieruchomości Trójmiasto",
    "sprzedaż mieszkań Gdańsk",
    "kupno mieszkania Gdańsk",
    "wynajem mieszkań Gdańsk",
    "wycena nieruchomości Gdańsk",
    "agent nieruchomości Trójmiasto",
    "nieruchomości komercyjne Trójmiasto",
    "DomHunter",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    title: `${siteConfig.name}, biuro nieruchomości w Gdańsku i Trójmieście`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Dane strukturalne (JSON-LD) dla wyszukiwarek i czatów AI.
const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Dom Hunter Biuro Nieruchomości",
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  telephone: "+48585334323",
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Jana Pawła II 6e/5",
    postalCode: "80-462",
    addressLocality: "Gdańsk",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  areaServed: [
    { "@type": "City", name: "Gdańsk" },
    { "@type": "City", name: "Gdynia" },
    { "@type": "City", name: "Sopot" },
    { "@type": "Place", name: "Trójmiasto" },
  ],
  taxID: "9571073617",
  vatID: "PL9571073617",
} as const;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
        />
        <Suspense fallback={<div aria-hidden className="h-16 lg:h-20" />}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
