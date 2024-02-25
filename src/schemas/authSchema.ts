import { z } from "zod";
import { userSchema } from "./userSchema";

export const sessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const authSchema = z.object({
  session: sessionSchema,
  user: userSchema,
});

export type AuthValues = z.infer<typeof authSchema>;
