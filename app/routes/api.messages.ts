import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

// POC: Only logs the message; in real app, would forward to messaging service
export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json().catch(() => null);
  if (!body?.envelopeId || !body?.ciphertext) {
    return json({ error: "envelopeId y ciphertext requeridos" }, { status: 400 });
  }
  console.log("📩 Mensaje a envelope:", body.envelopeId, "ciphertext len:", String(body.ciphertext).length);
  return json({ id: crypto.randomUUID(), sentAt: new Date().toISOString() });
}
