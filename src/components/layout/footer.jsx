import { useStore } from "@/store/useStore";

export default function Footer() {
  const { theme } = useStore();

  return (
    <footer
      className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"} py-8`}
      aria-labelledby="footer-heading"
    >
      <div className="container mx-auto px-4">
        <h2 id="footer-heading" className="sr-only">
          Informações da empresa
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span
                className={`text-2xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
              >
                eSapiens
              </span>
              <span className="ml-2 text-sm">Tecnologia e Inovação</span>
            </div>
            <p className="mt-2 text-sm">CNPJ: 12.345.678/0001-99</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} eSapiens. Todos os direitos
              reservados.
            </p>
            <p className="text-xs mt-1">
              Desenvolvido com React, Vite e Tailwind CSS
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs">
          <p>Este é um projeto demonstrativo. Dados fictícios para testes.</p>
        </div>
      </div>
    </footer>
  );
}
