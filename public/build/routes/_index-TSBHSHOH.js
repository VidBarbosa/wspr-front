import {
  Link,
  useLocation
} from "/build/_shared/chunk-OKQGDBHZ.js";
import {
  createHotContext
} from "/build/_shared/chunk-6NRNWOF2.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_react2 = __toESM(require_react(), 1);

// app/config/tenants.json
var tenants_default = {
  default: {
    tenantId: "default",
    brandName: "Demo App",
    themeColor: "#eb245f",
    backgroundColor: "#0f172a",
    brandRGB: "182 36 235",
    practiceId: "demo-practice-123",
    logoPath: "/branding/logo.svg"
  },
  acme: {
    tenantId: "acme",
    brandName: "ACME Health",
    themeColor: "#16a34a",
    backgroundColor: "#052e16",
    brandRGB: "22 163 74",
    practiceId: "acme-health-999",
    logoPath: "/branding/acme-logo.svg"
  },
  brand2: {
    tenantId: "brand2",
    brandName: "Brand 2",
    themeColor: "#e724eb",
    backgroundColor: "#0f172a",
    brandRGB: "182 36 235",
    practiceId: "brand2-practice-123",
    logoPath: "/branding/logo.svg"
  }
};

// app/components/Nav.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Nav.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Nav.tsx"
  );
  import.meta.hot.lastModified = "1764285760268.2698";
}
var defaultTenant = tenants_default.default ?? {
  brandName: "Provider App",
  logoPath: "/branding/logo.svg"
};
function Nav() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "flex items-center justify-between gap-4 py-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: defaultTenant.logoPath, alt: "logo", className: "h-8 w-8 rounded-md" }, void 0, false, {
      fileName: "app/components/Nav.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", prefetch: "intent", className: "text-lg font-semibold", children: defaultTenant.brandName }, void 0, false, {
      fileName: "app/components/Nav.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Nav.tsx",
    lineNumber: 29,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Nav.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_c = Nav;
var _c;
$RefreshReg$(_c, "Nav");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// app/components/Button.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Button.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Button.tsx"
  );
  import.meta.hot.lastModified = "1764285760258.5154";
}
function Button({
  children,
  className,
  variant = "primary",
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: clsx_default("btn", variant === "primary" ? "btn-primary" : "border-slate-300 hover:bg-slate-50", className), ...rest, children }, void 0, false, {
    fileName: "app/components/Button.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_c2 = Button;
var _c2;
$RefreshReg$(_c2, "Button");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1764285760294.2983";
}
function getSystemTheme() {
  if (typeof window === "undefined")
    return "light";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "dark" : "light";
}
function setTheme(theme) {
  if (typeof document === "undefined")
    return;
  document.documentElement.dataset.theme = theme;
}
function Index() {
  _s();
  const [installEvent, setInstallEvent] = (0, import_react2.useState)(null);
  const [canInstall, setCanInstall] = (0, import_react2.useState)(false);
  const [theme, setThemeState] = (0, import_react2.useState)(getSystemTheme());
  const {
    search
  } = useLocation();
  (0, import_react2.useEffect)(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setInstallEvent(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);
  (0, import_react2.useEffect)(() => {
    setTheme(theme);
  }, [theme]);
  const promptInstall = async () => {
    if (!installEvent)
      return;
    const choice = await installEvent.prompt();
    console.log("User choice", choice.outcome);
    setCanInstall(false);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("header", { className: "max-w-3xl mx-auto px-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Nav, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "text-slate-600 data-[theme=dark]:text-slate-400", children: "Layout Provider App." }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mt-4 flex flex-wrap gap-3", children: [
      canInstall && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { onClick: promptInstall, children: "Install app" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 68,
        columnNumber: 26
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { variant: "outline", onClick: () => setThemeState((t) => t === "light" ? "dark" : "light"), children: "Change Theme" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link, { to: `/onboarding${search}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { children: "Go to Onboarding" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link, { to: `/login${search}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { variant: "outline", children: "Admin Login" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 77,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link, { to: `/register${search}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { variant: "outline", children: "Create Admin" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 80,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link, { to: `/desktop${search}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { variant: "outline", children: "Go to Desktop" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 84,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 67,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 61,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
_s(Index, "jiWuF1HL37u3hufd/8LVrYkfKfs=", false, function() {
  return [useLocation];
});
_c3 = Index;
var _c3;
$RefreshReg$(_c3, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-TSBHSHOH.js.map
