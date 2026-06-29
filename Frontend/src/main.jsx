import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app/app.routes.jsx";
import "./app/App.css";
import { Provider } from "react-redux";
import { store } from "./app/app.store.js";
import { ToastProvider } from "./shared/toast/ToastContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastProvider>
      <RouterProvider router={routes} />
    </ToastProvider>
  </Provider>,
);
