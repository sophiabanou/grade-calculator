import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// handle localStorage clearing on new deployments
const APP_VERSION = "0.0.2";
const storedVersion = localStorage.getItem("app_version");

if (storedVersion !== APP_VERSION) {
    console.log("New version detected! Clearing localStorage...");
    localStorage.clear();
    localStorage.setItem("app_version", APP_VERSION);
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
