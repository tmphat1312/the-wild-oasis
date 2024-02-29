import { LogOutIcon } from "@/components/Icons";
import { useLogout } from "./useLogout";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

export function LogoutButton() {
  const { isLoading, logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout} loading={isLoading}>
      <LogOutIcon role="presentation" size={20} />
      <span className="sr-only">logout</span>
    </ButtonIcon>
  );
}
