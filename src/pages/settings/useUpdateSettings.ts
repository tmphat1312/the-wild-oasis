import { queryKeys } from "@/constants/query-keys";
import { updateSettings } from "@/services/APISettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return {
    isUpdating: mutation.isPending,
    updateSettings: mutation.mutate,
    error: mutation.error,
  };
}
