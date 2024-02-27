import { clsx, type ClassValue } from "clsx";
import { differenceInDays, parseISO } from "date-fns";
import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export function subtractDates(date1: string | Date, date2: string | Date) {
  return differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ts({
  state,
  className,
}: {
  state: string;
  className: string | Array<string>;
}) {
  const classes = Array.isArray(className) ? className.join(" ") : className;

  return classes
    .split(" ")
    .map((c) => `${state}:${c}`)
    .join(" ");
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
