import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/lib/toast";

import { OnlyPublicRoute } from "./components/layouts/OnlyPublicRoute";
import { ProtectedRoute } from "./components/layouts/ProtectedRoute";
import AppLayout from "./components/layouts/AppLayout";

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

const THIRTY_SECONDS = 30 * 1_000;
const THREE_SECONDS = 3 * 1_000;
const FIVE_SECONDS = 5 * 1_000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: THIRTY_SECONDS,
    },
  },
});

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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        containerClassName="m-2"
        gutter={12}
        toastOptions={{
          className: "px-6 py-3",
          success: {
            duration: THREE_SECONDS,
          },
          error: {
            duration: FIVE_SECONDS,
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
