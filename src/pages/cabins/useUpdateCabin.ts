import { queryKeys } from "@/constants/query-keys";
import { updateCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cabins,
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
