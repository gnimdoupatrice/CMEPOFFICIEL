import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { articleInputSchema, type ArticleBlockInput, type PublicArticle } from "@/lib/articles";
import type { Database } from "@/integrations/supabase/types";

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];

const PUBLIC_SELECT = "id,slug,title,excerpt,category,date_label,location,cover_url,focal,body,featured,sort_order,created_at";

async function signArticleCovers(paths: (string | null)[]): Promise<Record<string, string>> {
  const unique = [...new Set(paths.filter((p): p is string => typeof p === "string" && p.length > 0 && !p.startsWith("http")))];
  if (unique.length === 0) return {};
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.storage.from("article-images").createSignedUrls(unique, 60 * 60 * 24 * 7);
    const map: Record<string, string> = {};
    for (const item of data ?? []) if (item.path && item.signedUrl) map[item.path] = item.signedUrl;
    return map;
  } catch {
    return {};
  }
}

function toPublicArticle(row: Partial<ArticleRow>, signed: Record<string, string>): PublicArticle {
  const cover = row.cover_url ?? null;
  return {
    id: row.slug ?? String(row.id),
    title: row.title ?? "",
    excerpt: row.excerpt ?? "",
    category: row.category ?? "Actualité",
    date: row.date_label ?? "",
    location: row.location ?? "",
    image: cover ? (cover.startsWith("http") ? cover : (signed[cover] ?? "")) : "",
    focal: row.focal ?? undefined,
    body: Array.isArray(row.body) ? (row.body as unknown as ArticleBlockInput[]) : [],
    featured: Boolean(row.featured),
  };
}

export const listPublishedArticles = createServerFn({ method: "GET" }).handler(async () => {
  const { publicClient } = await import("@/lib/opportunities.server");
  const { data, error } = await publicClient()
    .from("articles")
    .select(PUBLIC_SELECT)
    .eq("status", "published")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) return { articles: [] as PublicArticle[] };
  const rows = (data ?? []) as unknown as ArticleRow[];
  const signed = await signArticleCovers(rows.map((r) => r.cover_url));
  return { articles: rows.map((r) => toPublicArticle(r, signed)) };
});

export const adminListArticles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data, error } = await context.supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { articles: (data ?? []) as ArticleRow[] };
  });

export const adminGetArticle = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data: row, error } = await context.supabase
      .from("articles")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { article: (row ?? null) as ArticleRow | null };
  });

export const adminSaveArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => articleInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const payload = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      category: data.category,
      date_label: data.date_label,
      location: data.location,
      cover_url: data.cover_url ?? null,
      focal: data.focal ?? null,
      body: data.body as unknown as Database["public"]["Tables"]["articles"]["Insert"]["body"],
      featured: data.featured,
      status: data.status,
      sort_order: data.sort_order,
    };

    if (data.id) {
      const { error } = await context.supabase.from("articles").update(payload).eq("id", data.id);
      if (error) return { ok: false, id: data.id, error: error.message };
      return { ok: true, id: data.id, error: null as string | null };
    }

    const { data: inserted, error } = await context.supabase
      .from("articles")
      .insert(payload)
      .select("id")
      .single();
    if (error) return { ok: false, id: null, error: error.message };
    return { ok: true, id: (inserted as { id: string }).id, error: null as string | null };
  });

export const adminDeleteArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { error } = await context.supabase.from("articles").delete().eq("id", data.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null as string | null };
  });

export const adminSignArticleCover = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { path: string }) => ({ path: String(data.path) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data: signed } = await context.supabase.storage.from("article-images").createSignedUrl(data.path, 3600);
    return { url: signed?.signedUrl ?? null };
  });

// Publier / dépublier un article directement depuis le tableau de bord.
export const adminSetArticleStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: "draft" | "published" | "archived" }) => ({
    id: String(data.id),
    status: data.status,
  }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    if (data.status === "published") {
      const { data: row } = await context.supabase
        .from("articles")
        .select("title, excerpt, body")
        .eq("id", data.id)
        .maybeSingle();
      const current = row as { title: string; excerpt: string; body: unknown } | null;
      if (!current) return { ok: false, error: "Article introuvable." };
      const blocks = Array.isArray(current.body) ? current.body : [];
      if (current.title.trim().length < 5 || (current.excerpt ?? "").trim().length < 10 || blocks.length < 1) {
        return { ok: false, error: "Contenu incomplet : ouvrez l'article pour le compléter avant publication." };
      }
    }
    const { error } = await context.supabase.from("articles").update({ status: data.status }).eq("id", data.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null as string | null };
  });
