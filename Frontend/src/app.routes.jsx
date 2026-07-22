import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Terms from "./features/legal/pages/Terms";
import Privacy from "./features/legal/pages/Privacy";
import Help from "./features/legal/pages/Help";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    },
    {
        path: "/terms",
        element: <Terms />
    },
    {
        path: "/privacy",
        element: <Privacy />
    },
    {
        path: "/help",
        element: <Help />
    }
])