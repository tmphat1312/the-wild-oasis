import logoSrc from "@/assets/images/logo-light.png";
import { cn } from "@/lib/utils";

interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {}

export default function Logo(props: LogoProps) {
  return (
    <div className={cn("grid justify-items-center", props.className)}>
      <img
        height={84}
        src={logoSrc}
        alt="Logo of the app"
        className="max-h-[84px]"
      />
    </div>
  );
}
