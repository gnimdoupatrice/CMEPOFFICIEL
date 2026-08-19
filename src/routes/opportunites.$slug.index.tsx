import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { OpportunityDetailView } from "@/components/site/OpportunityDetail";
import { getPublishedOpportunity } from "@/lib/opportunities.functions";
import { type PublicOpportunity } from "@/lib/opportunities";

const detailQuery = (slug: string) =>
  queryOptions({
    queryKey: ["opportunities", "detail", slug],
    queryFn: () => getPublishedOpportunity({ data: { slug } }),
  });

export const Route = createFileRoute("/opportunites/$slug/")({
  loader: async ({ context, params }) => {
    const result = await context.queryClient.ensureQueryData(detailQuery(params.slug));
    if (!result.opportunity) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    const o = loaderData?.opportunity;
    if (!o) {
      return {
        meta: [{ title: "Opportunité introuvable — CMEP Togo" }, { name: "robots", content: "noindex" }],
      };
    }
    const description = (o.short_description || o.description || "Programme CMEP").slice(0, 155);
    return {
      meta: [
        { title: `${o.title} — CMEP Togo`.slice(0, 60) },
        { name: "description", content: description },
        { property: "og:title", content: `${o.title} — CMEP Togo` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-ngo-navy">Cette opportunité n'est plus disponible.</h1>
        <Link to="/opportunites" className="mt-6 inline-block text-ngo-gold font-bold uppercase text-[11px] tracking-[0.2em]">
          Voir toutes les opportunités
        </Link>
      </section>
    </Layout>
  ),
  component: OpportunityDetailPage,
});

function OpportunityDetailPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(detailQuery(slug));
  const p = data.opportunity as PublicOpportunity;

  return (
    <Layout>
      <section className="bg-white pt-20 sm:pt-24 pb-4 px-4 sm:px-6 border-b border-ngo-navy/8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-slate">
          <Link to="/" className="hover:text-ngo-gold">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to="/opportunites" className="hover:text-ngo-gold">Opportunités</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ngo-navy normal-case tracking-normal">{p.title}</span>
        </div>
      </section>
      <OpportunityDetailView opportunity={p} />
    </Layout>
  );
}
