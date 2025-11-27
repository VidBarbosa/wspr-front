import type { LoaderFunctionArgs } from "@remix-run/node";
import { getTenantConfig } from "../services/tenant-config.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cfg = getTenantConfig(request);
  const manifest = {
    name: cfg.brandName,
    short_name: cfg.brandName,
    description: "Multi-tenant PWA powered by Remix SSR",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    background_color: cfg.backgroundColor,
    theme_color: cfg.themeColor,
    lang: "en"
  };
  return new Response(JSON.stringify(manifest), { headers: { "Content-Type": "application/manifest+json" } });
}
