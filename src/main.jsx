import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./App"; // endi `router` emas, `AppRouter` import qilinadi
import "./index.css"; // Styling bo‘lsa

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter /> {/* RouterProvider emas */}
  </React.StrictMode>
);
