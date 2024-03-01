import { z } from "zod";

export const CabinSchema = z.object({
  image: z.string().url(),
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string(),
  max_capacity: z.number().int().positive(),
  regular_price: z.number().positive(),
  discount: z.number().min(0).nullable().default(0),
});

export const cabinsSchema = z.array(CabinSchema);

export type CabinType = z.infer<typeof CabinSchema>;
export type CabinInput = z.infer<typeof CabinSchema>;
