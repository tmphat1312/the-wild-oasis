import { cn, focusRing } from "@/lib/utils";
import { fieldBorderStyles } from "@/styles/fieldBorderStyles";
import {
  TextField as RACTextField,
  TextFieldProps as RACTextFieldProps,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Input, Label } from "./Field";

const inputStyles = tv({
  extend: focusRing,
  base: "border-2 border-s-4 rounded-md m-full max-w-[32ch]",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

const textFieldVariants = tv({
  base: "flex group",
  variants: {
    orientation: {
      horizontal: "items-center gap-4",
      vertical: "flex-col gap-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface TextFieldProps extends RACTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: "horizontal" | "vertical";
}

export function TextField({
  label,
  description,
  errorMessage,
  orientation = "horizontal",
  ...props
}: TextFieldProps) {
  return (
    <RACTextField
      {...props}
      className={cn(textFieldVariants({ orientation }), props.className)}
    >
      {label && (
        <Label className={cn(orientation == "horizontal" ? "w-[24ch]" : "")}>
          {label}
        </Label>
      )}
      <Input className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
