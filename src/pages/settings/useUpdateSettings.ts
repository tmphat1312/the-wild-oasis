import { queryKeys } from "@/constants/query-keys";
import { updateSettings } from "@/services/APISettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings,
      });
    },
  });

  return {
    isUpdating: mutation.isPending,
    updateSettings: mutation.mutate,
    updateSettingsAsync: mutation.mutateAsync,
    error: mutation.error,
  };
}
