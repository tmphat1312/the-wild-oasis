import { queryKeys } from "@/constants/query-keys";
import { updateUserData } from "@/services/APIAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";

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
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
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
