import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Formularz "Zapisz się" (imię + e-mail) osadzony na nieruchomoscispodlady.pl/strona-internetowa.
// Lead sprzedażowy idzie do Sylwii; endpoint żyje tu, bo DomHunter ma działającą wysyłkę maili.
const ALLOWED_ORIGINS = new Set([
  "https://nieruchomoscispodlady.pl",
  "https://www.nieruchomoscispodlady.pl",
]);

const leadSchema = z.object({
  imie: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  telefon: z.string().trim().min(6).max(40).optional().or(z.literal("")),
  biuro: z.string().trim().max(200).optional().or(z.literal("")),
  crm: z.string().trim().max(80).optional().or(z.literal("")),
  wiadomosc: z.string().trim().max(2000).optional().or(z.literal("")),
  zgoda: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")),
});

type LeadPayload = z.infer<typeof leadSchema>;

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://nieruchomoscispodlady.pl";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: Request) {
  const headers = corsHeaders(req.headers.get("origin"));
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400, headers });
  }

  const honeypot = (body as Record<string, unknown> | null)?.website;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true, skipped: true }, { headers });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400, headers });
  }

  try {
    await sendLead(parsed.data);
    return NextResponse.json({ ok: true }, { headers });
  } catch (err) {
    console.error("Twoja strona lead email failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 503, headers });
  }
}

async function sendLead(payload: LeadPayload) {
  const to = process.env.TWOJA_STRONA_TO_EMAIL || "sylwia@nieruchomoscispodlady.pl";
  const subject = `Nowy zapis (strona internetowa): ${payload.imie}`;
  const text = buildText(payload);
  const html = buildHtml(payload);

  if (process.env.RESEND_API_KEY) {
    await sendViaResend({ to, subject, html, text });
    return;
  }

  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const { sendEmail } = await import("@/lib/email/send");
    await sendEmail({ to, subject, html, text });
    return;
  }

  throw new Error("email_not_configured");
}

async function sendViaResend({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const from = process.env.CONTACT_FROM_EMAIL || `DomHunter <${siteConfig.contact.email}>`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html, text }),
  });

  if (!response.ok) {
    throw new Error(`resend_failed_${response.status}`);
  }
}

function wiersz(label: string, value?: string) {
  return value && value.trim() ? `${label}: ${value.trim()}` : "";
}

function buildText(p: LeadPayload) {
  return [
    "Nowy zapis ze strony (nieruchomoscispodlady.pl/strona-internetowa)",
    "",
    wiersz("Imię i nazwisko", p.imie),
    wiersz("Telefon", p.telefon),
    wiersz("E-mail", p.email),
    wiersz("Biuro / obecna strona", p.biuro),
    wiersz("CRM", p.crm),
    wiersz("Wiadomość", p.wiadomosc),
    "",
    "Zgoda na kontakt: TAK",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function buildHtml(p: LeadPayload) {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const row = (label: string, value?: string) =>
    value && value.trim()
      ? `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#111;"><strong>${esc(value.trim())}</strong></td></tr>`
      : "";
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222;">
  <h2 style="margin:0 0 14px 0;">Nowy zapis ze strony</h2>
  <p style="margin:0 0 14px 0;color:#666;">Formularz „Zapisz się" na nieruchomoscispodlady.pl/strona-internetowa</p>
  <table style="border-collapse:collapse;">
    ${row("Imię i nazwisko", p.imie)}
    ${row("Telefon", p.telefon)}
    ${row("E-mail", p.email)}
    ${row("Biuro / obecna strona", p.biuro)}
    ${row("CRM", p.crm)}
    ${row("Wiadomość", p.wiadomosc)}
  </table>
  <p style="margin:14px 0 0 0;color:#666;">Zgoda na kontakt: TAK</p>
</div>`;
}
