import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import CardProduct from "@/components/product/card";
import priceFilters from "@/helpers/price-filters";

export default function App() {
  const { products, loading, hasMore, error, searchTerm, priceFilter } =
    useStore();
  const { loadProducts, incrementPage } = useStore((state) => state.actions);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.offsetHeight &&
        hasMore &&
        !loading
      ) {
        incrementPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, incrementPage]);

  return (
    <main id="main" role="main" className="min-h-screen">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {(searchTerm || priceFilter) && (
          <div
            aria-live="polite"
            className="text-center mb-4 text-gray-400 text-sm"
          >
            {searchTerm && `Buscando por: "${searchTerm}"`}
            {priceFilter &&
              ` | Filtro: ${priceFilters.find((f) => f.value === priceFilter)?.label}`}
          </div>
        )}

        <div
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <div role="listitem" key={product.id || index}>
              <CardProduct product={product} />
            </div>
          ))}
        </div>

        {loading && (
          <div
            aria-live="assertive"
            aria-busy="true"
            className="text-center py-8"
          >
            <div
              data-testid="spinner"
              className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"
              aria-label="Carregando mais produtos"
            ></div>
          </div>
        )}

        {!hasMore && (
          <div aria-live="polite" className="text-center py-8 text-gray-500">
            {products.length === 0
              ? "Nenhum produto encontrado"
              : "Todos os produtos foram carregados"}
          </div>
        )}

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="text-center py-8 text-red-500"
          >
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
