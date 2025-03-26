import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./theme-toggle";
import priceFilters from "@/helpers/price-filters";

export default function DesktopHeader({
  toggleTheme,
  theme,
  localSearch,
  onSearch,
  priceFilter,
  onPriceFilter,
  onClearFilters,
}) {
  return (
    <div className="hidden lg:flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-400">eSapiens</span>Store
        </h1>
      </div>

      <div className="flex-1 max-w-3xl mx-4">
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            aria-label="Pesquisar produtos"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={localSearch}
            onChange={onSearch}
          />
          <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400 dark:text-gray-600" />
        </div>

        <div className="flex justify-center items-center gap-4 mt-2">
          <span className="text-sm text-gray-400">Filtrar:</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {priceFilters.map((filter) => (
              <button
                key={filter.value}
                aria-pressed={priceFilter === filter.value}
                onClick={() => onPriceFilter(filter.value)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  priceFilter === filter.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 text-gray-300 dark:text-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
            <button
              onClick={onClearFilters}
              aria-label="Limpar todos os filtros"
              className="px-3 py-1.5 rounded-full text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} showLabel />
      </div>
    </div>
  );
}
