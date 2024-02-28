import { classnames } from "@/lib/classnames";

type SkeletonProps = React.ComponentProps<"div">;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      role="presentation"
      {...props}
    />
  );
}

export { Skeleton };
