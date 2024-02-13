import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RootErrorBoundary from "./pages/RootErrorBoundary";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/dashboard" />,
    errorElement: <RootErrorBoundary />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "bookings",
    element: <Bookings />,
  },
  {
    path: "cabins",
    element: <Cabins />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "account",
    element: <Account />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
