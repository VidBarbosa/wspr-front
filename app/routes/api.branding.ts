import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getBranding, setBranding, normalizeBranding } from "../services/branding.server";

// GET: return current branding as JSON
export async function loader({ request }: LoaderFunctionArgs) {
  const branding = await getBranding(request);
  return json(branding, { headers: { "Cache-Control": "no-store" } });
}

// POST: save branding from JSON body
export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: "Invalid JSON" }, { status: 400 });
  const branding = normalizeBranding(body);
  const setCookie = await setBranding(request, branding);
  return json({ ok: true }, { headers: { "Set-Cookie": setCookie } });
}
