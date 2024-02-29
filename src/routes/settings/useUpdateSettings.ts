import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { updateSettings } from "@/services/APISettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSettings,
    onMutate: () => {
      toast.loading("Saving changes...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Settings updated");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.settings],
      });
      queryClient.setQueryData([QUERY_KEYS.settings], data);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return {
    isUpdating: mutation.isPending,
    updateSettings: mutation.mutate,
  };
}
