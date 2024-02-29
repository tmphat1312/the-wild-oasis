import { Section } from "@/components/layouts/Section";
import { BackButton } from "@/components/ui/BackButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FullLoadingIndicator } from "@/components/ui/FullLoadingIndicator";
import { Heading } from "@/components/ui/Heading";
import { Tag, TagColor } from "@/components/ui/Tag";
import { BookingStatus } from "@/schemas/BookingSchema";
import { useParams } from "react-router-dom";
import { BookingActions } from "./BookingActions";
import { BookingDetailCard } from "./BookingDetailCard";
import { useBooking } from "./useBooking";

const tagColors: Record<BookingStatus, TagColor> = {
  unconfirmed: "muted",
  "checked in": "success",
  "checked out": "info",
} as const;

export default function Booking() {
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

  const tagColor = tagColors[booking.status];

  return (
    <Section className="space-y-6">
      <div className="flex items-center gap-6">
        <Heading className="m-0">Booking #{booking.id}</Heading>
        <Tag color={tagColor}>{booking.status}</Tag>
        <BackButton className="ms-auto" variant="text" />
      </div>
      <BookingDetailCard booking={booking} />
      <BookingActions bookingId={booking.id} bookingStatus={booking.status} />
    </Section>
  );
}
