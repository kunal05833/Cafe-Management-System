import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
=======
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./styles/index.css";

// DEV error logger (helps surface silent errors)
if (import.meta.env.DEV) {
window.addEventListener("error", (e) => console.error("GlobalError:", e?.error || e?.message));
window.addEventListener("unhandledrejection", (e) => console.error("UnhandledRejection:", e?.reason));
}

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<Provider store={store}>
<App />
</Provider>
</React.StrictMode>
);
>>>>>>> 6428b2e (Updated UI and fixed bugs)
