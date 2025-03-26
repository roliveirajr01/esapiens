import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import priceFilters from "@/helpers/price-filters";

export default function FilterModal({
  isOpen,
  onClose,
  theme,
  localSearch,
  onSearch,
  priceFilter,
  onPriceFilter,
  onClearFilters,
  modalRef,
}) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filters-modal-title"
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`absolute bottom-0 w-full ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } p-4 rounded-t-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="filters-modal-title" className="sr-only">
          Filtros
        </h2>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              aria-label="Pesquisar produtos"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={localSearch}
              onChange={onSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onClose();
                }
              }}
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400 dark:text-gray-600" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Filtrar por preço:</span>
            {priceFilters.map((filter) => (
              <button
                key={filter.value}
                aria-pressed={priceFilter === filter.value}
                onClick={() => {
                  onPriceFilter(filter.value);
                  onClose();
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
            onClick={onClearFilters}
            aria-label="Limpar todos os filtros"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Limpar Filtros
          </button>

          <button
            className="w-full px-4 py-2 text-gray-400 bg-gray-700 rounded-lg dark:text-gray-600 text-sm transition-colors dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300"
            onClick={onClose}
            aria-label="Fechar menu de filtros"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
