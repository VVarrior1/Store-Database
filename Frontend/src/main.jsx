// "npm create vite@latest" was used to create a large portion of the initial Frontend framework
// such as the node_modules, public folder, main, .eslintric.cjs, index.html, package-lock.json, package.json, and vite.config.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
