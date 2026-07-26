import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Users,
  Flame,
  Check,
  FileText,
  MessageCircle,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Sparkles,
  Wallet,
  Download,
  Phone,
  Calendar,
  Tag,
  Eye,
} from "lucide-react";
import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref } from "@/lib/contact";

export const Route = createFileRoute("/opportunites")({
  head: () => ({
    meta: [
      { title: "Opportunités & Formations certifiantes — CMEP Togo" },
      {
        name: "description",
        content:
          "Formations certifiantes CMEP : Animateur de projet, Expert en Évaluation d'Impact Environnemental et Social, Rédaction et Gestion de projet & TDR. Sessions et cohortes ouvertes au Togo.",
      },
      { property: "og:title", content: "Opportunités & Formations certifiantes — CMEP Togo" },
      {
        property: "og:description",
        content:
          "Trois parcours certifiants ouverts à la jeunesse togolaise — inscriptions et accompagnement par la coordination.",
      },
      { property: "og:image", content: CMEP_MEDIA.opportunities.animateurProjet },
      { property: "og:url", content: "/opportunites" },
    ],
    links: [{ rel: "canonical", href: "/opportunites" }],
  }),
  component: OpportunitiesPage,
});

type Pricing = { label: string; value: string };

type Program = {
  id: string;
  slug: string;
  poster: string;
  posterAlt: string;
  secondary?: { url: string; alt: string };
  badge: string;
  category: string;
  title: string;
  tagline: string;
  excerpt: string;
  modules: string[];
  pricing: Pricing[];
  sessions: { city: string; dates: string; venue?: string }[];
  deadline?: string;
  registerUrl: string;
  status: "open" | "soon" | "featured";
  publishedAt: string;
};

const PROGRAMS: Program[] = [
  {
    id: "animateur-projet",
    slug: "animateur-de-projet",
    poster: CMEP_MEDIA.opportunities.animateurProjet,
    posterAlt: "Affiche officielle — Formation certifiante Animateur de projet",
    secondary: { url: CMEP_MEDIA.opportunities.animateurProjetIntervenants, alt: "Intervenants de la formation Animateur de projet" },
    badge: "Formation phare",
    category: "Formation certifiante",
    title: "Animateur de projet",
    tagline: "11 modules · Certification à l'issue du parcours",
    excerpt:
      "Un parcours complet qui outille les jeunes professionnels à cadrer, planifier, animer et évaluer un projet, avec un accent particulier sur les politiques de sauvegarde, la VBG et la protection.",
    modules: [
      "Fondamentaux + intro sauvegarde",
      "Cadrage et analyse des besoins",
      "Planification",
      "Réunions efficaces",
      "Tableau de bord suivi",
      "Gestion des risques (incluant risques sauvegarde)",
      "Animation d'équipe sans autorité",
      "Communication parties prenantes",
      "Évaluation d'impact",
      "Capitalisation et clôture",
      "Politiques de sauvegarde, VBG et protection",
    ],
    pricing: [
      { label: "Étudiant", value: "15 000 FCFA" },
      { label: "Étudiant (membre OSC)", value: "10 000 FCFA" },
      { label: "Professionnel", value: "40 000 FCFA" },
      { label: "Professionnel (membre OSC)", value: "30 000 FCFA" },
    ],
    sessions: [
      { city: "Lomé", dates: "05 – 08 Mai 2026", venue: "Salle de formation AUF — Université de Lomé" },
      { city: "Kara", dates: "12 – 15 Mai 2026" },
    ],
    registerUrl: createWhatsAppHref("Bonjour CMEP, je souhaite candidater à la formation Animateur de projet."),
    status: "featured",
    publishedAt: "Mai 2026",
  },
  {
    id: "eies",
    slug: "expert-evaluation-impact",
    poster: CMEP_MEDIA.opportunities.certificatEies,
    posterAlt: "Affiche officielle — Certificat Expert en Évaluation d'Impact Environnemental et Social",
    badge: "Certification",
    category: "Formation certifiante",
    title: "Expert en Évaluation d'Impact Environnemental et Social",
    tagline: "8 modules · 3 journées intensives",
    excerpt:
      "Une formation avancée pour maîtriser les cadres réglementaires, les standards internationaux et la méthodologie complète de l'Évaluation d'Impact Environnemental (EIE), jusqu'au projet final.",
    modules: [
      "Fondamentaux de la durabilité et de l'évaluation d'impact",
      "Cadres réglementaires et institutionnels",
      "Standards internationaux de référence",
      "Méthodologie de l'évaluation environnementale (EIE)",
      "Outils et techniques spécialisés",
      "Mise en œuvre, contrôle et conformité",
      "Étude de cas et projet final",
    ],
    pricing: [
      { label: "Étudiant", value: "15 000 FCFA" },
      { label: "Étudiant membre association / club", value: "12 500 FCFA" },
      { label: "Professionnel", value: "30 000 FCFA" },
    ],
    sessions: [
      { city: "Kara", dates: "12, 13 & 14 Février", venue: "Commune Kozah 1" },
    ],
    registerUrl: createWhatsAppHref("Bonjour CMEP, je souhaite candidater au certificat EIES."),
    status: "open",
    publishedAt: "Février 2026",
  },
  {
    id: "redaction-tdr",
    slug: "redaction-gestion-projet-tdr",
    poster: CMEP_MEDIA.opportunities.redactionTdr,
    posterAlt: "Affiche officielle — Atelier Rédaction et Gestion de projet & TDR",
    badge: "Atelier certifiant",
    category: "Atelier de formation",
    title: "Rédaction et Gestion de projet & des Termes de Références (TDR)",
    tagline: "3 journées intensives · Accès aux canevas d'ONG internationales",
    excerpt:
      "Un atelier concret qui outille les participants à rédiger des projets bancables et des Termes de Références conformes aux exigences des bailleurs et organisations internationales.",
    modules: [
      "Structurer un projet de A à Z",
      "Rédaction professionnelle de TDR",
      "Analyse des exigences bailleurs",
      "Canevas d'organisations internationales",
      "Suivi-évaluation adapté aux TDR",
      "Étude de cas pratique",
    ],
    pricing: [
      { label: "Étudiant.e", value: "15 000 FCFA" },
      { label: "Étudiant membre association / club", value: "10 500 FCFA" },
      { label: "Professionnel", value: "25 000 FCFA" },
    ],
    sessions: [
      { city: "Kara", dates: "24, 25 & 26 Mars", venue: "Commune Kozah 1" },
    ],
    deadline: "Clôture des inscriptions : 22 Mars 2026",
    registerUrl: createWhatsAppHref("Bonjour CMEP, je souhaite candidater à l’atelier Rédaction et Gestion de projet & TDR."),
    status: "open",
    publishedAt: "Mars 2026",
  },
];

const CATEGORIES = [
  { label: "Toutes", count: PROGRAMS.length },
  { label: "Formation certifiante", count: PROGRAMS.filter((p) => p.category === "Formation certifiante").length },
  { label: "Atelier de formation", count: PROGRAMS.filter((p) => p.category === "Atelier de formation").length },
];

const PROCESS = [
  { n: "01", title: "Choix du parcours", desc: "Sélectionnez la formation qui correspond à votre profil et à votre étape professionnelle." },
  { n: "02", title: "Inscription en ligne", desc: "Un formulaire court, une confirmation immédiate — moins de 5 minutes." },
  { n: "03", title: "Validation & paiement", desc: "Coordination CMEP vous confirme votre place et les modalités de règlement." },
  { n: "04", title: "Session & certification", desc: "Sessions présentielles avec intervenants confirmés, remise d'attestation officielle." },
];

const PROFILES = [
  {
    icon: GraduationCap,
    title: "Étudiants",
    desc: "En licence, master ou école professionnelle — tarifs préférentiels, en particulier pour les membres d'une OSC.",
  },
  {
    icon: Briefcase,
    title: "Jeunes professionnels",
    desc: "En poste ou en transition, souhaitant renforcer un savoir-faire opérationnel et obtenir une certification reconnue.",
  },
  {
    icon: Award,
    title: "Acteurs de la société civile",
    desc: "Membres d'ONG, d'associations ou de clubs — tarifs dédiés et co-construction possible avec votre structure.",
  },
];

const badgeStyles = {
  featured: "bg-ngo-gold text-ngo-navy",
  open: "bg-emerald-500 text-white",
  soon: "bg-white/90 text-ngo-navy",
} as const;

const badgeLabel = {
  featured: "À la une",
  open: "Inscriptions ouvertes",
  soon: "Bientôt",
} as const;

function OpportunityCard({ p }: { p: Program }) {
  const nextSession = p.sessions[0];
  return (
    <a
      href={`#${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ngo-navy/8 hover:ring-ngo-gold hover:shadow-xl transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ngo-navy">
        <img
          src={p.poster}
          alt={p.posterAlt}
          className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold rounded ${badgeStyles[p.status]}`}>
            {badgeLabel[p.status]}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-ngo-gold">
          <Tag size={10} aria-hidden="true" /> {p.category}
        </div>
        <h3 className="mt-2.5 font-extrabold text-ngo-navy text-[15px] sm:text-base leading-snug tracking-tight group-hover:text-ngo-gold transition-colors break-words">
          {p.title}
        </h3>
        <p className="mt-2 text-[12.5px] text-ngo-slate leading-relaxed line-clamp-2">{p.tagline}</p>
        <div className="mt-4 pt-3 border-t border-ngo-navy/8 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-ngo-slate">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Calendar size={11} className="text-ngo-gold" aria-hidden="true" /> {nextSession.dates}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={11} className="text-ngo-navy/60" aria-hidden="true" /> {nextSession.city}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ngo-navy group-hover:text-ngo-gold">
          Voir détails <ArrowUpRight size={12} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

function OpportunitiesPage() {
  const featured = PROGRAMS.find((p) => p.status === "featured") ?? PROGRAMS[0];
  const others = PROGRAMS.filter((p) => p.id !== featured.id);

  return (
    <Layout>
      {/* HERO éditorial — style portail */}
      <section className="relative bg-white pt-20 sm:pt-24 pb-8 sm:pb-12 border-b border-ngo-navy/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-slate">
            <Link to="/" className="hover:text-ngo-gold">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ngo-navy">Opportunités</span>
          </div>
          <div className="mt-5 grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
                <Sparkles size={11} aria-hidden="true" /> Cohortes 2026 · Inscriptions ouvertes
              </span>
              <h1 className="mt-3 text-[26px] sm:text-4xl md:text-5xl font-extrabold text-ngo-navy leading-[1.05] tracking-tight">
                Opportunités &<br className="hidden sm:block" /> formations <span className="text-ngo-gold">certifiantes</span>.
              </h1>
              <p className="mt-4 text-ngo-slate text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
                Le portail des opportunités CMEP — parcours certifiants et ateliers ouverts à la jeunesse togolaise.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-ngo-pearl border border-ngo-navy/10 text-[11px] font-bold text-ngo-navy"
                >
                  {c.label}
                  <span className="text-[10px] tabular-nums text-ngo-slate">({c.count})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* À LA UNE + LISTING */}
      <section className="bg-ngo-pearl/40 py-10 sm:py-14 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Featured */}
          <a
            href={`#${featured.slug}`}
            className="group lg:col-span-7 relative overflow-hidden rounded-2xl bg-ngo-navy text-white ring-1 ring-ngo-navy/10 shadow-lg"
          >
            <div className="relative aspect-[16/11] sm:aspect-[16/10]">
              <img
                src={featured.poster}
                alt={featured.posterAlt}
                className="absolute inset-0 size-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/70 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold rounded bg-ngo-gold text-ngo-navy">
                  À la une
                </span>
                <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold rounded bg-white/15 backdrop-blur text-white">
                  {featured.category}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <h2 className="font-extrabold text-white text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight group-hover:text-ngo-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-2 text-white/80 text-[13px] sm:text-sm leading-relaxed max-w-xl line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-white/70">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-ngo-gold">
                    <Calendar size={11} aria-hidden="true" /> {featured.sessions[0].dates}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={11} aria-hidden="true" /> {featured.sessions.map((s) => s.city).join(" · ")}
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* Side list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-ngo-navy">
                Autres opportunités
              </h2>
              <span className="text-[10px] text-ngo-slate tabular-nums">{others.length} disponibles</span>
            </div>
            {others.map((p) => (
              <a
                key={p.id}
                href={`#${p.slug}`}
                className="group flex gap-3 sm:gap-4 rounded-xl bg-white ring-1 ring-ngo-navy/8 hover:ring-ngo-gold hover:shadow-md transition-all overflow-hidden"
              >
                <div className="relative w-24 sm:w-32 shrink-0 aspect-square bg-ngo-navy overflow-hidden">
                  <img
                    src={p.poster}
                    alt={p.posterAlt}
                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1 min-w-0 py-3 pr-3 sm:pr-4">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-ngo-gold">
                    <Tag size={9} aria-hidden="true" /> <span className="truncate">{p.category}</span>
                  </div>
                  <h3 className="mt-1.5 font-extrabold text-ngo-navy text-[13px] sm:text-sm leading-snug tracking-tight break-words group-hover:text-ngo-gold transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-ngo-slate">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <Calendar size={10} className="text-ngo-gold" aria-hidden="true" /> {p.sessions[0].dates}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={10} aria-hidden="true" /> {p.sessions[0].city}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GRILLE — toutes les opportunités */}
      <section id="toutes" className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
                <Eye size={11} aria-hidden="true" /> Catalogue 2026
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-h2 font-extrabold text-ngo-navy leading-[1.05] tracking-tight">
                Toutes les opportunités disponibles.
              </h2>
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-ngo-slate tabular-nums">
              {PROGRAMS.length} programmes
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PROGRAMS.map((p) => (
              <OpportunityCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* DÉTAILS PROGRAMMES */}
      <section id="programmes" className="bg-ngo-pearl/40 py-12 sm:py-16 md:py-20 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Award size={11} aria-hidden="true" /> Fiches détaillées
            </span>
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Nos programmes phares en détail.
            </h2>
            <p className="text-ngo-slate leading-relaxed text-[15px] mt-4">
              Modules, tarifs, dates, lieux — tout est détaillé pour chaque parcours.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {PROGRAMS.map((p, i) => (
              <article
                key={p.id}
                id={p.slug}
                className="group scroll-mt-24 grid lg:grid-cols-12 gap-6 md:gap-10 items-start bg-white rounded-2xl p-4 sm:p-6 md:p-8 ring-1 ring-ngo-navy/8"
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-ngo-navy ring-1 ring-ngo-navy/10 shadow-xl">
                    <img
                      src={p.poster}
                      alt={p.posterAlt}
                      className="absolute inset-0 size-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] font-extrabold rounded ${badgeStyles[p.status]}`}>
                        {badgeLabel[p.status]}
                      </span>
                    </div>
                  </div>
                  {p.secondary && (
                    <div className="mt-4 relative aspect-[4/5] rounded-xl overflow-hidden bg-ngo-navy ring-1 ring-ngo-navy/10">
                      <img
                        src={p.secondary.url}
                        alt={p.secondary.alt}
                        className="absolute inset-0 size-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </div>

                <div className={`lg:col-span-7 min-w-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold text-ngo-navy leading-[1.1] tracking-tight break-words">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-ngo-navy/60 text-[13px] sm:text-sm font-medium">{p.tagline}</p>
                  <p className="mt-4 text-ngo-slate leading-relaxed text-[14px] sm:text-[15px]">{p.excerpt}</p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {p.sessions.map((s) => (
                      <div key={`${s.city}-${s.dates}`} className="p-4 bg-ngo-pearl border border-ngo-navy/10 rounded-xl">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ngo-slate font-bold">
                          <MapPin size={12} className="text-ngo-gold" aria-hidden="true" /> {s.city}
                        </div>
                        <div className="mt-2 font-extrabold text-ngo-navy text-sm">{s.dates}</div>
                        {s.venue && <div className="mt-1 text-[12px] text-ngo-slate leading-snug break-words">{s.venue}</div>}
                      </div>
                    ))}
                  </div>

                  {p.deadline && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-ngo-gold/15 border border-ngo-gold/30 text-ngo-navy rounded-md text-[12px] font-bold">
                      <Flame size={13} className="text-ngo-gold" aria-hidden="true" /> {p.deadline}
                    </div>
                  )}

                  <div className="mt-7">
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy mb-4 flex items-center gap-2">
                      <FileText size={13} className="text-ngo-gold" aria-hidden="true" /> Contenu — {p.modules.length} modules
                    </h4>
                    <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {p.modules.map((m, idx) => (
                        <li key={m} className="flex items-start gap-3 text-[13px] sm:text-[13.5px] text-ngo-navy leading-snug">
                          <span className="shrink-0 mt-0.5 size-5 rounded-full bg-ngo-navy/5 text-ngo-navy text-[10px] font-extrabold grid place-items-center tabular-nums">
                            {idx + 1}
                          </span>
                          <span className="break-words">{m}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-7">
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy mb-4 flex items-center gap-2">
                      <Wallet size={13} className="text-ngo-gold" aria-hidden="true" /> Frais de participation
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {p.pricing.map((pr) => (
                        <li key={pr.label} className="flex items-center justify-between gap-3 px-4 py-3 bg-ngo-navy text-white rounded-lg">
                          <span className="text-[12px] font-medium text-white/80 leading-snug break-words min-w-0">{pr.label}</span>
                          <span className="font-extrabold text-ngo-gold whitespace-nowrap tabular-nums">{pr.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
                    <a
                      href={p.registerUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 bg-ngo-navy text-white px-5 sm:px-6 py-3 min-h-11 font-bold uppercase tracking-widest text-[11px] hover:bg-ngo-gold hover:text-ngo-navy transition-colors rounded-md"
                    >
                      Candidater <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                    <a
                      href={p.poster}
                      download
                      className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 sm:px-5 py-3 min-h-11 font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold transition-colors rounded-md"
                    >
                      <Download size={13} aria-hidden="true" /> Affiche
                    </a>
                    <a
                      href={createWhatsAppHref("Bonjour CMEP, j’ai une question sur les opportunités ouvertes.")}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 sm:px-5 py-3 min-h-11 font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold transition-colors rounded-md"
                    >
                      Question
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="bg-ngo-navy py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white relative overflow-hidden">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-ngo-gold/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-ngo-gold/5 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Sparkles size={11} aria-hidden="true" /> Comment ça se passe
            </span>
            <h2 className="text-h2 font-extrabold mt-4 leading-[1.05] tracking-tight">
              De l'inscription à la <span className="text-ngo-gold">certification</span> : un parcours simple.
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {PROCESS.map((s) => (
              <li
                key={s.n}
                className="relative p-5 sm:p-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-ngo-gold font-bold mb-3">Étape {s.n}</div>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight tracking-tight mb-2">{s.title}</h3>
                <p className="text-white/70 text-[13px] sm:text-body leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROFILS */}
      <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Users size={11} aria-hidden="true" /> À qui s'adressent ces parcours
            </span>
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Trois profils accueillis.
            </h2>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {PROFILES.map((p) => (
              <li
                key={p.title}
                className="group p-5 sm:p-6 border border-ngo-navy/8 rounded-2xl hover:border-ngo-gold hover:shadow-lg transition-all"
              >
                <div className="size-11 rounded-xl bg-ngo-pearl text-ngo-navy grid place-items-center mb-4 group-hover:bg-ngo-gold transition-colors">
                  <p.icon size={18} strokeWidth={2.2} aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-ngo-navy text-base sm:text-lg leading-tight tracking-tight mb-2">{p.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-ngo-slate leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ngo-pearl py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ngo-navy/5 border border-ngo-navy/10 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-navy mb-6">
            <Check size={11} className="text-ngo-gold" aria-hidden="true" /> Besoin d'échanger ?
          </span>
          <h2 className="text-2xl sm:text-h2 font-extrabold text-ngo-navy leading-[1.05] tracking-tight">
            La coordination répond <span className="text-ngo-gold">personnellement</span>.
          </h2>
          <p className="text-ngo-slate leading-relaxed text-[14px] sm:text-[15px] mt-5 max-w-2xl mx-auto">
            Pas de chatbot, pas de tickets impersonnels. Un échange direct avec un membre de l'équipe CMEP.
          </p>
          <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <a
              href="tel:+22890510088"
              className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-5 sm:px-7 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-white transition-colors rounded-md"
            >
              <Phone size={14} aria-hidden="true" /> +228 90 51 00 88
            </a>
            <a
              href="mailto:chrismentorshipempowermentprog@gmail.com"
              className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 sm:px-6 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:border-ngo-gold transition-colors rounded-md bg-white"
            >
              <Mail size={13} aria-hidden="true" /> Email
            </a>
            <a
              href={createWhatsAppHref("Bonjour CMEP, j’ai une question sur les opportunités ouvertes.")}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 sm:px-6 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:border-ngo-gold transition-colors rounded-md bg-white"
            >
              <MessageCircle size={13} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
