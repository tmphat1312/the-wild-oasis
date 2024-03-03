import { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env;

export const APIClient = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_KEY,
);

export const buildStorageAPIClient = () => APIClient.storage;

export const buildAuthAPIClient = () => APIClient.auth;
