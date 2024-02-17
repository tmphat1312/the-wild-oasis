import { useQuery } from "@tanstack/react-query";

import ErrorMessage from "@/components/ui/ErrorMessage";
import FormSkeleton from "@/components/ui/FormSkeleton";
import { queryKeys } from "@/constants/query-keys";
import { getSettings } from "@/services/APISettings";
import UpdateSettingsForm from "./UpdateSettingsForm";

export default function UpdateSettings() {
  const { isLoading, error, data } = useQuery({
    queryKey: queryKeys.settings,
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
