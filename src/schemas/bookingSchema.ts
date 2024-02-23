import { z } from "zod";

export const bookingStatusEnum = z.enum([
  "unconfirmed",
  "checked out",
  "checked in",
]);

export const bookingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  no_nights: z.number(),
  no_guests: z.number(),
  status: bookingStatusEnum,
  total_due: z.number(),
  cabins: z.object({
    name: z.string(),
  }),
  guests: z.object({
    full_name: z.string(),
    email: z.string(),
  }),
});

export const bookingArraySchema = z.array(bookingSchema);

export type BookingValues = z.infer<typeof bookingSchema>;
