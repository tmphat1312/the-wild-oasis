import Section from "@/components/layouts/Section";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FullLoadingIndicator } from "@/components/ui/FullLoadingIndicator";
import Heading from "@/components/ui/Heading";
import UpdateSettingsForm from "./UpdateSettingsForm";
import { useSettings } from "./useSettings";

export default function Settings() {
  const { isLoading, error, data } = useSettings();

  if (isLoading) {
    return <FullLoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message || "Something went wrong"} />;
  }

  if (!data) {
    return <ErrorMessage message="No settings found" />;
  }

  return (
    <Section>
      <Heading>Update hotel settings</Heading>
      <UpdateSettingsForm currentSettings={data} />
    </Section>
  );
}
