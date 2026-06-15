import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { OfficeBento } from "@/components/sections/office-bento";

export const metadata: Metadata = {
  title: "Kontakt, biuro nieruchomości Dom Hunter w Gdańsku",
  description:
    "Skontaktuj się z biurem nieruchomości Dom Hunter w Gdańsku. Zadzwoń pod 58 533 43 23 albo napisz, a agent odpowie na pytania o kupno, sprzedaż lub wynajem w Trójmieście.",
};

export default function KontaktPage() {
  return (
    <div className="pt-10 lg:pt-16">
      <Contact />
      <OfficeBento />
    </div>
  );
}
