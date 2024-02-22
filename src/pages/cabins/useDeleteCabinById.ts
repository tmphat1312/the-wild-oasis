import { queryKeys } from "@/constants/query-keys";
import { toast } from "@/lib/toast";
import { CabinValues } from "@/schemas/cabinSchema";
import { deleteCabinById } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseDeleteCabinByIdProps {
  cabinId: CabinValues["id"];
}

export function useDeleteCabinById({ cabinId }: UseDeleteCabinByIdProps) {
  const queryClient = useQueryClient();

  const { isPending, mutate, error } = useMutation({
    mutationFn: () => deleteCabinById({ cabinId }),
    onMutate: () => {
      toast.loading("Deleting cabin...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Cabin was successfully deleted");
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
    isDeleting: isPending,
    error,
    deleteCabin: mutate,
  };
}
