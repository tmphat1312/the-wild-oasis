import { classnames } from "@/lib/classnames";

type SkeletonProps = React.ComponentProps<"div">;

export function Skeleton(props: SkeletonProps) {
  return (
    <div
      role="presentation"
      {...props}
      className={classnames(
        "animate-pulse rounded-md bg-muted",
        props.className,
      )}
    />
  );
}
