import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { OpportunityForm } from "@/components/admin/OpportunityForm";

export const Route = createFileRoute("/_authenticated/admin/opportunites/nouvelle")({
  head: () => ({
    meta: [
      { title: "Nouvelle opportunité — Administration CMEP" },
      { name: "description", content: "Créer une nouvelle formation certifiante ou un atelier CMEP." },
      { property: "og:title", content: "Nouvelle opportunité — Administration CMEP" },
      { property: "og:description", content: "Formulaire de création d'opportunité CMEP." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewOpportunityPage,
});

function NewOpportunityPage() {
  return (
    <Layout>
      <section className="bg-white pt-20 sm:pt-24 pb-6 border-b border-ngo-navy/8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/admin" className="text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-slate hover:text-ngo-gold">
            ← Tableau de bord
          </Link>
          <h1 className="mt-4 text-[24px] sm:text-3xl font-extrabold text-ngo-navy tracking-tight">Nouvelle opportunité</h1>
        </div>
      </section>
      <section className="bg-ngo-pearl/50 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <OpportunityForm />
        </div>
      </section>
    </Layout>
  );
}
