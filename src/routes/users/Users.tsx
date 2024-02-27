import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import { CreateUserForm } from "./CreateUserForm";

export default function Users() {
  return (
    <Section>
      <Heading>Create new user</Heading>
      <CreateUserForm />
    </Section>
  );
}
