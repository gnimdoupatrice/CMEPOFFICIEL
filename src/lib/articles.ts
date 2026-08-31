// Types partagés + helpers pour les articles (actualités / retours d'activités).
import { z } from "zod";

export const ARTICLE_CATEGORIES = ["Reportage", "Retour d'activité", "Annonce", "Portrait"] as const;

export const ARTICLE_STATUSES = [
  { value: "draft", label: "Brouillon" },
  { value: "published", label: "Publié" },
  { value: "archived", label: "Archivé" },
] as const;

export const articleBlockSchema = z.union([
  z.object({ type: z.literal("p"), text: z.string().trim().min(1).max(4000) }),
  z.object({ type: z.literal("ul"), items: z.array(z.string().trim().min(1).max(1000)).min(1).max(30) }),
]);

export const articleInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(5, "Titre obligatoire").max(240),
  slug: z
    .string()
    .trim()
    .min(3, "Lien obligatoire")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Lien invalide (lettres minuscules, chiffres et tirets)"),
  excerpt: z.string().trim().min(10, "Chapô obligatoire").max(600),
  category: z.string().trim().min(2).max(60),
  date_label: z.string().trim().max(80).default(""),
  location: z.string().trim().max(120).default(""),
  cover_url: z.string().trim().max(500).nullable().optional(),
  focal: z.string().trim().max(40).nullable().optional(),
  body: z.array(articleBlockSchema).min(1, "Ajoutez au moins un paragraphe").max(80),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]),
  sort_order: z.number().int().min(0).max(9999).default(0),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;
export type ArticleBlockInput = z.infer<typeof articleBlockSchema>;

export type PublicArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  location: string;
  image: string;
  focal?: string;
  body: ArticleBlockInput[];
  featured?: boolean;
};

export function slugifyArticle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function articleStatusLabel(value: string) {
  return ARTICLE_STATUSES.find((s) => s.value === value)?.label ?? value;
}

/**
 * Convertit le contenu saisi en texte simple vers des blocs structurés.
 * - Une ligne commençant par "- " devient un élément de liste.
 * - Les autres paragraphes sont séparés par une ligne vide.
 */
export function textToBlocks(text: string): ArticleBlockInput[] {
  const blocks: ArticleBlockInput[] = [];
  let list: string[] = [];

  const flush = () => {
    if (list.length) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };

  for (const rawParagraph of text.split(/\n\s*\n/)) {
    const lines = rawParagraph.split("\n").map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (line.startsWith("- ") || line.startsWith("• ")) {
        list.push(line.slice(2).trim());
      } else {
        flush();
        blocks.push({ type: "p", text: line });
      }
    }
    flush();
  }
  flush();
  return blocks;
}

export function blocksToText(blocks: ArticleBlockInput[]): string {
  return blocks
    .map((b) => (b.type === "p" ? b.text : b.items.map((i) => `- ${i}`).join("\n")))
    .join("\n\n");
}
