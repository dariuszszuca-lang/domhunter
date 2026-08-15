import type { Metadata } from "next";
import { OnasContent } from "@/components/sections/why-us";

export const metadata: Metadata = {
  title: "Nasz zespół",
  description:
    "Poznaj zespół Dom Hunter, agentów nieruchomości z Trójmiasta. Setki transakcji, lokalna wiedza o Trójmieście oraz dostęp do ofert z sieci Nieruchomości Spod Lady. Jeden agent prowadzi Cię od pierwszej rozmowy do aktu notarialnego.",
};

export default function ONasPage() {
  return <OnasContent />;
}
