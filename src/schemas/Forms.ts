import { z } from "zod";

export const FormSchema = z.object;

export const MinBookingLength = z.coerce
  .number({
    required_error: "Minimum booking length is required",
  })
  .int()
  .min(1, "Minimum value is 1");
export const MaxBookingLength = z.coerce
  .number({
    required_error: "Maximum booking length is required",
  })
  .int()
  .min(1, "Minimum value is 1");
export const MaxBookingGuestsNumber = z.coerce
  .number({
    required_error: "Maximum guests number is required",
  })
  .int()
  .min(1, "Minimum value is 1");
export const BreakfastPrice = z.coerce
  .number({
    required_error: "Breakfast price is required",
  })
  .min(0, "Minimum value is 0");
