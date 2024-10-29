import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import axios from "axios";

const rootElement = document.getElementById("root")!;

export const httpInstance = axios.create({
  // baseURL: "https://admin.petarkocic.net/",
  baseURL: "http://localhost:9898/",
  timeout: 1000,
});

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
