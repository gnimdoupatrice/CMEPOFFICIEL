import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { getPublishedOpportunity, submitApplication } from "@/lib/opportunities.functions";
import { applicationSchema, categoryLabel, formatDate, formatSessionDates } from "@/lib/opportunities";
import { toast } from "sonner";
import { Check, MapPin, Paperclip } from "lucide-react";

const detailQuery = (slug: string) =>
  queryOptions({
    queryKey: ["opportunity", slug],
    queryFn: () => getPublishedOpportunity({ data: { slug } }),
  });

export const Route = createFileRoute("/opportunites/$slug/candidater")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(detailQuery(params.slug)),
  head: ({ params }) => ({
    meta: [
      { title: `Candidater — ${params.slug.replace(/-/g, " ")} | CMEP Togo` },
      { name: "description", content: "Déposez votre candidature en ligne à une formation certifiante ou un atelier CMEP." },
      { property: "og:title", content: "Candidater à une formation CMEP" },
      { property: "og:description", content: "Formulaire de candidature en ligne aux opportunités CMEP Togo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  errorComponent: () => (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-ngo-navy">Candidature indisponible</h1>
        <p className="mt-3 text-ngo-slate text-sm">Merci de réessayer plus tard.</p>
      </section>
    </Layout>
  ),
  notFoundComponent: () => (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-ngo-navy">Opportunité introuvable</h1>
      </section>
    </Layout>
  ),
  component: ApplyPage,
});

function ApplyPage() {
  const { slug } = useParams({ from: "/opportunites/$slug/candidater" });
  const { data } = useSuspenseQuery(detailQuery(slug));
  const opportunity = data.opportunity;
  const send = useServerFn(submitApplication);

  const [form, setForm] = useState({ full_name: "", email: "", phone: "", profile: "", motivation: "" });
  const [cvPath, setCvPath] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  if (!opportunity) {
    return (
      <Layout>
        <section className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-extrabold text-ngo-navy">Cette opportunité n'est plus ouverte.</h1>
          <Link to="/opportunites" className="mt-5 inline-block text-[12px] font-bold uppercase tracking-widest text-ngo-gold">
            Voir les opportunités
          </Link>
        </section>
      </Layout>
    );
  }

  async function uploadCv(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fichier trop lourd (5 Mo maximum).");
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("applications-cv").upload(path, file);
    setUploading(false);
    if (error) {
      toast.error("Téléversement du CV impossible.");
      return;
    }
    setCvPath(path);
    toast.success("CV joint à votre candidature.");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = applicationSchema.safeParse({ ...form, opportunity_id: opportunity!.id, cv_url: cvPath });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire incomplet.");
      return;
    }
    setSending(true);
    const result = await send({ data: parsed.data });
    setSending(false);
    if (!result.ok) {
      toast.error(result.error ?? "Envoi impossible.");
      return;
    }
    setDone(true);
  }

  return (
    <Layout>
      <section className="bg-white pt-20 sm:pt-24 pb-8 border-b border-ngo-navy/8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-slate">
            <Link to="/" className="hover:text-ngo-gold">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to="/opportunites" className="hover:text-ngo-gold">Opportunités</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ngo-navy">Candidature</span>
          </div>
          <span className="mt-5 inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold">
            {categoryLabel(opportunity.category)}
          </span>
          <h1 className="mt-3 text-[24px] sm:text-3xl font-extrabold text-ngo-navy leading-tight tracking-tight">
            Candidater — {opportunity.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-ngo-slate">
            {opportunity.sessions.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 font-semibold">
                <MapPin size={12} className="text-ngo-gold" aria-hidden="true" /> {s.location} · {formatSessionDates(s)}
              </span>
            ))}
            {opportunity.registration_deadline && (
              <span className="font-bold text-ngo-navy">Clôture : {formatDate(opportunity.registration_deadline)}</span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-ngo-pearl/50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto rounded-2xl bg-white ring-1 ring-ngo-navy/8 p-5 sm:p-8">
          {done ? (
            <div className="text-center py-10">
              <div className="mx-auto size-12 rounded-full bg-ngo-gold grid place-items-center text-ngo-navy">
                <Check size={22} aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-ngo-navy">Candidature envoyée !</h2>
              <p className="mt-3 text-[14px] text-ngo-slate leading-relaxed">
                La coordination CMEP revient vers vous par email ou téléphone après examen de votre dossier.
              </p>
              <Link
                to="/opportunites"
                className="mt-6 inline-flex items-center gap-2 bg-ngo-navy text-white px-5 py-3 rounded-md font-bold uppercase tracking-widest text-[11px] hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
              >
                Retour aux opportunités
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="full_name">Nom et prénoms</Label>
                  <Input id="full_name" required maxLength={120} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Téléphone / WhatsApp</Label>
                  <Input id="phone" required maxLength={30} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="profile">Profil</Label>
                  <Input
                    id="profile"
                    maxLength={120}
                    placeholder="Étudiant, professionnel, membre d'OSC…"
                    value={form.profile}
                    onChange={(e) => setForm({ ...form, profile: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="motivation">Motivation</Label>
                  <Textarea
                    id="motivation"
                    rows={5}
                    maxLength={2000}
                    value={form.motivation}
                    onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-dashed border-ngo-navy/15 bg-ngo-pearl/60 px-4 py-4 cursor-pointer hover:border-ngo-gold">
                <Paperclip size={16} className="text-ngo-gold" aria-hidden="true" />
                <span className="text-[12.5px] font-semibold text-ngo-navy">
                  {uploading ? "Téléversement…" : cvPath ? "CV joint ✓ (cliquer pour remplacer)" : "Joindre un CV (PDF, optionnel)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadCv(file);
                  }}
                />
              </label>

              <Button
                type="submit"
                disabled={sending}
                className="bg-ngo-navy text-white hover:bg-ngo-gold hover:text-ngo-navy font-bold uppercase tracking-widest text-[11px] px-6 py-3 min-h-11"
              >
                {sending ? "Envoi…" : "Envoyer ma candidature"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
