import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { adminSaveOpportunity, adminSignCover } from "@/lib/admin.functions";
import {
  OPPORTUNITY_BADGES,
  OPPORTUNITY_CATEGORIES,
  OPPORTUNITY_STATUSES,
  opportunityInputSchema,
  slugify,
  type OpportunityInput,
} from "@/lib/opportunities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OpportunityPreview } from "@/components/admin/OpportunityPreview";
import { toast } from "sonner";
import { Eye, ImagePlus, Plus, Trash2 } from "lucide-react";

const EMPTY: OpportunityInput = {
  title: "",
  slug: "",
  category: "formation_certifiante",
  badge: null,
  cover_image: null,
  short_description: "",
  description: "",
  sessions: [{ location: "", venue: "", start_date: "", end_date: "" }],
  registration_deadline: null,
  modules: [],
  pricing: [],
  application_mode: "whatsapp",
  whatsapp_message: "",
  status: "draft",
  sort_order: 0,
};

const fieldClass = "w-full rounded-lg border border-ngo-navy/12 bg-white px-3 h-11 text-sm text-ngo-navy outline-none focus:border-ngo-gold";
const sectionClass = "rounded-2xl bg-white ring-1 ring-ngo-navy/8 p-5 sm:p-6 space-y-4";
const legendClass = "text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy";

export function OpportunityForm({ initial }: { initial?: OpportunityInput }) {
  const navigate = useNavigate();
  const save = useServerFn(adminSaveOpportunity);
  const signCover = useServerFn(adminSignCover);
  const [form, setForm] = useState<OpportunityInput>(initial ?? EMPTY);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [autoState, setAutoState] = useState<"idle" | "saving" | "saved">("idle");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [showPreview, setShowPreview] = useState(false);
  const dropRef = useRef<HTMLLabelElement>(null);
  const localPreview = useRef<string | null>(null);
  const dirty = useRef(false);

  const previewInput = useMemo<OpportunityInput>(
    () => ({
      ...form,
      slug: form.slug || slugify(form.title),
      modules: form.modules.map((m, i) => ({ ...m, order: i + 1 })),
    }),
    [form],
  );

  useEffect(() => {
    const path = form.cover_image;
    if (!path) {
      setCoverPreview(null);
      return;
    }
    if (path.startsWith("http") || path.startsWith("blob:")) {
      setCoverPreview(path);
      return;
    }
    let active = true;
    void signCover({ data: { path } })
      .then((res) => {
        // Repli sur l'aperçu local si la signature échoue.
        if (active && res.url) setCoverPreview(res.url);
      })
      .catch(() => {
        if (active && localPreview.current) setCoverPreview(localPreview.current);
      });
    return () => {
      active = false;
    };
  }, [form.cover_image, signCover]);

  function update<K extends keyof OpportunityInput>(key: K, value: OpportunityInput[K]) {
    dirty.current = true;
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadCover(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Merci de choisir une image (JPG ou PNG).");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      toast.error("Image trop lourde (6 Mo maximum).");
      return;
    }
    setUploading(true);
    // Aperçu immédiat, sans attendre la signature du fichier distant.
    if (localPreview.current) URL.revokeObjectURL(localPreview.current);
    localPreview.current = URL.createObjectURL(file);
    setCoverPreview(localPreview.current);

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("opportunity-covers").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    setUploading(false);
    if (error) {
      toast.error(`Échec du téléversement : ${error.message}`);
      return;
    }
    update("cover_image", path);
    toast.success("Image de couverture ajoutée.");
  }

  const persist = useCallback(
    async (status: OpportunityInput["status"]) => {
      const parsed = opportunityInputSchema.safeParse({
        ...form,
        status,
        slug: form.slug || slugify(form.title),
        registration_deadline: form.registration_deadline || null,
        modules: form.modules.map((m, i) => ({ ...m, order: i + 1 })),
      });
      if (!parsed.success) {
        const messages = parsed.error.issues.map((i) => i.message);
        return { ok: false as const, error: messages[0] ?? "Formulaire incomplet.", errors: messages };
      }
      try {
        const result = await save({ data: parsed.data });
        if (!result.ok) {
          const message = result.error ?? "Enregistrement impossible.";
          return { ok: false as const, error: message, errors: [message] };
        }
        if (result.id && !form.id) setForm((prev) => ({ ...prev, id: result.id as string }));
        return { ok: true as const, error: null, errors: [] as string[] };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Enregistrement impossible.";
        return { ok: false as const, error: message, errors: [message] };
      }
    },
    [form, save],
  );

  // Sauvegarde automatique en brouillon (1,5 s après la dernière modification).
  useEffect(() => {
    if (!dirty.current) return;
    if (form.status === "published") return;
    if (form.title.trim().length < 1) return;
    const timer = setTimeout(async () => {
      setAutoState("saving");
      const res = await persist("draft");
      setAutoState(res.ok ? "saved" : "idle");
      if (!res.ok) setErrors(res.errors);
    }, 1500);
    return () => clearTimeout(timer);
  }, [form, persist]);

  // Avertit si l'on quitte pendant une sauvegarde en cours.
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (autoState === "saving") e.preventDefault();
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [autoState]);

  async function submitWith(status: OpportunityInput["status"]) {
    setSaving(true);
    const result = await persist(status);
    setSaving(false);
    setErrors(result.errors);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    if (status !== form.status) setForm((prev) => ({ ...prev, status }));
    toast.success(status === "published" ? "Opportunité publiée." : "Brouillon enregistré.");
    navigate({ to: "/admin" });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await submitWith(form.status);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={sectionClass}>
        <p className={legendClass}>Informations principales</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="title">Titre de l'opportunité</Label>
            <Input
              id="title"
              value={form.title}
              maxLength={200}
              onChange={(e) => {
                const value = e.target.value;
                setForm((prev) => ({ ...prev, title: value, slug: slugTouched ? prev.slug : slugify(value) }));
              }}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Lien de la page</Label>
            <Input
              id="slug"
              value={form.slug}
              maxLength={200}
              onChange={(e) => {
                setSlugTouched(true);
                update("slug", slugify(e.target.value));
              }}
            />
            <p className="text-[11px] text-ngo-slate">/opportunites/{form.slug || "…"}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Catégorie</Label>
            <select
              id="category"
              className={fieldClass}
              value={form.category}
              onChange={(e) => update("category", e.target.value as OpportunityInput["category"])}
            >
              {OPPORTUNITY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="badge">Badge affiché</Label>
            <select
              id="badge"
              className={fieldClass}
              value={form.badge ?? ""}
              onChange={(e) => update("badge", (e.target.value || null) as OpportunityInput["badge"])}
            >
              <option value="">Aucun</option>
              {OPPORTUNITY_BADGES.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Statut</Label>
            <select
              id="status"
              className={fieldClass}
              value={form.status}
              onChange={(e) => update("status", e.target.value as OpportunityInput["status"])}
            >
              {OPPORTUNITY_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="deadline">Date limite d'inscription</Label>
            <Input
              id="deadline"
              type="date"
              value={form.registration_deadline ?? ""}
              onChange={(e) => update("registration_deadline", e.target.value || null)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sort">Ordre d'affichage (plus grand = en premier)</Label>
            <Input
              id="sort"
              type="number"
              min={0}
              max={9999}
              value={form.sort_order}
              onChange={(e) => update("sort_order", Number(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <p className={legendClass}>Image de couverture</p>
        <label
          ref={dropRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) void uploadCover(file);
          }}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ngo-navy/15 bg-ngo-pearl/50 p-6 text-center cursor-pointer hover:border-ngo-gold"
        >
          {coverPreview ? (
            <img src={coverPreview} alt="Aperçu de la couverture" className="max-h-56 rounded-lg object-contain" />
          ) : (
            <ImagePlus size={26} className="text-ngo-gold" aria-hidden="true" />
          )}
          <span className="text-[12.5px] font-semibold text-ngo-navy">
            {uploading ? "Téléversement…" : "Glissez une affiche ici ou cliquez pour choisir un fichier"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadCover(file);
            }}
          />
        </label>
        {form.cover_image && (
          <Button type="button" variant="outline" size="sm" onClick={() => update("cover_image", null)}>
            <Trash2 size={13} aria-hidden="true" /> Retirer l'image
          </Button>
        )}
      </div>

      <div className={sectionClass}>
        <p className={legendClass}>Descriptions</p>
        <div className="space-y-1.5">
          <Label htmlFor="short">Accroche courte (affichée sur les cartes)</Label>
          <Textarea id="short" rows={2} maxLength={400} value={form.short_description} onChange={(e) => update("short_description", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="desc">Description complète</Label>
          <Textarea id="desc" rows={6} maxLength={6000} value={form.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </div>

      <div className={sectionClass}>
        <div className="flex items-center justify-between">
          <p className={legendClass}>Sessions</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => update("sessions", [...form.sessions, { location: "", venue: "", start_date: "", end_date: "" }])}
          >
            <Plus size={13} aria-hidden="true" /> Ajouter une session
          </Button>
        </div>
        {form.sessions.map((session, index) => (
          <div key={index} className="grid sm:grid-cols-2 gap-3 rounded-xl bg-ngo-pearl/60 p-4">
            <div className="space-y-1.5">
              <Label>Ville</Label>
              <Input
                value={session.location}
                onChange={(e) => {
                  const next = [...form.sessions];
                  next[index] = { ...session, location: e.target.value };
                  update("sessions", next);
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lieu précis</Label>
              <Input
                value={session.venue ?? ""}
                onChange={(e) => {
                  const next = [...form.sessions];
                  next[index] = { ...session, venue: e.target.value };
                  update("sessions", next);
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Début</Label>
              <Input
                type="date"
                value={session.start_date ?? ""}
                onChange={(e) => {
                  const next = [...form.sessions];
                  next[index] = { ...session, start_date: e.target.value };
                  update("sessions", next);
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Fin</Label>
              <Input
                type="date"
                value={session.end_date ?? ""}
                onChange={(e) => {
                  const next = [...form.sessions];
                  next[index] = { ...session, end_date: e.target.value };
                  update("sessions", next);
                }}
              />
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="justify-self-start text-red-600"
              onClick={() => update("sessions", form.sessions.filter((_, i) => i !== index))}
            >
              <Trash2 size={13} aria-hidden="true" /> Supprimer cette session
            </Button>
          </div>
        ))}
      </div>

      <div className={sectionClass}>
        <div className="flex items-center justify-between">
          <p className={legendClass}>Modules du programme</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => update("modules", [...form.modules, { order: form.modules.length + 1, title: "" }])}
          >
            <Plus size={13} aria-hidden="true" /> Ajouter un module
          </Button>
        </div>
        {form.modules.map((module, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="size-8 shrink-0 grid place-items-center rounded-full bg-ngo-navy/5 text-[11px] font-extrabold text-ngo-navy">
              {index + 1}
            </span>
            <Input
              value={module.title}
              placeholder="Intitulé du module"
              onChange={(e) => {
                const next = [...form.modules];
                next[index] = { ...module, title: e.target.value };
                update("modules", next);
              }}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="text-red-600"
              onClick={() => update("modules", form.modules.filter((_, i) => i !== index))}
              aria-label="Supprimer le module"
            >
              <Trash2 size={14} aria-hidden="true" />
            </Button>
          </div>
        ))}
      </div>

      <div className={sectionClass}>
        <div className="flex items-center justify-between">
          <p className={legendClass}>Tarifs</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => update("pricing", [...form.pricing, { profile: "", amount: 0 }])}
          >
            <Plus size={13} aria-hidden="true" /> Ajouter un tarif
          </Button>
        </div>
        {form.pricing.map((price, index) => (
          <div key={index} className="grid sm:grid-cols-[1fr_180px_auto] gap-2 items-end">
            <div className="space-y-1.5">
              <Label>Profil</Label>
              <Input
                value={price.profile}
                placeholder="Étudiant, Professionnel…"
                onChange={(e) => {
                  const next = [...form.pricing];
                  next[index] = { ...price, profile: e.target.value };
                  update("pricing", next);
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Montant (FCFA)</Label>
              <Input
                type="number"
                min={0}
                value={price.amount}
                onChange={(e) => {
                  const next = [...form.pricing];
                  next[index] = { ...price, amount: Number(e.target.value) || 0 };
                  update("pricing", next);
                }}
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="text-red-600"
              onClick={() => update("pricing", form.pricing.filter((_, i) => i !== index))}
              aria-label="Supprimer le tarif"
            >
              <Trash2 size={14} aria-hidden="true" />
            </Button>
          </div>
        ))}
      </div>

      <div className={sectionClass}>
        <p className={legendClass}>Mode de candidature</p>
        <div className="flex flex-wrap gap-2">
          {(["whatsapp", "form"] as const).map((mode) => (
            <Button
              key={mode}
              type="button"
              variant="outline"
              onClick={() => update("application_mode", mode)}
              className={`rounded-full text-[11px] font-bold ${
                form.application_mode === mode ? "bg-ngo-navy text-primary-foreground hover:bg-ngo-navy" : ""
              }`}
            >
              {mode === "whatsapp" ? "WhatsApp" : "Formulaire en ligne"}
            </Button>
          ))}
        </div>
        {form.application_mode === "whatsapp" && (
          <div className="space-y-1.5">
            <Label htmlFor="wa">Message WhatsApp pré-rempli</Label>
            <Textarea
              id="wa"
              rows={3}
              maxLength={600}
              value={form.whatsapp_message ?? ""}
              placeholder="Bonjour CMEP, je souhaite candidater à…"
              onChange={(e) => update("whatsapp_message", e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving} className="bg-ngo-navy text-white hover:bg-ngo-gold hover:text-ngo-navy font-bold uppercase tracking-widest text-[11px]">
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPreview(true)}
          className="font-bold uppercase tracking-widest text-[11px]"
        >
          <Eye size={13} aria-hidden="true" /> Aperçu
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/admin" })}>
          Annuler
        </Button>
      </div>

      <OpportunityPreview
        input={previewInput}
        coverUrl={coverPreview}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </form>
  );
}
