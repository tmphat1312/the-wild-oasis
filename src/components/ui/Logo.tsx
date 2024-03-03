import logoSrc from "@/assets/images/logo.png";
import { classnames } from "@/lib/classnames";
import { Link } from "react-router-dom";

type LogoProps = React.ComponentPropsWithoutRef<"div">;

export function Logo(props: LogoProps) {
  return (
    <div className={classnames("grid justify-items-center", props.className)}>
      <Link to="/">
        <img
          height={84}
          src={logoSrc}
          alt="Logo of the app"
          className="max-h-[84px]"
        />
      </Link>
    </div>
  );
}
