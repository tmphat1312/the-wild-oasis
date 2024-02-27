import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { AppLayout } from "@/components/layouts/AppLayout";
import { OnlyPublicRoute } from "@/components/layouts/OnlyPublicRoute";
import { ProtectedRoute } from "@/components/layouts/ProtectedRoute";

import Account from "@/pages/Account/Account";
import RootErrorBoundary from "@/pages/RootErrorBoundary";
import Login from "@/pages/auth/Login";
import Booking from "@/pages/booking/Booking";
import CheckIn from "@/pages/booking/CheckIn";
import Bookings from "@/pages/bookings/Bookings";
import Cabins from "@/pages/cabins/Cabins";
import Dashboard from "@/pages/dashboard/Dashboard";
import Settings from "@/pages/settings/Settings";
import Users from "@/pages/users/Users";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
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
        path: "bookings/:bookingId",
        element: <Booking />,
      },
      {
        path: "check-in/:bookingId",
        element: <CheckIn />,
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
    ],
  },
  {
    element: <OnlyPublicRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
