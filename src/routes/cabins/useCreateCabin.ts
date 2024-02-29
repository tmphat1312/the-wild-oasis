import { QUERY_KEYS } from "@/lib/constants";
import { createCabin } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCabin,
    onMutate: () => {
      toast.loading("Creating cabin...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Cabin created successfully");
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
    isCreating: mutation.isPending,
    createCabin: mutation.mutate,
    error: mutation.error,
  };
}
