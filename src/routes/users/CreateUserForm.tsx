import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { ButtonField } from "@/components/ui/form/ButtonField";
import { FieldError } from "@/components/ui/form/FieldError";
import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { FORM_RULES } from "@/lib/constants";
import { useSignUpUser } from "./useSignUpUser";

type CreateUserFormFields = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export function CreateUserForm() {
  const form = useForm<CreateUserFormFields>({});
  const { isLoading, signUp } = useSignUpUser();

  function onSubmit(data: CreateUserFormFields) {
    signUp(data, {
      onSuccess: () => form.reset(),
    });
  }

  const errors = form.formState.errors;

  return (
    <Form
      className="box p-12"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isLoading}
    >
      <FormField>
        <Label>Full name</Label>
        <Input {...form.register("full_name", FORM_RULES.full_name)} />
        <FieldError>{errors.full_name?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Email address</Label>
        <Input {...form.register("email", FORM_RULES.email)} type="email" />
        <FieldError>{errors.email?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>
          Password <br /> (min 8 characters)
        </Label>
        <Input
          {...form.register("password", FORM_RULES.password)}
          type="password"
        />
        <FieldError>{errors.password?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Password confirmation</Label>
        <Input
          {...form.register("confirm_password", {
            required: "Password confirmation is required",
            validate: (value) =>
              value === form.getValues("password") || "Passwords do not match",
          })}
          type="password"
        />
        <FieldError>{errors.confirm_password?.message}</FieldError>
      </FormField>

      <ButtonField>
        <Button variant="secondary" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button type="submit">Create new user</Button>
      </ButtonField>
    </Form>
  );
}
