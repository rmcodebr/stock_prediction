import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <div className="bg-slate-900 h-screen text-slate-100">
    <StrictMode>
      <App />
    </StrictMode>
  </div>
);
