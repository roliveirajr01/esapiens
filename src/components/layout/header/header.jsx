import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";
import ScrollToTop from "./scroll-to-top";
import FilterModal from "./filter-modal";

export default function Header() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const debounceRef = useRef(null);
  const modalRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-600"} shadow-lg`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:dark:bg-gray-900 focus:px-4 focus:py-2 focus:rounded focus:z-50"
      >
        Pular para conteúdo principal
      </a>

      <nav className="container mx-auto px-4 py-4">
        <MobileHeader
          toggleTheme={toggleTheme}
          theme={theme}
          onOpenFilters={() => setIsFiltersOpen(true)}
        />

        <DesktopHeader
          toggleTheme={toggleTheme}
          theme={theme}
          localSearch={localSearch}
          onSearch={handleSearch}
          priceFilter={priceFilter}
          onPriceFilter={handlePriceFilter}
          onClearFilters={handleClearFilters}
        />
      </nav>

      <ScrollToTop show={showScrollButton} theme={theme} />

      <FilterModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        theme={theme}
        localSearch={localSearch}
        onSearch={handleSearch}
        priceFilter={priceFilter}
        onPriceFilter={(value) => {
          handlePriceFilter(value);
          setIsFiltersOpen(false);
        }}
        onClearFilters={handleClearFilters}
        modalRef={modalRef}
      />
    </header>
  );
}
