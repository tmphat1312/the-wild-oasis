import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import { UpdateUserPasswordForm } from "./UpdateUserPasswordForm";
import { UpdateUserDataForm } from "./UpdateUserDataForm";

export default function Account() {
  return (
    <Section>
      <Heading className="mb-10">update your account</Heading>
      <div className="space-y-8">
        <UpdateUserDataForm />
        <UpdateUserPasswordForm />
      </div>
    </Section>
  );
}
