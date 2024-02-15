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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const settingsFormSchema = z.object({
  min_booking_length: z.coerce
    .number()
    .min(1, {
      message: "Minimum nights per booking must be at least 1",
    })
    .max(365, {
      message: "Minimum nights per booking must be at most 365",
    }),
  max_booking_length: z.coerce
    .number()
    .min(1, {
      message: "Maximum nights per booking must be at least 1",
    })
    .max(365, {
      message: "Maximum nights per booking must be at most 365",
    }),
  max_guests_per_booking: z.coerce
    .number()
    .min(1, {
      message: "Maximum guests per booking must be at least 1",
    })
    .max(100, {
      message: "Maximum guests per booking must be at most 100",
    }),
  breakfast_price: z.coerce.number().gte(0, {
    message: "Breakfast price must be at least 0",
  }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  min_booking_length: 1,
  max_booking_length: 365,
  max_guests_per_booking: 1,
  breakfast_price: 0,
};

export default function UpdateSettingsForm() {
  const form = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  function onSubmit() {
    console.log("submit");
  }

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

        <div className="space-x-4 text-end">
          <Button type="submit">Save settings</Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => form.reset(defaultValues)}
            disabled={!form.formState.isDirty}
          >
            Discard changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
