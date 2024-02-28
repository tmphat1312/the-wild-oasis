import { classnames } from "@/lib/classnames";
import { tv } from "tailwind-variants";

const colorVariants = tv({
  variants: {
    variant: {
      success: "bg-green-100 text-green-800",
      info: "bg-blue-100 text-blue-800",
      warning: "bg-yellow-100 text-yellow-800",
      danger: "bg-red-100 text-red-800",
      muted: "bg-gray-200 text-gray-800",
    },
  },
});

export type TagColor = keyof typeof colorVariants.variants.variant;

type TagProps = React.ComponentProps<"span"> & {
  color: TagColor;
};

export function Tag({ color, ...props }: TagProps) {
  return (
    <span
      className={classnames(
        "rounded-full px-2 py-1 text-xs font-semibold uppercase",
        colorVariants({ variant: color }),
      )}
      {...props}
    />
  );
}
