import { Database } from "@/types/database";
import { TableRowNames } from "@/types/table-row";
import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY, MODE, SUPABASE_KEY } = import.meta
  .env;

export const APIClient = createClient<Database>(
  VITE_SUPABASE_URL,
  MODE === "development" ? VITE_SUPABASE_KEY : SUPABASE_KEY,
);

export const APIClientBuilder = (resource: TableRowNames) =>
  APIClient.from(resource);
