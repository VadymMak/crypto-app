import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store"; // Import the store

import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
