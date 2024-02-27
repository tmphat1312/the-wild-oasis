import defaultUserAvt from "@/assets/images/default-user.jpg";
import { useUser } from "@/routes/auth/useUser";
import { Skeleton } from "./Skeleton";

export function UserInfo() {
  const { isLoading, user } = useUser();

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <Skeleton className="size-7 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
    );
  }

  const { user_metadata } = user || {
    user_metadata: {
      avatar: "",
      full_name: "---",
    },
  };

  return (
    <div className="flex items-center gap-2">
      <img
        className="size-7 rounded-full border shadow-sm"
        src={user_metadata.avatar || defaultUserAvt}
        alt="user avatar"
      />
      <div className="text-sm font-medium">{user_metadata.full_name}</div>
    </div>
  );
}
