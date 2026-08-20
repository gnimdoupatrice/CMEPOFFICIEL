import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  MapPin,
  Users,
  Check,
  MessageCircle,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Sparkles,
  Phone,
  Calendar,
  Tag,
  Eye,
  Search,
} from "lucide-react";
import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref } from "@/lib/contact";
import { activeOpportunities } from "@/lib/opportunities.data";
import {
  badgeLabel,
  categoryLabel,
  coverFor,
  formatSessionDates,
  type PublicOpportunity,
} from "@/lib/opportunities";

export const Route = createFileRoute("/opportunites/")({
  head: () => ({
    meta: [
      { title: "Opportunités & Formations certifiantes — CMEP Togo" },
      {
        name: "description",
        content:
          "Formations certifiantes et ateliers CMEP ouverts à la jeunesse togolaise : modules, sessions, tarifs et candidatures en ligne.",
      },
      { property: "og:title", content: "Opportunités & Formations certifiantes — CMEP Togo" },
      {
        property: "og:description",
        content: "Parcours certifiants et ateliers ouverts à la jeunesse togolaise — inscriptions accompagnées par la coordination.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/opportunites" }],
  }),
  errorComponent: () => (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-ngo-navy">Opportunités momentanément indisponibles</h1>
        <p className="mt-3 text-ngo-slate text-sm">Merci de réessayer dans quelques instants.</p>
      </section>
    </Layout>
  ),
  component: OpportunitiesPage,
});

const PROCESS = [
  { n: "01", title: "Choisis ton parcours", desc: "Sélectionnez la formation qui correspond à votre profil et à votre étape professionnelle." },
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

const badgeStyles: Record<string, string> = {
  a_la_une: "bg-ngo-gold text-ngo-navy",
  inscriptions_ouvertes: "bg-emerald-500 text-white",
  cloture: "bg-white/90 text-ngo-navy",
};

const searchText = (o: PublicOpportunity) =>
  [
    o.title,
    o.slug,
    categoryLabel(o.category),
    o.short_description,
    o.description,
    badgeLabel(o.badge),
    o.modules.map((m) => m.title).join(" "),
    o.pricing.map((p) => `${p.profile} ${p.amount}`).join(" "),
    o.sessions.map((s) => `${s.location} ${s.venue ?? ""} ${formatSessionDates(s)}`).join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR");

const normalizeQuery = (query: string) =>
  query.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr-FR");

function nextSessionLabel(o: PublicOpportunity) {
  const session = o.sessions[0];
  return session ? formatSessionDates(session) : "Dates à confirmer";
}

function nextSessionCity(o: PublicOpportunity) {
  return o.sessions[0]?.location ?? "Lieu à confirmer";
}

function OpportunityCard({ p, index }: { p: PublicOpportunity; index: number }) {
  return (
    <Link
      to="/opportunites/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ngo-navy/8 hover:ring-ngo-gold hover:shadow-xl transition-all"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ngo-pearl">
        <img
          src={coverFor(p)}
          alt={`Affiche — ${p.title}`}
          className="absolute inset-0 size-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-extrabold rounded ${
              badgeStyles[p.badge ?? "inscriptions_ouvertes"] ?? "bg-emerald-500 text-white"
            }`}
          >
            {badgeLabel(p.badge)}
          </span>
        </div>
        <span
          className="absolute top-3 right-3 size-9 rounded-full bg-white/95 backdrop-blur text-ngo-navy grid place-items-center text-[11px] font-extrabold tabular-nums shadow-md"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-ngo-gold">
          <Tag size={10} aria-hidden="true" /> {categoryLabel(p.category)}
        </div>
        <h3 className="mt-2.5 font-extrabold text-ngo-navy text-[15px] sm:text-base leading-snug tracking-tight group-hover:text-ngo-gold transition-colors break-words">
          {p.title}
        </h3>
        <p className="mt-2 text-[12.5px] text-ngo-slate leading-relaxed line-clamp-2">{p.short_description}</p>
        <div className="mt-4 pt-3 border-t border-ngo-navy/8 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-ngo-slate">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Calendar size={11} className="text-ngo-gold" aria-hidden="true" /> {nextSessionLabel(p)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={11} className="text-ngo-navy/60" aria-hidden="true" /> {nextSessionCity(p)}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ngo-navy group-hover:text-ngo-gold">
          Voir détails <ArrowUpRight size={12} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function OpportunitiesPage() {
  const programs = useMemo<PublicOpportunity[]>(() => activeOpportunities(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const categories = useMemo(
    () => [
      { label: "Toutes", value: "Toutes", count: programs.length },
      {
        label: "Formation certifiante",
        value: "formation_certifiante",
        count: programs.filter((p) => p.category === "formation_certifiante").length,
      },
      {
        label: "Atelier de formation",
        value: "atelier_formation",
        count: programs.filter((p) => p.category === "atelier_formation").length,
      },
    ],
    [programs],
  );

  const filteredPrograms = useMemo(() => {
    const q = normalizeQuery(searchQuery);
    return programs.filter((program) => {
      const matchesCategory = activeCategory === "Toutes" || program.category === activeCategory;
      const matchesQuery = q.length === 0 || searchText(program).includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery, programs]);


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
              {categories.map((c) => (
                <Button
                  key={c.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveCategory(c.value)}
                  className={`rounded-full border-ngo-navy/10 px-3 text-[11px] font-bold ${
                    activeCategory === c.value
                      ? "bg-ngo-navy text-primary-foreground hover:bg-ngo-navy hover:text-primary-foreground"
                      : "bg-ngo-pearl text-ngo-navy hover:bg-ngo-gold hover:text-ngo-navy"
                  }`}
                >
                  {c.label}
                  <span className="text-[10px] tabular-nums text-ngo-slate">({c.count})</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECHERCHE */}
      <section className="bg-ngo-pearl/70 px-4 sm:px-6 py-5 sm:py-6 border-b border-ngo-navy/8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center rounded-2xl bg-white p-3 sm:p-4 ring-1 ring-ngo-navy/8 shadow-sm">
            <label className="relative block min-w-0">
              <span className="sr-only">Rechercher une opportunité</span>
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ngo-gold pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Rechercher par formation, module, ville, tarif…"
                className="h-12 w-full rounded-xl border border-ngo-navy/10 bg-ngo-pearl/60 pl-11 pr-4 text-sm font-medium text-ngo-navy placeholder:text-ngo-slate/75 outline-none transition focus:border-ngo-gold focus:bg-white focus:ring-2 focus:ring-ngo-gold/20"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <Button
                  key={`search-${c.value}`}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveCategory(c.value)}
                  className={`rounded-full border-ngo-navy/10 px-3 text-[11px] font-bold ${
                    activeCategory === c.value
                      ? "bg-ngo-gold text-ngo-navy hover:bg-ngo-gold hover:text-ngo-navy"
                      : "bg-white text-ngo-navy hover:bg-ngo-pearl hover:text-ngo-navy"
                  }`}
                >
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {programs.length === 0 ? (
        <section className="bg-ngo-pearl/40 py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto rounded-2xl bg-white ring-1 ring-ngo-navy/8 p-8 text-center">
            <h2 className="text-xl font-extrabold text-ngo-navy">Aucune opportunité ouverte pour le moment.</h2>
            <p className="mt-3 text-[14px] text-ngo-slate leading-relaxed">
              De nouvelles cohortes sont publiées régulièrement. Écrivez-nous pour être prévenu dès l'ouverture.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* GRILLE */}
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
                  {filteredPrograms.length} / {programs.length} programmes
                </span>
              </div>
              {filteredPrograms.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredPrograms.map((p, i) => (
                    <OpportunityCard key={p.id} p={p} index={i} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-ngo-navy/10 bg-ngo-pearl p-6 text-sm font-semibold text-ngo-navy">
                  Aucun programme ne correspond à cette recherche.
                </div>
              )}
            </div>
          </section>

        </>
      )}

      {/* PROCESSUS */}
      <section className="opportunities-process-section bg-ngo-navy py-14 sm:py-20 md:py-24 px-4 sm:px-6 text-white relative overflow-hidden">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-ngo-gold/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-ngo-gold/5 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
              <Sparkles size={12} aria-hidden="true" /> Comment ça marche
            </span>
            <h2 className="text-h2 font-extrabold mt-4 leading-[1.05] tracking-tight text-white">
              De l'inscription à la <span className="text-ngo-gold">certification</span> : un parcours simple.
            </h2>
            <p className="mt-4 text-white/70 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
              Quatre étapes claires — de la sélection de votre parcours à la remise officielle de votre certification.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-ngo-gold/40 to-transparent"
              aria-hidden="true"
            />
            <ol className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
              {PROCESS.map((s) => (
                <li
                  key={s.n}
                  className="group relative p-6 sm:p-7 bg-white/[0.06] backdrop-blur-sm border border-white/12 rounded-2xl hover:bg-white/[0.09] hover:border-ngo-gold/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="size-16 sm:size-[68px] rounded-2xl bg-ngo-gold text-ngo-navy grid place-items-center font-extrabold text-2xl sm:text-[26px] tabular-nums shadow-lg shadow-ngo-gold/20 group-hover:scale-105 transition-transform"
                      aria-hidden="true"
                    >
                      {s.n}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/80 font-bold">Étape {s.n}</span>
                  </div>
                  <h3 className="font-extrabold text-primary-foreground text-lg sm:text-xl leading-tight tracking-tight mb-3 break-words">
                    {s.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-[13.5px] sm:text-[14px] leading-relaxed break-words">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PROFILS */}
      <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Users size={11} aria-hidden="true" /> À qui s'adressent ces parcours
            </span>
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">Trois profils accueillis.</h2>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {PROFILES.map((p) => (
              <li key={p.title} className="group p-5 sm:p-6 border border-ngo-navy/8 rounded-2xl hover:border-ngo-gold hover:shadow-lg transition-all">
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
