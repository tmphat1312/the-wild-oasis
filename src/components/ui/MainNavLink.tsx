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
          "flex items-center gap-2 rounded-sm px-4 py-3 font-medium",
          "hover:bg-gray-50 [&:hover_svg]:stroke-brand-600",
          isActive && "bg-gray-50 [&_svg]:stroke-brand-600",
          className,
        )
      }
      {...props}
    >
      {icon({ size: 22 })}
      <span className="min-w-[14ch]">{label}</span>
    </NavLink>
  );
}
