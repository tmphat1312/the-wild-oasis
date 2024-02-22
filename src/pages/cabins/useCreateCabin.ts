import { queryKeys } from "@/constants/query-keys";
import { createCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: createCabin,
    onMutate: () => {
      // toast.loading("Creating cabin...");
    },
    onSuccess: () => {
      // toast.dismiss();
      // toast.success("Cabin was successfully created");
      queryClient.invalidateQueries({
        queryKey: queryKeys.cabins,
      });
    },
    onError: (error) => {
      // toast.dismiss();
      // toast.error(error.message || "Something went wrong");
    },
  });

  return {
    createCabinAsync: mutateAsync,
    isCreating: isPending,
    createCabin: mutate,
    error,
  };
}
