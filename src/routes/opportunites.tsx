import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Clock,
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
  accent: string;
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
    accent: "from-ngo-navy via-ngo-navy/95 to-ngo-navy/70",
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
    accent: "from-ngo-navy/95 via-ngo-navy/80 to-ngo-navy/50",
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
    accent: "from-ngo-navy/90 via-ngo-navy/70 to-ngo-navy/40",
  },
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
  open: "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30",
  soon: "bg-ngo-navy/10 text-ngo-navy border border-ngo-navy/20",
} as const;

const badgeLabel = {
  featured: "Programme phare",
  open: "Inscriptions ouvertes",
  soon: "Bientôt",
} as const;

function OpportunitiesPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ngo-navy text-white">
        <img
          src={CMEP_MEDIA.team}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-25"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ngo-navy via-ngo-navy/95 to-ngo-navy/60" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-ngo-gold/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-8 sm:gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ngo-gold opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-ngo-gold" />
              </span>
              Inscriptions ouvertes — Cohortes 2026
            </span>
            <h1 className="text-h1 font-extrabold max-w-4xl">
              Trois <span className="text-ngo-gold">formations certifiantes</span> pour renforcer votre carrière.
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
              Animateur de projet, Expert en Évaluation d'Impact Environnemental et Social,
              Rédaction et Gestion de projet & TDR — des parcours conçus avec des professionnels
              confirmés, ouverts à la jeunesse togolaise sur tout le territoire.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-5 sm:px-6 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] hover:bg-white transition-colors rounded-md"
              >
                Voir les programmes <ArrowRight size={13} aria-hidden="true" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur text-white px-5 sm:px-6 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] hover:bg-white/20 transition-colors rounded-md"
              >
                Parler à la coordination
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {[
              { v: "03", l: "Parcours certifiants" },
              { v: "8-11", l: "Modules par formation" },
              { v: "2", l: "Villes hôtes" },
              { v: "48 h", l: "Réponse coordination" },
            ].map((s) => (
              <div key={s.l} className="p-4 sm:p-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl">
                <div className="text-2xl sm:text-3xl font-extrabold leading-none">{s.v}</div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-white/60 mt-3 font-semibold leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMES — détails complets */}
      <section id="programmes" className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Award size={11} aria-hidden="true" /> Catalogue 2026
            </span>
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Nos programmes phares en détail.
            </h2>
            <p className="text-ngo-slate leading-relaxed text-[15px] mt-5">
              Chaque parcours a été conçu avec des professionnels confirmés du secteur.
              Toutes les informations — modules, tarifs, dates, lieux — sont détaillées ci-dessous.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {PROGRAMS.map((p, i) => (
              <article
                key={p.id}
                id={p.slug}
                className="group scroll-mt-24 grid lg:grid-cols-12 gap-6 md:gap-10 items-start"
              >
                {/* Affiche */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ngo-navy ring-1 ring-ngo-navy/10 shadow-2xl">
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
                    <div className="mt-4 relative aspect-[4/5] rounded-2xl overflow-hidden bg-ngo-navy ring-1 ring-ngo-navy/10">
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

                {/* Contenu */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-2xl sm:text-h2 font-extrabold text-ngo-navy leading-[1.1] tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-ngo-navy/60 text-sm font-medium">{p.tagline}</p>
                  <p className="mt-5 text-ngo-slate leading-relaxed text-[15px]">{p.excerpt}</p>

                  {/* Sessions */}
                  <div className="mt-7 grid sm:grid-cols-2 gap-3">
                    {p.sessions.map((s) => (
                      <div key={`${s.city}-${s.dates}`} className="p-4 bg-ngo-pearl border border-ngo-navy/10 rounded-xl">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ngo-slate font-bold">
                          <MapPin size={12} className="text-ngo-gold" aria-hidden="true" /> {s.city}
                        </div>
                        <div className="mt-2 font-extrabold text-ngo-navy text-sm">{s.dates}</div>
                        {s.venue && <div className="mt-1 text-[12px] text-ngo-slate leading-snug">{s.venue}</div>}
                      </div>
                    ))}
                  </div>

                  {p.deadline && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-ngo-gold/15 border border-ngo-gold/30 text-ngo-navy rounded-md text-[12px] font-bold">
                      <Flame size={13} className="text-ngo-gold" aria-hidden="true" /> {p.deadline}
                    </div>
                  )}

                  {/* Modules */}
                  <div className="mt-8">
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy mb-4 flex items-center gap-2">
                      <FileText size={13} className="text-ngo-gold" aria-hidden="true" /> Contenu — {p.modules.length} modules
                    </h4>
                    <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {p.modules.map((m, idx) => (
                        <li key={m} className="flex items-start gap-3 text-[13.5px] text-ngo-navy leading-snug">
                          <span className="shrink-0 mt-0.5 size-5 rounded-full bg-ngo-navy/5 text-ngo-navy text-[10px] font-extrabold grid place-items-center tabular-nums">
                            {idx + 1}
                          </span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tarifs */}
                  <div className="mt-8">
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy mb-4 flex items-center gap-2">
                      <Wallet size={13} className="text-ngo-gold" aria-hidden="true" /> Frais de participation
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {p.pricing.map((pr) => (
                        <li key={pr.label} className="flex items-center justify-between gap-3 px-4 py-3 bg-ngo-navy text-white rounded-lg">
                          <span className="text-[12px] font-medium text-white/80 leading-snug">{pr.label}</span>
                          <span className="font-extrabold text-ngo-gold whitespace-nowrap tabular-nums">{pr.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={p.registerUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 bg-ngo-navy text-white px-6 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] hover:bg-ngo-gold hover:text-ngo-navy transition-colors rounded-md"
                    >
                      Candidater maintenant <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                    <a
                      href={p.poster}
                      download
                      className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-5 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold transition-colors rounded-md"
                    >
                      <Download size={13} aria-hidden="true" /> Affiche
                    </a>
                    <a
                      href={createWhatsAppHref("Bonjour CMEP, j’ai une question sur les opportunités ouvertes.")}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-5 py-3.5 min-h-12 font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold transition-colors rounded-md"
                    >
                      Poser une question
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="bg-ngo-navy py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-white relative overflow-hidden">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-ngo-gold/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-ngo-gold/5 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Sparkles size={11} aria-hidden="true" /> Comment ça se passe
            </span>
            <h2 className="text-h2 font-extrabold mt-4 leading-[1.05] tracking-tight">
              De l'inscription à la <span className="text-ngo-gold">certification</span> : un parcours simple.
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PROCESS.map((s) => (
              <li
                key={s.n}
                className="relative p-6 sm:p-7 bg-white/5 backdrop-blur border border-white/10 rounded-2xl"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-ngo-gold font-bold mb-4">Étape {s.n}</div>
                <h3 className="font-extrabold text-lg sm:text-xl leading-tight tracking-tight mb-3">{s.title}</h3>
                <p className="text-white/70 text-body leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROFILS */}
      <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Users size={11} aria-hidden="true" /> À qui s'adressent ces parcours
            </span>
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Trois profils accueillis.
            </h2>
          </div>

          <ul className="grid md:grid-cols-3 gap-5">
            {PROFILES.map((p) => (
              <li
                key={p.title}
                className="group p-6 sm:p-7 border border-ngo-navy/8 rounded-2xl hover:border-ngo-gold hover:shadow-xl transition-all"
              >
                <div className="size-12 rounded-xl bg-ngo-pearl text-ngo-navy grid place-items-center mb-5 group-hover:bg-ngo-gold transition-colors">
                  <p.icon size={20} strokeWidth={2.2} aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-ngo-navy text-lg leading-tight tracking-tight mb-3">{p.title}</h3>
                <p className="text-[14px] text-ngo-slate leading-relaxed">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ngo-pearl py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ngo-navy/5 border border-ngo-navy/10 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-navy mb-7">
            <Check size={11} className="text-ngo-gold" aria-hidden="true" /> Une question avant de candidater ?
          </span>
          <h2 className="text-3xl sm:text-h2 font-extrabold text-ngo-navy leading-[1.05] tracking-tight">
            La coordination répond <span className="text-ngo-gold">personnellement</span> sous 48 h.
          </h2>
          <p className="text-ngo-slate leading-relaxed text-[15px] mt-6 sm:mt-7 max-w-2xl mx-auto">
            Pas de chatbot, pas de tickets impersonnels. Un échange direct avec un membre de l'équipe CMEP.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+22890510088"
              className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-6 sm:px-8 py-4 min-h-12 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-md"
            >
              <Phone size={14} aria-hidden="true" /> +228 90 51 00 88
            </a>
            <a
              href="mailto:chrismentorshipempowermentprog@gmail.com"
              className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-5 sm:px-6 py-4 min-h-12 font-bold uppercase tracking-widest text-xs hover:border-ngo-gold transition-colors rounded-md bg-white"
            >
              <Mail size={13} aria-hidden="true" /> Email
            </a>
            <a
              href={createWhatsAppHref("Bonjour CMEP, j’ai une question sur les opportunités ouvertes.")}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-5 sm:px-6 py-4 min-h-12 font-bold uppercase tracking-widest text-xs hover:border-ngo-gold transition-colors rounded-md bg-white"
            >
              <MessageCircle size={13} aria-hidden="true" /> Échange direct
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
