import { useState, useRef } from "react";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "@/store/useStore";
import priceFilters from "./price-filters";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const debounceRef = useRef(null);
  const {
    theme,
    actions: { toggleTheme },
  } = useStore();

  const {
    priceFilter,
    actions: { setSearchTerm, setPriceFilter },
  } = useStore();

  const handleClearFilters = () => {
    setPriceFilter(null);
    setSearchTerm("");
    setLocalSearch("");
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
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-600"} shadow-lg`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:text-blue-400"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          <h1 className="text-2xl font-bold">
            <span className="text-blue-400">eSapiens</span>Store
          </h1>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <UserIcon className="h-6 w-6" />
          </div>
        </div>

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
              <span
                className={`${theme === "dark" ? "text-white" : "text-gray-400"} text-sm`}
              >
                Filtrar:
              </span>
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

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 dark:text-gray-600">
                Filtrar por preço:
              </span>
              {priceFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handlePriceFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm text-left ${
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
                className="px-4 py-2 rounded-lg text-sm text-left bg-red-600 text-white hover:bg-red-700"
              >
                Limpar Filtros
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-400 dark:text-gray-600">
                Categorias:
              </span>
              {["Notebooks", "Smartphones", "Acessórios", "Ofertas"].map(
                (cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="hover:text-blue-400 py-1.5 px-4 rounded-lg bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-700"
                  >
                    {cat}
                  </a>
                ),
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="w-full px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={localSearch}
                onChange={handleSearch}
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400 dark:text-gray-600" />
            </div>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-700 hover:text-blue-400"
            >
              {theme === "dark" ? (
                <>
                  <SunIcon className="h-5 w-5" />
                  <span>Tema Claro</span>
                </>
              ) : (
                <>
                  <MoonIcon className="h-5 w-5" />
                  <span>Tema Escuro</span>
                </>
              )}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
