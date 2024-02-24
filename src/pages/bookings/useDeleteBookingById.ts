import { queryKeys } from "@/constants/query-keys";
import { deleteBookingById } from "@/services/APIBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
        queryKey: queryKeys.bookings,
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
