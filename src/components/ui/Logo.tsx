import logoSrc from "@/assets/images/logo-light.png";
import { classnames } from "@/lib/classnames";

type LogoProps = React.ComponentPropsWithoutRef<"div">;

export function Logo(props: LogoProps) {
  return (
    <div className={classnames("grid justify-items-center", props.className)}>
      <img
        height={84}
        src={logoSrc}
        alt="Logo of the app"
        className="max-h-[84px]"
      />
    </div>
  );
}
