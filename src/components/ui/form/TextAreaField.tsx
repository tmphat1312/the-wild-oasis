import { cn, focusRing } from "@/lib/utils";
import { fieldBorderStyles } from "@/styles/fieldBorderStyles";
import {
  TextField as RACTextField,
  TextFieldProps as RACTextFieldProps,
  TextArea,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";

const inputStyles = tv({
  extend: focusRing,
  base: "border-2 border-s-4 rounded-md max-w-[28ch] w-full",
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

type TextAreaFieldProps = RACTextFieldProps & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: "horizontal" | "vertical";
};

export function TextAreaField({
  label,
  description,
  errorMessage,
  orientation = "horizontal",
  ...props
}: TextAreaFieldProps) {
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
      <TextArea className={inputStyles} rows={4} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
