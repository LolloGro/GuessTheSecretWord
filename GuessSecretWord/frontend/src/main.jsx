import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if (document.getElementById("findMe")) {
  createRoot(document.getElementById("findMe")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
