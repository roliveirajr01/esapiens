import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import CardProduct from "@/components/product/card";
import priceFilters from "@/components/layout/price-filters";

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
    <div className="container mx-auto px-4 py-8">
      {(searchTerm || priceFilter) && (
        <div className="text-center mb-4 text-gray-400 text-sm">
          {searchTerm && `Buscando por: "${searchTerm}"`}
          {priceFilter &&
            ` | Filtro: ${priceFilters.find((f) => f.value === priceFilter)?.label}`}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-8 text-gray-500">
          {products.length === 0
            ? "Nenhum produto encontrado"
            : "Todos os produtos foram carregados"}
        </div>
      )}

      {error && <div className="text-center py-8 text-red-500">{error}</div>}
    </div>
  );
}
