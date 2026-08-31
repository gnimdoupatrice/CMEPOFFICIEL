import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const Route = createFileRoute("/_authenticated/admin/articles/nouvelle")({
  head: () => ({
    meta: [
      { title: "Nouvel article — Administration CMEP" },
      { name: "description", content: "Rédiger et publier un nouvel article CMEP." },
      { property: "og:title", content: "Nouvel article — Administration CMEP" },
      { property: "og:description", content: "Formulaire de création d'article CMEP." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewArticlePage,
});

function NewArticlePage() {
  return (
    <Layout>
      <section className="bg-white pt-20 sm:pt-24 pb-6 border-b border-ngo-navy/8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/admin" className="text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-slate hover:text-ngo-gold">
            ← Tableau de bord
          </Link>
          <h1 className="mt-4 text-[24px] sm:text-3xl font-extrabold text-ngo-navy tracking-tight">Nouvel article</h1>
        </div>
      </section>
      <section className="bg-ngo-pearl/50 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ArticleForm />
        </div>
      </section>
    </Layout>
  );
}
