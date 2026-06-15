import type { Metadata } from "next";
import { OnasContent } from "@/components/sections/why-us";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Poznaj Dom Hunter, lokalne biuro nieruchomości w Gdańsku i Trójmieście. Pośrednicy z setkami transakcji, sieć Nieruchomości Spod Lady, doświadczenie i pasja.",
};

export default function ONasPage() {
  return <OnasContent />;
}
