import { LogoutButton } from "@/routes/auth/LogoutButton";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { UserInfo } from "../ui/UserInfo";

export default function Header() {
  return (
    <header className="flex items-center justify-end gap-3 rounded-md border bg-background px-4 py-3">
      <UserInfo />
      <Link
        to="/account"
        className="inline-flex size-7 items-center rounded p-1 text-brand-600 hover:bg-brand-50 [&_svg]:text-current"
      >
        <User size={24} role="presentation" />
        <span className="sr-only">Go to account page</span>
      </Link>
      <LogoutButton />
    </header>
  );
}
