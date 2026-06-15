import type { Metadata } from "next";
import { OfficeBento } from "@/components/sections/office-bento";

export const metadata: Metadata = {
  title: "Kontakt, biuro nieruchomości Dom Hunter w Gdańsku",
  description:
    "Skontaktuj się z Dom Hunter. Biuro przy ul. Jana Pawła II 6e w Gdańsku. Zadzwoń do Sylwii Wróblewskiej pod 571 309 209 albo napisz, pomożemy przy kupnie, sprzedaży i wynajmie w Trójmieście.",
};

export default function KontaktPage() {
  return (
    <div className="pt-10 lg:pt-16">
      <OfficeBento />
    </div>
  );
}
