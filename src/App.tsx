import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { OnlyPublicRoute } from "./components/layouts/OnlyPublicRoute";
import { ProtectedRoute } from "./components/layouts/ProtectedRoute";
import AppLayout from "./components/layouts/AppLayout";
import { Toaster } from "@/components/ui/Toaster";

import RootErrorBoundary from "./pages/RootErrorBoundary";
import Dashboard from "./pages/dashboard/Dashboard";
import { CheckIn } from "./pages/booking/CheckIn";
import { Booking } from "./pages/booking/Booking";
import Bookings from "./pages/bookings/Bookings";
import Settings from "./pages/settings/Settings";
import Account from "./pages/Account/Account";
import Cabins from "./pages/cabins/Cabins";
import Users from "./pages/users/Users";
import Login from "./pages/auth/Login";

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

const THIRTY_SECONDS = 30 * 1_000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: THIRTY_SECONDS,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
