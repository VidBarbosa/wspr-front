import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { encryptJson } from "../utils/crypto.client";
import { getTenantConfig } from "../services/tenant-config.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cfg = getTenantConfig(request);
  return json({ cfg });
}

export default function Seeker() {
  const { cfg } = useLoaderData<typeof loader>();
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setOkMsg(null);
    const fd = new FormData(e.currentTarget);
    const meta = {
      patientName: String(fd.get("fullName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      dob: String(fd.get("dob") || ""),
      reason: String(fd.get("reason") || ""),
    };

    const { ivB64, cipherB64 } = await encryptJson(meta);
    const res = await fetch("/api/v1/envelopes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cipherB64: ivB64 + "." + cipherB64, meta })
    });
    const data = await res.json();
    if (res.ok) {
      setOkMsg(`Submitted successfully. Envelope ID: ${data.envelopeId}`);
      (e.currentTarget as HTMLFormElement).reset();
    } else {
      setOkMsg("Failed to submit");
      console.error(data);
    }
    setBusy(false);
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-bold" style={{ color: cfg.themeColor }}>{cfg.brandName} — Seeker</h1>
      {okMsg && <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-emerald-800">{okMsg}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="border rounded-md px-3 py-2 w-full" name="fullName" placeholder="Full Name" required />
        <input className="border rounded-md px-3 py-2 w-full" name="email" type="email" placeholder="Email" required />
        <input className="border rounded-md px-3 py-2 w-full" name="phone" placeholder="Phone" />
        <input className="border rounded-md px-3 py-2 w-full" name="dob" type="date" placeholder="Date of Birth" />
        <textarea className="border rounded-md px-3 py-2 w-full" name="reason" placeholder="Reason for visit" rows={5} />
        <button disabled={busy} className="border rounded-md px-4 py-2 bg-black text-white">{busy ? "Submitting…" : "Send Form"}</button>
      </form>
    </main>
  );
}
