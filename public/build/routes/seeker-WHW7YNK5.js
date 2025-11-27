import {
  encryptJson
} from "/build/_shared/chunk-QWSHXX2U.js";
import {
  require_tenant_config
} from "/build/_shared/chunk-3JHLWZA2.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
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

// app/routes/seeker.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_tenant_config = __toESM(require_tenant_config(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\seeker.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\seeker.tsx"
  );
  import.meta.hot.lastModified = "1764285760324.0535";
}
function Seeker() {
  _s();
  const {
    cfg
  } = useLoaderData();
  const [okMsg, setOkMsg] = (0, import_react2.useState)(null);
  const [busy, setBusy] = (0, import_react2.useState)(false);
  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setOkMsg(null);
    const fd = new FormData(e.currentTarget);
    const meta = {
      patientName: String(fd.get("fullName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      dob: String(fd.get("dob") || ""),
      reason: String(fd.get("reason") || "")
    };
    const {
      ivB64,
      cipherB64
    } = await encryptJson(meta);
    const res = await fetch("/api/v1/envelopes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cipherB64: ivB64 + "." + cipherB64,
        meta
      })
    });
    const data = await res.json();
    if (res.ok) {
      setOkMsg(`Submitted successfully. Envelope ID: ${data.envelopeId}`);
      e.currentTarget.reset();
    } else {
      setOkMsg("Failed to submit");
      console.error(data);
    }
    setBusy(false);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "max-w-xl mx-auto px-4 py-8 space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", style: {
      color: cfg.themeColor
    }, children: [
      cfg.brandName,
      " \u2014 Seeker"
    ] }, void 0, true, {
      fileName: "app/routes/seeker.tsx",
      lineNumber: 79,
      columnNumber: 7
    }, this),
    okMsg && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-emerald-800", children: okMsg }, void 0, false, {
      fileName: "app/routes/seeker.tsx",
      lineNumber: 82,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit, className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: "border rounded-md px-3 py-2 w-full", name: "fullName", placeholder: "Full Name", required: true }, void 0, false, {
        fileName: "app/routes/seeker.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: "border rounded-md px-3 py-2 w-full", name: "email", type: "email", placeholder: "Email", required: true }, void 0, false, {
        fileName: "app/routes/seeker.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: "border rounded-md px-3 py-2 w-full", name: "phone", placeholder: "Phone" }, void 0, false, {
        fileName: "app/routes/seeker.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: "border rounded-md px-3 py-2 w-full", name: "dob", type: "date", placeholder: "Date of Birth" }, void 0, false, {
        fileName: "app/routes/seeker.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { className: "border rounded-md px-3 py-2 w-full", name: "reason", placeholder: "Reason for visit", rows: 5 }, void 0, false, {
        fileName: "app/routes/seeker.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { disabled: busy, className: "border rounded-md px-4 py-2 bg-black text-white", children: busy ? "Submitting\u2026" : "Send Form" }, void 0, false, {
        fileName: "app/routes/seeker.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/seeker.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/seeker.tsx",
    lineNumber: 78,
    columnNumber: 10
  }, this);
}
_s(Seeker, "f96pWIvJv4XYQgqLQ/enWhfdaRI=", false, function() {
  return [useLoaderData];
});
_c = Seeker;
var _c;
$RefreshReg$(_c, "Seeker");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Seeker as default
};
//# sourceMappingURL=/build/routes/seeker-WHW7YNK5.js.map
