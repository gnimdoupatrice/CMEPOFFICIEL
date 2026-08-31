// Helpers serveur pour les opportunités (jamais importés côté client).
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { PublicOpportunity } from "@/lib/opportunities";

export type OpportunityRow = Database["public"]["Tables"]["opportunities"]["Row"];

export const OPPORTUNITY_PUBLIC_SELECT =
  "id,title,slug,category,badge,cover_image,short_description,description,sessions,registration_deadline,modules,pricing,application_mode,whatsapp_message";

export function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export async function signCovers(paths: (string | null)[]): Promise<Record<string, string>> {
  const unique = [...new Set(paths.filter((p): p is string => Boolean(p)))];
  if (unique.length === 0) return {};
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.storage
      .from("opportunity-covers")
      .createSignedUrls(unique, 60 * 60 * 24 * 7);
    const map: Record<string, string> = {};
    for (const item of data ?? []) {
      if (item.path && item.signedUrl) map[item.path] = item.signedUrl;
    }
    return map;
  } catch {
    return {};
  }
}

export function toPublicOpportunity(row: OpportunityRow, covers: Record<string, string>): PublicOpportunity {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category as PublicOpportunity["category"],
    badge: row.badge as PublicOpportunity["badge"],
    cover_url: row.cover_image ? (covers[row.cover_image] ?? null) : null,
    short_description: row.short_description ?? "",
    description: row.description ?? "",
    sessions: Array.isArray(row.sessions) ? (row.sessions as unknown as PublicOpportunity["sessions"]) : [],
    registration_deadline: row.registration_deadline,
    modules: Array.isArray(row.modules) ? (row.modules as unknown as PublicOpportunity["modules"]) : [],
    pricing: Array.isArray(row.pricing) ? (row.pricing as unknown as PublicOpportunity["pricing"]) : [],
    application_mode: row.application_mode as PublicOpportunity["application_mode"],
    whatsapp_message: row.whatsapp_message,
  };
}

export async function assertAdmin(context: { supabase: unknown; userId: string }) {
  const client = context.supabase as { rpc: (fn: "has_role", args: { _user_id: string; _role: "admin" }) => Promise<{ data: unknown }> };
  const { data } = await client.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!data) throw new Error("Accès réservé à l'administration CMEP.");
}
