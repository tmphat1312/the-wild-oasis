import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import { FieldSeparator } from "@/components/ui/form/FieldSeparator";
import { useForm } from "react-hook-form";
import { useUser } from "../auth/useUser";
import { FullLoadingIndicator } from "@/components/ui/FullLoadingIndicator";
import { useUpdateUserData } from "./useUpdateUserData";

interface UpdateUserDataFormData {
  full_name: string;
}

export function UpdateUserDataForm() {
  const { isLoading: isLoadingUser, user } = useUser();
  const { isLoading: isUpdatingUserData, updateUserData } = useUpdateUserData();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: user?.user_metadata.full_name || "",
    },
  });

  function onSubmit(data: UpdateUserDataFormData) {
    updateUserData({ data });
  }

  if (isLoadingUser) {
    return <FullLoadingIndicator />;
  }

  return (
    <Section>
      <Heading>Update user data</Heading>
      <form
        className="rounded-md border bg-background p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
            disabled
            value={user?.email}
          />
        </div>
        <FieldSeparator />
        <div className="grid grid-cols-[18ch_minmax(10ch,28ch)_1fr] items-center gap-4">
          <label htmlFor="full-name" className="">
            Full name
          </label>
          <input
            type="text"
            {...register("full_name", { required: "Full name is required" })}
            id="full-name"
            className="w-full rounded-md border border-s-4 px-2.5 py-1.5"
            disabled={isUpdatingUserData}
          />
          <p className="text-sm text-red-500 first-letter:capitalize">
            {errors.full_name?.message}
          </p>
        </div>
        <FieldSeparator />
        <div className="space-x-3 text-end">
          <button
            disabled={isUpdatingUserData}
            className="rounded border bg-gray-50 px-3.5 py-2.5 text-sm"
            type="reset"
          >
            Cancel
          </button>
          <button
            disabled={isUpdatingUserData}
            type="submit"
            className="rounded border bg-brand-600 px-3.5 py-2.5 text-sm text-brand-50"
          >
            Create new user
          </button>
        </div>
      </form>
    </Section>
  );
}
