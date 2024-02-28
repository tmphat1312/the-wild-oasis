import { twMerge } from "tailwind-merge";
import { differenceInDays, parseISO } from "date-fns";
import { composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

export function subtractDates(date1: string | Date, date2: string | Date) {
  return differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
}

export const focusRing = tv({
  base: "outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}
