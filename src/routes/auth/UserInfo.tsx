import { useUser } from "@/routes/auth/useUser";
import { Skeleton } from "../../components/ui/Skeleton";

export function UserInfo() {
  const { isLoading, user } = useUser();

  if (isLoading) {
    return <Skeleton className="h-7 w-24 rounded-full" />;
  }

  const { user_metadata } = user || {
    user_metadata: {
      full_name: "---",
    },
  };

  return <div className="text-sm font-medium">{user_metadata.full_name}</div>;
}
