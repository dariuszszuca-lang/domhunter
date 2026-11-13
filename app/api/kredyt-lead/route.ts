import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Zapytanie z kalkulatora kredytowego na /kredyty (widget SpeedFin, tryb toHostFunction).
// Dane klienta trafiają mailem do biura Dom Hunter, nie do SpeedFin.
const schema = z.object({
  imie: z.string().trim().min(2).max(120),
  telefon: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  wiadomosc: z.string().trim().max(2000).optional().or(z.literal("")),
  zgoda: z.literal(true),
  strona: z.string().max(500).optional(), // honeypot, ludzie go nie widzą
  kalkulacja: z
    .object({
      bank: z.string().max(200).optional().nullable(),
      kwotaKredytu: z.coerce.number().nonnegative().max(100_000_000).optional().nullable(),
      wartoscNieruchomosci: z.coerce.number().nonnegative().max(100_000_000).optional().nullable(),
      okresLat: z.coerce.number().nonnegative().max(60).optional().nullable(),
      wiek: z.coerce.number().nonnegative().max(120).optional().nullable(),
    })
    .optional(),
});

type Payload = z.infer<typeof schema>;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  // Bot wypełnił ukryte pole: udajemy sukces, nic nie wysyłamy.
  if (parsed.data.strona) return NextResponse.json({ ok: true });

  try {
    await sendLead(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kredyt lead email failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 503 });
  }
}

const zl = (n?: number | null) =>
  typeof n === "number" ? `${new Intl.NumberFormat("pl-PL").format(Math.round(n))} zł` : "brak";

function rows(p: Payload): [string, string][] {
  const k = p.kalkulacja ?? {};
  return [
    ["Imię i nazwisko", p.imie],
    ["Telefon", p.telefon],
    ["E-mail", p.email || "brak"],
    ["Wiadomość", p.wiadomosc || "brak"],
    ["Wybrany bank", k.bank || "brak"],
    ["Kwota kredytu", zl(k.kwotaKredytu)],
    ["Wartość nieruchomości", zl(k.wartoscNieruchomosci)],
    ["Okres", typeof k.okresLat === "number" ? `${k.okresLat} lat` : "brak"],
    ["Wiek klienta", typeof k.wiek === "number" ? String(k.wiek) : "brak"],
  ];
}

async function sendLead(p: Payload) {
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const subject = "Nowe zapytanie o kredyt z domhunter.pl/kredyty";
  const r = rows(p);
  const text = [subject, "", ...r.map(([a, b]) => `${a}: ${b}`), "", "Zrodlo: https://domhunter.pl/kredyty"].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#161616;line-height:1.5">
<h1 style="font-size:20px;margin:0 0 16px">${esc(subject)}</h1>
<table style="border-collapse:collapse;width:100%;max-width:560px"><tbody>
${r.map(([a, b]) => `<tr><td style="padding:8px 12px;border:1px solid #e5e0da;font-weight:700">${esc(a)}</td><td style="padding:8px 12px;border:1px solid #e5e0da">${esc(b)}</td></tr>`).join("")}
</tbody></table>
<p style="margin-top:16px;color:#666">Zrodlo: https://domhunter.pl/kredyty (kalkulator SpeedFin)</p></div>`;

  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const { sendEmail } = await import("@/lib/email/send");
    await sendEmail({ to, subject, html, text, replyTo: p.email || undefined });
    return;
  }
  throw new Error("email_not_configured");
}

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
