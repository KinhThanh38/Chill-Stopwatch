import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./utils/i18n.js";
import store from "./redux/store.js";
import { Provider } from "react-redux";

// Kiểm tra xem có SSR hay không để chọn phương thức render phù hợp
const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  // Hydrate khi SSR đã render trước đó
  ReactDOM.hydrateRoot(
    rootElement,
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  // CSR fallback khi không có SSR
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
