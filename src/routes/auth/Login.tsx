import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <Section className="flex h-dvh flex-col items-center justify-center gap-8 bg-gray-50">
      <Logo className="scale-125" />
      <Heading className="mb-0 text-3xl">Log in to your account</Heading>
      <LoginForm />
    </Section>
  );
}
