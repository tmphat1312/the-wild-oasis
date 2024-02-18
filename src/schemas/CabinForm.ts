import { z } from "zod";

export const cabinFormSchema = z.object({
  // image: z.string().url(),
  name: z.string(),
  description: z.string(),
  max_capacity: z.coerce.number().int().min(1),
  regular_price: z.coerce.number().min(1),
  discount: z.coerce.number().positive().optional(),
});

export type CabinFormValues = z.infer<typeof cabinFormSchema>;
