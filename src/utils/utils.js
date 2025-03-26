export const parsePrice = (priceString) => {
  return parseFloat(
    priceString.replace("R$ ", "").replace(/\./g, "").replace(",", "."),
  );
};
