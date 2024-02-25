import { LogoutButton } from "@/pages/auth/LogoutButton";

export default function Header() {
  return (
    <header className="flex items-center justify-end rounded-md border bg-background px-4 py-3">
      <LogoutButton />
    </header>
  );
}
