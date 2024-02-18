import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";
import MainNav from "./MainNav";

type SidebarProps = React.ComponentProps<"aside">;

export default function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={cn("px-6 py-8 space-y-8 bg-background", className)}
      {...props}
    >
      <Logo />
      <MainNav />
    </aside>
  );
}
