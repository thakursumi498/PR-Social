import React from "react";
import ReactDOM from "react-dom/client";   // ✅ corrected
// import App from "./App"; // keep pointing to App.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
