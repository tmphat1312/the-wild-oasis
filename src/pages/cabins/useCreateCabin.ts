import { queryKeys } from "@/constants/query-keys";
import { createCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin was successfully created");
      queryClient.invalidateQueries({
        queryKey: queryKeys.cabins,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
}
