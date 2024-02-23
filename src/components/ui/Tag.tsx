import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";

const colorVariants = tv({
  variants: {
    variant: {
      success: "bg-green-100 text-green-600",
      info: "bg-blue-100 text-blue-600",
      warning: "bg-yellow-100 text-yellow-600",
      danger: "bg-red-100 text-red-600",
      muted: "bg-gray-100 text-gray-600",
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
