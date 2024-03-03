import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import { CreateBookingForm } from "./CreateBookingForm";

export function CreateBooking() {
  return (
    <Section>
      <Heading>Add new booking</Heading>
      <CreateBookingForm />
    </Section>
  );
}
