import { tv } from "tailwind-variants";

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false:
        "border-gray-300 dark:border-zinc-500 forced-colors:border-[ButtonBorder]",
      true: "border-gray-600 dark:border-zinc-300 forced-colors:border-[Highlight]",
    },
    isInvalid: {
      true: "border-red-600 dark:border-red-600 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]",
    },
  },
});
