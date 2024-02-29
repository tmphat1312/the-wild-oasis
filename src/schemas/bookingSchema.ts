import { z } from "zod";
import { GuestSchema } from "./guestSchema";
import { CabinSchema } from "./CabinSchema";

export const bookingStatusEnum = z.enum([
  "unconfirmed",
  "checked out",
  "checked in",
]);

export type BookingStatus = z.infer<typeof bookingStatusEnum>;

export const BookingSchema = z.object({
  id: z.number().int().positive(),
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

export type BookingType = z.infer<typeof BookingSchema>;

export const BookingDetailSchema = BookingSchema.extend({
  has_breakfast: z.boolean(),
  is_paid: z.boolean(),
  observations: z.string().optional().default(""),
  cabins: CabinSchema,
  guests: GuestSchema,
});

export type BookingDetailType = z.infer<typeof BookingDetailSchema>;

export const StatisticsBookingSchema = BookingSchema.pick({
  created_at: true,
  id: true,
  status: true,
  start_date: true,
  no_nights: true,
  guests: true,
  total_due: true,
}).extend({
  extra_price: z.number().default(0),
  is_paid: z.boolean(),
});

export type StatisticsBookingType = z.infer<typeof StatisticsBookingSchema>;

export const StatisticsBookingArraySchema = z.array(StatisticsBookingSchema);

export const BookingActivitySchema = z.object({
  status: bookingStatusEnum,
  id: z.number(),
  no_guests: z.number(),
  guests: GuestSchema,
});

export type BookingActivityType = z.infer<typeof BookingActivitySchema>;

export const BookingActivityArraySchema = z.array(BookingActivitySchema);

export type BookingActivityArrayType = z.infer<
  typeof BookingActivityArraySchema
>;
