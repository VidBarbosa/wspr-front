import fs from "node:fs/promises";
import path from "node:path";
import tenantsJson from "../config/tenants.json";

export type TenantConfig = {
  tenantId: string;
  brandName: string;
  themeColor: string;
  backgroundColor: string;
  brandRGB: string;
  practiceId: string;
  logoPath: string;
  /**
   * Optional secret field that could be used by an external system.
   * Not used by the demo UI, but persisted along with the tenant.
   */
  adminPasscode?: string;
};

const TENANTS_FILE = path.join(process.cwd(), "app", "config", "tenants.json");

/**
 * In‑memory view of the tenant registry.
 * This is seeded from the JSON file and kept in sync when we persist overrides.
 */
const tenants: Record<string, TenantConfig> = tenantsJson as any;

/**
 * Try to derive tenant from the request host.
 *
 * Examples:
 *   acme.localhost:5173        -> "acme"
 *   acme.my-whitelabel.test    -> "acme"
 *   www.acme.my-whitelabel.io  -> "acme"
 */
function getTenantIdFromHost(url: URL): string | null {
  const host = url.hostname.toLowerCase(); // strip port automatically
  if (!host) return null;

  const parts = host.split(".");

  // localhost with subdomain: acme.localhost
  if (parts.length === 2 && parts[1] === "localhost") {
    const [sub] = parts;
    if (sub && sub !== "www") return sub;
    return null;
  }

  // Typical public domains: tenant.example.com or tenant.region.example.com
  if (parts.length >= 3) {
    const first = parts[0];
    if (first && first !== "www") return first;
  }

  return null;
}

/**
 * Naive cookie parser – we only care about "tenant=<id>".
 * This keeps the API synchronous so it can be used inside loaders/actions
 * without having to `await`.
 */
function getTenantIdFromCookie(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const match = cookies.find((c) => c.startsWith("tenant="));
  if (!match) return null;

  const value = match.split("=").slice(1).join("=");
  if (!value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Strategy‑based tenant resolution.
 *
 * 1. Query string:   ?tenant=acme
 * 2. Cookie:         tenant=acme
 * 3. Subdomain:      acme.localhost / acme.example.com
 * 4. Fallback:       "default"
 *
 * For **new** tenants, you can pass `?tenant=my-new-brand` even if it does not
 * yet exist in `tenants.json`. The onboarding flow will create it.
 */
export function getTenantIdFromRequest(request: Request): string {
  const url = new URL(request.url);

  const queryTenant = url.searchParams.get("tenant");
  if (queryTenant) {
    // If the tenant exists, just use it. If it does not, treat it as a new
    // tenant id that will be created by the onboarding flow.
    return queryTenant.toLowerCase();
  }

  const cookieTenant = getTenantIdFromCookie(request);
  if (cookieTenant && tenants[cookieTenant]) {
    return cookieTenant;
  }

  const hostTenant = getTenantIdFromHost(url);
  if (hostTenant && tenants[hostTenant]) {
    return hostTenant;
  }

  return "default";
}

/**
 * Resolve the full tenant config for the current request.
 * If the tenant does not exist yet, we synthesize a config from the
 * `default` tenant so the UI still has sensible branding values.
 */
export function getTenantConfig(request: Request): TenantConfig {
  const tenantId = getTenantIdFromRequest(request);
  const existing = tenants[tenantId];
  if (existing) return existing;

  const fallback = tenants["default"];
  if (!fallback) {
    throw new Error("Missing default tenant configuration in tenants.json");
  }

  const synthetic: TenantConfig = {
    ...fallback,
    tenantId,
    brandName: fallback.brandName,
    practiceId: `${fallback.practiceId}-${tenantId}`,
  };

  tenants[tenantId] = synthetic;
  return synthetic;
}

export type TenantBrandingOverride = Partial<
  Pick<
    TenantConfig,
    "brandName" | "themeColor" | "backgroundColor" | "brandRGB" | "logoPath" | "practiceId" | "adminPasscode"
  >
>;

/**
 * Persist branding changes for a tenant back into the shared JSON registry.
 *
 * This is called by the onboarding route. For new tenants, we create an entry
 * derived from the `default` tenant; for existing ones, we merge fields.
 */
export async function persistTenantBrandingOverride(
  tenantId: string,
  override: TenantBrandingOverride
): Promise<void> {
  const normalizedId = tenantId.toLowerCase();

  // Start from the in‑memory registry, which was seeded from tenants.json.
  const current = tenants[normalizedId] ?? {
    ...(tenants["default"] as TenantConfig),
    tenantId: normalizedId,
    practiceId: `${tenants["default"]?.practiceId ?? "practice"}-${normalizedId}`,
  };

  const mergedOverride: TenantConfig = {
    ...current,
    ...override,
    tenantId: normalizedId,
  };

  tenants[normalizedId] = mergedOverride;

  try {
    await fs.writeFile(TENANTS_FILE, JSON.stringify(tenants, null, 2), "utf8");
    console.log("[tenant-config] tenants.json updated on disk:", TENANTS_FILE);
  } catch (err) {
    console.error("[tenant-config] Could not persist tenants.json", err);
  }
}
