import { useUser } from "@/routes/auth/useUser";
import { FullLoadingIndicator } from "../ui/FullLoadingIndicator";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

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
