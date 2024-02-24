export const queryKeys = {
  settings: ["settings"],
  cabins: ["cabins"],
  bookings: ["bookings"],
  booking: (bookingId: number) => ["booking", bookingId],
} as const;
