import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { CabinType } from "@/schemas/CabinSchema";
import { deleteCabinById } from "@/services/APICabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseDeleteCabinByIdProps = {
  cabinId: CabinType["id"];
  cabinImage: CabinType["image"];
};

export function useDeleteCabinById({
  cabinId,
  cabinImage,
}: UseDeleteCabinByIdProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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
      toast.error(error.message);
    },
  });

  return {
    isDeleting: mutation.isPending,
    error: mutation.error,
    deleteCabin: mutation.mutate,
  };
}
