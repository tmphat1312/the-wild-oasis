import { classnames } from "@/lib/classnames";

type SkeletonProps = React.ComponentProps<"div">;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={classnames("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
