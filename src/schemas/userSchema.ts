import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  role: z.enum([
    "authenticated",
    "postgres",
    "anon",
    "authenticator",
    "server_role",
  ]),
});

export type UserValues = z.infer<typeof userSchema>;
