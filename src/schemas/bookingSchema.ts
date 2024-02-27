import { z } from "zod";
import { guestSchema } from "./guestSchema";
import { cabinSchema } from "./cabinSchema";

export const bookingStatusEnum = z.enum([
  "unconfirmed",
  "checked out",
  "checked in",
]);

export type BookingStatus = z.infer<typeof bookingStatusEnum>;

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

export const bookingDetailSchema = bookingSchema.extend({
  has_breakfast: z.boolean(),
  is_paid: z.boolean(),
  observations: z.string().optional().default(""),
  cabins: cabinSchema,
  guests: guestSchema,
});

export type BookingDetailValues = z.infer<typeof bookingDetailSchema>;

export const statisticsBookingSchema = bookingSchema
  .pick({
    created_at: true,
    id: true,
    status: true,
    start_date: true,
    no_nights: true,
    guests: true,
    total_due: true,
  })
  .extend({
    extra_price: z.number().default(0),
    is_paid: z.boolean(),
  });

export type StatisticsBookingValues = z.infer<typeof statisticsBookingSchema>;

export const statisticsBookingArraySchema = z.array(statisticsBookingSchema);
