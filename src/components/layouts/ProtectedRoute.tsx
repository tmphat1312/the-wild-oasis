import { useUser } from "@/pages/auth/useUser";
import { FullLoadingIndicator } from "../ui/FullLoadingIndicator";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return (
      <div className="h-dvh">
        <FullLoadingIndicator />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
