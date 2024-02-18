import { queryKeys } from "@/constants/query-keys";
import { deleteCabinById } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCabinById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCabinById,
    onSuccess: () => {
      toast.success("Cabin was successfully deleted");
      queryClient.invalidateQueries({
        queryKey: queryKeys.cabins,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
}
