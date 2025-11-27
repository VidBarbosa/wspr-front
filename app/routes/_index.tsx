import { useEffect, useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import Nav from "../components/Nav";
import Button from "../components/Button";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "dark" : "light";
}

function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

export default function Index() {
  const [installEvent, setInstallEvent] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [theme, setThemeState] = useState<Theme>(getSystemTheme());
  const { search } = useLocation();

  useEffect(() => {
    const onBeforeInstall = (e: any) => {
      e.preventDefault();
      setInstallEvent(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const promptInstall = async () => {
    if (!installEvent) return;
    const choice = await installEvent.prompt();
    console.log("User choice", choice.outcome);
    setCanInstall(false);
  };

  return (
    <>
      <header className="max-w-3xl mx-auto px-4">
        <Nav />
        <h1 className="text-slate-600 data-[theme=dark]:text-slate-400">
          Layout Provider App.
        </h1>

        <div className="mt-4 flex flex-wrap gap-3">
          {canInstall && <Button onClick={promptInstall}>Install app</Button>}
          <Button variant="outline" onClick={() => setThemeState(t => (t === "light" ? "dark" : "light"))}>
            Change Theme
          </Button>

          <Link to={`/onboarding${search}`}>
            <Button>Go to Onboarding</Button>
          </Link>
          <Link to={`/login${search}`}>
            <Button variant="outline">Admin Login</Button>
          </Link>
          <Link to={`/register${search}`}>
            <Button variant="outline">Create Admin</Button>
          </Link>

          <Link to={`/desktop${search}`}>
            <Button variant="outline">Go to Desktop</Button>
          </Link>
        </div>
      </header>
    </>
  );
}
