import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  GraduationCap,
  Building2,
  HeartHandshake,
  LifeBuoy,
  Mail,
  Phone,
  MessageCircle,
  Search,
  Plus,
  Minus,
  ShieldCheck,
  Clock,
  Quote,
  Compass,
  Sparkles,
} from "lucide-react";
import faqHero from "@/assets/hero-student.jpg";
import voiceImg from "@/assets/testimonial-2.jpg";
import editorialImg from "@/assets/workshop.jpg";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Centre d'aide — FAQ institutionnelle CMEP" },
      {
        name: "description",
        content:
          "Réponses détaillées pour jeunes, mentors, partenaires institutionnels et bailleurs du programme CMEP Togo. Un centre de support humain et structuré.",
      },
      { property: "og:title", content: "Centre d'aide — CMEP Togo" },
      {
        property: "og:description",
        content:
          "FAQ segmentée par profil — jeunes, mentors, partenaires, bailleurs — et accès direct à la coordination CMEP.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

type Category = "jeunes" | "mentors" | "partenaires" | "bailleurs";

const CATEGORIES: { key: Category; icon: typeof Users; label: string; sub: string }[] = [
  { key: "jeunes", icon: GraduationCap, label: "Jeunes", sub: "Candidater & bénéficier" },
  { key: "mentors", icon: HeartHandshake, label: "Mentors", sub: "Accompagner une cohorte" },
  { key: "partenaires", icon: Building2, label: "Partenaires", sub: "Coopérer institutionnellement" },
  { key: "bailleurs", icon: ShieldCheck, label: "Bailleurs", sub: "Soutenir & financer" },
];

const FAQ: Record<Category, { q: string; a: string }[]> = {
  jeunes: [
    {
      q: "Qui peut candidater au programme CMEP ?",
      a: "Tout jeune togolais âgé de 16 à 35 ans, motivé par un projet entrepreneurial, professionnel ou citoyen. La région de Kara est notre zone pilote, mais des candidatures d'autres régions sont étudiées au cas par cas.",
    },
    {
      q: "Les formations sont-elles payantes ?",
      a: "Non. Les parcours CMEP sont intégralement pris en charge par le programme et ses partenaires. Aucun frais d'inscription, de matériel ou de mentorat ne vous sera demandé.",
    },
    {
      q: "Quelle est la durée d'un parcours ?",
      a: "Selon l'axe choisi, entre 4 semaines (bootcamps intensifs) et 6 mois (parcours mentorat-entrepreneuriat). Un calendrier précis est remis dès l'admission.",
    },
    {
      q: "Comment se déroule la sélection ?",
      a: "Trois étapes : dossier en ligne, entretien individuel avec un membre de la coordination, et journée d'intégration collective. Les résultats sont communiqués sous 15 jours.",
    },
    {
      q: "Que se passe-t-il après la formation ?",
      a: "Un accompagnement de suivi de 6 à 12 mois est proposé : mentorat continu, mise en réseau, appui à la structuration et accès aux opportunités d'insertion partenaires.",
    },
  ],
  mentors: [
    {
      q: "Quel profil recherchez-vous chez un mentor ?",
      a: "Professionnels, entrepreneurs ou cadres avec un minimum de 5 ans d'expérience, partageant nos valeurs d'engagement communautaire. La diaspora togolaise est explicitement bienvenue.",
    },
    {
      q: "Quel est l'engagement attendu ?",
      a: "En moyenne 4 heures par mois sur un cycle de 6 mois. Format hybride : sessions en présentiel à Kara et accompagnement à distance.",
    },
    {
      q: "Le mentorat est-il rémunéré ?",
      a: "Non, le mentorat repose sur l'engagement bénévole. Les frais opérationnels (déplacements, supports) liés à votre mission peuvent être pris en charge.",
    },
    {
      q: "Comment rejoindre le pool de mentors ?",
      a: "Un formulaire d'engagement, un entretien avec la coordination et un onboarding de deux demi-journées. Vous êtes ensuite intégré à une cohorte selon votre domaine d'expertise.",
    },
  ],
  partenaires: [
    {
      q: "Quels types de partenariats développez-vous ?",
      a: "Conventions académiques, partenariats opérationnels (ONG, mouvements citoyens), accords de mise en stage, partenariats média et collaborations événementielles.",
    },
    {
      q: "Comment formaliser une collaboration ?",
      a: "Une note d'intention adressée à la coordination, suivie d'une réunion de cadrage. Une convention pluriannuelle ou ponctuelle est ensuite co-rédigée selon le périmètre.",
    },
    {
      q: "Le CMEP est-il une structure légalement constituée ?",
      a: "Le programme est porté par un consortium d'acteurs locaux et opère sous une gouvernance partagée. La structuration juridique formelle est en cours de finalisation avec l'Université de Kara.",
    },
    {
      q: "Travaillez-vous avec des entreprises privées ?",
      a: "Oui, dans le cadre de programmes RSE, d'accueil de stagiaires ou de mécénat de compétences. Les engagements sont systématiquement encadrés par convention.",
    },
  ],
  bailleurs: [
    {
      q: "Comment soutenez-vous la traçabilité des fonds ?",
      a: "Rapports financiers semestriels, comptabilité distincte par programme, audit indépendant annuel. Un dossier de redevabilité complet est partagé avec chaque bailleur.",
    },
    {
      q: "Quels sont les coûts moyens par bénéficiaire ?",
      a: "Entre 180 000 et 340 000 FCFA selon le parcours, incluant la formation, le mentorat, les supports, le suivi post-formation et la quote-part de gestion administrative.",
    },
    {
      q: "Acceptez-vous les financements affectés ?",
      a: "Oui. Nous structurons des programmes-projets sur-mesure (genre, jeunesse rurale, climat, numérique) avec indicateurs co-définis et reporting dédié.",
    },
    {
      q: "Comment évaluer l'impact de votre programme ?",
      a: "Cadre logique aligné ODD, indicateurs de sortie et indicateurs d'effet à 6, 12 et 24 mois. Une évaluation externe est planifiée à la fin de chaque cycle pluriannuel.",
    },
  ],
};

function FAQPage() {
  const [active, setActive] = useState<Category>("jeunes");
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = useMemo(() => {
    const list = FAQ[active];
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q));
  }, [active, query]);

  return (
    <Layout>
      {/* HERO — support center */}
      <section className="pt-24 pb-16 px-6 bg-ngo-pearl border-b border-ngo-navy/5">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ngo-navy text-white text-[10px] uppercase tracking-[0.25em] font-bold mb-7">
            <LifeBuoy size={11} className="text-ngo-gold" /> Centre d'aide CMEP
          </span>
          <h1 className="font-extrabold text-5xl md:text-7xl leading-[1.02] tracking-tight text-ngo-navy">
            Vos questions, <span className="text-ngo-gold">notre engagement</span> à y répondre.
          </h1>
          <p className="mt-8 text-lg text-ngo-slate leading-relaxed max-w-2xl mx-auto">
            Un espace structuré, segmenté par profil, pensé pour vous orienter rapidement.
            Une coordination humaine reste disponible pour les questions plus précises.
          </p>

          {/* Search */}
          <div className="mt-12 max-w-2xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ngo-slate" size={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenIdx(null);
              }}
              placeholder="Rechercher une question (ex. candidature, mentorat, financement…)"
              className="w-full pl-14 pr-5 py-4 bg-white border border-ngo-navy/10 rounded-xl text-[15px] text-ngo-navy placeholder:text-ngo-slate/70 focus:outline-none focus:border-ngo-gold focus:ring-4 focus:ring-ngo-gold/10 transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY TABS — segmented */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {CATEGORIES.map((c) => {
              const isActive = c.key === active;
              return (
                <button
                  key={c.key}
                  onClick={() => {
                    setActive(c.key);
                    setOpenIdx(0);
                    setQuery("");
                  }}
                  className={`group text-left p-6 border rounded-2xl transition-all ${
                    isActive
                      ? "bg-ngo-navy text-white border-ngo-navy shadow-xl"
                      : "bg-white text-ngo-navy border-ngo-navy/10 hover:border-ngo-gold hover:shadow-md"
                  }`}
                  aria-pressed={isActive}
                >
                  <div
                    className={`size-11 rounded-xl grid place-items-center mb-5 transition-colors ${
                      isActive ? "bg-ngo-gold text-ngo-navy" : "bg-ngo-pearl text-ngo-navy group-hover:bg-ngo-gold"
                    }`}
                  >
                    <c.icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="font-extrabold text-lg tracking-tight">{c.label}</div>
                  <div className={`text-[11px] uppercase tracking-[0.2em] font-semibold mt-2 ${isActive ? "text-ngo-gold" : "text-ngo-slate"}`}>
                    {c.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* FAQ list — editorial accordion */}
          <div className="grid lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Section active</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-ngo-navy mt-3 leading-[1.05] tracking-tight mb-6">
                  {CATEGORIES.find((c) => c.key === active)?.label}.
                </h2>
                <p className="text-ngo-slate leading-relaxed text-[15px] mb-8">
                  {items.length} question{items.length > 1 ? "s" : ""} référencée{items.length > 1 ? "s" : ""}.
                  Vous ne trouvez pas votre réponse ? La coordination répond sous 48 h.
                </p>
                <div className="inline-flex items-center gap-3 px-4 py-3 bg-ngo-pearl border border-ngo-navy/8 rounded-xl">
                  <Clock size={15} className="text-ngo-gold" />
                  <span className="text-[12px] uppercase tracking-[0.2em] text-ngo-navy font-bold">
                    Réponse moyenne : 36 h
                  </span>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-3">
              {items.length === 0 && (
                <div className="p-8 bg-ngo-pearl border border-ngo-navy/8 rounded-2xl text-center">
                  <p className="text-ngo-slate">Aucun résultat. Reformulez votre recherche ou contactez la coordination.</p>
                </div>
              )}
              {items.map((it, i) => {
                const open = openIdx === i;
                return (
                  <article
                    key={it.q}
                    className={`border rounded-2xl transition-all overflow-hidden ${
                      open ? "border-ngo-gold bg-white shadow-lg" : "border-ngo-navy/10 bg-white hover:border-ngo-navy/30"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full text-left px-7 py-6 flex items-center justify-between gap-6 cursor-pointer"
                      aria-expanded={open}
                    >
                      <div className="flex items-start gap-5 flex-1">
                        <span className="text-[13px] font-extrabold text-ngo-gold tabular-nums shrink-0 pt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-extrabold text-ngo-navy text-[17px] leading-snug tracking-tight">
                          {it.q}
                        </h3>
                      </div>
                      <span
                        className={`shrink-0 size-9 rounded-full grid place-items-center transition-all ${
                          open ? "bg-ngo-gold text-ngo-navy rotate-180" : "bg-ngo-pearl text-ngo-navy"
                        }`}
                      >
                        {open ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-7 pb-7 pl-[72px] text-ngo-slate text-[15px] leading-relaxed border-t border-ngo-navy/8 pt-5">
                          {it.a}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COORDINATOR / HUMAN CONTACT BLOCK */}
      <section className="bg-ngo-pearl py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 p-10 md:p-12 bg-ngo-navy rounded-3xl text-white relative overflow-hidden">
              <div className="absolute -top-24 -right-24 size-72 rounded-full bg-ngo-gold/10 blur-3xl" />
              <div className="relative">
                <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Coordination CMEP</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-5 leading-tight tracking-tight">
                  Une équipe humaine, joignable directement.
                </h2>
                <p className="text-white/70 leading-relaxed mb-10">
                  Notre coordination répond personnellement à chaque sollicitation, en français comme en anglais.
                  Pas de chatbot, pas de tickets impersonnels.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:chrismentorshipempowermentprog@gmail.com"
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-ngo-gold/40 transition-all group"
                  >
                    <span className="size-11 rounded-lg bg-ngo-gold text-ngo-navy grid place-items-center shrink-0">
                      <Mail size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/55 font-bold">Email</div>
                      <div className="text-[13px] font-semibold break-all">chrismentorshipempowermentprog@gmail.com</div>
                    </div>
                    <ArrowUpRight size={16} className="text-white/40 group-hover:text-ngo-gold transition-colors shrink-0" />
                  </a>
                  <a
                    href="tel:+22890510088"
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-ngo-gold/40 transition-all group"
                  >
                    <span className="size-11 rounded-lg bg-ngo-gold text-ngo-navy grid place-items-center shrink-0">
                      <Phone size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/55 font-bold">Téléphone</div>
                      <div className="text-[14px] font-semibold">+228 90 51 00 88</div>
                    </div>
                    <ArrowUpRight size={16} className="text-white/40 group-hover:text-ngo-gold transition-colors shrink-0" />
                  </a>
                  <a
                    href="https://wa.me/22896898717"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-ngo-gold/40 transition-all group"
                  >
                    <span className="size-11 rounded-lg bg-ngo-gold text-ngo-navy grid place-items-center shrink-0">
                      <MessageCircle size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/55 font-bold">WhatsApp</div>
                      <div className="text-[14px] font-semibold">+228 96 89 87 17</div>
                    </div>
                    <ArrowUpRight size={16} className="text-white/40 group-hover:text-ngo-gold transition-colors shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 content-start">
              {[
                {
                  icon: GraduationCap,
                  title: "Vous êtes jeune candidat ?",
                  desc: "Démarrez votre dossier pour la promotion 2025. Frais entièrement couverts.",
                  cta: "Candidater",
                  to: "/opportunites" as const,
                },
                {
                  icon: HeartHandshake,
                  title: "Vous souhaitez mentorer ?",
                  desc: "Rejoignez notre pool de mentors et accompagnez une cohorte motivée.",
                  cta: "Devenir mentor",
                  to: "/contact" as const,
                },
                {
                  icon: Building2,
                  title: "Vous représentez une institution ?",
                  desc: "Construisons ensemble une convention de coopération sur-mesure.",
                  cta: "Devenir partenaire",
                  to: "/partenaires" as const,
                },
                {
                  icon: ShieldCheck,
                  title: "Vous êtes bailleur ou fondation ?",
                  desc: "Accédez à notre dossier de redevabilité et au cadre d'évaluation.",
                  cta: "Recevoir le dossier",
                  to: "/contact" as const,
                },
              ].map((b) => (
                <Link
                  key={b.title}
                  to={b.to}
                  className="group p-7 bg-white border border-ngo-navy/8 rounded-2xl hover:border-ngo-gold hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="size-11 rounded-xl bg-ngo-pearl text-ngo-navy grid place-items-center mb-5 group-hover:bg-ngo-gold transition-colors">
                    <b.icon size={18} strokeWidth={2.2} />
                  </div>
                  <h3 className="font-extrabold text-ngo-navy text-lg leading-tight tracking-tight mb-3">{b.title}</h3>
                  <p className="text-[14px] text-ngo-slate leading-relaxed mb-6">{b.desc}</p>
                  <span className="inline-flex items-center gap-2 text-ngo-navy font-bold text-[12px] uppercase tracking-widest group-hover:text-ngo-gold transition-colors">
                    {b.cta} <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
