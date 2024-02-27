import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { updateUserData } from "@/services/APIAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserData,
    onMutate: () => {
      toast.loading("Updating user data...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("User data updated");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Failed to update user data");
      console.error(error);
    },
  });

  return {
    updateUserData: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
