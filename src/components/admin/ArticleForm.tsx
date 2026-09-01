import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { adminSaveArticle, adminSignArticleCover } from "@/lib/articles.functions";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_STATUSES,
  articleInputSchema,
  blocksToText,
  slugifyArticle,
  textToBlocks,
  type ArticleInput,
} from "@/lib/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImagePlus, Trash2 } from "lucide-react";

const EMPTY: ArticleInput = {
  title: "",
  slug: "",
  excerpt: "",
  category: ARTICLE_CATEGORIES[0],
  date_label: "",
  location: "",
  cover_url: null,
  focal: null,
  body: [],
  featured: false,
  status: "draft",
  sort_order: 0,
};

const fieldClass =
  "w-full rounded-lg border border-ngo-navy/12 bg-white px-3 h-11 text-sm text-ngo-navy outline-none focus:border-ngo-gold";
const sectionClass = "rounded-2xl bg-white ring-1 ring-ngo-navy/8 p-5 sm:p-6 space-y-4";
const legendClass = "text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy";

export function ArticleForm({ initial }: { initial?: ArticleInput }) {
  const navigate = useNavigate();
  const save = useServerFn(adminSaveArticle);
  const signCover = useServerFn(adminSignArticleCover);

  const [form, setForm] = useState<ArticleInput>(initial ?? EMPTY);
  const [bodyText, setBodyText] = useState(() => blocksToText(initial?.body ?? []));
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoState, setAutoState] = useState<"idle" | "saving" | "saved">("idle");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const localPreview = useRef<string | null>(null);
  const dirty = useRef(false);

  useEffect(() => {
    const path = form.cover_url;
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
  }, [form.cover_url, signCover]);

  function update<K extends keyof ArticleInput>(key: K, value: ArticleInput[K]) {
    dirty.current = true;
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadCover(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Merci de choisir une image (JPG ou PNG).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image trop lourde (8 Mo maximum).");
      return;
    }
    setUploading(true);
    // Aperçu immédiat, sans attendre la signature du fichier distant.
    if (localPreview.current) URL.revokeObjectURL(localPreview.current);
    localPreview.current = URL.createObjectURL(file);
    setCoverPreview(localPreview.current);

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("article-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    setUploading(false);
    if (error) {
      toast.error(`Échec du téléversement : ${error.message}`);
      return;
    }
    update("cover_url", path);
    toast.success("Image de couverture ajoutée.");
  }

  const persist = useCallback(
    async (status: ArticleInput["status"]) => {
      const parsed = articleInputSchema.safeParse({
        ...form,
        status,
        slug: form.slug || slugifyArticle(form.title),
        body: textToBlocks(bodyText),
      });
      if (!parsed.success) {
        return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Formulaire incomplet." };
      }
      try {
        const result = await save({ data: parsed.data });
        if (!result.ok) return { ok: false as const, error: result.error ?? "Enregistrement impossible." };
        if (result.id && !form.id) setForm((prev) => ({ ...prev, id: result.id as string }));
        return { ok: true as const, error: null };
      } catch (err) {
        return { ok: false as const, error: err instanceof Error ? err.message : "Enregistrement impossible." };
      }
    },
    [bodyText, form, save],
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
      if (!res.ok) toast.error(res.error);
    }, 1500);
    return () => clearTimeout(timer);
  }, [form, bodyText, persist]);

  // Avertit si l'on quitte pendant une sauvegarde en cours.
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (autoState === "saving") e.preventDefault();
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [autoState]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const result = await persist(form.status);
    setSaving(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(form.status === "published" ? "Article publié." : "Article enregistré en brouillon.");
    navigate({ to: "/admin" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-[11px] text-ngo-slate" aria-live="polite">
        {autoState === "saving"
          ? "Sauvegarde automatique en cours…"
          : autoState === "saved"
            ? "Brouillon enregistré automatiquement."
            : "Vos modifications sont enregistrées automatiquement en brouillon."}
      </p>
      <div className={sectionClass}>
        <p className={legendClass}>Informations principales</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="title">Titre de l'article</Label>
            <Input
              id="title"
              value={form.title}
              maxLength={240}
              onChange={(e) => {
                const value = e.target.value;
                dirty.current = true;
                setForm((prev) => ({ ...prev, title: value, slug: slugTouched ? prev.slug : slugifyArticle(value) }));
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
                update("slug", slugifyArticle(e.target.value));
              }}
            />
            <p className="text-[11px] text-ngo-slate">/impact/{form.slug || "…"}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Catégorie</Label>
            <select id="category" className={fieldClass} value={form.category} onChange={(e) => update("category", e.target.value)}>
              {ARTICLE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="date_label">Date affichée</Label>
            <Input
              id="date_label"
              placeholder="26 – 27 juin 2026"
              maxLength={80}
              value={form.date_label}
              onChange={(e) => update("date_label", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location">Lieu</Label>
            <Input
              id="location"
              placeholder="Kara, Togo"
              maxLength={120}
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Statut</Label>
            <select
              id="status"
              className={fieldClass}
              value={form.status}
              onChange={(e) => update("status", e.target.value as ArticleInput["status"])}
            >
              {ARTICLE_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
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
          <label className="flex items-center gap-3 sm:col-span-2 text-[13px] font-semibold text-ngo-navy">
            <input
              type="checkbox"
              className="size-4 accent-ngo-gold"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
            />
            Mettre cet article en avant (une)
          </label>
        </div>
      </div>

      <div className={sectionClass}>
        <p className={legendClass}>Image de couverture</p>
        <label
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
            {uploading ? "Téléversement…" : "Glissez une image ici ou cliquez pour choisir un fichier"}
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
        {form.cover_url && (
          <Button type="button" variant="outline" size="sm" onClick={() => update("cover_url", null)}>
            <Trash2 size={13} aria-hidden="true" /> Retirer l'image
          </Button>
        )}
      </div>

      <div className={sectionClass}>
        <p className={legendClass}>Contenu</p>
        <div className="space-y-1.5">
          <Label htmlFor="excerpt">Chapô (résumé affiché sur les cartes)</Label>
          <Textarea
            id="excerpt"
            rows={3}
            maxLength={600}
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="body">Corps de l'article</Label>
          <Textarea
            id="body"
            rows={16}
            value={bodyText}
            onChange={(e) => {
              dirty.current = true;
              setBodyText(e.target.value);
            }}
          />
          <p className="text-[11px] text-ngo-slate">
            Séparez les paragraphes par une ligne vide. Commencez une ligne par « - » pour créer une liste à puces.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? "Enregistrement…" : form.status === "published" ? "Publier l'article" : "Enregistrer le brouillon"}
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/admin" })}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
