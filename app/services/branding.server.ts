import type { Branding } from "../types/branding";
import { defaultBranding } from "../config/default-branding";
import { brandingCookie } from "../session.server";

// ---- DB-READY INTERFACE (can be swapped for a real DB) ----
// Today: JSON stored in a cookie. Tomorrow: replace with real DB queries.
export async function getBranding(request: Request): Promise<Branding> {
  const cookieHeader = request.headers.get("Cookie");
  const saved = (await brandingCookie.parse(cookieHeader)) as Branding | undefined;
  return saved ?? defaultBranding;
}

export async function setBranding(
  request: Request,
  branding: Branding
): Promise<string> {
  // Devuelve el header Set-Cookie listo para adjuntar en la Response
  return await brandingCookie.serialize(branding);
}

export async function clearBranding(): Promise<string> {
  return await brandingCookie.serialize("", { maxAge: 0 });
}

// Simple validation (extend with zod/yup if you want)
export function normalizeBranding(input: any): Branding {
  const b = { ...defaultBranding, ...(input || {}) } as Branding;
  // Normalize hex color casing to lowercase and keep brandRGB as-is
  b.themeColor = (b.themeColor || defaultBranding.themeColor).toLowerCase();
  b.backgroundColor = (b.backgroundColor || defaultBranding.backgroundColor).toLowerCase();
  return b;
}
