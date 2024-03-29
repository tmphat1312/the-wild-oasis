import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { deleteBookingById } from "@/services/APIBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBookingById() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteBookingById,
    onMutate: () => {
      toast.loading("Deleting booking...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.bookings],
      });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message || "Something went wrong");
    },
  });

  return {
    isDeleting: isPending,
    deleteBooking: mutate,
  };
}
