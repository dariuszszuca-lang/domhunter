import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Wyłączona optymalizacja Vercela (limit darmowy = HTTP 402 na /_next/image).
    // Obrazy serwowane wprost: logo/hero/zespół z /public, oferty z static.esticrm.pl.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.domhunter.pl" },
      { protocol: "https", hostname: "static.esticrm.pl" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
