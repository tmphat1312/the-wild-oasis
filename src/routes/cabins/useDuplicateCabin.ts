import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { duplicateCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: duplicateCabin,
    onMutate: () => {
      toast.loading("Duplicating cabin...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Cabin was successfully duplicated");
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
    isDuplicating: mutation.isPending,
    duplicateCabin: mutation.mutate,
    error: mutation.mutate,
  };
}
