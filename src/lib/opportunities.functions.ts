import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { applicationSchema, type PublicOpportunity } from "@/lib/opportunities";

function publicClient() {
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

async function signCovers(paths: (string | null)[]): Promise<Record<string, string>> {
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

type Row = Database["public"]["Tables"]["opportunities"]["Row"];

function toPublic(row: Row, covers: Record<string, string>): PublicOpportunity {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    badge: row.badge,
    cover_url: row.cover_image ? (covers[row.cover_image] ?? null) : null,
    short_description: row.short_description ?? "",
    description: row.description ?? "",
    sessions: Array.isArray(row.sessions) ? (row.sessions as PublicOpportunity["sessions"]) : [],
    registration_deadline: row.registration_deadline,
    modules: Array.isArray(row.modules) ? (row.modules as PublicOpportunity["modules"]) : [],
    pricing: Array.isArray(row.pricing) ? (row.pricing as PublicOpportunity["pricing"]) : [],
    application_mode: row.application_mode,
    whatsapp_message: row.whatsapp_message,
  };
}

const SELECT =
  "id,title,slug,category,badge,cover_image,short_description,description,sessions,registration_deadline,modules,pricing,application_mode,whatsapp_message";

export const listPublishedOpportunities = createServerFn({ method: "GET" }).handler(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await publicClient()
    .from("opportunities")
    .select(SELECT)
    .eq("status", "published")
    .or(`registration_deadline.is.null,registration_deadline.gte.${today}`)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) return { opportunities: [] as PublicOpportunity[], error: error.message };
  const rows = (data ?? []) as Row[];
  const covers = await signCovers(rows.map((r) => r.cover_image));
  return { opportunities: rows.map((r) => toPublic(r, covers)), error: null as string | null };
});

export const getPublishedOpportunity = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug).slice(0, 200) }))
  .handler(async ({ data }) => {
    const { data: row, error } = await publicClient()
      .from("opportunities")
      .select(SELECT)
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !row) return { opportunity: null as PublicOpportunity | null };
    const typed = row as Row;
    const covers = await signCovers([typed.cover_image]);
    return { opportunity: toPublic(typed, covers) };
  });

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("applications").insert({
      opportunity_id: data.opportunity_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      profile: data.profile || null,
      motivation: data.motivation || null,
      cv_url: data.cv_url || null,
    });
    if (error) return { ok: false, error: "Envoi impossible pour le moment." };
    return { ok: true, error: null as string | null };
  });
