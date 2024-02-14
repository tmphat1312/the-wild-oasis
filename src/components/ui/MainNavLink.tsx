import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface MainNavLinkProps extends React.ComponentProps<typeof NavLink> {
  icon: IconType;
  label: string;
}

export default function MainNavLink({
  className,
  icon,
  label,
  ...props
}: MainNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex px-5 py-3.5 font-medium rounded-sm transition-colors",
          "hover:bg-gray-50 [&:hover_svg]:stroke-brand-600",
          isActive && "bg-gray-50 [&_svg]:stroke-brand-600",
          className,
        )
      }
      {...props}
    >
      {icon({ size: 24 })}
      <span className="ml-3">{label}</span>
    </NavLink>
  );
}
