import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { updateUserPassword } from "@/services/APIAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserPassword,
    onMutate: () => {
      toast.loading("Updating user password...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("User password updated");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Failed to update user password");
      console.error(error);
    },
  });

  return {
    updateUserPassword: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
