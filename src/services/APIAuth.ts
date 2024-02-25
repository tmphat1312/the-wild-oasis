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

export async function logoutUser() {
  const { error } = await buildAuthAPIClient().signOut();

  if (error) {
    console.log(error);
    throw Error("Failed to log out");
  }
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

interface SignUpUserArgs {
  email: string;
  password: string;
  full_name: string;
}
export async function signUpUser({
  email,
  password,
  full_name,
}: SignUpUserArgs) {
  const { error } = await buildAuthAPIClient().signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  });

  if (error) {
    console.log(error);

    if (error.status === 400) {
      throw Error("Invalid sign up credentials. Please try again.");
    }

    throw error;
  }
}
