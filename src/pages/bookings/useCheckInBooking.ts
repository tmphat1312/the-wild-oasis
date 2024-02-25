import { queryKeys } from "@/constants/query-keys";
import { BookingDetailValues } from "@/schemas/bookingSchema";
import { updateBooking } from "@/services/APIBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UseCheckInBookingArgs {
  bookingId: BookingDetailValues["id"];
}

export function useCheckInBooking({ bookingId }: UseCheckInBookingArgs) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function mutationFn({
    breakfast,
  }: {
    breakfast?: {
      breakfastPrice: number;
      totalGuests: number;
      currentTotalDue: number;
    };
  }) {
    const breakfastOption = breakfast
      ? (() => {
          const { breakfastPrice, totalGuests, currentTotalDue } = breakfast;
          const bfPrice = breakfastPrice * (totalGuests + 1);

          return {
            has_breakfast: true,
            extra_price: breakfastPrice,
            total_due: currentTotalDue + bfPrice,
          };
        })()
      : {};

    return updateBooking({
      bookingId,
      data: {
        status: "checked in",
        is_paid: true,
        ...breakfastOption,
      },
    });
  }

  const { isPending, mutate } = useMutation({
    mutationFn,
    onMutate: () => {
      toast.loading("Checking in...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("You're welcome!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.booking(bookingId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings,
      });
      navigate(`/bookings/${bookingId}`, { replace: true });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message || "Something went wrong");
    },
  });

  return {
    isCheckingIn: isPending,
    checkInBooking: mutate,
  };
}