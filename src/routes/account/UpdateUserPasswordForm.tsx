import { Section } from "@/components/layouts/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { ButtonField } from "@/components/ui/form/ButtonField";
import { FieldError } from "@/components/ui/form/FieldError";
import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { useForm } from "react-hook-form";
import { useUpdateUserPassword } from "./useUpdateUserPassword";

type UpdateUserDataFormData = {
  newPassword: string;
};

type FormSchema = {
  newPassword: string;
  confirmPassword: string;
};

export function UpdateUserPasswordForm() {
  const { isLoading: isUpdatingUserPassword, updateUserPassword } =
    useUpdateUserPassword();
  const form = useForm<FormSchema>();

  function onSubmit({ newPassword }: UpdateUserDataFormData) {
    updateUserPassword(
      { newPassword },
      {
        onSuccess: () => form.reset(),
      },
    );
  }

  const errors = form.formState.errors;

  return (
    <Section>
      <Heading>Update password</Heading>
      <Form
        className="box p-8"
        isSubmitting={isUpdatingUserPassword}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField>
          <Label>New password</Label>
          <Input
            type="password"
            {...form.register("newPassword", {
              required: "new password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <FieldError>{errors.newPassword?.message}</FieldError>
        </FormField>

        <FormField>
          <Label>Confirm password</Label>
          <Input
            type="password"
            {...form.register("confirmPassword", {
              required: "confirm password is required",
              validate: (value) =>
                value === form.getValues("newPassword") ||
                "Passwords do not match",
            })}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </FormField>

        <ButtonField>
          <Button
            variant="secondary"
            type="reset"
            disabled={isUpdatingUserPassword}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdatingUserPassword}>
            Save changes
          </Button>
        </ButtonField>
      </Form>
    </Section>
  );
}
