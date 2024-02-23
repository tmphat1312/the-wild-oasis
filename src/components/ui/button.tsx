import { tv } from "tailwind-variants";
import {
  Button as RACButton,
  ButtonProps as RACButtonProps,
  composeRenderProps,
} from "react-aria-components";

interface ButtonProps extends RACButtonProps {
  variant?: keyof typeof buttonVariants.variants.variant;
}

const buttonVariants = tv({
  base: "px-4 py-3 text-sm text-center transition rounded-md border border-black/10 ",
  variants: {
    variant: {
      primary: "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white",
      secondary:
        "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800",
      destructive: "bg-red-700 hover:bg-red-800 active:bg-red-900 text-white",
      icon: "border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] active:bg-black/10 dark:text-zinc-400 disabled:bg-transparent",
    },
    isDisabled: {
      true: "disabled:bg-gray-100 disabled:text-gray-300 disabled:border-black/5",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonVariants({ ...renderProps, variant: props.variant, className }),
      )}
    />
  );
}
