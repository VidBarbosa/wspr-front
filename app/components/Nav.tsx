import { Link } from "@remix-run/react";
import tenants from "../config/tenants.json";

const defaultTenant = (tenants as any).default ?? {
  brandName: "Provider App",
  logoPath: "/branding/logo.svg",
};

export default function Nav() {
  return (
    <nav className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3">
        <img src={defaultTenant.logoPath} alt="logo" className="h-8 w-8 rounded-md" />
        <Link to="/" prefetch="intent" className="text-lg font-semibold">
          {defaultTenant.brandName}
        </Link>
      </div>
    </nav>
  );
}
