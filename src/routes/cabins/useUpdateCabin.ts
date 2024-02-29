import { QUERY_KEYS } from "@/lib/constants";
import { updateCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCabin,
    onMutate: () => {
      toast.loading("Updating cabin...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Cabin was successfully updated");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cabins],
      });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return {
    isUpdating: mutation.isPending,
    updateCabin: mutation.mutate,
    error: mutation.error,
  };
}
