// app/routes/onboarding.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import {
  getTenantConfig,
  getTenantIdFromRequest,
  persistTenantBrandingOverride,
} from "../services/tenant-config.server";
import { getSessionUser } from "../services/auth.server";

type LoaderData = {
  cfg: ReturnType<typeof getTenantConfig> extends infer T ? T : never;
  tenantId: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const sessionUser = await getSessionUser(request);

  // Protect onboarding: only the admin user can access this route.
  if (!sessionUser || sessionUser.role !== "admin") {
    const redirectTo = url.pathname + url.search;
    return redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  const cfg = getTenantConfig(request);
  const tenantId = getTenantIdFromRequest(request);
  return json<LoaderData>({ cfg, tenantId });
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const sessionUser = await getSessionUser(request);

  // Protect onboarding writes as well.
  if (!sessionUser || sessionUser.role !== "admin") {
    const redirectTo = url.pathname + url.search;
    return redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  const tenantId = getTenantIdFromRequest(request);
  const form = await request.formData();

  const brandName = String(form.get("brandName") || "").trim();
  const themeColor = String(form.get("themeColor") || "").trim();
  const backgroundColor = String(form.get("backgroundColor") || "").trim();
  const practiceId = String(form.get("practiceId") || "").trim();
  const logoPath = String(form.get("logoPath") || "").trim();

  await persistTenantBrandingOverride(tenantId, {
    ...(brandName && { brandName }),
    ...(themeColor && { themeColor }),
    ...(backgroundColor && { backgroundColor }),
    ...(practiceId && { practiceId }),
    ...(logoPath && { logoPath }),
  });

  return redirect(`/desktop?tenant=${tenantId}`);
}

export default function OnboardingRoute() {
  const { cfg, tenantId } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          🎨 Onboarding Wizard{" "}
          <span className="text-sm font-normal text-slate-500">(tenant: {tenantId})</span>
        </h1>
        <p className="text-slate-600">
          This admin‑only screen lets you register and configure white‑label brands
          (tenants) for this provider app.
        </p>
        <p className="text-xs text-slate-500">
          To create a <strong>new tenant</strong>, simply open this page with{" "}
          <code>?tenant=&lt;tenant-id&gt;</code> in the URL (for example{" "}
          <code>/onboarding?tenant=acme</code>). The record will be created in{" "}
          <code>app/config/tenants.json</code> after you save.
        </p>
      </header>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Brand configuration</h2>
        <p className="text-sm text-slate-500">
          These values define how the tenant looks across the PWA (colors, logo and display
          name). All tenants share the same codebase but have isolated branding.
        </p>

        <Form method="post" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="brandName" className="text-sm font-medium">
                Brand name
              </label>
              <input
                id="brandName"
                name="brandName"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="ACME Health"
                defaultValue={cfg.brandName}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="practiceId" className="text-sm font-medium">
                Practice / external id
              </label>
              <input
                id="practiceId"
                name="practiceId"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="acme-health-001"
                defaultValue={cfg.practiceId}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="themeColor" className="text-sm font-medium">
                Theme color
              </label>
              <input
                id="themeColor"
                name="themeColor"
                type="color"
                className="mt-1 h-10 w-full rounded border"
                defaultValue={cfg.themeColor}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="backgroundColor" className="text-sm font-medium">
                Background color
              </label>
              <input
                id="backgroundColor"
                name="backgroundColor"
                type="color"
                className="mt-1 h-10 w-full rounded border"
                defaultValue={cfg.backgroundColor}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="logoPath" className="text-sm font-medium">
                Logo path
              </label>
              <input
                id="logoPath"
                name="logoPath"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="/branding/acme-logo.svg"
                defaultValue={cfg.logoPath}
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save brand &amp; go to desktop
          </button>
        </Form>
      </section>
    </main>
  );
}
