import { useMemo, useState } from "react";

type Flag = "green" | "yellow" | "red";

const rows = [
  {
    created: "1m ago",
    name: "Carla K.",
    flag: "red" as Flag,
    ga: "5 wk 4 d",
    pillType: "Period Pills",
    tags: "Allergy to Mifepristone",
    note: true,
  },
  {
    created: "2m ago",
    name: "Ann P.",
    flag: "red" as Flag,
    ga: "11 wk 3 d",
    pillType: "Immediate Use",
    tags: "IUD",
    note: false,
  },
  {
    created: "2m ago",
    name: "Kianna R.",
    flag: "green" as Flag,
    ga: "6 wk 1 d",
    pillType: "Immediate Use",
    tags: "",
    note: false,
  },
  {
    created: "5m ago",
    name: "Livia D.",
    flag: "green" as Flag,
    ga: "5 wk 1 d",
    pillType: "Immediate Use",
    tags: "",
    note: false,
  },
];

function FlagIcon({ color }: { color: Flag }) {
  const srcMap: Record<Flag, string> = {
    green: "/icons/FlagVerde.svg",
    yellow: "/icons/FlagAmarillo.svg",
    red: "/icons/FlagRoja.svg",
  };

  return (
    <img
      src={srcMap[color]}
      alt={`${color} flag`}
      className="h-4 w-4"
    />
  );
}

export function DashboardPage() {
  const [search, setSearch] = useState("");
  const [flagFilter, setFlagFilter] = useState<Flag | "all">("all");

  const filteredRows = useMemo(() => {
    const term = search.toLowerCase().trim();

    return rows.filter((row) => {
      if (flagFilter !== "all" && row.flag !== flagFilter) return false;

      if (term) {
        const haystack = (
          row.name +
          " " +
          row.ga +
          " " +
          row.pillType +
          " " +
          (row.tags || "")
        )
          .toLowerCase()
          .replace(/\s+/g, " ");

        if (!haystack.includes(term)) return false;
      }

      return true;
    });
  }, [search, flagFilter]);

  const accent = "#6C4E90";

  return (
    <section className="w-full">
      {/* Título */}
      <h1 className="mb-6 mt-4 text-2xl font-semibold text-slate-900">
        Patient Forms
      </h1>

      {/* TABS */}
      <div className="mb-6 flex border-b border-slate-200 text-sm">
        <button
          type="button"
          className="relative -mb-px mr-6 pb-2 text-sm font-medium text-[#6C4E90] border-b-2 border-[#6C4E90]"
        >
          <span className="align-middle">Pending</span>
          <span className="ml-2 inline-flex items-center rounded-full bg-[#6C4E90] px-2 py-[2px] text-[11px] font-semibold leading-none text-white">
            100
          </span>
        </button>
        <button
          type="button"
          className="mr-6 pb-2 text-sm font-medium text-slate-500 border-b-2 border-transparent hover:text-slate-900"
        >
          Approved
        </button>
        <button
          type="button"
          className="mr-6 pb-2 text-sm font-medium text-slate-500 border-b-2 border-transparent hover:text-slate-900"
        >
          Denied
        </button>
        <button
          type="button"
          className="pb-2 text-sm font-medium text-slate-500 border-b-2 border-transparent hover:text-slate-900"
        >
          All
        </button>
      </div>

      {/* FILTROS / BUSCADOR */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* IZQUIERDA: search + flags + dropdowns */}
          <div className="flex flex-1 items-center gap-3">
            {/* Search pill */}
            <div className="flex flex-1 items-center rounded-full border border-slate-200 bg-white px-4 py-2">
              <img
                src="/icons/MagnifyingGlass.svg"
                className="mr-2 h-4 w-4"
                alt="Search"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Flags SOLO delineadas con filtro funcional */}
            <div className="flex items-center gap-2">
              {(["green", "yellow", "red"] as Flag[]).map((flag) => {
                const active = flagFilter === flag;
                const srcMap: Record<Flag, string> = {
                  green: "/icons/FlagVerde.svg",
                  yellow: "/icons/FlagAmarillo.svg",
                  red: "/icons/FlagRoja.svg",
                };

                return (
                  <button
                    key={flag}
                    type="button"
                    onClick={() =>
                      setFlagFilter((prev) => (prev === flag ? "all" : flag))
                    }
                    className={`flex h-9 w-9 items-center justify-center rounded-full border bg-transparent hover:bg-slate-50 transition ${
                      active
                        ? "border-[color:var(--border-accent-primary,#6C4E90)] bg-[rgba(108,78,144,0.06)]"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={srcMap[flag]}
                      className="h-4 w-4"
                      alt={`${flag} flag`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Dropdown pills (solo UI por ahora) */}
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-[11px] text-slate-700 hover:bg-slate-50"
              >
                <span>G.A.</span>
                <img
                  src="/icons/CaretDown.svg"
                  className="h-3 w-3"
                  alt="Open"
                />
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-[11px] text-slate-700 hover:bg-slate-50"
              >
                <span>Pill Type</span>
                <img
                  src="/icons/CaretDown.svg"
                  className="h-3 w-3"
                  alt="Open"
                />
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-[11px] text-slate-700 hover:bg-slate-50"
              >
                <span>Tag</span>
                <img
                  src="/icons/CaretDown.svg"
                  className="h-3 w-3"
                  alt="Open"
                />
              </button>
            </div>
          </div>

          {/* DERECHA: Download */}
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 hover:text-slate-900"
          >
            <img
              src="/icons/DownloadSimple.svg"
              className="h-4 w-4"
              alt="Download"
            />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-xs">
          <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-medium text-slate-500">
            <tr>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Flag</th>
              <th className="px-5 py-3">G.A.</th>
              <th className="px-5 py-3">Pill Type</th>
              <th className="px-5 py-3">Tags</th>
              <th className="px-5 py-3 text-right">Anything else?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[11px]">
            {filteredRows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-500">{row.created}</td>
                <td className="px-5 py-3 text-[11px] font-medium text-[#6C4E90] hover:underline">
                  {row.name}
                </td>
                <td className="px-5 py-3">
                  <FlagIcon color={row.flag} />
                </td>
                <td
                  className={`px-5 py-3 ${
                    row.flag === "red" ? "text-rose-500 font-semibold" : ""
                  }`}
                >
                  {row.ga}
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-700">
                    {row.pillType}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {row.tags ? (
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-700">
                      {row.tags}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-5 py-3 text-right text-slate-400">
                  {row.note ? (
                    <img
                      src="/icons/Note.svg"
                      className="h-4 w-4 inline-block"
                      alt="Note"
                    />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
