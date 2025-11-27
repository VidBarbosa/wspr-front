import {
  require_auth
} from "/build/_shared/chunk-SARLQUTN.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams
} from "/build/_shared/chunk-OKQGDBHZ.js";
import {
  createHotContext
} from "/build/_shared/chunk-6NRNWOF2.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/login.tsx
var import_node = __toESM(require_node(), 1);
var import_auth = __toESM(require_auth(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\login.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\login.tsx"
  );
  import.meta.hot.lastModified = "1764285760308.3523";
}
function LoginRoute() {
  _s();
  const {
    canLogin
  } = useLoaderData();
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/onboarding";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "flex min-h-screen items-center justify-center bg-slate-950 text-slate-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl shadow-slate-950/60", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "mb-2 text-center text-2xl font-semibold", children: "Admin Login" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 76,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-6 text-center text-sm text-slate-400", children: "Sign in with the admin account to access the onboarding panel." }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 77,
      columnNumber: 9
    }, this),
    !canLogin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "rounded-lg border border-amber-500/60 bg-amber-500/10 p-4 text-sm text-amber-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium", children: "No admin user found." }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 82,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
        "You must create the first admin account on the",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/register", className: "font-semibold text-amber-300 underline", children: "registration page" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 85,
          columnNumber: 15
        }, this),
        "."
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 83,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 81,
      columnNumber: 22
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 91,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "text-sm font-medium text-slate-200", children: "Email" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 93,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "email", name: "email", type: "email", autoComplete: "email", className: "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40", placeholder: "admin@example.com" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 96,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 92,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", className: "text-sm font-medium text-slate-200", children: "Password" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 100,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", className: "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 103,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this),
      actionData?.error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "rounded-lg border border-rose-500/60 bg-rose-500/10 p-2 text-xs text-rose-100", children: actionData.error }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 106,
        columnNumber: 34
      }, this) : null,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400", children: "Sign in" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 110,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-2 text-center text-xs text-slate-500", children: [
        "First time here?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/register", className: "font-medium text-sky-300 hover:underline", children: "Create the admin account" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 116,
          columnNumber: 15
        }, this),
        "."
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 114,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 90,
      columnNumber: 20
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 75,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login.tsx",
    lineNumber: 74,
    columnNumber: 10
  }, this);
}
_s(LoginRoute, "TTgW/GvhZ4tOHl8fxUynK+5dxOU=", false, function() {
  return [useLoaderData, useActionData, useSearchParams];
});
_c = LoginRoute;
var _c;
$RefreshReg$(_c, "LoginRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LoginRoute as default
};
//# sourceMappingURL=/build/routes/login-J34PV62A.js.map
