import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getAdminUser, registerAdmin, createUserSession } from "../services/auth.server";

type LoaderData = {
  hasAdmin: boolean;
};

type ActionData = {
  error?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await getAdminUser();
  if (admin) {
    return redirect("/login");
  }
  return json<LoaderData>({ hasAdmin: false });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirmPassword") || "");

  if (!email || !password || !confirm) {
    return json<ActionData>({ error: "All fields are required." }, { status: 400 });
  }

  if (password !== confirm) {
    return json<ActionData>({ error: "Passwords do not match." }, { status: 400 });
  }

  try {
    const user = await registerAdmin(email, password);
    const setCookie = await createUserSession(user);
    return redirect("/onboarding", {
      headers: {
        "Set-Cookie": setCookie
      }
    });
  } catch (err: any) {
    return json<ActionData>({ error: err?.message ?? "Unable to register admin user." }, { status: 400 });
  }
}

export default function RegisterRoute() {
  const { hasAdmin } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl shadow-slate-950/60">
        <h1 className="mb-2 text-center text-2xl font-semibold">Create Admin Account</h1>
        <p className="mb-6 text-center text-sm text-slate-400">
          This is a white-label provider app. The admin user is responsible for onboarding and managing brands.
        </p>

        {hasAdmin ? (
          <div className="rounded-lg border border-emerald-500/60 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <p className="font-medium">Admin already exists.</p>
            <p>
              You can{" "}
              <a href="/login" className="font-semibold text-emerald-300 underline">
                sign in here
              </a>
              .
            </p>
          </div>
        ) : (
          <Form method="post" className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Admin email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-200">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                placeholder="••••••••"
              />
            </div>

            {actionData?.error ? (
              <p className="rounded-lg border border-rose-500/60 bg-rose-500/10 p-2 text-xs text-rose-100">
                {actionData.error}
              </p>
            ) : null}

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Create admin &amp; continue
            </button>
          </Form>
        )}
      </div>
    </main>
  );
}
