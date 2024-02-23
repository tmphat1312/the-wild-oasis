import { z } from "zod";

export const supabaseStorageDataSchema = z.object({
  id: z.string(),
  path: z.string(),
  fullPath: z.string(),
});

export type SupabaseStorageDataValues = z.infer<
  typeof supabaseStorageDataSchema
>;
