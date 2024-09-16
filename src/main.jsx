import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
