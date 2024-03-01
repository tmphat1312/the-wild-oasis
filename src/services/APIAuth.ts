import { AuthSchema } from "@/schemas/AuthSchema";
import { buildAuthAPIClient } from "./APIClient";
import { UserSchema } from "@/schemas/UserSchema";

type LoginUserArgs = {
  email: string;
  password: string;
};

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

  return AuthSchema.parse(data);
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

  return UserSchema.parse(user);
}

type SignUpUserArgs = {
  email: string;
  password: string;
  full_name: string;
};
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

type UpdateUserDataArgs = {
  data: {
    full_name: string;
  };
};

export async function updateUserData({ data }: UpdateUserDataArgs) {
  const { error } = await buildAuthAPIClient().updateUser({
    data,
  });

  if (error) {
    throw error;
  }
}

type UpdateUserPasswordArgs = {
  newPassword: string;
};

export async function updateUserPassword({
  newPassword,
}: UpdateUserPasswordArgs) {
  const { error } = await buildAuthAPIClient().updateUser({
    password: newPassword,
  });

  if (error) {
    throw error;
  }
}
