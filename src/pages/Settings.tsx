import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

export default function Settings() {
  return (
    <Section className="max-w-lg mx-auto">
      <Heading>Settings</Heading>
      <UpdateSettingsForm />
    </Section>
  );
}
