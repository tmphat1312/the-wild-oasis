import FormSkeleton from "@/components/ui/FormSkeleton";
import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";
import UpdateSettingsForm from "./UpdateSettingsForm";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function UpdateSettings() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message || "Something went wrong"} />;
  }

  return <UpdateSettingsForm currentSettings={data} />;
}
