import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { getBranding } from "./services/branding.server";

import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "manifest", href: "/manifest.webmanifest" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "icon", href: "/icons/icon-192.png", type: "image/png" }
];

export async function loader({ request }: LoaderFunctionArgs) {
  const branding = await getBranding(request);
  return json({ branding });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const branding = data?.branding;
  return [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: branding?.themeColor ?? "#0f172a" },
    { charSet: "utf-8" },
    { title: branding?.appName ?? "Provider App" },
    { name: "description", content: "PWA white-label para proveedores" }
  ];
};

export default function App() {
  const { branding } = useLoaderData<typeof loader>();
  return (
    <html
      lang="es"
      className="h-full text-slate-900 bg-white data-[theme=dark]:bg-slate-900 data-[theme=dark]:text-slate-100"
      style={{ ["--brand-rgb" as any]: branding.brandRGB }}
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
