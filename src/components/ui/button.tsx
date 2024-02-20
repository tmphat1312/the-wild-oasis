import { tv } from "tailwind-variants";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof buttonVariants.variants.variant;
}

const buttonVariants = tv({
  base: [
    "px-5 py-2.5 text-sm text-center transition rounded-md border border-black/10 ",
    "disabled:bg-gray-100 disabled:text-gray-300 disabled:border-black/5",
  ],
  variants: {
    variant: {
      primary: "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white",
      secondary:
        "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800",
      destructive: "bg-red-700 hover:bg-red-800 active:bg-red-900 text-white",
      icon: "border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] active:bg-black/10 dark:text-zinc-400 disabled:bg-transparent",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonVariants({
        variant: props.variant,
        class: props.className,
      })}
    />
  );
}
