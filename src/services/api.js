// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

const parsePriceParam = (price) => {
  return parseFloat(
    price.replace("R$ ", "").replace(/\./g, "").replace(",", "."),
  );
};

export const getProducts = async (
  page = 1,
  limit = 10,
  searchTerm = "",
  priceFilter,
) => {
  try {
    const params = {
      _page: page,
      _limit: limit,
      _sort: "productName",
      _order: "asc",
      q: searchTerm,
    };

    if (priceFilter) {
      switch (priceFilter) {
        case "under-50":
          params.productPrice_lte = parsePriceParam("R$ 50,00");
          break;
        case "50-100":
          params.productPrice_gte = parsePriceParam("R$ 50,00");
          params.productPrice_lte = parsePriceParam("R$ 100,00");
          break;
        case "over-100":
          params.productPrice_gte = parsePriceParam("R$ 100,00");
          break;
      }
    }

    const response = await api.get("/products", { params });

    return {
      data: response.data,
      total: Number(response.headers["x-total-count"]) || 0,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao carregar produtos",
    );
  }
};
