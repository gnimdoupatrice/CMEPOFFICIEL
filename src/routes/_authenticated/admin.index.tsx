import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  adminDeleteOpportunity,
  adminListApplications,
  adminListOpportunities,
  adminSignCv,
  adminUpdateApplicationStatus,
  getAdminStatus,
} from "@/lib/admin.functions";
import { adminDeleteArticle, adminListArticles } from "@/lib/articles.functions";
import { articleStatusLabel } from "@/lib/articles";
import { APPLICATION_STATUSES, applicationStatusLabel, categoryLabel, formatDate, statusLabel } from "@/lib/opportunities";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileDown, LogOut, Pencil, Plus, Trash2, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Administration CMEP" },
      { name: "description", content: "Gestion des opportunités et des candidatures CMEP." },
      { property: "og:title", content: "Tableau de bord — Administration CMEP" },
      { property: "og:description", content: "Back-office CMEP : opportunités, publications et candidatures." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

const statusStyles: Record<string, string> = {
  draft: "bg-ngo-navy/8 text-ngo-navy",
  published: "bg-emerald-500/15 text-emerald-700",
  archived: "bg-ngo-slate/15 text-ngo-slate",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const status = useServerFn(getAdminStatus);
  const listOpportunities = useServerFn(adminListOpportunities);
  const listApplications = useServerFn(adminListApplications);
  const removeOpportunity = useServerFn(adminDeleteOpportunity);
  const updateStatus = useServerFn(adminUpdateApplicationStatus);
  const signCv = useServerFn(adminSignCv);
  const listArticles = useServerFn(adminListArticles);
  const removeArticle = useServerFn(adminDeleteArticle);

  const adminQuery = useQuery({
    queryKey: ["admin", "status"],
    retry: 1,
    queryFn: async () => {
      try {
        return await status();
      } catch (err) {
        // Repli : si l'appel serveur échoue (jeton non transmis en production),
        // on vérifie le rôle directement depuis la session du navigateur.
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        if (!user) throw err;
        const { data: isAdmin, error } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "admin",
        });
        if (error) throw err;
        return { isAdmin: Boolean(isAdmin), userId: user.id };
      }
    },
  });
  const opportunitiesQuery = useQuery({
    queryKey: ["admin", "opportunities"],
    queryFn: () => listOpportunities(),
    enabled: adminQuery.data?.isAdmin === true,
  });
  const applicationsQuery = useQuery({
    queryKey: ["admin", "applications"],
    queryFn: () => listApplications(),
    enabled: adminQuery.data?.isAdmin === true,
  });
  const articlesQuery = useQuery({
    queryKey: ["admin", "articles"],
    queryFn: () => listArticles(),
    enabled: adminQuery.data?.isAdmin === true,
  });

  if (adminQuery.isLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-32 text-center text-ngo-slate text-sm">Chargement…</div>
      </Layout>
    );
  }

  if (!adminQuery.data?.isAdmin) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-extrabold text-ngo-navy">Accès non autorisé</h1>
          <p className="mt-3 text-[14px] text-ngo-slate">
            Compte connecté : {adminQuery.data?.userId ?? "session introuvable"}. Si vous venez de recevoir les droits,
            reconnectez-vous pour rafraîchir votre session.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" onClick={() => adminQuery.refetch()}>
              Réessayer
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await queryClient.cancelQueries();
                queryClient.clear();
                await supabase.auth.signOut();
                navigate({ to: "/auth", search: { redirect: "/admin" }, replace: true });
              }}
            >
              <LogOut size={14} aria-hidden="true" /> Se reconnecter
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Supprimer définitivement « ${title} » ?`)) return;
    const result = await removeOpportunity({ data: { id } });
    if (!result.ok) {
      toast.error(result.error ?? "Suppression impossible.");
      return;
    }
    toast.success("Opportunité supprimée.");
    void queryClient.invalidateQueries({ queryKey: ["admin", "opportunities"] });
  }

  async function openCv(path: string) {
    const { url } = await signCv({ data: { path } });
    if (!url) {
      toast.error("Document indisponible.");
      return;
    }
    window.open(url, "_blank", "noopener");
  }

  async function changeApplicationStatus(id: string, value: string) {
    const result = await updateStatus({ data: { id, status: value } });
    if (!result.ok) {
      toast.error(result.error ?? "Mise à jour impossible.");
      return;
    }
    void queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
  }

  async function handleDeleteArticle(id: string, title: string) {
    if (!window.confirm(`Supprimer définitivement l'article « ${title} » ?`)) return;
    const result = await removeArticle({ data: { id } });
    if (!result.ok) {
      toast.error(result.error ?? "Suppression impossible.");
      return;
    }
    toast.success("Article supprimé.");
    void queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
  }

  const opportunities = opportunitiesQuery.data?.opportunities ?? [];
  const applications = applicationsQuery.data?.applications ?? [];
  const articles = articlesQuery.data?.articles ?? [];

  return (
    <Layout>
      <section className="bg-white pt-20 sm:pt-24 pb-6 border-b border-ngo-navy/8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold">Back-office CMEP</span>
            <h1 className="mt-2 text-[24px] sm:text-3xl font-extrabold text-ngo-navy tracking-tight">
              Gestion des opportunités
            </h1>
            <p className="mt-2 text-[13px] text-ngo-slate">
              {opportunities.length} opportunité(s) · {applications.length} candidature(s) · {articles.length} article(s)
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/opportunites/nouvelle"
              className="inline-flex items-center gap-2 bg-ngo-navy text-white px-5 py-3 rounded-md font-bold uppercase tracking-widest text-[11px] hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
            >
              <Plus size={14} aria-hidden="true" /> Nouvelle opportunité
            </Link>
            <Link
              to="/admin/articles/nouvelle"
              className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-5 py-3 rounded-md font-bold uppercase tracking-widest text-[11px] hover:bg-ngo-navy hover:text-white transition-colors"
            >
              <Plus size={14} aria-hidden="true" /> Nouvel article
            </Link>
            <Button
              variant="outline"
              onClick={async () => {
                await queryClient.cancelQueries();
                queryClient.clear();
                await supabase.auth.signOut();
                navigate({ to: "/auth", search: { redirect: "/admin" }, replace: true });
              }}
            >
              <LogOut size={14} aria-hidden="true" /> Déconnexion
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ngo-pearl/50 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy">Opportunités</h2>
          {opportunitiesQuery.isLoading && <p className="text-sm text-ngo-slate">Chargement…</p>}
          {opportunities.length === 0 && !opportunitiesQuery.isLoading && (
            <div className="rounded-2xl bg-white ring-1 ring-ngo-navy/8 p-6 text-sm text-ngo-slate">
              Aucune opportunité pour l'instant. Cliquez sur « Nouvelle opportunité » pour commencer.
            </div>
          )}
          <div className="grid gap-3">
            {opportunities.map((o) => (
              <div key={o.id} className="rounded-2xl bg-white ring-1 ring-ngo-navy/8 p-4 sm:p-5 flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.18em] font-extrabold ${statusStyles[o.status] ?? ""}`}>
                      {statusLabel(o.status)}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-ngo-gold">
                      {categoryLabel(o.category)}
                    </span>
                  </div>
                  <h3 className="mt-2 font-extrabold text-ngo-navy text-[15px] leading-snug break-words">{o.title}</h3>
                  <p className="mt-1 text-[11.5px] text-ngo-slate">
                    {o.registration_deadline ? `Clôture : ${formatDate(o.registration_deadline)}` : "Sans date limite"} ·{" "}
                    {o.applications_count} candidature(s)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/admin/opportunites/$id"
                    params={{ id: o.id }}
                    className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 py-2.5 rounded-md font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold"
                  >
                    <Pencil size={13} aria-hidden="true" /> Modifier
                  </Link>
                  <Button variant="ghost" className="text-red-600" onClick={() => handleDelete(o.id, o.title)}>
                    <Trash2 size={14} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 px-4 sm:px-6 border-b border-ngo-navy/8">
        <div className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy">Articles</h2>
          {articlesQuery.isLoading && <p className="text-sm text-ngo-slate">Chargement…</p>}
          {articles.length === 0 && !articlesQuery.isLoading && (
            <div className="rounded-2xl bg-ngo-pearl/60 p-6 text-sm text-ngo-slate">
              Aucun article pour l'instant. Cliquez sur « Nouvel article » pour commencer.
            </div>
          )}
          <div className="grid gap-3">
            {articles.map((a) => (
              <div key={a.id} className="rounded-2xl bg-white ring-1 ring-ngo-navy/8 p-4 sm:p-5 flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.18em] font-extrabold ${statusStyles[a.status] ?? ""}`}>
                      {articleStatusLabel(a.status)}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-ngo-gold">{a.category}</span>
                    {a.featured && (
                      <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-ngo-navy">À la une</span>
                    )}
                  </div>
                  <h3 className="mt-2 font-extrabold text-ngo-navy text-[15px] leading-snug break-words">{a.title}</h3>
                  <p className="mt-1 text-[11.5px] text-ngo-slate">
                    /impact/{a.slug} {a.date_label ? `· ${a.date_label}` : ""} {a.location ? `· ${a.location}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/admin/articles/$id"
                    params={{ id: a.id }}
                    className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 py-2.5 rounded-md font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold"
                  >
                    <Pencil size={13} aria-hidden="true" /> Modifier
                  </Link>
                  <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteArticle(a.id, a.title)}>
                    <Trash2 size={14} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy flex items-center gap-2">
            <Users size={13} className="text-ngo-gold" aria-hidden="true" /> Candidatures reçues
          </h2>
          {applications.length === 0 ? (
            <div className="rounded-2xl bg-ngo-pearl/60 p-6 text-sm text-ngo-slate">Aucune candidature pour le moment.</div>
          ) : (
            <div className="grid gap-3">
              {applications.map((a) => (
                <div key={a.id} className="rounded-2xl ring-1 ring-ngo-navy/8 p-4 sm:p-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-ngo-navy text-[14.5px]">{a.full_name}</h3>
                    <p className="text-[12px] text-ngo-slate">
                      {a.email} · {a.phone} {a.profile ? `· ${a.profile}` : ""}
                    </p>
                    <p className="mt-1 text-[11.5px] font-semibold text-ngo-navy">
                      {a.opportunities?.title ?? "Opportunité supprimée"} — {formatDate(a.created_at)}
                    </p>
                    {a.motivation && <p className="mt-2 text-[12.5px] text-ngo-slate leading-relaxed whitespace-pre-line">{a.motivation}</p>}
                  </div>
                  <div className="flex flex-wrap items-start gap-2">
                    <select
                      className="h-10 rounded-lg border border-ngo-navy/12 bg-white px-3 text-[12px] font-semibold text-ngo-navy"
                      value={a.status}
                      onChange={(e) => changeApplicationStatus(a.id, e.target.value)}
                      aria-label={`Statut de la candidature de ${a.full_name}`}
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {applicationStatusLabel(s.value)}
                        </option>
                      ))}
                    </select>
                    {a.cv_url && (
                      <Button variant="outline" size="sm" onClick={() => openCv(a.cv_url as string)}>
                        <FileDown size={13} aria-hidden="true" /> CV
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
