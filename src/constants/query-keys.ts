export const queryKeys = {
  settings: ["settings"],
  cabins: ["cabins"],
  bookings: ["bookings"],
  booking: (bookingId: number) => ["booking", bookingId],
  user: ["user"],
} as const;
