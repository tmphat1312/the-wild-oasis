import { QUERY_KEYS } from "@/lib/constants";
import { createCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cabins],
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
