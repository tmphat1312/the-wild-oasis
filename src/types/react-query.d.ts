import "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: PostgrestError;
  }
}
