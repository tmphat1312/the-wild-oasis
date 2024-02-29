import { Section } from "@/components/layouts/Section";
import { Button } from "@/components/ui/Button";
import { FullLoadingIndicator } from "@/components/ui/FullLoadingIndicator";
import { Heading } from "@/components/ui/Heading";
import { ButtonField } from "@/components/ui/form/ButtonField";
import { FieldError } from "@/components/ui/form/FieldError";
import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { useForm } from "react-hook-form";
import { useUser } from "../auth/useUser";
import { useUpdateUserData } from "./useUpdateUserData";

type UpdateUserDataFormData = {
  full_name: string;
};

export function UpdateUserDataForm() {
  const { isLoading: isLoadingUser, user } = useUser();
  const { isLoading: isUpdatingUserData, updateUserData } = useUpdateUserData();
  const form = useForm({
    defaultValues: user?.user_metadata,
  });

  function onSubmit(data: UpdateUserDataFormData) {
    updateUserData({ data });
  }

  if (isLoadingUser) {
    return <FullLoadingIndicator />;
  }

  const errors = form.formState.errors;

  return (
    <Section>
      <Heading>Update user data</Heading>
      <Form
        className="box p-8"
        isSubmitting={isUpdatingUserData}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField>
          <Label>Email</Label>
          <Input type="email" value={user?.email} disabled />
        </FormField>
        <FormField>
          <Label>Full name</Label>
          <Input
            type="text"
            {...form.register("full_name", {
              required: "Full name is required",
            })}
          />
          <FieldError>{errors.full_name?.message}</FieldError>
        </FormField>

        <ButtonField>
          <Button
            variant="secondary"
            onClick={() => form.reset(user?.user_metadata)}
          >
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </ButtonField>
      </Form>
    </Section>
  );
}
