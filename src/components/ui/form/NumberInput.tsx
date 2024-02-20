import { ChevronDown, ChevronUp } from "lucide-react";
import { Fragment } from "react";
import {
  NumberField as RACNumberField,
  NumberFieldProps as RACNumberFieldProps,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "@/components/ui/form/Field";
import { fieldBorderStyles } from "@/styles/fieldBorderStyles";
import { StepperButton } from "./StepperButton";

interface NumberFieldProps extends RACNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: "horizontal" | "vertical";
}

const numberFieldVariants = tv({
  base: "flex group last-of-type:mb-16",
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

export function NumberField({
  label,
  description,
  errorMessage,
  orientation,
  ...props
}: NumberFieldProps) {
  return (
    <RACNumberField {...props} className={numberFieldVariants({ orientation })}>
      <Label className="w-[24ch]">{label}</Label>
      <FieldGroup className="max-w-72">
        {(renderProps) => (
          <Fragment>
            <Input className="border-s-4" />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                class: "flex flex-col border-s-2",
              })}
            >
              <StepperButton slot="increment">
                <ChevronUp aria-hidden className="size-4" />
              </StepperButton>
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  class: "border-b-2",
                })}
              />
              <StepperButton slot="decrement">
                <ChevronDown aria-hidden className="size-4" />
              </StepperButton>
            </div>
          </Fragment>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACNumberField>
  );
}