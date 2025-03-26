import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle({ toggleTheme, theme, showLabel = false }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
      className="flex items-center gap-2 hover:text-blue-400 transition-colors"
    >
      {theme === "light" ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
      {showLabel && <span>{theme === "light" ? "Claro" : "Escuro"}</span>}
    </button>
  );
}
