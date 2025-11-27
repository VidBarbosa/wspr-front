# Provider App (PWA)

A **Remix v2 + Vite + TypeScript + Tailwind** Progressive Web Application that demos a **white‑label, multi‑tenant** provider portal + patient (seeker) PWA.

The whole backend is implemented as **Remix server‑side routes (SSR)** – there is **no separate API service**. Everything lives in this single codebase.

---

## Concept

This app is meant to be a **white‑label provider product**:

* One codebase
* Many brands / practices (tenants)
* Custom colors, app name and logos per brand
* Tenant resolved from **domain / subdomain / cookie / query string**

The result is a PWA that you can re‑skin for multiple customers while keeping a single deployment.

---

## Key Features

* **Multi‑tenant** using a **Strategy pattern** (query → cookie → subdomain → fallback)
* **Single JSON tenant registry** (`app/config/tenants.json`) with all brands
* **White‑label PWA**:
  * `/seeker` = patient form PWA (encrypts and POSTs to SSR API)
  * `/desktop` = provider “desktop” dashboard (polls SSR API)
* **Onboarding wizard**:
  * Admin‑only `/onboarding` route
  * Creates / updates tenants in `tenants.json`
* **Basic auth**:
  * `/register` creates the **only** admin user (file‑based store)
  * `/login` authenticates that admin
  * Successful auth creates a `user_session` cookie
* **Protected route**:
  * `/onboarding` is **always protected**
  * Only the admin user can access it (loader + action)
* **Dynamic manifest** per tenant (`/manifest.webmanifest`)
* **Service layer** under `app/services/*.server.ts` (tenants, envelopes, auth, branding)
* **Minimal, UI‑focused implementation** – no DB required, uses in‑memory + JSON files

---

## Multi‑Tenant Strategy (Strategy Pattern)

Tenant resolution is fully **server‑side** and uses a **Strategy pattern** implemented in `app/services/tenant-config.server.ts`.

### Resolution order

On every request we try, in order:

1. **Query string**: `?tenant=acme`
2. **Cookie**: `tenant=acme`
3. **Subdomain**: `acme.localhost:5173` or `acme.example.com` → `acme`
4. **Fallback**: `"default"`

```ts
// pseudo‑code – see tenant-config.server.ts for full version
export function getTenantIdFromRequest(request: Request): string {
  const url = new URL(request.url);

  // 1) ?tenant=acme
  const queryTenant = url.searchParams.get("tenant");
  if (queryTenant) return queryTenant.toLowerCase();

  // 2) tenant cookie
  const cookieTenant = getTenantIdFromCookie(request);
  if (cookieTenant && tenants[cookieTenant]) return cookieTenant;

  // 3) subdomain / domain
  const hostTenant = getTenantIdFromHost(url);
  if (hostTenant && tenants[hostTenant]) return hostTenant;

  // 4) fallback
  return "default";
}
```

### Domain / subdomain strategy

`getTenantIdFromHost(url: URL)` extracts the tenant from the hostname:

* `acme.localhost:5173` → `acme`
* `acme.my‑whitelabel.test` → `acme`
* `www.acme.my‑whitelabel.io` → `acme` (first non‑`www` label)

This means you can map **hostnames → tenant ids** with DNS only – no code changes required.

---

## Single Tenant Registry (`app/config/tenants.json`)

All **brand configuration** lives in a **single JSON file**:

```json
{
  "default": {
    "tenantId": "default",
    "brandName": "Demo App",
    "themeColor": "#b624eb",
    "backgroundColor": "#0f172a",
    "brandRGB": "182 36 235",
    "practiceId": "demo-practice-123",
    "logoPath": "/branding/logo.svg"
  },
  "acme": {
    "tenantId": "acme",
    "brandName": "ACME Health",
    "themeColor": "#16a34a",
    "backgroundColor": "#052e16",
    "brandRGB": "22 163 74",
    "practiceId": "acme-health-999",
    "logoPath": "/branding/acme-logo.svg"
  }
}
```

**There is no separate `branding.json` anymore** – tenants and their branding are defined only here.

The `TenantConfig` type is defined in `app/services/tenant-config.server.ts`:

```ts
export type TenantConfig = {
  tenantId: string;
  brandName: string;
  themeColor: string;
  backgroundColor: string;
  brandRGB: string;
  practiceId: string;
  logoPath: string;
  adminPasscode?: string;
};
```

---

## Onboarding Flow (Admin‑Only)

The onboarding wizard lives at **`/onboarding`** and is the **only place** where tenants (brands) are created and updated.

### Protection (route guard)

`/onboarding` is **always protected**:

* The **loader** checks `getSessionUser(request)` from `app/services/auth.server.ts`.
* If there is no admin session, the user is redirected to **`/login?redirectTo=/onboarding...`**.
* The **action** applies the same check before writing to `tenants.json`.

This means:

* Anonymous users can never hit the onboarding form.
* Only the authenticated admin can create or modify brand records.

### Creating a new brand (tenant)

1. Sign in as the admin.
2. Navigate to `/onboarding?tenant=<tenant-id>` – for example:

   * `/onboarding?tenant=acme`
   * `/onboarding?tenant=my-new-brand`

3. The loader resolves a `TenantConfig`:
   * If the tenant exists, it loads and shows the current branding.
   * If the tenant does **not** exist yet, it synthesizes a config from the `default` tenant so the UI still works.
4. When you submit the form, `persistTenantBrandingOverride(tenantId, override)`:
   * Merges your overrides with a base config (existing or default).
   * Writes the result back to `app/config/tenants.json`.

Each **new registration** in the onboarding wizard therefore becomes a **new entry in `tenants.json`**.

### Fields in the wizard

The `/onboarding` form lets the admin edit:

* `brandName`
* `practiceId` (external id for your own systems)
* `themeColor`
* `backgroundColor`
* `logoPath`

After saving, the admin is redirected to `/desktop?tenant=<tenant-id>`.

---

## Auth: Login, Register and Admin Session

The app includes a very small, file‑based auth layer in `app/services/auth.server.ts`.

### User model

* Only a single role is supported: `admin`.
* Users are stored in `app/config/users.json`:

  ```json
  {
    "users": [
      {
        "id": "admin",
        "email": "admin@example.com",
        "password": "plaintext-demo-only",
        "role": "admin"
      }
    ]
  }
  ```

> ⚠️ This is **not** for production use. Passwords are stored in clear text for demo purposes only. Replace this with a real user store + hashing in a real app.

### Register (`/register`)

* `GET /register`
  * If an admin already exists, redirects to `/login`.
  * Otherwise renders a simple **Create Admin Account** form.
* `POST /register`
  * Validates the fields.
  * Creates the only admin user with `registerAdmin(email, password)`.
  * Creates a `user_session` cookie via `createUserSession`.
  * Redirects to `/onboarding`.

This route is only meant to be used once to bootstrap the very first admin for your white‑label instance.

### Login (`/login`)

* `GET /login`
  * If an admin session already exists, redirects to `/onboarding`.
  * Otherwise renders the **Admin Login** form.
  * Accepts an optional `redirectTo` query param.
* `POST /login`
  * Validates credentials with `verifyLogin`.
  * On success:
    * Creates a `user_session` cookie.
    * Redirects to `redirectTo` if provided, otherwise to `/onboarding`.

From this point on, the admin can access `/onboarding` and manage brand registrations.

### Session + protection helpers

`auth.server.ts` exposes:

* `getSessionUser(request)` – returns `{ userId, role } | null`
* `requireUser(request)` – throws `401` if there is no session
* `requireAdmin(request)` – throws `403` if the user is not an admin
* `createUserSession(user)` – serializes the cookie
* `destroyUserSession()` – clears the session cookie

`/onboarding` uses `getSessionUser` to guard both the loader and the action.

---

## White‑Label UI and Tenants

The UI is designed so that **brand changes never break layout**:

* Navigation (`app/components/Nav.tsx`) pulls its defaults from the **default tenant** in `tenants.json`.
* The PWA manifest (`app/routes/manifest.webmanifest.ts`) uses `getTenantConfig(request)`:
  * `name`, `short_name`, `theme_color`, `background_color` are per‑tenant.
* `/seeker` and `/desktop` both use `getTenantConfig` as well:
  * Colors and titles adapt automatically to the active tenant.
* CSS exposes `--brand-rgb` via Tailwind so you can theme additional components.

Because all tenants share the same code, adding a new brand is only a matter of:

1. Hitting `/onboarding?tenant=<new-id>` as the admin
2. Saving the form
3. Pointing a new domain or subdomain at the app with that `<new-id>` as the first label

---

## Project Structure (Short Version)

```text
app/
  components/
    Nav.tsx                      # Uses default tenant branding for header
  config/
    tenants.json                 # Single JSON registry for all brands (tenants)
    users.json                   # Simple file-based store for the admin user
  routes/
    _index.tsx                   # Landing page (links into flows)
    login.tsx                    # Admin login
    register.tsx                 # First admin registration
    onboarding.tsx               # Admin-only tenant onboarding (protected)
    seeker.tsx                   # Patient PWA (encrypts + POSTs)
    desktop.tsx                  # Provider dashboard (polls envelopes)
    api.v1.envelopes.ts          # POST: store encrypted envelope (tenant-aware)
    api.v1.envelopes.$tenantId.ts# GET : list envelopes by tenant
    api.branding.ts              # Cookie-based branding API (optional, demo)
    manifest.webmanifest.ts      # Dynamic PWA manifest per tenant
    api.health.ts                # Health check
  services/
    tenant-config.server.ts      # Strategy-based tenant resolution + registry
    envelopes.server.ts          # In-memory envelopes store (tenant-aware)
    auth.server.ts               # Minimal admin auth + session cookie
    branding.server.ts           # Demo cookie-based branding service
  styles/
    app.css
  root.tsx                       # Root layout, loads branding and styles
  tailwind.css
tailwind.config.ts               # Tailwind + brand utilities
remix.config.ts                  # Remix / Vite config
package.json
```

---

## Running Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

### First‑time setup

1. Go to `http://localhost:5173/register` and create the **admin** account.
2. After registration you will be redirected to `/onboarding`.
3. From there you can:
   * Edit the `default` tenant.
   * Create new tenants with `/onboarding?tenant=<tenant-id>`.

---

## Notes & Limitations

* This is a **demo** – no production‑grade auth or persistence.
* Passwords are stored in **plain text** in `users.json`.
* `tenants.json` is updated on disk from the Remix server process; in a horizontally scaled deployment you would replace this with a proper database.
* The multi‑tenant Strategy is intentionally simple and easy to replace:
  * Swap out the cookie, query or host strategies as needed.
  * Replace the JSON registry with your own repository while keeping the same interface.

