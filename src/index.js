import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import axiosInstance from "./Api/axiosConfig";
import { store } from "./store";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <App axiosInstance={axiosInstance} />
  </Provider>
);
