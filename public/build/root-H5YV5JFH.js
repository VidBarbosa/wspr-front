import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:./services/branding.server
var require_branding = __commonJS({
  "empty-module:./services/branding.server"(exports, module) {
    module.exports = {};
  }
});

// app/root.tsx
var import_node = __toESM(require_node(), 1);
var import_branding = __toESM(require_branding(), 1);

// app/tailwind.css?url
var tailwind_default = "/build/_assets/tailwind-UHVE65GN.css?url";

// app/root.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.tsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: tailwind_default
}, {
  rel: "manifest",
  href: "/manifest.webmanifest"
}, {
  rel: "apple-touch-icon",
  href: "/apple-touch-icon.png"
}, {
  rel: "icon",
  href: "/icons/icon-192.png",
  type: "image/png"
}];
var meta = ({
  data
}) => {
  const branding = data?.branding;
  return [{
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }, {
    name: "theme-color",
    content: branding?.themeColor ?? "#0f172a"
  }, {
    charSet: "utf-8"
  }, {
    title: branding?.appName ?? "Provider App"
  }, {
    name: "description",
    content: "PWA white-label para proveedores"
  }];
};
function App() {
  _s();
  const {
    branding
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "es", className: "h-full text-slate-900 bg-white data-[theme=dark]:bg-slate-900 data-[theme=dark]:text-slate-100", style: {
    ["--brand-rgb"]: branding.brandRGB
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { className: "min-h-screen", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 79,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
}
_s(App, "1YMaRhyieofSDnjI/IL1Dgfhuxg=", false, function() {
  return [useLoaderData];
});
_c = App;
var _c;
$RefreshReg$(_c, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-H5YV5JFH.js.map
