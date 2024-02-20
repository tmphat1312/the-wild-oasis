import {
  FieldErrorProps,
  Group,
  GroupProps,
  InputProps,
  LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Text,
  TextProps,
  composeRenderProps,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@/lib/utils";
import { fieldGroupStyles } from "@/styles/fieldGroupStyles";

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={cn(
        "w-fit cursor-default text-sm font-medium text-gray-500 dark:text-zinc-400",
        props.className,
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={cn("text-sm text-gray-600", props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-sm text-red-600 forced-colors:text-[Mark]",
      )}
    />
  );
}

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "min-w-0 flex-1 bg-white px-2 py-1.5 text-sm text-gray-800 outline outline-0 disabled:text-gray-200 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600",
      )}
    />
  );
}
