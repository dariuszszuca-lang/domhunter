import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { OfficeBento } from "@/components/sections/office-bento";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z Dom Hunter Nieruchomości. Biuro przy ul. Grunwaldzkiej 82 w Gdańsku Wrzeszczu, telefon, e-mail, godziny otwarcia i mapa dojazdu.",
};

export default function KontaktPage() {
  return (
    <div className="pt-10 lg:pt-16">
      <Contact />
      <OfficeBento />
    </div>
  );
}
