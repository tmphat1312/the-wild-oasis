import { Button } from "@/components/ui/Button";
import { FormSkeleton } from "@/components/ui/FormSkeleton";
import { ButtonField } from "@/components/ui/form/ButtonField";
import { Checkbox } from "@/components/ui/form/Checkbox";
import { CheckboxField } from "@/components/ui/form/CheckboxField";
import { FieldError } from "@/components/ui/form/FieldError";
import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { Select } from "@/components/ui/form/Select";
import { TextArea } from "@/components/ui/form/TextArea";
import { TextAreaField } from "@/components/ui/form/TextAreaField";
import { FORM_RULES } from "@/lib/constants";
import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { useCreateBookingData } from "./useCreateBookingData";

type FormSchema = {
  full_name: string;
  email: string;
  no_nights: number;
  no_guests: number;
  start_date: Date;
  cabin_id: number;
  observations: string;
  has_breakfast: boolean;
  is_paid: boolean;
};

export function CreateBookingForm() {
  const { isLoading, cabins, settings } = useCreateBookingData();
  const { isCreating, createBooking } = useCreateBooking();
  const form = useForm<FormSchema>({
    defaultValues: {
      no_nights: 0,
      no_guests: 0,
      has_breakfast: false,
      is_paid: false,
    },
  });

  function onSubmit(data: FormSchema) {
    const selectedCabin = cabins.find((cabin) => cabin.id === data.cabin_id);
    const noPeople = data.no_guests + 1;

    if (!selectedCabin) {
      return;
    }

    const discount = selectedCabin.discount ?? 0;
    const end_date = addDays(data.start_date, data.no_nights);
    const extra_price = data.has_breakfast
      ? settings.breakfast_price * noPeople
      : 0;
    const cabin_price = selectedCabin.regular_price - discount;
    const total_due = cabin_price * data.no_nights * noPeople + extra_price;

    createBooking({
      newBooking: {
        ...data,
        start_date: data.start_date.toISOString(),
        end_date: new Date(end_date).toISOString(),
        cabin_price,
        total_due,
        extra_price,
      },
    });
  }

  if (isLoading) {
    return <FormSkeleton />;
  }

  const cabinOptions = cabins.map((cabin) => ({
    label: cabin.name,
    value: cabin.id,
  }));
  const noPeople = (form.watch("no_guests") ?? 0) + 1;
  const noNights = form.watch("no_nights") ?? settings.min_booking_length;
  const selectedCabin = cabins.find(
    (cabin) => cabin.id == form.watch("cabin_id"),
  );
  const cabinPrice = selectedCabin?.regular_price ?? 0;
  const cabinDiscount = selectedCabin?.discount ?? 0;
  const extraPrice = form.watch("has_breakfast")
    ? settings.breakfast_price * noPeople
    : 0;
  const totalDue =
    (cabinPrice - cabinDiscount) * noNights * noPeople + extraPrice;

  const errors = form.formState.errors;

  return (
    <Form
      className="box p-12"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isCreating}
    >
      <FormField>
        <Label>Full name</Label>
        <Input {...form.register("full_name", FORM_RULES.full_name)} />
        <FieldError>{errors.full_name?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Email</Label>
        <Input {...form.register("email", FORM_RULES.email)} />
        <FieldError>{errors.email?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Start date</Label>
        <Input
          type="date"
          {...form.register("start_date", {
            valueAsDate: true,
            required: "Please select a start date",
            validate: (value) => {
              if (value < new Date(new Date().setUTCHours(0, 0, 0, 0))) {
                return "Start date must be in the future";
              }
              return true;
            },
          })}
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        <FieldError>{errors.start_date?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>
          How many nights? [{settings.min_booking_length},
          {settings.max_booking_length}]
        </Label>
        <Input
          type="number"
          {...form.register("no_nights", {
            valueAsNumber: true,
            required: "Please enter the number of nights",
            min: {
              value: settings.min_booking_length,
              message: `Minimum number of nights is ${settings.min_booking_length}`,
            },
            max: {
              value: settings.max_booking_length,
              message: `Maximum number of nights is ${settings.max_booking_length}`,
            },
          })}
          min={0}
        />
        <FieldError>{errors.no_nights?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>How many guests? [0, {settings.max_guests_per_booking}]</Label>
        <Input
          type="number"
          {...form.register("no_guests", {
            valueAsNumber: true,
            required: "Please enter the number of guests",
            min: {
              value: 0,
              message: "Minimum number of guests is 0",
            },
            max: {
              value: settings.max_guests_per_booking,
              message: `Maximum number of guests is ${settings.max_guests_per_booking}`,
            },
          })}
          min={0}
        />
        <FieldError>{errors.no_guests?.message}</FieldError>
      </FormField>

      <FormField>
        <Label>Cabin</Label>
        <Select
          options={cabinOptions}
          {...form.register("cabin_id", {
            valueAsNumber: true,
            required: "Please select a cabin",
          })}
          defaultValue={cabinOptions[0].value}
        />
        <FieldError>{errors.cabin_id?.message}</FieldError>
      </FormField>
      <TextAreaField>
        <Label>Additional notes</Label>
        <TextArea {...form.register("observations")} />
        <FieldError>{errors.observations?.message}</FieldError>
      </TextAreaField>
      <CheckboxField>
        <Checkbox {...form.register("has_breakfast")} />
        <Label>Breakfast for your stay?</Label>
        <FieldError>{errors.has_breakfast?.message}</FieldError>
      </CheckboxField>
      <CheckboxField>
        <Checkbox {...form.register("is_paid")} />
        <Label>Confirm guests have paid</Label>
        <FieldError>{errors.is_paid?.message}</FieldError>
      </CheckboxField>

      <ButtonField className="flex items-center justify-between">
        <div className="flex flex-col gap-1 text-sm">
          <span>
            Cabin price: <strong>${cabinPrice}</strong>
          </span>
          <span>
            Breakfast price: <strong>${extraPrice}</strong>
          </span>
          <span>
            Total due: <strong>${totalDue}</strong>
          </span>
        </div>
        <div className="space-x-3">
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Create booking</Button>
        </div>
      </ButtonField>
    </Form>
  );
}
