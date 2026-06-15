import type { Metadata } from "next";
import { WycenaCta } from "@/components/sections/wycena-cta";

export const metadata: Metadata = {
  title: "Darmowa wycena",
  description: "Bezpłatna wycena nieruchomości w Trójmieście. Wycena oparta na faktach, odpowiedź w 24 godziny.",
};

export default function WycenaPage() {
  return (
    <div className="bg-surface-cream pt-10 lg:pt-16">
      <WycenaCta />
    </div>
  );
}
