import { Section } from "@/components/layouts/Section";
import { Heading } from "@/components/ui/Heading";
import UpdateSettings from "./UpdateSettings";

export default function Settings() {
  return (
    <Section>
      <Heading>Update hotel settings</Heading>
      <UpdateSettings />
    </Section>
  );
}
