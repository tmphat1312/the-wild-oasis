import { authSchema } from "@/schemas/authSchema";
import { buildAuthAPIClient } from "./APIClient";
import { userSchema } from "@/schemas/userSchema";

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

export async function getCurrentUser() {
  const { data: sessionData } = await buildAuthAPIClient().getSession();

  if (!sessionData.session) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await buildAuthAPIClient().getUser();

  if (error) {
    throw error;
  }

  return userSchema.parse(user);
}
