import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { putEnvelope } from "../services/envelopes.server";
import { randomUUID } from "node:crypto";
import { getTenantConfig, getTenantIdFromRequest } from "../services/tenant-config.server";

export async function action({ request }: ActionFunctionArgs) {
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.startsWith("application/json")) {
    return json({ error: "Content-Type must be application/json" }, { status: 400 });
  }
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: "Invalid JSON" }, { status: 400 });

  const tenantId = getTenantIdFromRequest(request);
  const cfg = getTenantConfig(request);
  const practiceId = body.practiceId || cfg.practiceId;
  const cipherB64 = body.cipherB64;
  const meta = body.meta;
  if (!cipherB64 || !meta) {
    return json({ error: "Required fields: cipherB64, meta" }, { status: 400 });
  }

  const payload = Uint8Array.from(Buffer.from(cipherB64, "base64")).buffer;
  const env = {
    id: randomUUID(),
    tenantId,
    practiceId,
    createdAt: new Date().toISOString(),
    payload,
    meta,
  };
  putEnvelope(env);
  return json({ ok: true, envelopeId: env.id }, { headers: { "Cache-Control": "no-store" } });
}
