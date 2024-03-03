import { RegisterOptions } from "react-hook-form";

export const ITEMS_PER_PAGE = 10;

export enum QUERY_KEYS {
  settings = "settings",
  cabins = "cabins",
  bookings = "bookings",
  user = "user",
  todayActivities = "todayActivities",
}

export const FORM_RULES: Record<string, RegisterOptions> = {
  full_name: {
    required: "Full name is required",
    minLength: {
      value: 3,
      message: "Full name must be at least 3 characters",
    },
    maxLength: {
      value: 100,
      message: "Full name must be at most 100 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  },
} as const;
