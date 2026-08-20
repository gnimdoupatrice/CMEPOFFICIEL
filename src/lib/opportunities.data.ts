// Source de vérité front-end des opportunités CMEP (aucune base de données).
import type { PublicOpportunity } from "@/lib/opportunities";
import { isExpired } from "@/lib/opportunities";

const cover = (slug: string) => `/images/opportunites/${slug}.png`;

export const OPPORTUNITIES: PublicOpportunity[] = [
  {
    id: "fonaja-forum-agroecologie",
    title: "Forum national des jeunes sur l'agroécologie (FoNaJA)",
    slug: "fonaja-forum-agroecologie",
    category: "atelier_formation",
    badge: "a_la_une",
    cover_url: cover("fonaja-forum-agroecologie"),
    short_description:
      "1ère édition — « Jeunes, Terre et Avenir : agir pour une agroécologie résiliente ». 20 places, dont 50% réservées aux femmes.",
    description:
      "1ère édition du Forum national des jeunes sur l'agroécologie (FoNaJA), sur le thème « Jeunes, Terre et Avenir : agir pour une agroécologie résiliente ».\n\nDu 27 au 29 août 2026 à Djamdè, Préfecture de la Kozah (Région de la Kara). Ouvert aux jeunes de 18-35 ans des 5 régions du Togo — 20 places, 50% réservées aux femmes.\n\nProgramme en 4 volets : ateliers pratiques, entrepreneuriat vert, vie de camp & culture, engagement.",
    sessions: [
      {
        location: "Djamdè",
        venue: "Préfecture de la Kozah, Région de la Kara",
        start_date: "2026-08-27",
        end_date: "2026-08-29",
      },
    ],
    registration_deadline: "2026-08-20",
    modules: [
      {
        order: 1,
        title:
          "Ateliers pratiques : compostage, biopesticides, maraîchage, transformation et fabrication de vins",
      },
      { order: 2, title: "Entrepreneuriat vert : élaboration de mini-projets agroécologiques" },
      {
        order: 3,
        title: "Vie de camp & culture : soirées autour du feu, contes, slam, cuisine collective, visite guidée",
      },
      {
        order: 4,
        title: "Engagement : signature de la Charte des Jeunes Agroécologistes du Togo + attestations",
      },
    ],
    pricing: [],
    application_mode: "whatsapp",
    whatsapp_message: null,
  },
  {
    id: "animateur-de-projet",
    title: "Animateur de projet",
    slug: "animateur-de-projet",
    category: "formation_certifiante",
    badge: "inscriptions_ouvertes",
    cover_url: cover("animateur-de-projet"),
    short_description:
      "Formation certifiante en 11 modules — théorie et pratique pour être immédiatement opérationnel sur le terrain.",
    description:
      "Devenez un acteur clé du changement avec cette formation complète alliant théorie et pratique, pour être immédiatement opérationnel dans les ONG, associations, entreprises sociales, collectivités et projets communautaires.\n\nQue vous soyez étudiant, jeune diplômé ou professionnel, cette opportunité est faite pour booster votre profil. Certification, possibilité de stage, suivi de deux mois.",
    sessions: [
      { location: "Lomé", venue: "", start_date: "2026-05-05", end_date: "2026-05-08" },
      { location: "Kara", venue: "", start_date: "2026-05-12", end_date: "2026-05-15" },
    ],
    registration_deadline: "2026-05-05",
    modules: [
      { order: 1, title: "Fondamentaux + intro sauvegarde" },
      { order: 2, title: "Cadrage et analyse des besoins" },
      { order: 3, title: "Planification" },
      { order: 4, title: "Réunions efficaces" },
      { order: 5, title: "Tableau de bord suivi" },
      { order: 6, title: "Gestion des risques (incluant risques sauvegarde)" },
      { order: 7, title: "Animation d'équipe sans autorité" },
      { order: 8, title: "Évaluation d'impact" },
      { order: 9, title: "Communication parties prenantes" },
      { order: 10, title: "Capitalisation et clôture" },
      { order: 11, title: "Politiques de sauvegarde, VBG et protection" },
    ],
    pricing: [],
    application_mode: "whatsapp",
    whatsapp_message: null,
  },
  {
    id: "expert-evaluation-impact-environnemental-social",
    title: "Expert en Évaluation d'Impact Environnemental et Social",
    slug: "expert-evaluation-impact-environnemental-social",
    category: "formation_certifiante",
    badge: "inscriptions_ouvertes",
    cover_url: cover("expert-evaluation-impact-environnemental-social"),
    short_description:
      "Certificat — cadres réglementaires, standards internationaux et méthodologie complète de l'évaluation d'impact.",
    description:
      "Formation certifiante destinée à maîtriser les cadres réglementaires, les standards internationaux et la méthodologie complète de l'évaluation d'impact environnemental et social, jusqu'au projet final.",
    sessions: [
      {
        location: "Kara",
        venue: "Commune Kozah 1",
        start_date: "2026-02-12",
        end_date: "2026-02-14",
      },
    ],
    registration_deadline: "2026-02-09",
    modules: [
      { order: 1, title: "Fondamentaux de la durabilité et de l'évaluation d'impact" },
      { order: 2, title: "Cadres réglementaires et institutionnels" },
      { order: 3, title: "Les standards internationaux de référence" },
      { order: 4, title: "Méthodologie de l'évaluation environnementale (EIE)" },
      { order: 5, title: "Outils et techniques spécialisés" },
      { order: 6, title: "Mise en œuvre, contrôle et conformité" },
      { order: 7, title: "Étude de cas et projet final" },
    ],
    pricing: [],
    application_mode: "whatsapp",
    whatsapp_message: null,
  },
  {
    id: "redaction-gestion-projet-tdr",
    title: "Rédaction et Gestion de projet & des Termes de Références (TDR)",
    slug: "redaction-gestion-projet-tdr",
    category: "atelier_formation",
    badge: "inscriptions_ouvertes",
    cover_url: cover("redaction-gestion-projet-tdr"),
    short_description:
      "Atelier certifiant — techniques de rédaction de projets et de Termes de Référence, avec canevas internationaux.",
    description:
      "Atelier de formation certifiant sur les techniques de rédaction de projets et de Termes de Référence, avec accès aux canevas des grandes organisations internationales.",
    sessions: [
      {
        location: "Kara",
        venue: "Commune Kozah 1",
        start_date: "2026-03-24",
        end_date: "2026-03-26",
      },
    ],
    registration_deadline: "2026-03-22",
    modules: [
      { order: 1, title: "Structurer un projet de A à Z" },
      { order: 2, title: "Analyse des exigences bailleurs" },
      { order: 3, title: "Suivi-évaluation adapté aux TDR" },
      { order: 4, title: "Rédaction professionnelle de TDR" },
      { order: 5, title: "Canevas d'organisations internationales" },
      { order: 6, title: "Étude de cas pratique" },
    ],
    pricing: [],
    application_mode: "whatsapp",
    whatsapp_message: null,
  },
];

/** Opportunités encore ouvertes à la date du jour (deadline non dépassée). */
export function activeOpportunities(): PublicOpportunity[] {
  return OPPORTUNITIES.filter((o) => !isExpired(o.registration_deadline));
}

export function findActiveOpportunity(slug: string): PublicOpportunity | undefined {
  return activeOpportunities().find((o) => o.slug === slug);
}
