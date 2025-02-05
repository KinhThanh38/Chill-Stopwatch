import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

// Hàm render cho SSR
export function render() {
  const appHtml = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return {
    html: appHtml,
    state: store.getState(), // Truyền state từ server về client để hydrate
  };
}
