import { createServerFn } from "@tanstack/react-start";
import { applicationSchema, type PublicOpportunity } from "@/lib/opportunities";
import type { OpportunityRow } from "@/lib/opportunities.server";

export const listPublishedOpportunities = createServerFn({ method: "GET" }).handler(async () => {
  const { publicClient, signCovers, toPublicOpportunity, OPPORTUNITY_PUBLIC_SELECT } = await import(
    "@/lib/opportunities.server"
  );
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await publicClient()
    .from("opportunities")
    .select(OPPORTUNITY_PUBLIC_SELECT)
    .eq("status", "published")
    .or(`registration_deadline.is.null,registration_deadline.gte.${today}`)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) return { opportunities: [] as PublicOpportunity[], error: error.message };
  const rows = (data ?? []) as unknown as OpportunityRow[];
  const covers = await signCovers(rows.map((r) => r.cover_image));
  return { opportunities: rows.map((r) => toPublicOpportunity(r, covers)), error: null as string | null };
});

export const getPublishedOpportunity = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug).slice(0, 200) }))
  .handler(async ({ data }) => {
    const { publicClient, signCovers, toPublicOpportunity, OPPORTUNITY_PUBLIC_SELECT } = await import(
      "@/lib/opportunities.server"
    );
    const { data: row, error } = await publicClient()
      .from("opportunities")
      .select(OPPORTUNITY_PUBLIC_SELECT)
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !row) return { opportunity: null as PublicOpportunity | null };
    const typed = row as unknown as OpportunityRow;
    const covers = await signCovers([typed.cover_image]);
    return { opportunity: toPublicOpportunity(typed, covers) };
  });

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { publicClient } = await import("@/lib/opportunities.server");
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
