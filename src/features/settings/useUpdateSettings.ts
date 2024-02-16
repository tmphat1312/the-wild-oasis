import { updateSettings } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
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
