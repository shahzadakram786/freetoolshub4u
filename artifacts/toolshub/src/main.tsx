import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
createRoot(root).render(<App />);

// Remove the loading spinner injected in index.html once React has hydrated
const loader = document.getElementById("app-loading");
if (loader) {
  loader.style.transition = "opacity 0.3s ease";
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 350);
}
