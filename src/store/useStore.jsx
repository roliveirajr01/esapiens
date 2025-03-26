import { create } from "zustand";
import { getProducts } from "@/services/api";
import { parsePrice } from "@/utils/utils";

export const useStore = create((set, get) => ({
  products: [],
  page: 1,
  searchTerm: "",
  priceFilter: null,
  loading: false,
  hasMore: true,
  error: null,
  theme: "dark",

  actions: {
    setSearchTerm: (term) => {
      set({
        searchTerm: term,
        priceFilter: null,
        page: 1,
        products: [],
        hasMore: true,
        error: null,
      });
      get().actions.loadProducts();
    },

    setPriceFilter: (filter) => {
      set({
        priceFilter: filter,
        page: 1,
        products: [],
        hasMore: true,
        error: null,
      });
      get().actions.loadProducts();
    },

    toggleTheme: () => {
      const newTheme = get().theme === "dark" ? "light" : "dark";
      document.documentElement.className = newTheme;
      set({ theme: newTheme });
    },

    loadProducts: async () => {
      const state = get();
      if (state.loading || !state.hasMore) return;

      try {
        set({ loading: true, error: null });

        const limit = state.priceFilter ? 1000 : 10;
        const { data, total } = await getProducts(
          state.page,
          limit,
          state.searchTerm,
        );

        const filteredData = data.filter((product) => {
          const price = parsePrice(product.productPrice);

          if (!state.priceFilter) return true;
          switch (state.priceFilter) {
            case "under-50":
              return price < 50;
            case "50-100":
              return price >= 50 && price <= 100;
            case "over-100":
              return price > 100;
            default:
              return true;
          }
        });

        set({
          products:
            state.page === 1
              ? filteredData
              : [...state.products, ...filteredData],
          hasMore: state.page * limit < total && !state.priceFilter,
          loading: false,
        });
      } catch (err) {
        set({
          error: err.message || "Erro ao carregar produtos",
          hasMore: false,
          loading: false,
        });
      }
    },

    incrementPage: () => {
      set((state) => ({ page: state.page + 1 }));
      get().actions.loadProducts();
    },
  },
}));
