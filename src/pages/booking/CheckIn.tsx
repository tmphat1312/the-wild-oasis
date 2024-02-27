import Section from "@/components/layouts/Section";
import { BackButton } from "@/components/ui/BackButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FullLoadingIndicator } from "@/components/ui/FullLoadingIndicator";
import Heading from "@/components/ui/Heading";
import { useParams } from "react-router-dom";
import { BookingDetailCard } from "./BookingDetailCard";
import { CheckInActions } from "./CheckInActions";
import { useBooking } from "./useBooking";

export default function CheckIn() {
  const { bookingId } = useParams();
  const { isLoading, error, booking } = useBooking({
    bookingId: Number(bookingId),
  });

  if (error) {
    return (
      <ErrorMessage message={error.message || "Could not get the booking"} />
    );
  }

  if (isLoading) {
    return <FullLoadingIndicator />;
  }

  if (!booking) {
    return <ErrorMessage message="Booking not found" />;
  }

  return (
    <Section className="space-y-6">
      <div className="flex items-center gap-6">
        <Heading className="m-0 capitalize">
          Check In Booking #{booking.id}
        </Heading>
        <BackButton className="ms-auto" variant="text" />
      </div>
      <BookingDetailCard booking={booking} />
      {booking.status === "unconfirmed" && <CheckInActions booking={booking} />}
    </Section>
  );
}
