import { NavLink } from "react-router-dom";

const ACCENT = "#6C4E90";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo + sección izquierda */}
        <div className="flex items-center gap-4">
          <img src="/images/MAP.svg" alt="MAP logo" className="h-10 w-auto" />

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm ${
                isActive
                  ? "font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            Patient Forms
          </NavLink>
        </div>

        {/* Sección derecha: Messages + Log Out */}
        <div className="flex items-center gap-6">
          {/* Messages */}
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-slate-900"
          >
            <span className="relative inline-flex">
              {/* icono de sobre (puedes cambiar por un SVG luego) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                  stroke="#0F172A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 15H7.18969C7.38834 15.0001 7.57883 15.079 7.71937 15.2194L9.53063 17.0306C9.67117 17.171 9.86166 17.2499 10.0603 17.25H13.9397C14.1383 17.2499 14.3288 17.171 14.4694 17.0306L16.2806 15.2194C16.4212 15.079 16.6117 15.0001 16.8103 15H20.25"
                  stroke="#0F172A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {/* badge morado */}
              <span
                className="absolute -top-2 -right-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full text-[10px] font-semibold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                3
              </span>
            </span>
            <span>Messages</span>
          </button>

          {/* Log Out outline morado */}
          <button
            type="button"
            className="rounded-lg border-2 px-4 py-1.5 text-xs font-medium bg-white hover:bg-slate-50"
            style={{
              borderColor: "var(--border-accent-primary, #6C4E90)",
              color: "var(--border-accent-primary, #6C4E90)",
              background: "var(--bg-primary, #FFF)",
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
