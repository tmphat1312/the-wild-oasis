import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type MainNavLinkProps = React.ComponentProps<typeof NavLink> & {
  icon: IconType;
  label: string;
};

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
          "flex items-center gap-2 px-5 py-3.5 font-medium rounded-sm transition-colors",
          "hover:bg-gray-50 [&:hover_svg]:stroke-brand-600",
          isActive && "bg-gray-50 [&_svg]:stroke-brand-600",
          className,
        )
      }
      {...props}
    >
      {icon({ size: 20 })}
      <span>{label}</span>
    </NavLink>
  );
}
