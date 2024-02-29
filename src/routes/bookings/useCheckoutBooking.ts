import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { BookingDetailType } from "@/schemas/BookingSchema";
import { checkOutBooking } from "@/services/APIBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCheckoutBookingArgs = {
  bookingId: BookingDetailType["id"];
};

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
        queryKey: [QUERY_KEYS.bookings, bookingId],
      });
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
    isCheckingOut: isPending,
    checkoutBooking: mutate,
  };
}
