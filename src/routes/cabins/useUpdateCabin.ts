import { QUERY_KEYS } from "@/lib/constants";
import { updateCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cabins],
      });
    },
  });

  return {
    updateCabinAsync: mutateAsync,
    isUpdating: isPending,
    updateCabin: mutate,
    error,
  };
}
