import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import UpdateSettings from "@/features/settings/UpdateSettings";

export default function Settings() {
  return (
    <Section className="max-w-lg mx-auto">
      <Heading>Settings</Heading>
      <UpdateSettings />
    </Section>
  );
}
