import z from "zod";

export const SettingSchema = z
  .object({
    min_booking_length: z.number().int().min(1),
    max_booking_length: z.number().int().min(1),
    max_guests_per_booking: z.number().int().min(1),
    breakfast_price: z.number().min(0),
  })
  .refine((value) => value.min_booking_length <= value.max_booking_length, {
    message:
      "Minimum nights per booking cannot be greater than maximum nights per booking",
  });

export type SettingType = z.infer<typeof SettingSchema>;
export type SettingInput = z.input<typeof SettingSchema>;
