import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";

import { ensureDemoKey } from "../utils/crypto.client";
import { getTenantConfig, getTenantIdFromRequest } from "../services/tenant-config.server";
import Footer from "~/components/Footer";

// ----- Types -----
type Row = {
  id: string;
  createdAt: string;
  patientName: string;
  email: string;
  phone: string;
  dob: string;
  reason: string;
};

// ----- Loader (SSR) -----
export async function loader({ request }: LoaderFunctionArgs) {
  const cfg = getTenantConfig(request);
  const tenantId = getTenantIdFromRequest(request);
  return json({ cfg, tenantId, pollMs: 5000 });
}

// ----- Component -----
export default function Desktop() {
  const { cfg, tenantId, pollMs } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{ tenantId: string; envelopes: any[] }>();

  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKeys, setHasKeys] = useState(false);
  const [snippet, setSnippet] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        await ensureDemoKey();
        setHasKeys(true);

        const jwk = sessionStorage.getItem("demo_secret_key_jwk");
        const safe = jwk ? JSON.stringify(jwk) : '""';
        const cmd = `Public Key *Seeker*:' ${safe}`;
        setSnippet(cmd);
      } catch (e) {
        console.error("ensureDemoKey failed", e);
        setHasKeys(false);
        setSnippet("");
      }
    })();
  }, []);

  // 2) Polling to read encrypted envelopes list (tenant-aware SSR API)
  useEffect(() => {
    let timer: number;
    const poll = async () => {
      try {
        setError(null);
        fetcher.load(`/api/v1/envelopes/${tenantId}`);
      } catch (e: any) {
        setError(e?.message ?? "Polling error");
      } finally {
        timer = window.setTimeout(poll, pollMs ?? 5000);
      }
    };
    poll();
    return () => clearTimeout(timer);
  }, [tenantId, pollMs]);

  // 3) Map data into UI rows when fetcher updates
  useEffect(() => {
    if (fetcher.data?.envelopes) {
      const mapped: Row[] = fetcher.data.envelopes.map((e: any) => ({
        id: e.id,
        createdAt: e.createdAt,
        patientName: e.meta?.patientName ?? "(no name)",
        email: e.meta?.email ?? "",
        phone: e.meta?.phone ?? "",
        dob: e.meta?.dob ?? "",
        reason: e.meta?.reason ?? "",
      }));
      setRows(mapped);
    }
  }, [fetcher.data]);

  // 4) Copy-to-clipboard with fallback
  const copySnippet = useCallback(async () => {
    if (!snippet) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippet);
      } else {
        // Fallback: temporary textarea
        const ta = document.createElement("textarea");
        ta.value = snippet;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      alert("Snippet copied to clipboard!");
    } catch (err) {
      console.error("Clipboard copy failed", err);
      alert("Could not copy to clipboard. Please copy manually.");
    }
  }, [snippet]);

  const state =
    fetcher.state !== "idle" && rows.length === 0
      ? "loading"
      : error
        ? "error"
        : rows.length > 0
          ? "data"
          : "empty";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="text-white" style={{ background: cfg.themeColor }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link to="/" className="text-sm text-white underline">
              <h1 className="text-xl font-semibold">{cfg.brandName} — Desktop</h1>
            </Link>
            <p className="text-xs opacity-80">
              Tenant: <code>{tenantId}</code> • Practice: <code>{cfg.practiceId}</code>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-2 py-1 rounded ${
                state === "loading"
                  ? "bg-yellow-500/20 text-yellow-100"
                  : state === "error"
                    ? "bg-red-500/20 text-red-100"
                    : "bg-emerald-500/20 text-emerald-100"
              }`}
            >
              {state === "loading" ? "Loading…" : state === "error" ? "Error" : "Active"}
            </span>
            <span className="text-sm">
              {rows.length} patient{rows.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* 🔑 Provider Key Banner (POC) */}
        {hasKeys && (
          <div className="max-w-6xl mx-auto px-4 pb-4">
            <div className="rounded border border-blue-900 bg-blue-900/60 p-3 text-xs font-mono">
              <div className="mb-2 font-semibold">🔑 Provider Key Snippet:</div>
              <pre className="overflow-auto whitespace-pre-wrap">{snippet}</pre>
              <div className="mt-2">
                <button
                  onClick={copySnippet}
                  className="rounded border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/20"
                >
                  Copy snippet
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto p-4">
        {state === "error" && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            ✕ Connection error. Check the console.
          </div>
        )}

        {state === "loading" && (
          <div className="rounded-xl border p-6 bg-white shadow-sm">Loading patients…</div>
        )}

        {state === "empty" && (
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold">📋 Patient Intake Dashboard</h2>
            <p className="text-sm text-slate-600">
              No intakes yet. Ask a patient to submit the form at{" "}
              <a className="underline" href="/seeker">
                /seeker
              </a>
              .
            </p>
          </div>
        )}

        {state === "data" && (
          <>
            <h2 className="mb-3 text-xl font-semibold">📋 Patient Intakes ({rows.length})</h2>
            <div className="grid gap-3">
              {rows.map((r) => (
                <button
                  key={r.id}
                  className="rounded-2xl border bg-white/80 p-4 text-left shadow-sm hover:bg-slate-50"
                  onClick={() => setSelected(r)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{r.patientName}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    {r.reason?.slice(0, 120) || "(no reason)"}
                    {r.reason?.length > 120 ? "…" : ""}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-4"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Patient Details</h3>
              <button
                className="rounded border px-2"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div>
                <b>Name:</b> {selected.patientName}
              </div>
              <div>
                <b>Email:</b> {selected.email}
              </div>
              <div>
                <b>Phone:</b> {selected.phone}
              </div>
              <div>
                <b>DOB:</b> {selected.dob}
              </div>
              <div>
                <b>Reason:</b> {selected.reason}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                <b>ID:</b> {selected.id}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
