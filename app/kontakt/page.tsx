import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z DomHunter Nieruchomości. Telefon, e-mail, biuro w Gdańsku.",
};

export default function KontaktPage() {
  return (
    <div className="pt-10 lg:pt-16">
      <Contact />
    </div>
  );
}
