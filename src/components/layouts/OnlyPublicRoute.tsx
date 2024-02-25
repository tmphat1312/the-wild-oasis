import { useUser } from "@/pages/auth/useUser";
import { FullLoadingIndicator } from "../ui/FullLoadingIndicator";
import { Navigate, Outlet } from "react-router-dom";

export function OnlyPublicRoute() {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return (
      <div className="h-dvh">
        <FullLoadingIndicator />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
