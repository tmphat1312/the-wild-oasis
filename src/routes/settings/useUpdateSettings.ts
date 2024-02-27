import { QUERY_KEYS } from "@/lib/constants";
import { updateSettings } from "@/services/APISettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.settings],
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
