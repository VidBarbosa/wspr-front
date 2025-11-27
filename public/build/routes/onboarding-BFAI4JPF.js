import {
  require_tenant_config
} from "/build/_shared/chunk-3JHLWZA2.js";
import {
  require_auth
} from "/build/_shared/chunk-SARLQUTN.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
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

// app/routes/onboarding.tsx
var import_node = __toESM(require_node(), 1);
var import_tenant_config = __toESM(require_tenant_config(), 1);
var import_auth = __toESM(require_auth(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\onboarding.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\onboarding.tsx"
  );
  import.meta.hot.lastModified = "1764285760324.0535";
}
function OnboardingRoute() {
  _s();
  const {
    cfg,
    tenantId
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "mx-auto max-w-3xl space-y-6 px-4 py-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold", children: [
        "\u{1F3A8} Onboarding Wizard",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm font-normal text-slate-500", children: [
          "(tenant: ",
          tenantId,
          ")"
        ] }, void 0, true, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/onboarding.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-slate-600", children: "This admin\u2011only screen lets you register and configure white\u2011label brands (tenants) for this provider app." }, void 0, false, {
        fileName: "app/routes/onboarding.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-slate-500", children: [
        "To create a ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "new tenant" }, void 0, false, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 100,
          columnNumber: 23
        }, this),
        ", simply open this page with",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children: "?tenant=<tenant-id>" }, void 0, false, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 101,
          columnNumber: 11
        }, this),
        " in the URL (for example",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children: "/onboarding?tenant=acme" }, void 0, false, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 102,
          columnNumber: 11
        }, this),
        "). The record will be created in",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children: "app/config/tenants.json" }, void 0, false, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 103,
          columnNumber: 11
        }, this),
        " after you save."
      ] }, void 0, true, {
        fileName: "app/routes/onboarding.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/onboarding.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "space-y-4 rounded-xl border bg-white p-6 shadow-sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold", children: "Brand configuration" }, void 0, false, {
        fileName: "app/routes/onboarding.tsx",
        lineNumber: 108,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-slate-500", children: "These values define how the tenant looks across the PWA (colors, logo and display name). All tenants share the same codebase but have isolated branding." }, void 0, false, {
        fileName: "app/routes/onboarding.tsx",
        lineNumber: 109,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "brandName", className: "text-sm font-medium", children: "Brand name" }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 117,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "brandName", name: "brandName", className: "mt-1 w-full rounded border px-3 py-2 text-sm", placeholder: "ACME Health", defaultValue: cfg.brandName }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 120,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/onboarding.tsx",
            lineNumber: 116,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "practiceId", className: "text-sm font-medium", children: "Practice / external id" }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 124,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "practiceId", name: "practiceId", className: "mt-1 w-full rounded border px-3 py-2 text-sm", placeholder: "acme-health-001", defaultValue: cfg.practiceId }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 127,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/onboarding.tsx",
            lineNumber: 123,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 115,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "themeColor", className: "text-sm font-medium", children: "Theme color" }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 133,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "themeColor", name: "themeColor", type: "color", className: "mt-1 h-10 w-full rounded border", defaultValue: cfg.themeColor }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/onboarding.tsx",
            lineNumber: 132,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "backgroundColor", className: "text-sm font-medium", children: "Background color" }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 140,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "backgroundColor", name: "backgroundColor", type: "color", className: "mt-1 h-10 w-full rounded border", defaultValue: cfg.backgroundColor }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 143,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/onboarding.tsx",
            lineNumber: 139,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "logoPath", className: "text-sm font-medium", children: "Logo path" }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 147,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "logoPath", name: "logoPath", className: "mt-1 w-full rounded border px-3 py-2 text-sm", placeholder: "/branding/acme-logo.svg", defaultValue: cfg.logoPath }, void 0, false, {
              fileName: "app/routes/onboarding.tsx",
              lineNumber: 150,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/onboarding.tsx",
            lineNumber: 146,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800", children: "Save brand & go to desktop" }, void 0, false, {
          fileName: "app/routes/onboarding.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/onboarding.tsx",
        lineNumber: 114,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/onboarding.tsx",
      lineNumber: 107,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/onboarding.tsx",
    lineNumber: 89,
    columnNumber: 10
  }, this);
}
_s(OnboardingRoute, "2ACgQRc0Hsx3bXvsSD0J9D+F1v4=", false, function() {
  return [useLoaderData];
});
_c = OnboardingRoute;
var _c;
$RefreshReg$(_c, "OnboardingRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  OnboardingRoute as default
};
//# sourceMappingURL=/build/routes/onboarding-BFAI4JPF.js.map
