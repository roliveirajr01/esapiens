import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTop({ show, theme }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 ${
        theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
      }`}
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  );
}
