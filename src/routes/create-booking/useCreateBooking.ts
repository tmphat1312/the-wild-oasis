import { createBooking } from "@/services/APIBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import { QUERY_KEYS } from "@/lib/constants";
import { useNavigate } from "react-router-dom";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createBooking,
    onMutate: () => {
      toast.loading("Creating booking...");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Booking created successfully");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.bookings],
      });
      navigate("/bookings");
    },
  });

  return {
    isCreating: mutation.isPending,
    createBooking: mutation.mutate,
  };
}
