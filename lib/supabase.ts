// lib/supabase.ts — REST-only shim, zero external deps
type PostgrestError = { message: string };

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

async function get<T>(
  table: string,
  columns = "*"
): Promise<{ data: T[] | null; error: PostgrestError | null }> {
  const url = `${SB_URL}/rest/v1/${table}?select=${encodeURIComponent(columns)}`;
  const res = await fetch(url, {
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const message = await res.text().catch(() => `HTTP ${res.status}`);
    return { data: null, error: { message } };
  }
  const data = (await res.json()) as T[];
  return { data, error: null };
}

// Supabase-like surface the page already expects
export const supabase = {
  from(table: string) {
    return {
      select<T = unknown>(columns: string) {
        return get<T>(table, columns);
      },
    };
  },
};
