import {
  require_auth
} from "/build/_shared/chunk-SARLQUTN.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  useActionData,
  useLoaderData
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

// app/routes/register.tsx
var import_node = __toESM(require_node(), 1);
var import_auth = __toESM(require_auth(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\register.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\register.tsx"
  );
  import.meta.hot.lastModified = "1764285760324.0535";
}
function RegisterRoute() {
  _s();
  const {
    hasAdmin
  } = useLoaderData();
  const actionData = useActionData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "flex min-h-screen items-center justify-center bg-slate-950 text-slate-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl shadow-slate-950/60", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "mb-2 text-center text-2xl font-semibold", children: "Create Admin Account" }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 81,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-6 text-center text-sm text-slate-400", children: "This is a white-label provider app. The admin user is responsible for onboarding and managing brands." }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this),
    hasAdmin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "rounded-lg border border-emerald-500/60 bg-emerald-500/10 p-4 text-sm text-emerald-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium", children: "Admin already exists." }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
        "You can",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/login", className: "font-semibold text-emerald-300 underline", children: "sign in here" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this),
        "."
      ] }, void 0, true, {
        fileName: "app/routes/register.tsx",
        lineNumber: 88,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 86,
      columnNumber: 21
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "text-sm font-medium text-slate-200", children: "Admin email" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 97,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "email", name: "email", type: "email", autoComplete: "email", className: "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40", placeholder: "admin@example.com" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 100,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/register.tsx",
        lineNumber: 96,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", className: "text-sm font-medium text-slate-200", children: "Password" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 104,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "password", name: "password", type: "password", autoComplete: "new-password", className: "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/register.tsx",
        lineNumber: 103,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "confirmPassword", className: "text-sm font-medium text-slate-200", children: "Confirm password" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 111,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "confirmPassword", name: "confirmPassword", type: "password", autoComplete: "new-password", className: "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, void 0, false, {
          fileName: "app/routes/register.tsx",
          lineNumber: 114,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/register.tsx",
        lineNumber: 110,
        columnNumber: 13
      }, this),
      actionData?.error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "rounded-lg border border-rose-500/60 bg-rose-500/10 p-2 text-xs text-rose-100", children: actionData.error }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 117,
        columnNumber: 34
      }, this) : null,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400", children: "Create admin & continue" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 121,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 95,
      columnNumber: 20
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/register.tsx",
    lineNumber: 80,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/register.tsx",
    lineNumber: 79,
    columnNumber: 10
  }, this);
}
_s(RegisterRoute, "qLmEqNoIhd6lB28TGmFCAduvTzw=", false, function() {
  return [useLoaderData, useActionData];
});
_c = RegisterRoute;
var _c;
$RefreshReg$(_c, "RegisterRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  RegisterRoute as default
};
//# sourceMappingURL=/build/routes/register-DJV2B7PY.js.map
