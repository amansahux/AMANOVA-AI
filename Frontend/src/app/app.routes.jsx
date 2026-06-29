import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Login from "../features/auth/page/Login.jsx";
import Register from "../features/auth/page/Register.jsx";
import Dashboard from "../features/chat/page/Dashboard.jsx";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]);