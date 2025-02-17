import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./utils/i18n.js";
import store from "./redux/store.js";
import { Provider } from "react-redux";

// Kiểm tra xem có SSR hay không để chọn phương thức render phù hợp
// const rootElement = document.getElementById("root");


// Hydrate khi SSR đã render trước đó
ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <Provider store={store}>
    <App />
  </Provider>
);

