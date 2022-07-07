import React from "react";
import ReactDOM from "react-dom/client";
import { invoke } from "@tauri-apps/api/tauri";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.addEventListener("DOMContentLoaded", () => {
  invoke("close_splashscreen");
});
