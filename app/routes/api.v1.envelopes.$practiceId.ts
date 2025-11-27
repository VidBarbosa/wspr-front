import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { listEnvelopes } from "../services/envelopes.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { practiceId } = params;
  if (!practiceId) return json({ error: "practiceId requerido" }, { status: 400 });

  const envelopes = listEnvelopes(practiceId).map((e) => ({
    ...e,
    payloadB64: Buffer.from(new Uint8Array(e.payload)).toString("base64"),
    payload: undefined,
  }));

  return json({ practiceId, envelopes }, { headers: { "Cache-Control": "no-store" } });
}
