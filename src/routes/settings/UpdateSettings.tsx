import ErrorMessage from "@/components/ui/ErrorMessage";
import FormSkeleton from "@/components/ui/FormSkeleton";
import { UpdateSettingsForm } from "./UpdateSettingsForm";
import { useSettings } from "./useSettings";

export default function UpdateSettings() {
  const { isLoading, error, settings } = useSettings();

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message || "Something went wrong"} />;
  }

  return <UpdateSettingsForm currentSettings={settings!} />;
}
