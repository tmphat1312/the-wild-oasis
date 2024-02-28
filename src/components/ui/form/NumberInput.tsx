import { ChevronDownIcon, ChevronUpIcon } from "@/components/Icons";
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
import { focusRing } from "@/lib/utils";
import { classnames } from "@/lib/classnames";

type NumberFieldProps = RACNumberFieldProps & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: "horizontal" | "vertical";
};

const input = tv({
  extend: focusRing,
  base: "border-0 border-s-[3px] rounded-xs",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

const numberFieldVariants = tv({
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

export function NumberField({
  label,
  description,
  errorMessage,
  orientation = "horizontal",
  ...props
}: NumberFieldProps) {
  return (
    <RACNumberField {...props} className={numberFieldVariants({ orientation })}>
      <Label
        className={classnames(orientation == "horizontal" ? "w-[24ch]" : "")}
      >
        {label}
      </Label>
      <FieldGroup className="max-w-72">
        {(renderProps) => (
          <Fragment>
            <Input className={input} />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                class: "flex flex-col border-s-2",
              })}
            >
              <StepperButton slot="increment">
                <ChevronUpIcon aria-hidden className="size-4" />
              </StepperButton>
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  class: "border-b-2",
                })}
              />
              <StepperButton slot="decrement">
                <ChevronDownIcon aria-hidden className="size-4" />
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
