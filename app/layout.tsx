import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site";

// Fonty Dom Hunter (kierunek Editorial): Fraunces = nagłówki (serif z charakterem),
// Hanken Grotesk = tekst (czysty, czytelny grotesk).
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Lokalne biuro nieruchomości w Gdańsku`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "nieruchomości Gdańsk",
    "biuro nieruchomości Trójmiasto",
    "sprzedaż mieszkań Gdańsk",
    "wynajem Gdańsk",
    "komercja Trójmiasto",
    "DomHunter",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    title: siteConfig.name,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${hanken.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
