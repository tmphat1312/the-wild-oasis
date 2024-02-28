import { classnames } from "@/lib/classnames";
import Logo from "../ui/Logo";
import MainNav from "./MainNav";

type SidebarProps = React.ComponentProps<"aside">;

export default function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={classnames("space-y-8 bg-background px-4 py-12", className)}
      {...props}
    >
      <Logo />
      <MainNav />
    </aside>
  );
}
