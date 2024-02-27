import { queryKeys } from "@/constants/query-keys";
import { duplicateCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";

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
        queryKey: queryKeys.cabins,
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
