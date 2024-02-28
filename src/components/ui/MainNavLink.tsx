import { classnames } from "@/lib/classnames";
import { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

type MainNavLinkProps = React.ComponentProps<typeof NavLink> & {
  icon: LucideIcon;
  label: string;
};

export default function MainNavLink({
  className,
  icon: Icon,
  label,
  ...props
}: MainNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        classnames(
          "flex items-center gap-3 rounded-sm px-4 py-3 font-medium",
          "hover:bg-gray-50 [&:hover_svg]:stroke-brand-600",
          isActive && "bg-gray-50 [&_svg]:stroke-brand-600",
          className,
        )
      }
      {...props}
    >
      <Icon size={22} className="text-gray-500" />
      <span className="line-clamp-1 min-w-[12ch] max-w-[18ch]">{label}</span>
    </NavLink>
  );
}
