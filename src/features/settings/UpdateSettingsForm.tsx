import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  SettingsFormValues,
  settingsFormSchema,
} from "@/schemas/UpdateSettingsForm";
import { updateSettings } from "@/services/apiSettings";

const defaultValues: SettingsFormValues = {
  min_booking_length: 1,
  max_booking_length: 365,
  max_guests_per_booking: 10,
  breakfast_price: 10,
};

interface UpdateSettingsFormProps {
  currentSettings: SettingsFormValues | undefined;
}

export default function UpdateSettingsForm({
  currentSettings,
}: UpdateSettingsFormProps) {
  const { isPending: isUpdating, mutate } = useMutation({
    mutationFn: updateSettings,
    mutationKey: ["settings"],
    onSuccess: () => {
      alert("Settings updated"); // TODO: Add toast
    },
    onError: (error) => {
      alert(error.message); // TODO: Add toast
    },
  });
  const form = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: currentSettings || defaultValues,
    mode: "onBlur",
  });

  function onSubmit(values: SettingsFormValues) {
    mutate({ newSettings: values });
  }

  const isButtonDisabled = isUpdating || !form.formState.isDirty;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 space-y-6 rounded-md shadow-sm bg-background"
      >
        <FormField
          control={form.control}
          name="min_booking_length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum nights/booking</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={1} max={365} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max_booking_length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum nights/booking</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={1} max={365} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max_guests_per_booking"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum guests/booking</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={1} max={100} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breakfast_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breakfast price</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: Create form button context (value = {isLoading, isDisabled}) */}
        <div className="space-x-4 text-end">
          <Button type="submit" disabled={isButtonDisabled}>
            Save settings
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => form.reset(defaultValues)}
            disabled={isButtonDisabled}
          >
            Discard changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
