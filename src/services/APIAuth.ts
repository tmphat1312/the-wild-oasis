import { authSchema } from "@/schemas/authSchema";
import { buildAuthAPIClient } from "./APIClient";

interface LoginUserArgs {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginUserArgs) {
  const { data, error } = await buildAuthAPIClient().signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.status === 400) {
      throw Error("Invalid login credentials. Please try again.");
    }

    throw error;
  }

  return authSchema.parse(data);
}
