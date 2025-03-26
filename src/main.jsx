import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "@/components/layout/layout";
import Header from "@/components/layout/header/header";
import App from "./App";
import Footer from "./components/layout/footer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout>
      <Header />
      <App />
      <Footer />
    </Layout>
  </StrictMode>,
);
