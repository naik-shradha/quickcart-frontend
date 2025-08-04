// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUserAndCart } from "./redux/loadUserAndCart"; // ✅ does both setUser and setCart


loadUserAndCart(store); // ✅ Do not call loadUserFromStorage separately

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
