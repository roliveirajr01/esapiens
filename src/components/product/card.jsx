import { useStore } from "@/store/useStore";

const CardProduct = ({ product }) => {
  const { theme } = useStore();

  return (
    <div
      className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <img
        src={product.productImg}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3
          className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
        >
          {product.productName}
        </h3>
        <p
          className={`text-sm mt-2 line-clamp-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        >
          {product.productDescription}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span
            className={`text-xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
          >
            {product.productPrice}
          </span>
          <button
            className={`${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded-lg transition-colors`}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
