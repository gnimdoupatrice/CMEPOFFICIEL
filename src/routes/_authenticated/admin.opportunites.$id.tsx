import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Layout } from "@/components/site/Layout";
import { OpportunityForm } from "@/components/admin/OpportunityForm";
import { adminGetOpportunity } from "@/lib/admin.functions";
import type { OpportunityInput, OpportunityModule, OpportunityPricing, OpportunitySession } from "@/lib/opportunities";

export const Route = createFileRoute("/_authenticated/admin/opportunites/$id")({
  head: () => ({
    meta: [
      { title: "Modifier une opportunité — Administration CMEP" },
      { name: "description", content: "Modifier, publier ou archiver une opportunité CMEP." },
      { property: "og:title", content: "Modifier une opportunité — Administration CMEP" },
      { property: "og:description", content: "Édition d'une opportunité du portail CMEP." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditOpportunityPage,
});

function EditOpportunityPage() {
  const { id } = useParams({ from: "/_authenticated/admin/opportunites/$id" });
  const load = useServerFn(adminGetOpportunity);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "opportunity", id],
    queryFn: () => load({ data: { id } }),
  });

  const row = data?.opportunity ?? null;
  const initial: OpportunityInput | undefined = row
    ? {
        id: row.id,
        title: row.title,
        slug: row.slug,
        category: row.category,
        badge: row.badge,
        cover_image: row.cover_image,
        short_description: row.short_description ?? "",
        description: row.description ?? "",
        sessions: (row.sessions as unknown as OpportunitySession[]) ?? [],
        registration_deadline: row.registration_deadline,
        modules: (row.modules as unknown as OpportunityModule[]) ?? [],
        pricing: (row.pricing as unknown as OpportunityPricing[]) ?? [],
        application_mode: row.application_mode,
        whatsapp_message: row.whatsapp_message,
        status: row.status,
        sort_order: row.sort_order ?? 0,
      }
    : undefined;

  return (
    <Layout>
      <section className="bg-white pt-20 sm:pt-24 pb-6 border-b border-ngo-navy/8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/admin" className="text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-slate hover:text-ngo-gold">
            ← Tableau de bord
          </Link>
          <h1 className="mt-4 text-[24px] sm:text-3xl font-extrabold text-ngo-navy tracking-tight">
            {row ? row.title : "Modifier une opportunité"}
          </h1>
        </div>
      </section>
      <section className="bg-ngo-pearl/50 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {isLoading && <p className="text-sm text-ngo-slate">Chargement…</p>}
          {!isLoading && !initial && <p className="text-sm text-ngo-slate">Opportunité introuvable.</p>}
          {initial && <OpportunityForm initial={initial} />}
        </div>
      </section>
    </Layout>
  );
}
