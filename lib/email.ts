import { Resend } from 'resend';

/**
 * Server-only. The key must never use the NEXT_PUBLIC_ prefix, which ships
 * values to the browser. The old name is read as a fallback until the
 * Vercel environment variable is renamed to RESEND_API_KEY.
 */
let client: Resend | null = null;
export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY ?? process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  client ??= new Resend(key);
  return client;
}

/** Escape user input before it is placed inside email HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Only allow http(s) links from forms, so a javascript: URL can't reach the inbox. */
export function safeUrl(value: unknown): string | null {
  try {
    const url = new URL(String(value));
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (value: unknown) => typeof value === 'string' && EMAIL_PATTERN.test(value);

/** Brand frame shared by every outgoing email. */
export function emailFrame(title: string, body: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #15191D;">
      <div style="border-top: 4px solid #D22B1F; padding-top: 20px;">
        <h2 style="margin: 0 0 20px; font-size: 20px;">${title}</h2>
        ${body}
      </div>
      <p style="color: #5A6670; font-size: 12px; margin-top: 28px; border-top: 1px solid #DCE5EB; padding-top: 16px;">
        Zephyra Dynamics · Shaping the future of Urban Air Mobility in India
      </p>
    </div>`;
}

export const row = (label: string, value: string) =>
  `<p style="margin: 8px 0;"><strong>${label}:</strong> ${value}</p>`;
