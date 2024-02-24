import { cn } from "@/lib/utils";
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

interface TagProps extends React.ComponentProps<"span"> {
  color: TagColor;
}

export function Tag({ color, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-1 text-xs font-semibold uppercase",
        colorVariants({ variant: color }),
      )}
      {...props}
    />
  );
}
