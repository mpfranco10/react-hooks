import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { hotjar } from "react-hotjar";

hotjar.initialize({ id: 5194295, sv: 2 });

// Identify the user
hotjar.identify("USER_ID", { userProperty: "value" });

// Add an event
hotjar.event("button-click");

// Update SPA state
hotjar.stateChange("/my/page");

// Check if Hotjar has been initialized before calling its methods
if (hotjar.initialized()) {
  console.log("initialized");
  hotjar.identify("USER_ID", { userProperty: "value" });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
