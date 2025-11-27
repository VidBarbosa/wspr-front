import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { listEnvelopes } from "../services/envelopes.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { tenantId } = params;
  if (!tenantId) return json({ error: "tenantId required" }, { status: 400 });

  const envelopes = listEnvelopes(tenantId).map((e) => ({
    ...e,
    payloadB64: Buffer.from(new Uint8Array(e.payload)).toString("base64"),
    payload: undefined,
  }));

  return json({ tenantId, envelopes }, { headers: { "Cache-Control": "no-store" } });
}
