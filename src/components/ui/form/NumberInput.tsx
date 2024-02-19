import { ChevronDown, ChevronUp } from "lucide-react";
import { Fragment } from "react";
import {
  NumberField as RACNumberField,
  NumberFieldProps as RACNumberFieldProps,
  ValidationResult,
} from "react-aria-components";

import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
  fieldBorderStyles,
} from "@/components/ui/form/Field";
import { composeTailwindRenderProps } from "@/lib/utils";
import { StepperButton } from "./StepperButton";

interface NumberFieldProps extends RACNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function NumberField({
  label,
  description,
  errorMessage,
  ...props
}: NumberFieldProps) {
  return (
    <RACNumberField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1",
      )}
    >
      <Label>{label}</Label>
      <FieldGroup>
        {(renderProps) => (
          <Fragment>
            <Input />
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
