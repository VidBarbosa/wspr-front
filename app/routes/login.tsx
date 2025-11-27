import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useSearchParams } from "@remix-run/react";
import { verifyLogin, createUserSession, getAdminUser, getSessionUser } from "../services/auth.server";

type LoaderData = {
  canLogin: boolean;
};

type ActionData = {
  error?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await getAdminUser();
  const currentUser = await getSessionUser(request);
  if (currentUser && currentUser.role === "admin") {
    return redirect("/onboarding");
  }
  return json<LoaderData>({ canLogin: !!admin });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const redirectTo = String(formData.get("redirectTo") || "/onboarding");

  if (!email || !password) {
    return json<ActionData>({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await verifyLogin(email, password);
  if (!user) {
    return json<ActionData>({ error: "Invalid credentials." }, { status: 400 });
  }

  const setCookie = await createUserSession(user);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": setCookie
    }
  });
}

export default function LoginRoute() {
  const { canLogin } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/onboarding";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl shadow-slate-950/60">
        <h1 className="mb-2 text-center text-2xl font-semibold">Admin Login</h1>
        <p className="mb-6 text-center text-sm text-slate-400">
          Sign in with the admin account to access the onboarding panel.
        </p>

        {!canLogin ? (
          <div className="rounded-lg border border-amber-500/60 bg-amber-500/10 p-4 text-sm text-amber-100">
            <p className="font-medium">No admin user found.</p>
            <p>
              You must create the first admin account on the{" "}
              <a href="/register" className="font-semibold text-amber-300 underline">
                registration page
              </a>
              .
            </p>
          </div>
        ) : (
          <Form method="post" className="space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email
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
                autoComplete="current-password"
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
              className="flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Sign in
            </button>

            <p className="mt-2 text-center text-xs text-slate-500">
              First time here?{" "}
              <a href="/register" className="font-medium text-sky-300 hover:underline">
                Create the admin account
              </a>
              .
            </p>
          </Form>
        )}
      </div>
    </main>
  );
}
