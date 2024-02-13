import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

type MainNavLinkProps = React.ComponentProps<typeof NavLink>;

export default function MainNavLink({ className, ...props }: MainNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex px-5 py-4 font-medium rounded-sm hover:bg-gray-50",
          isActive && "bg-gray-50",
          className,
        )
      }
      {...props}
    />
  );
}
