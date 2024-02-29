import { classnames } from "@/lib/classnames";
import { tv } from "tailwind-variants";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: keyof typeof buttonVariants.variants.variant;
};

const buttonVariants = tv({
  base: [
    "px-4 py-3 text-sm text-center rounded-md border",
    "hover:bg-opacity-90 hover:shadow-sm",
    "active:bg-opacity-100 active:shadow-none",
    "disabled:opacity-100 disabled:bg-gray-400 disabled:text-gray-50 disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      primary: "bg-brand-600 text-brand-50",
      secondary: "bg-gray-100 text-gray-600",
      destructive: "bg-red-600 text-red-50",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Button({ variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type={props.type || "button"}
      className={classnames(buttonVariants({ variant }), props.className)}
    />
  );
}
