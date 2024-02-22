import { z } from "zod";

export const cabinSchema = z.object({
  image: z.string(),
  id: z.number().positive(),
  name: z.string(),
  description: z.string(),
  max_capacity: z.coerce.number().int().positive(),
  regular_price: z.coerce.number().positive(),
  discount: z.coerce.number().min(0).optional().default(0),
});

export const cabinsSchema = z.array(cabinSchema);

export type CabinValues = z.infer<typeof cabinSchema>;
