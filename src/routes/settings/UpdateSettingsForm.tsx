import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/form/ButtonGroup";
import { Form } from "@/components/ui/form/Form";
import { NumberField } from "@/components/ui/form/NumberInput";
import { SettingValues, settingSchema } from "@/schemas/settingSchema";
import { useUpdateSettings } from "./useUpdateSettings";
import { FieldSeparator } from "@/components/ui/form/FieldSeparator";
import { toast } from "@/lib/toast";

type UpdateSettingsFormProps = {
  currentSettings: SettingValues;
};

export default function UpdateSettingsForm({
  currentSettings,
}: UpdateSettingsFormProps) {
  const { isUpdating, updateSettingsAsync } = useUpdateSettings();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newSettings = settingSchema.parse(data);

    toast.promise(updateSettingsAsync({ newSettings }), {
      loading: "Updating settings...",
      success: "Settings updated successfully",
      error: (error) => error.message || "Something went wrong",
    });
  }

  return (
    <Form
      className="rounded-md bg-background px-10 py-6 shadow"
      onSubmit={handleSubmit}
    >
      <NumberField
        name="min_booking_length"
        label="Minimum nights/booking"
        minValue={1}
        maxValue={365}
        isRequired
        defaultValue={currentSettings.min_booking_length}
      />

      <FieldSeparator />

      <NumberField
        name="max_booking_length"
        label="Maximum nights/booking"
        minValue={1}
        maxValue={365}
        isRequired
        defaultValue={currentSettings.max_booking_length}
      />

      <FieldSeparator />

      <NumberField
        name="max_guests_per_booking"
        label="Maximum guests/booking"
        isRequired
        minValue={1}
        maxValue={10}
        defaultValue={currentSettings.max_guests_per_booking}
      />

      <FieldSeparator />

      <NumberField
        name="breakfast_price"
        label="Breakfast price"
        isRequired
        minValue={1}
        defaultValue={currentSettings.breakfast_price}
      />

      <FieldSeparator />

      <ButtonGroup>
        <Button type="submit" isDisabled={isUpdating}>
          Save changes
        </Button>
      </ButtonGroup>
    </Form>
  );
}
