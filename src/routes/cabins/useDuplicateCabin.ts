import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { duplicateCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
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
      toast.error(error.message || "Something went wrong");
    },
  });

  return {
    duplicateCabinAsync: mutateAsync,
    isDuplicating: isPending,
    duplicateCabin: mutate,
    error,
  };
}
