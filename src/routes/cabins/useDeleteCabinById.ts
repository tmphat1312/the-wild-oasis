import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { CabinValues } from "@/schemas/cabinSchema";
import { deleteCabinById } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseDeleteCabinByIdProps = {
  cabinId: CabinValues["id"];
  cabinImage: CabinValues["image"];
};

export function useDeleteCabinById({
  cabinId,
  cabinImage,
}: UseDeleteCabinByIdProps) {
  const queryClient = useQueryClient();

  const { isPending, mutate, error } = useMutation({
    mutationFn: () => deleteCabinById({ cabinId, cabinImage }),
    onMutate: () => {
      toast.loading("Deleting cabin...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Cabin was successfully deleted");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cabins],
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
