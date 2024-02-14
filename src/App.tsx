import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./components/layouts/AppLayout";
import RootErrorBoundary from "./pages/RootErrorBoundary";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Users from "./pages/Users";

const THIRTY_SECONDS = 30 * 1_000;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: THIRTY_SECONDS,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
    path: "login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
