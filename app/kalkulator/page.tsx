import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator kredytowy",
  description: "Oblicz ratę kredytu hipotecznego i sprawdź zdolność kredytową.",
};

// Nazwa klienta nadana przez SpeedFin. "default" tylko do podglądu, przed produkcją nazwa dla domhunter.pl.
const KLIENT = "default";

// embed.js wymaga zwykłego <script> (document.currentScript), dlatego każdy widget ma własną ramkę.
function widget(adres: string, tryb?: string) {
  const dodatki = tryb ? ` data-mode="${tryb}"` : "";
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0"><script src="https://${adres}.kalkulator-hipoteczny.online/embed.js" data-client="${KLIENT}"${dodatki}></script></body>`;
}

export default function KalkulatorPage() {
  return (
    <div className="bg-surface-cream pt-10 lg:pt-16 pb-16">
      <div className="mx-auto max-w-6xl px-4 space-y-12">
        <section>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-6">Kalkulator kredytu hipotecznego</h1>
          <iframe
            title="Kalkulator kredytu hipotecznego"
            srcDoc={widget("hipoteka", "full")}
            className="w-full bg-white rounded-lg border-0"
            style={{ height: 1100 }}
          />
        </section>
        <section>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6">Zdolność kredytowa</h2>
          <iframe
            title="Zdolność kredytowa"
            srcDoc={widget("zdolnosc")}
            className="w-full bg-white rounded-lg border-0"
            style={{ height: 1100 }}
          />
        </section>
      </div>
    </div>
  );
}
