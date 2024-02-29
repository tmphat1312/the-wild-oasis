import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import { BookingTable } from "./BookingTable";
import { BookingTableOperations } from "./BookingTableOperations";

export default function Bookings() {
  return (
    <Section className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading className="mb-0">Bookings</Heading>
        <BookingTableOperations />
      </div>
      <BookingTable />
    </Section>
  );
}
