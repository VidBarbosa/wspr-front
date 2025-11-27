import {
  ensureDemoKey
} from "/build/_shared/chunk-QWSHXX2U.js";
import {
  require_tenant_config
} from "/build/_shared/chunk-3JHLWZA2.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Link,
  useFetcher,
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
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/desktop.tsx
var import_node = __toESM(require_node(), 1);
var import_react = __toESM(require_react(), 1);
var import_tenant_config = __toESM(require_tenant_config(), 1);

// app/components/Footer.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Footer.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Footer.tsx"
  );
  import.meta.hot.lastModified = "1764285760264.2625";
}
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", { className: "max-w-3xl mx-auto px-4 py-8 text-xs text-slate-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
    "\xA9 ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " \u2014 Provider App."
  ] }, void 0, true, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 23,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c = Footer;
var _c;
$RefreshReg$(_c, "Footer");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/desktop.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\desktop.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\desktop.tsx"
  );
  import.meta.hot.lastModified = "1764285760308.3523";
}
function Desktop() {
  _s();
  const {
    cfg,
    tenantId,
    pollMs
  } = useLoaderData();
  const fetcher = useFetcher();
  const [rows, setRows] = (0, import_react.useState)([]);
  const [selected, setSelected] = (0, import_react.useState)(null);
  const [error, setError] = (0, import_react.useState)(null);
  const [hasKeys, setHasKeys] = (0, import_react.useState)(false);
  const [snippet, setSnippet] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    (async () => {
      try {
        await ensureDemoKey();
        setHasKeys(true);
        const jwk = sessionStorage.getItem("demo_secret_key_jwk");
        const safe = jwk ? JSON.stringify(jwk) : '""';
        const cmd = `Public Key *Seeker*:' ${safe}`;
        setSnippet(cmd);
      } catch (e) {
        console.error("ensureDemoKey failed", e);
        setHasKeys(false);
        setSnippet("");
      }
    })();
  }, []);
  (0, import_react.useEffect)(() => {
    let timer;
    const poll = async () => {
      try {
        setError(null);
        fetcher.load(`/api/v1/envelopes/${tenantId}`);
      } catch (e) {
        setError(e?.message ?? "Polling error");
      } finally {
        timer = window.setTimeout(poll, pollMs ?? 5e3);
      }
    };
    poll();
    return () => clearTimeout(timer);
  }, [tenantId, pollMs]);
  (0, import_react.useEffect)(() => {
    if (fetcher.data?.envelopes) {
      const mapped = fetcher.data.envelopes.map((e) => ({
        id: e.id,
        createdAt: e.createdAt,
        patientName: e.meta?.patientName ?? "(no name)",
        email: e.meta?.email ?? "",
        phone: e.meta?.phone ?? "",
        dob: e.meta?.dob ?? "",
        reason: e.meta?.reason ?? ""
      }));
      setRows(mapped);
    }
  }, [fetcher.data]);
  const copySnippet = (0, import_react.useCallback)(async () => {
    if (!snippet)
      return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippet);
      } else {
        const ta = document.createElement("textarea");
        ta.value = snippet;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      alert("Snippet copied to clipboard!");
    } catch (err) {
      console.error("Clipboard copy failed", err);
      alert("Could not copy to clipboard. Please copy manually.");
    }
  }, [snippet]);
  const state = fetcher.state !== "idle" && rows.length === 0 ? "loading" : error ? "error" : rows.length > 0 ? "data" : "empty";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "min-h-screen bg-slate-50", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("header", { className: "text-white", style: {
      background: cfg.themeColor
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "max-w-6xl mx-auto px-4 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: "/", className: "text-sm text-white underline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-xl font-semibold", children: [
            cfg.brandName,
            " \u2014 Desktop"
          ] }, void 0, true, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 140,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 139,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-xs opacity-80", children: [
            "Tenant: ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("code", { children: tenantId }, void 0, false, {
              fileName: "app/routes/desktop.tsx",
              lineNumber: 143,
              columnNumber: 23
            }, this),
            " \u2022 Practice: ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("code", { children: cfg.practiceId }, void 0, false, {
              fileName: "app/routes/desktop.tsx",
              lineNumber: 143,
              columnNumber: 59
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: `text-xs px-2 py-1 rounded ${state === "loading" ? "bg-yellow-500/20 text-yellow-100" : state === "error" ? "bg-red-500/20 text-red-100" : "bg-emerald-500/20 text-emerald-100"}`, children: state === "loading" ? "Loading\u2026" : state === "error" ? "Error" : "Active" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 147,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-sm", children: [
            rows.length,
            " patient",
            rows.length !== 1 ? "s" : ""
          ] }, void 0, true, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 150,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 146,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      hasKeys && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "max-w-6xl mx-auto px-4 pb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "rounded border border-blue-900 bg-blue-900/60 p-3 text-xs font-mono", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-2 font-semibold", children: "\u{1F511} Provider Key Snippet:" }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 159,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("pre", { className: "overflow-auto whitespace-pre-wrap", children: snippet }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: copySnippet, className: "rounded border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/20", children: "Copy snippet" }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 162,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 161,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 158,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 157,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/desktop.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("main", { className: "max-w-6xl mx-auto p-4", children: [
      state === "error" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "rounded-xl border border-red-200 bg-red-50 p-4 text-red-700", children: "\u2715 Connection error. Check the console." }, void 0, false, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 172,
        columnNumber: 31
      }, this),
      state === "loading" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "rounded-xl border p-6 bg-white shadow-sm", children: "Loading patients\u2026" }, void 0, false, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 176,
        columnNumber: 33
      }, this),
      state === "empty" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "rounded-2xl border p-6 bg-white shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-xl font-semibold", children: "\u{1F4CB} Patient Intake Dashboard" }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 179,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-sm text-slate-600", children: [
          "No intakes yet. Ask a patient to submit the form at",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { className: "underline", href: "/seeker", children: "/seeker" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 182,
            columnNumber: 15
          }, this),
          "."
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 180,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 178,
        columnNumber: 31
      }, this),
      state === "data" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "mb-3 text-xl font-semibold", children: [
          "\u{1F4CB} Patient Intakes (",
          rows.length,
          ")"
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 190,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid gap-3", children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "rounded-2xl border bg-white/80 p-4 text-left shadow-sm hover:bg-slate-50", onClick: () => setSelected(r), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "font-semibold", children: r.patientName }, void 0, false, {
              fileName: "app/routes/desktop.tsx",
              lineNumber: 194,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-xs text-slate-500", children: new Date(r.createdAt).toLocaleString() }, void 0, false, {
              fileName: "app/routes/desktop.tsx",
              lineNumber: 195,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 193,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-sm text-slate-600", children: [
            r.reason?.slice(0, 120) || "(no reason)",
            r.reason?.length > 120 ? "\u2026" : ""
          ] }, void 0, true, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 199,
            columnNumber: 19
          }, this)
        ] }, r.id, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 192,
          columnNumber: 30
        }, this)) }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 191,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 189,
        columnNumber: 30
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/desktop.tsx",
      lineNumber: 171,
      columnNumber: 7
    }, this),
    selected && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "fixed inset-0 flex items-center justify-center bg-black/40 p-4", onClick: () => setSelected(null), children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full max-w-lg rounded-2xl bg-white p-4", role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-lg font-semibold", children: "Patient Details" }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 212,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "rounded border px-2", onClick: () => setSelected(null), "aria-label": "Close", children: "\xD7" }, void 0, false, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 213,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 211,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mt-3 space-y-1 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Name:" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 219,
            columnNumber: 17
          }, this),
          " ",
          selected.patientName
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 218,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Email:" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 222,
            columnNumber: 17
          }, this),
          " ",
          selected.email
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 221,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Phone:" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this),
          " ",
          selected.phone
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 224,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "DOB:" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this),
          " ",
          selected.dob
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 227,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Reason:" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 231,
            columnNumber: 17
          }, this),
          " ",
          selected.reason
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 230,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mt-2 text-xs text-slate-500", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "ID:" }, void 0, false, {
            fileName: "app/routes/desktop.tsx",
            lineNumber: 234,
            columnNumber: 17
          }, this),
          " ",
          selected.id
        ] }, void 0, true, {
          fileName: "app/routes/desktop.tsx",
          lineNumber: 233,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/desktop.tsx",
        lineNumber: 217,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/desktop.tsx",
      lineNumber: 210,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/desktop.tsx",
      lineNumber: 209,
      columnNumber: 20
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/desktop.tsx",
      lineNumber: 241,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/desktop.tsx",
    lineNumber: 132,
    columnNumber: 10
  }, this);
}
_s(Desktop, "UMG9yN1MCZyoZ5WSWmlHSGwJ0bQ=", false, function() {
  return [useLoaderData, useFetcher];
});
_c2 = Desktop;
var _c2;
$RefreshReg$(_c2, "Desktop");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Desktop as default
};
//# sourceMappingURL=/build/routes/desktop-OS2F4CLA.js.map
