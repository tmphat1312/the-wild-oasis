import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { AppLayout } from "@/components/layouts/AppLayout";
import { OnlyPublicRoute } from "@/components/layouts/OnlyPublicRoute";
import { ProtectedRoute } from "@/components/layouts/ProtectedRoute";

import RootErrorBoundary from "./RootErrorBoundary";
import Account from "./account/Account";
import Login from "./auth/Login";
import Booking from "./booking/Booking";
import CheckIn from "./booking/CheckIn";
import Bookings from "./bookings/Bookings";
import Cabins from "./cabins/Cabins";
import Dashboard from "./dashboard/Dashboard";
import Settings from "./settings/Settings";
import Users from "./users/Users";
import { CreateBooking } from "./create-booking/CreateBooking";

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
        path: "bookings/create",
        element: <CreateBooking />,
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
