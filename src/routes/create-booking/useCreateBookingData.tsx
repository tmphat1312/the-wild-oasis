import { getCreateBookingData } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

export function useCreateBookingData() {
  const query = useQuery({
    queryKey: ["create-booking"],
    queryFn: getCreateBookingData,
  });

  const data = query.data ?? {
    cabins: [],
    settings: {
      breakfast_price: 0,
      max_booking_length: 0,
      max_guests_per_booking: 0,
      min_booking_length: 0,
    },
  };

  return {
    isLoading: query.isLoading,
    cabins: data.cabins,
    settings: data.settings,
  };
}
