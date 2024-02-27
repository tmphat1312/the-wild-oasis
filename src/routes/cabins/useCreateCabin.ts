import { queryKeys } from "@/constants/query-keys";
import { createCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cabins,
      });
    },
  });

  return {
    createCabinAsync: mutateAsync,
    isCreating: isPending,
    createCabin: mutate,
    error,
  };
}
