import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Login from "../features/auth/page/Login.jsx";
import Register from "../features/auth/page/Register.jsx";
import Dashboard from "../features/chat/page/Dashboard.jsx";
import { EmptyState } from "../features/chat/components/ChatCanvas.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import SpecificChat from "../features/chat/page/SpecificChat.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <EmptyState />
          },
          {
            path: "chat/:chatId",
            element: <SpecificChat />
          }
        ]
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
  },
]);
