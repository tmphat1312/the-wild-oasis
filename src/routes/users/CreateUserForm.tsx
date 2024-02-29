import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form-v1/Form";
import { FormField } from "@/components/ui/form-v1/FormField";
import { Input } from "@/components/ui/form-v1/Input";
import { Label } from "@/components/ui/form-v1/Label";
import { FieldError } from "@/components/ui/form-v1/FieldError";
import { useSignUpUser } from "./useSignUpUser";
import { ButtonField } from "@/components/ui/form-v1/ButtonField";
import { Button } from "@/components/ui/Button";

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
        <Input
          {...form.register("full_name", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Full name must be at most 100 characters",
            },
          })}
        />
        <FieldError>{errors.full_name?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>Email address</Label>
        <Input
          {...form.register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          type="email"
        />
        <FieldError>{errors.email?.message}</FieldError>
      </FormField>
      <FormField>
        <Label>
          Password <br /> (min 8 characters)
        </Label>
        <Input
          {...form.register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
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
