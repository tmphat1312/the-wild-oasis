import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { ButtonField } from "@/components/ui/form/ButtonField";
import { FieldError } from "@/components/ui/form/FieldError";
import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { SettingType } from "@/schemas/SettingSchema";
import { useUpdateSettings } from "./useUpdateSettings";

function mustBeInteger(value: number) {
  return value % 1 === 0 || "Must be an integer";
}

type Props = {
  currentSettings: SettingType;
};

export function UpdateSettingsForm({ currentSettings }: Props) {
  const { isUpdating, updateSettings } = useUpdateSettings();
  const form = useForm<SettingType>({
    defaultValues: currentSettings,
  });

  function onSubmit(data: SettingType) {
    updateSettings({ newSettings: data });
  }

  const errors = form.formState.errors;

  return (
    <Form
      className="box p-12"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isUpdating}
    >
      <FormField>
        <Label>Minimum nights/booking</Label>
        <Input
          {...form.register("min_booking_length", {
            valueAsNumber: true,
            required: "Minimum nights per booking is required",
            min: {
              value: 1,
              message: "Minimum nights per booking must be at least 1",
            },
            validate: mustBeInteger,
          })}
          type="number"
        />
        <FieldError>{errors.min_booking_length?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Maximum nights/booking</Label>
        <Input
          {...form.register("max_booking_length", {
            valueAsNumber: true,
            required: "Maximum nights per booking is required",
            min: {
              value: 1,
              message: "Maximum nights per booking must be at least 1",
            },
            validate: (value) => {
              if (value < form.getValues("min_booking_length")) {
                return "Maximum nights per booking cannot be less than minimum nights per booking";
              }
              if (value % 1 !== 0) {
                return "Must be an integer";
              }
            },
          })}
          type="number"
        />
        <FieldError>{errors.max_booking_length?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Maximum guests number</Label>
        <Input
          {...form.register("max_guests_per_booking", {
            valueAsNumber: true,
            required: "Maximum guests number is required",
            min: {
              value: 1,
              message: "Maximum guests number must be at least 1",
            },
            validate: mustBeInteger,
          })}
          type="number"
        />
        <FieldError>{errors.max_guests_per_booking?.message}</FieldError>
      </FormField>

      <FormField>
        <Label>Breakfast price</Label>
        <Input
          {...form.register("breakfast_price", {
            valueAsNumber: true,
            required: "Breakfast price is required",
            min: {
              value: 0,
              message: "Breakfast price must be at least 0",
            },
          })}
          type="number"
        />
        <FieldError>{errors.breakfast_price?.message}</FieldError>
      </FormField>

      <ButtonField>
        <Button variant="secondary" onClick={() => form.reset(currentSettings)}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </ButtonField>
    </Form>
  );
}
