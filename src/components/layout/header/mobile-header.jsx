import { SunIcon, MoonIcon, FunnelIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./theme-toggle";

export default function MobileHeader({ toggleTheme, theme, onOpenFilters }) {
  return (
    <>
      <div className="flex items-center justify-between lg:hidden">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-400">eSapiens</span>Store
        </h1>

        <div className="flex items-center gap-4">
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </div>
      </div>

      <div className="fixed bottom-4 left-4 right-4 flex justify-between lg:hidden z-50">
        <button
          onClick={onOpenFilters}
          aria-label="Abrir filtros"
          className={`p-3 rounded-full shadow-lg ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <FunnelIcon className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
