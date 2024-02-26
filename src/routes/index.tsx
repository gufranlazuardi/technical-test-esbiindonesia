import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "@/pages/register";
import Login from "../pages/login";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}
