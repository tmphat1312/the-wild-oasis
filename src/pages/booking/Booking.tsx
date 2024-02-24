import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import { useParams } from "react-router-dom";
import { useBooking } from "./useBooking";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FullLoadingIndicator } from "@/components/ui/FullLoadingIndicator";
import { Tag, TagColor } from "@/components/ui/Tag";
import { BookingStatus } from "@/schemas/bookingSchema";
import { BackButton } from "@/components/ui/BackButton";
import { BookingDetailCard } from "./BookingDetailCard";

const tagColors: Record<BookingStatus, TagColor> = {
  unconfirmed: "muted",
  "checked in": "success",
  "checked out": "info",
} as const;

export function Booking() {
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
    <Section>
      <div className="mb-8 flex items-center gap-6">
        <Heading className="m-0">Booking #{booking.id}</Heading>
        <Tag color={tagColor}>{booking.status}</Tag>
        <BackButton className="ms-auto" variant="text" />
      </div>
      <BookingDetailCard booking={booking} />
    </Section>
  );
}
