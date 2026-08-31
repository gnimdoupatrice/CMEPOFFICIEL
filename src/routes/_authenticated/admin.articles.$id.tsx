import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Layout } from "@/components/site/Layout";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { adminGetArticle } from "@/lib/articles.functions";
import type { ArticleBlockInput, ArticleInput } from "@/lib/articles";

export const Route = createFileRoute("/_authenticated/admin/articles/$id")({
  head: () => ({
    meta: [
      { title: "Modifier un article — Administration CMEP" },
      { name: "description", content: "Modifier, publier ou archiver un article CMEP." },
      { property: "og:title", content: "Modifier un article — Administration CMEP" },
      { property: "og:description", content: "Édition d'un article du magazine CMEP." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditArticlePage,
});

function EditArticlePage() {
  const { id } = useParams({ from: "/_authenticated/admin/articles/$id" });
  const load = useServerFn(adminGetArticle);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "article", id],
    queryFn: () => load({ data: { id } }),
  });

  const row = data?.article ?? null;
  const initial: ArticleInput | undefined = row
    ? {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt ?? "",
        category: row.category ?? "Reportage",
        date_label: row.date_label ?? "",
        location: row.location ?? "",
        cover_url: row.cover_url,
        focal: row.focal,
        body: (row.body as unknown as ArticleBlockInput[]) ?? [],
        featured: Boolean(row.featured),
        status: row.status as ArticleInput["status"],
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
            {row ? row.title : "Modifier un article"}
          </h1>
        </div>
      </section>
      <section className="bg-ngo-pearl/50 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {isLoading && <p className="text-sm text-ngo-slate">Chargement…</p>}
          {!isLoading && !row && <p className="text-sm text-ngo-slate">Article introuvable.</p>}
          {initial && <ArticleForm key={initial.id} initial={initial} />}
        </div>
      </section>
    </Layout>
  );
}
