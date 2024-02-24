import { queryKeys } from "@/constants/query-keys";
import { BookingDetailValues } from "@/schemas/bookingSchema";
import { checkOutBooking } from "@/services/APIBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UseCheckoutBookingArgs {
  bookingId: BookingDetailValues["id"];
}

export function useCheckoutBooking({ bookingId }: UseCheckoutBookingArgs) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => checkOutBooking({ bookingId }),
    onMutate: () => {
      toast.loading("Checking out...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("It's checked out!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.booking(bookingId),
      });
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
    isCheckingOut: isPending,
    checkoutBooking: mutate,
  };
}
