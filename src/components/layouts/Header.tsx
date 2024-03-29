import { Link } from "react-router-dom";

import { LogoutButton } from "@/routes/auth/LogoutButton";
import { UserInfo } from "@/routes/auth/UserInfo";
import { UserIcon } from "../Icons";

export function Header() {
  return (
    <header className="box flex items-center justify-end gap-3">
      <UserInfo />
      <Link
        to="/account"
        className="inline-flex size-7 items-center rounded p-1 text-brand-600 hover:bg-brand-50 [&_svg]:text-current"
      >
        <UserIcon size={24} role="presentation" />
        <span className="sr-only">Go to account page</span>
      </Link>
      <LogoutButton />
    </header>
  );
}
