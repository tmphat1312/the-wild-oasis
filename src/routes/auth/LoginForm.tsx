import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { FieldError } from "@/components/ui/form/FieldError";
import { FORM_RULES } from "@/lib/constants";

type LoginSchema = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { isLoading, login } = useLogin();
  const form = useForm<LoginSchema>();

  function onSubmit(data: LoginSchema) {
    login(data);
  }

  const errors = form.formState.errors;

  return (
    <Form
      className="mx-2 w-full max-w-[440px] space-y-5 rounded-md bg-background px-6 py-6 shadow"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isLoading}
    >
      <FormField variant="vertical" className="pb-0">
        <Label>Email address</Label>
        <Input type="email" {...form.register("email", FORM_RULES.email)} />
        <FieldError>{errors.email?.message}</FieldError>
      </FormField>
      <FormField variant="vertical" className="border-0 pt-0">
        <Label>Password</Label>
        <Input
          type="password"
          {...form.register("password", FORM_RULES.password)}
        />
        <FieldError>{errors.password?.message}</FieldError>
      </FormField>

      <Button className="w-full" type="submit">
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </Form>
  );
}
