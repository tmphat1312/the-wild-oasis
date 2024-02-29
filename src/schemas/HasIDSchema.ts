import { z } from "zod";

export const HasIDSchema = z.object({
  id: z.number().int().positive(),
});
