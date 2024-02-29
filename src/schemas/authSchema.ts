import { z } from "zod";
import { UserSchema } from "./UserSchema";

export const SessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const AuthSchema = z.object({
  session: SessionSchema,
  user: UserSchema,
});
