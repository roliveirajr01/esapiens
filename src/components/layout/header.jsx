import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  FunnelIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "@/store/useStore";
import priceFilters from "./price-filters";

export default function Header() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const debounceRef = useRef(null);

  const { theme } = useStore();
  const {
    priceFilter,
    actions: { setSearchTerm, setPriceFilter, toggleTheme },
  } = useStore();

  const handleClearFilters = () => {
    setPriceFilter(null);
    setSearchTerm("");
    setLocalSearch("");
    setIsFiltersOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  const handlePriceFilter = (filterValue) => {
    const newFilter = priceFilter === filterValue ? null : filterValue;
    setPriceFilter(newFilter);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-600"} shadow-lg`}
    >
      <nav className="container mx-auto px-4 py-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-400">eSapiens</span>Store
          </h1>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
            <UserIcon className="h-6 w-6" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-400">eSapiens</span>Store
            </h1>
          </div>

          <div className="flex-1 max-w-3xl">
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="w-full px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={localSearch}
                onChange={handleSearch}
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400 dark:text-gray-600" />
            </div>

            <div className="flex justify-center items-center gap-4 mt-2">
              <span className="text-sm text-gray-400">Filtrar:</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {priceFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handlePriceFilter(filter.value)}
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
                  onClick={handleClearFilters}
                  className="px-3 py-1.5 rounded-full text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              {theme === "light" ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
              <span className="hidden md:inline">
                {theme === "light" ? "Claro" : "Escuro"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Fixed Buttons */}
        <div className="fixed bottom-4 left-4 right-4 flex justify-between md:hidden z-50">
          <button
            onClick={() => setIsFiltersOpen(true)}
            className={`p-3 rounded-full shadow-lg ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <FunnelIcon className="h-6 w-6" />
          </button>

          {showScrollButton && (
            <button
              onClick={scrollToTop}
              className={`p-3 rounded-full shadow-lg ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              <ArrowUpIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Mobile Filters Modal */}
        {isFiltersOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsFiltersOpen(false)}
          >
            <div
              className={`absolute bottom-0 w-full ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } p-4 rounded-t-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={localSearch}
                    onChange={handleSearch}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsFiltersOpen(false);
                      }
                    }}
                  />
                  <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400 dark:text-gray-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-sm">
                    Filtrar por preço:
                  </span>
                  {priceFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        handlePriceFilter(filter.value);
                        setIsFiltersOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        priceFilter === filter.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 text-gray-300 dark:text-gray-700"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleClearFilters}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Limpar Filtros
                </button>

                <button
                  className="w-full px-4 py-2 text-gray-400 bg-gray-700 rounded-lg dark:text-gray-600 text-sm transition-colors dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
