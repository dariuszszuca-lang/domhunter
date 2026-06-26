import type { Metadata } from "next";
import { WycenaCta } from "@/components/sections/wycena-cta";

export const metadata: Metadata = {
  title: "Zgłoś nieruchomość",
  description: "Zgłoś nieruchomość do sprzedaży w Trójmieście. Bezpłatna wycena, przygotowanie oferty i prowadzenie sprzedaży od pierwszego kontaktu po akt notarialny.",
};

export default function WycenaPage() {
  return (
    <div className="bg-surface-cream pt-10 lg:pt-16">
      <WycenaCta />
    </div>
  );
}
