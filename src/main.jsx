import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout>
      <Header />
      <App />
    </Layout>
  </StrictMode>,
);
