import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/form/TextField";
import { Form } from "react-aria-components";
import { z } from "zod";
import { useLogin } from "./useLogin";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const { isLoading, login } = useLogin();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const credentials = loginSchema.parse(data);

    login(credentials);
  }

  return (
    <Form
      className="w-full max-w-md space-y-5 rounded-md bg-background p-10 shadow"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Email address"
        type="email"
        name="email"
        orientation="vertical"
        isRequired
        isDisabled={isLoading}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        orientation="vertical"
        minLength={6}
        isRequired
        isDisabled={isLoading}
      />

      <Button type="submit" className="w-full" isDisabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </Form>
  );
}
