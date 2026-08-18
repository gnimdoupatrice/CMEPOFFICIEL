// Types partagés + helpers d'affichage pour les opportunités CMEP.
import { z } from "zod";
import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref } from "@/lib/contact";

export const OPPORTUNITY_CATEGORIES = [
  { value: "formation_certifiante", label: "Formation certifiante" },
  { value: "atelier_formation", label: "Atelier de formation" },
] as const;

export const OPPORTUNITY_BADGES = [
  { value: "a_la_une", label: "À la une" },
  { value: "inscriptions_ouvertes", label: "Inscriptions ouvertes" },
  { value: "cloture", label: "Clôturé" },
] as const;

export const OPPORTUNITY_STATUSES = [
  { value: "draft", label: "Brouillon" },
  { value: "published", label: "Publiée" },
  { value: "archived", label: "Archivée" },
] as const;

export const APPLICATION_STATUSES = [
  { value: "nouvelle", label: "Nouvelle" },
  { value: "en_revue", label: "En revue" },
  { value: "acceptee", label: "Acceptée" },
  { value: "refusee", label: "Refusée" },
] as const;

export const sessionSchema = z.object({
  location: z.string().trim().min(1, "Ville obligatoire").max(120),
  venue: z.string().trim().max(200).optional().default(""),
  start_date: z.string().trim().max(40).optional().default(""),
  end_date: z.string().trim().max(40).optional().default(""),
});

export const moduleSchema = z.object({
  order: z.number().int().min(1),
  title: z.string().trim().min(1, "Titre du module obligatoire").max(240),
});

export const pricingSchema = z.object({
  profile: z.string().trim().min(1, "Profil obligatoire").max(160),
  amount: z.number().int().min(0).max(100000000),
});

export const opportunityInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3, "Titre obligatoire").max(200),
  slug: z.string().trim().min(3).max(200).regex(/^[a-z0-9-]+$/, "Lien invalide"),
  category: z.enum(["formation_certifiante", "atelier_formation"]),
  badge: z.enum(["a_la_une", "inscriptions_ouvertes", "cloture"]).nullable().optional(),
  cover_image: z.string().trim().max(500).nullable().optional(),
  short_description: z.string().trim().max(400).default(""),
  description: z.string().trim().max(6000).default(""),
  sessions: z.array(sessionSchema).max(20).default([]),
  registration_deadline: z.string().trim().max(20).nullable().optional(),
  modules: z.array(moduleSchema).max(60).default([]),
  pricing: z.array(pricingSchema).max(20).default([]),
  application_mode: z.enum(["whatsapp", "form"]),
  whatsapp_message: z.string().trim().max(600).nullable().optional(),
  status: z.enum(["draft", "published", "archived"]),
  sort_order: z.number().int().min(0).max(9999).default(0),
});

export type OpportunityInput = z.infer<typeof opportunityInputSchema>;

export const applicationSchema = z.object({
  opportunity_id: z.string().uuid(),
  full_name: z.string().trim().min(2, "Nom obligatoire").max(120),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone obligatoire").max(30),
  profile: z.string().trim().max(120).optional().default(""),
  motivation: z.string().trim().max(2000).optional().default(""),
  cv_url: z.string().trim().max(500).optional().default(""),
});

export type OpportunitySession = z.infer<typeof sessionSchema>;
export type OpportunityModule = z.infer<typeof moduleSchema>;
export type OpportunityPricing = z.infer<typeof pricingSchema>;

export type PublicOpportunity = {
  id: string;
  title: string;
  slug: string;
  category: "formation_certifiante" | "atelier_formation";
  badge: "a_la_une" | "inscriptions_ouvertes" | "cloture" | null;
  cover_url: string | null;
  short_description: string;
  description: string;
  sessions: OpportunitySession[];
  registration_deadline: string | null;
  modules: OpportunityModule[];
  pricing: OpportunityPricing[];
  application_mode: "whatsapp" | "form";
  whatsapp_message: string | null;
};

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function categoryLabel(value: string) {
  return OPPORTUNITY_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function badgeLabel(value: string | null | undefined) {
  if (!value) return "Inscriptions ouvertes";
  return OPPORTUNITY_BADGES.find((b) => b.value === value)?.label ?? value;
}

export function statusLabel(value: string) {
  return OPPORTUNITY_STATUSES.find((s) => s.value === value)?.label ?? value;
}

export function applicationStatusLabel(value: string) {
  return APPLICATION_STATUSES.find((s) => s.value === value)?.label ?? value;
}

const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

export function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return DATE_FORMAT.format(date);
}

export function formatSessionDates(session: OpportunitySession) {
  const start = formatDate(session.start_date);
  const end = formatDate(session.end_date);
  if (start && end && start !== end) return `${start} — ${end}`;
  return start || end || "Dates à confirmer";
}

export function formatAmount(amount: number) {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

// Affiches historiques bundlées — utilisées uniquement si aucune image n'a
// encore été téléversée pour ces opportunités.
const LEGACY_COVERS: Record<string, string> = {
  "animateur-de-projet": CMEP_MEDIA.opportunities.animateurProjet,
  "expert-evaluation-impact": CMEP_MEDIA.opportunities.certificatEies,
  "redaction-gestion-projet-tdr": CMEP_MEDIA.opportunities.redactionTdr,
};

export function coverFor(opportunity: Pick<PublicOpportunity, "slug" | "cover_url">) {
  return opportunity.cover_url ?? LEGACY_COVERS[opportunity.slug] ?? CMEP_MEDIA.home.hero;
}

export function applyHref(opportunity: PublicOpportunity) {
  if (opportunity.application_mode === "whatsapp") {
    return createWhatsAppHref(
      opportunity.whatsapp_message?.trim() ||
        `Bonjour CMEP, je souhaite candidater à « ${opportunity.title} ».`,
    );
  }
  return `/opportunites/${opportunity.slug}/candidater`;
}

export function isExpired(deadline: string | null) {
  if (!deadline) return false;
  const date = new Date(`${deadline}T23:59:59`);
  if (Number.isNaN(date.getTime())) return false;
  return date.getTime() < Date.now();
}
