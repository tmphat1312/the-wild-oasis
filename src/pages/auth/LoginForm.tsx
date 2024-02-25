import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/form/TextField";
import { Form } from "react-aria-components";

export function LoginForm() {
  return (
    <Form className="w-full max-w-md space-y-5 rounded-md bg-background p-10 shadow">
      <TextField
        label="Email address"
        type="email"
        orientation="vertical"
        isRequired
      />
      <TextField
        label="Password"
        type="password"
        orientation="vertical"
        isRequired
      />

      <Button type="submit" className="w-full">
        Login
      </Button>
    </Form>
  );
}
