import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import { BookingTable } from "./BookingTable";

export default function Bookings() {
  return (
    <Section>
      <Heading>Bookings</Heading>
      <BookingTable />
    </Section>
  );
}
