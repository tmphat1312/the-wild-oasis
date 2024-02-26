import { queryKeys } from "@/constants/query-keys";
import { updateUserPassword } from "@/services/APIAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
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
