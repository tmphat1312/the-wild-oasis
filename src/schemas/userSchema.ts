import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  role: z.enum([
    "authenticated",
    "postgres",
    "anon",
    "authenticator",
    "server_role",
  ]),
  user_metadata: z.object({
    full_name: z.string().optional().default("---"),
  }),
});
