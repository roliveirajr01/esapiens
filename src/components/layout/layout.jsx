import { useStore } from "@/store/useStore";

const Layout = ({ children }) => {
  const { theme } = useStore();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {children}
    </div>
  );
};

export default Layout;
