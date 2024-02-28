import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import { FieldSeparator } from "@/components/ui/form/FieldSeparator";
import { useForm } from "react-hook-form";
import { useUpdateUserPassword } from "./useUpdateUserPassword";

type UpdateUserDataFormData = {
  newPassword: string;
};

export function UpdateUserPasswordForm() {
  const { isLoading: isUpdatingUserPassword, updateUserPassword } =
    useUpdateUserPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit({ newPassword }: UpdateUserDataFormData) {
    updateUserPassword({ newPassword });
  }

  return (
    <Section>
      <Heading>Update password</Heading>
      <form
        className="rounded-md border bg-background p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
          <label htmlFor="new-password">New password</label>
          <input
            type="password"
            {...register("newPassword", {
              required: "new password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            id="new-password"
            className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
            disabled={isUpdatingUserPassword}
          />
          <p className="text-sm text-red-500 first-letter:capitalize">
            {errors.newPassword?.message}
          </p>
        </div>
        <FieldSeparator />
        <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "confirm password is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            })}
            id="confirm-password"
            className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
            disabled={isUpdatingUserPassword}
          />
          <p className="text-sm text-red-500 first-letter:capitalize">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <FieldSeparator />
        <div className="space-x-3 text-end">
          <button
            disabled={isUpdatingUserPassword}
            className="rounded border bg-gray-50 px-3.5 py-2.5 text-sm"
            type="reset"
          >
            Cancel
          </button>
          <button
            disabled={isUpdatingUserPassword}
            type="submit"
            className="rounded border bg-brand-600 px-3.5 py-2.5 text-sm text-brand-50"
          >
            Save changes
          </button>
        </div>
      </form>
    </Section>
  );
}
