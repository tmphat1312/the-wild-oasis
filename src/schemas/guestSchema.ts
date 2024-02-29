import { z } from "zod";

export const GuestSchema = z.object({
  id: z.number().positive(),
  full_name: z.string(),
  email: z.string().email(),
  nationality: z.string(),
  national_id: z.string(),
  country_flag: z.string(),
});

export type GuestType = z.infer<typeof GuestSchema>;
