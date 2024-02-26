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
  user_metadata: z.object({
    avatar: z.string().optional().default(""),
    full_name: z.string().optional().default("---"),
  }),
});

export type UserValues = z.infer<typeof userSchema>;
