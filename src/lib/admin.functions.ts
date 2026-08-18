import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { opportunityInputSchema } from "@/lib/opportunities";
import type { Database } from "@/integrations/supabase/types";

export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data), userId: context.userId };
  });

export const adminListOpportunities = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data, error } = await context.supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    const { data: apps } = await context.supabase.from("applications").select("opportunity_id");
    const counts: Record<string, number> = {};
    for (const a of (apps ?? []) as { opportunity_id: string }[]) {
      counts[a.opportunity_id] = (counts[a.opportunity_id] ?? 0) + 1;
    }
    return {
      opportunities: ((data ?? []) as Database["public"]["Tables"]["opportunities"]["Row"][]).map((row) => ({
        ...row,
        applications_count: counts[row.id] ?? 0,
      })),
    };
  });

export const adminGetOpportunity = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data: row, error } = await context.supabase
      .from("opportunities")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { opportunity: (row ?? null) as Database["public"]["Tables"]["opportunities"]["Row"] | null };
  });

export const adminSaveOpportunity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => opportunityInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const payload = {
      title: data.title,
      slug: data.slug,
      category: data.category,
      badge: data.badge ?? null,
      cover_image: data.cover_image ?? null,
      short_description: data.short_description,
      description: data.description,
      sessions: data.sessions,
      registration_deadline: data.registration_deadline || null,
      modules: data.modules,
      pricing: data.pricing,
      application_mode: data.application_mode,
      whatsapp_message: data.whatsapp_message ?? null,
      status: data.status,
      sort_order: data.sort_order,
    };

    if (data.id) {
      const { error } = await context.supabase.from("opportunities").update(payload).eq("id", data.id);
      if (error) return { ok: false, id: data.id, error: error.message };
      return { ok: true, id: data.id, error: null as string | null };
    }

    const { data: inserted, error } = await context.supabase
      .from("opportunities")
      .insert(payload)
      .select("id")
      .single();
    if (error) return { ok: false, id: null, error: error.message };
    return { ok: true, id: (inserted as { id: string }).id, error: null as string | null };
  });

export const adminDeleteOpportunity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { error } = await context.supabase.from("opportunities").delete().eq("id", data.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null as string | null };
  });

export const adminListApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data, error } = await context.supabase
      .from("applications")
      .select("*, opportunities(title, slug)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return {
      applications: (data ?? []) as (Database["public"]["Tables"]["applications"]["Row"] & {
        opportunities: { title: string; slug: string } | null;
      })[],
    };
  });

export const adminUpdateApplicationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: string }) => ({
    id: String(data.id),
    status: String(data.status) as Database["public"]["Tables"]["applications"]["Row"]["status"],
  }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { error } = await context.supabase
      .from("applications")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null as string | null };
  });

export const adminSignCover = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { path: string }) => ({ path: String(data.path) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data: signed } = await context.supabase.storage
      .from("opportunity-covers")
      .createSignedUrl(data.path, 3600);
    return { url: signed?.signedUrl ?? null };
  });

export const adminSignCv = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { path: string }) => ({ path: String(data.path) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { data: signed } = await context.supabase.storage
      .from("applications-cv")
      .createSignedUrl(data.path, 3600);
    return { url: signed?.signedUrl ?? null };
  });
