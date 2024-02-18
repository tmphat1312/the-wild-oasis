import z from "zod";

export const settingSchema = z.object({
  min_booking_length: z.coerce
    .number()
    .min(1, {
      message: "Minimum nights per booking must be at least 1",
    })
    .max(365, {
      message: "Minimum nights per booking must be at most 365",
    }),
  max_booking_length: z.coerce
    .number()
    .min(1, {
      message: "Maximum nights per booking must be at least 1",
    })
    .max(365, {
      message: "Maximum nights per booking must be at most 365",
    }),
  max_guests_per_booking: z.coerce
    .number()
    .min(1, {
      message: "Maximum guests per booking must be at least 1",
    })
    .max(100, {
      message: "Maximum guests per booking must be at most 100",
    }),
  breakfast_price: z.coerce.number().gte(0, {
    message: "Breakfast price must be at least 0",
  }),
});

export type SettingValues = z.infer<typeof settingSchema>;
