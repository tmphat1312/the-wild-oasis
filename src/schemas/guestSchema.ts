import { z } from "zod";

export const guestSchema = z.object({
  id: z.number().positive(),
  full_name: z.string(),
  email: z.string().email(),
  nationality: z.string(),
  national_id: z.string(),
  country_flag: z.string(),
});

export type GuestValues = z.infer<typeof guestSchema>;
