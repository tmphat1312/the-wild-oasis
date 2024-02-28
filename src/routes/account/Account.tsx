import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import { UpdateUserPasswordForm } from "./UpdateUserPasswordForm";
import { UpdateUserDataForm } from "./UpdateUserDataForm";

export default function Account() {
  return (
    <Section>
      <Heading>update your account</Heading>
      <div className="max-w-4xl space-y-8">
        <UpdateUserDataForm />
        <UpdateUserPasswordForm />
      </div>
    </Section>
  );
}
