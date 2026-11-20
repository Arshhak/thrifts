import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

let client: SupabaseClient | undefined;

export function createSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Reusable Supabase client instance for client-side and general usage.
 */
export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? (typeof window !== "undefined"
        ? (client ??= createClient(supabaseUrl, supabaseAnonKey))
        : createClient(supabaseUrl, supabaseAnonKey))
    : (undefined as unknown as SupabaseClient);

export default supabase;
