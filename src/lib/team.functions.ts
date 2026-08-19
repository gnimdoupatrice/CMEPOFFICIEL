import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { teamMemberInputSchema, type PublicTeamMember } from "@/lib/team";

export const listTeamMembers = createServerFn({ method: "GET" }).handler(async () => {
  const { publicClient } = await import("@/lib/opportunities.server");
  const { signTeamPhotos, resolvePhoto } = await import("@/lib/team.server");
  const { data, error } = await publicClient()
    .from("team_members")
    .select("id,full_name,role,team_group,photo_url,bio,display_order")
    .order("display_order", { ascending: true })
    .order("full_name", { ascending: true });

  if (error) return { members: [] as PublicTeamMember[], error: error.message };
  const rows = (data ?? []) as unknown as PublicTeamMember[];
  const signed = await signTeamPhotos(rows.map((r) => r.photo_url));
  return {
    members: rows.map((r) => ({ ...r, photo_url: resolvePhoto(r.photo_url, signed) })),
    error: null as string | null,
  };
});

export const adminListTeamMembers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { signTeamPhotos, resolvePhoto } = await import("@/lib/team.server");
    const { data, error } = await context.supabase
      .from("team_members")
      .select("id,full_name,role,team_group,photo_url,bio,display_order")
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as unknown as PublicTeamMember[];
    const signed = await signTeamPhotos(rows.map((r) => r.photo_url));
    return {
      members: rows.map((r) => ({ ...r, preview_url: resolvePhoto(r.photo_url, signed) })),
    };
  });

export const adminSaveTeamMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => teamMemberInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const payload = {
      full_name: data.full_name,
      role: data.role,
      team_group: data.team_group,
      photo_url: data.photo_url ?? null,
      bio: data.bio ?? null,
      display_order: data.display_order,
    };
    if (data.id) {
      const { error } = await context.supabase.from("team_members").update(payload).eq("id", data.id);
      if (error) return { ok: false, error: error.message };
      return { ok: true, error: null as string | null };
    }
    const { error } = await context.supabase.from("team_members").insert(payload);
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null as string | null };
  });

export const adminDeleteTeamMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data, context }) => {
    await (await import("@/lib/opportunities.server")).assertAdmin(context);
    const { error } = await context.supabase.from("team_members").delete().eq("id", data.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null as string | null };
  });
