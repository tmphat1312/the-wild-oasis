import { FieldSeparator } from "@/components/ui/form/FieldSeparator";
import { useForm } from "react-hook-form";
import { useSignUpUser } from "./useSignUpUser";

type CreateUserFormFields = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export function CreateUserForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const { isLoading, signUp } = useSignUpUser();

  function onSubmit(data: CreateUserFormFields) {
    signUp(data, {
      onSuccess: () => reset(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border bg-background p-8"
    >
      <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
        <label htmlFor="full-name" className="">
          Full name
        </label>
        <input
          type="text"
          {...register("full_name", { required: "Full name is required" })}
          id="full-name"
          className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
          disabled={isLoading}
        />
        <p className="text-sm text-red-500 first-letter:capitalize">
          {errors.full_name?.message}
        </p>
      </div>
      <FieldSeparator />
      <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
        <label htmlFor="email" className="">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          id="email"
          className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
          disabled={isLoading}
        />
        <p className="text-sm text-red-500 first-letter:capitalize">
          {errors.email?.message}
        </p>
      </div>
      <FieldSeparator />
      <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
        <div>
          <label htmlFor="password" className="">
            Password
          </label>
          <p className="text-sm">(min 8 characters)</p>
        </div>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          id="password"
          className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
          disabled={isLoading}
        />
        <p className="text-sm text-red-500 first-letter:capitalize">
          {errors.email?.message}
        </p>
      </div>
      <FieldSeparator />
      <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
        <label htmlFor="confirm-password" className="">
          Repeat Password
        </label>
        <input
          type="password"
          {...register("confirm_password", {
            required: "Password confirmation is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          id="confirm-password"
          className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
          disabled={isLoading}
        />
        <p className="text-sm text-red-500 first-letter:capitalize">
          {errors.confirm_password?.message}
        </p>
      </div>
      <FieldSeparator />
      <div className="space-x-3 text-end">
        <button
          disabled={isLoading}
          className="rounded border bg-gray-50 px-3.5 py-2.5 text-sm"
          type="reset"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="rounded border bg-brand-600 px-3.5 py-2.5 text-sm text-brand-50"
        >
          Create new user
        </button>
      </div>
    </form>
  );
}
