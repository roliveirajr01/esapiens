import React from "react";
import { render } from "@testing-library/react";
import App from "@/App";
import { useStore } from "@/store/useStore";
import { getProducts } from "@/services/api";
import { parsePrice } from "@/utils/utils";

jest.mock("@/store/useStore");
jest.mock("@/services/api");
jest.mock("@/utils/utils");

describe("App Component", () => {
  const mockProducts = [
    {
      productName: "iPhone 11",
      productDescription: "Apple iPhone 11 com 128GB",
      productImg:
        "https://st2.depositphotos.com/1017228/9399/i/450/depositphotos_93990140-stock-photo-cheerful-woman-showing-blank-smartphone.jpg",
      productPrice: "R$ 500,00",
    },
    {
      productName: "Lenovo Legion Pro",
      productDescription: "Lenovo Legion Pro com 512GB",
      productImg:
        "https://st2.depositphotos.com/1017228/9399/i/450/depositphotos_93990140-stock-photo-cheerful-woman-showing-blank-smartphone.jpg",
      productPrice: "R$ 490,00",
    },
  ];

  const mockLoadProducts = jest.fn();

  beforeEach(() => {
    useStore.mockReturnValue({
      products: [],
      loading: false,
      hasMore: true,
      error: null,
      searchTerm: "",
      priceFilter: null,
      theme: "dark",
      loadProducts: mockLoadProducts,
      actions: {
        incrementPage: jest.fn(),
        setSearchTerm: jest.fn(),
        setPriceFilter: jest.fn(),
        toggleTheme: jest.fn(),
      },
    });

    getProducts.mockResolvedValue({
      data: mockProducts,
      total: 2,
    });

    parsePrice.mockImplementation((price) => parseFloat(price));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Carregar produtos inicialmente", () => {
    render(<App />);
    expect(mockLoadProducts).toHaveBeenCalled();
  });
});
