import ErrorMessage from "@/components/ui/ErrorMessage";
import FormSkeleton from "@/components/ui/FormSkeleton";
import Section from "@/components/layouts/Section";
import Heading from "@/components/ui/Heading";
import UpdateSettingsForm from "./UpdateSettingsForm";
import { useSettings } from "./useSettings";

export default function Settings() {
  const { isLoading, error } = useSettings();

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message || "Something went wrong"} />;
  }

  return (
    <Section>
      <Heading>Settings</Heading>
      <UpdateSettingsForm />;
    </Section>
  );
}
