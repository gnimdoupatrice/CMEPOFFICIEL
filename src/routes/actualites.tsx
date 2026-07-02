import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Clock,
  Radio,
  Quote,
  Sparkles,
  Users,
  PlayCircle,
  Award,
  Flame,
  Globe2,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import newsFeatured from "@/assets/news-featured.jpg";
import newsBrigade from "@/assets/news-brigade.jpg";
import newsEntrepreneur from "@/assets/news-entrepreneur.jpg";
import newsPartnership from "@/assets/news-partnership.jpg";
import workshop from "@/assets/workshop.jpg";
import solidarity from "@/assets/solidarity.jpg";
import entrepreneurImg from "@/assets/entrepreneur.jpg";
import heroMentorship from "@/assets/hero-mentorship.jpg";
import heroStudent from "@/assets/hero-student.jpg";
import opportunitiesHero from "@/assets/opportunities-hero.jpg";
import challengeYouth from "@/assets/challenge-youth.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités & Opportunités — Newsroom CMEP Togo" },
      {
        name: "description",
        content:
          "Récits du terrain, portraits de jeunes leaders, annonces de partenariat et appels à candidatures du programme CMEP dans la région de Kara.",
      },
      { property: "og:title", content: "Newsroom — CMEP Togo" },
      {
        property: "og:description",
        content:
          "Histoires d'impact, opportunités, mises à jour de terrain et annonces institutionnelles du CMEP.",
      },
      { property: "og:image", content: newsFeatured },
      { property: "og:url", content: "/actualites" },
    ],
    links: [{ rel: "canonical", href: "/actualites" }],
  }),
  component: NewsroomPage,
});

const EDITORIAL_NEWS = [
  {
    img: newsBrigade,
    category: "Récit de terrain",
    kicker: "Mobilisation citoyenne",
    title: "Trois jours, 142 jeunes, deux quartiers : la brigade qui a réveillé Kara.",
    excerpt:
      "À Tomdè et Kpéwa, la promotion 2024 a transformé un week-end de salubrité en démonstration collective de citoyenneté active.",
    date: "12 mai 2025",
    location: "Kara · Tomdè & Kpéwa",
    readTime: "6 min",
    size: "wide",
  },
  {
    img: newsEntrepreneur,
    category: "Portrait",
    kicker: "Trajectoire",
    title: "Aïcha B. : six mois pour passer du mentorat à son atelier.",
    excerpt:
      "Comment l'accompagnement entrepreneurial a transformé un savoir-faire artisanal en micro-entreprise qui emploie trois apprenties.",
    date: "28 avril 2025",
    location: "Kara",
    readTime: "8 min",
    size: "tall",
  },
  {
    img: newsPartnership,
    category: "Partenariat",
    kicker: "Coopération",
    title: "France Volontaires et CMEP signent trois ans d'engagement structuré.",
    excerpt:
      "Une convention-cadre qui structure mentorat, mobilités et insertion professionnelle jusqu'en 2028.",
    date: "15 avril 2025",
    location: "Lomé",
    readTime: "4 min",
    size: "square",
  },
  {
    img: workshop,
    category: "Bootcamp",
    kicker: "En cours",
    title: "Agro-transformation : la session de Pya forme 28 jeunes en quatre semaines.",
    excerpt:
      "Maraîchage, conservation, packaging et mise en marché — le bootcamp qui ancre l'économie locale dans des compétences réelles.",
    date: "08 juin 2025",
    location: "Pya",
    readTime: "5 min",
    size: "square",
  },
];

const OPPORTUNITIES = [
  {
    img: heroMentorship,
    type: "Promotion 2025",
    title: "Mentorat entrepreneurial — Cohorte de septembre",
    pitch:
      "Six mois d'accompagnement individuel pour structurer une activité génératrice de revenus et lever ses premiers financements.",
    deadline: "30 juin 2025",
    duration: "6 mois",
    location: "Kara, Togo",
    urgency: "high",
    progress: 78,
    spots: "12 places restantes",
    benefits: ["Mentor dédié", "Capital d'amorçage", "Mise en réseau", "Diplôme CMEP"],
  },
  {
    img: opportunitiesHero,
    type: "Bootcamp intensif",
    title: "Innovation numérique — Quatre semaines de transformation",
    pitch:
      "Design, code, prototypage et présentation devant un jury d'investisseurs. Une immersion totale pour basculer dans le numérique.",
    deadline: "15 juillet 2025",
    duration: "4 semaines",
    location: "Kara · Campus CMEP",
    urgency: "medium",
    progress: 45,
    spots: "22 places restantes",
    benefits: ["Bourse complète", "Équipement fourni", "Pitch devant jury", "Stage garanti"],
  },
];

const STORIES = [
  {
    img: t1,
    name: "Aïcha B.",
    role: "Promotion 2023",
    program: "Atelier de couture",
    quote:
      "Le mentorat m'a appris à structurer ce que je savais déjà faire. Mon atelier emploie aujourd'hui trois apprenties.",
    metric: "+3 emplois créés",
  },
  {
    img: t2,
    name: "Komlan A.",
    role: "Promotion 2024",
    program: "Agro-transformation",
    quote:
      "Six mois après la formation, j'ai lancé ma ligne de jus naturels distribuée dans cinq points de vente.",
    metric: "5 points de vente",
  },
  {
    img: t3,
    name: "Mawunyo D.",
    role: "Promotion 2024",
    program: "Service numérique",
    quote:
      "Le bootcamp a ouvert une voie que je n'imaginais pas. Je suis aujourd'hui développeur junior dans une scale-up.",
    metric: "Poste obtenu",
  },
];

const FIELD_DISPATCHES = [
  { date: "08 juin", tag: "Terrain", text: "Démarrage de la session formation en agro-transformation à Pya.", img: workshop },
  { date: "02 juin", tag: "Annonce", text: "Lancement officiel du comité jeunesse CMEP de Kozah.", img: solidarity },
  { date: "24 mai", tag: "Média", text: "Reportage Radio Kara : retour sur 18 mois d'accompagnement.", img: entrepreneurImg },
  { date: "10 mai", tag: "Mission", text: "Visite institutionnelle du Youth Panel — Plan International.", img: newsPartnership },
];

function NewsroomPage() {
  return (
    <Layout>
      {/* ───────────────────── FEATURED STORY HERO — immersif plein écran ───────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-ngo-navy">
        <img
          src={newsFeatured}
          alt="Promotion 2025 du CMEP en cérémonie d'ouverture à Kara"
          className="absolute inset-0 size-full object-cover opacity-70 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/80 to-ngo-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ngo-navy/90 via-ngo-navy/40 to-transparent" />

        {/* Top meta bar */}
        <div className="absolute top-0 inset-x-0 z-10 px-6 pt-28 pb-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.25em] font-extrabold">
                <Radio size={11} className="animate-pulse" /> Newsroom · Live
              </span>
              <span className="text-white/70 text-[11px] uppercase tracking-[0.22em] font-semibold">
                Édition juin 2025
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-[11px] uppercase tracking-[0.22em] font-semibold">
              <Globe2 size={13} className="text-ngo-gold" />Togo
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-6 pb-24 pt-32 grid lg:grid-cols-12 gap-10 items-end w-full">
          <div className="lg:col-span-8 text-white">
            <div className="flex items-center gap-3 mb-7">
              <span className="px-3 py-1.5 bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.25em] font-extrabold rounded">
                <Sparkles size={11} className="inline mr-1 -mt-0.5" /> Cover story
              </span>
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
                Promotion 2025
              </span>
            </div>
            <h1 className="font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tight max-w-4xl">
              Une génération qui ne <span className="text-ngo-gold italic font-light">subit</span> plus.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
              84 jeunes intègrent le parcours mentorat-entrepreneuriat-citoyenneté.
              Plus grande cohorte depuis le lancement, célébrée aux côtés de l'Université de Kara,
              du Youth Panel et de Don Bosco.
            </p>

            <div className="mt-10 flex items-center gap-5 text-[11px] uppercase tracking-[0.22em] text-white/60 font-semibold">
              <span className="flex items-center gap-1.5"><Calendar size={12} className="text-ngo-gold" /> 04 juin 2025</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-ngo-gold" /> Kara</span>
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-ngo-gold" /> 12 min de lecture</span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/impact"
                className="group inline-flex items-center gap-3 bg-ngo-gold text-ngo-navy px-7 py-4 font-bold uppercase tracking-widest text-xs rounded-md hover:scale-[1.03] transition-transform"
              >
                Lire l'histoire complète <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center gap-3 text-white border border-white/20 px-6 py-4 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-white/10 transition-colors">
                <PlayCircle size={16} className="text-ngo-gold" /> Voir la vidéo · 2:14
              </button>
            </div>
          </div>

          {/* Stats card flottante */}
          <div className="lg:col-span-4 lg:pl-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-7 text-white shadow-2xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-ngo-gold font-bold mb-5 flex items-center gap-2">
                <Award size={12} /> En chiffres
              </div>
              <div className="space-y-5">
                {[
                  { v: "84", l: "Jeunes intégrés cette promotion" },
                  { v: "12", l: "Mentors institutionnels mobilisés" },
                  { v: "9", l: "Institutions partenaires présentes" },
                ].map((s) => (
                  <div key={s.l} className="flex items-baseline gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="text-4xl font-extrabold text-ngo-gold leading-none w-16">{s.v}</div>
                    <div className="text-[12px] text-white/75 leading-snug">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-[0.3em] font-semibold flex flex-col items-center gap-2">
          <span>Défiler</span>
          <div className="w-px h-8 bg-gradient-to-b from-ngo-gold to-transparent" />
        </div>
      </section>

      {/* ───────────────────── ACTUALITÉS ÉDITORIALES — magazine layout ───────────────────── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-3">
                <span className="h-px w-10 bg-ngo-gold" /> Le magazine
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-ngo-navy mt-5 leading-[1.02] tracking-tight">
                Ce que le terrain <span className="italic font-light text-ngo-slate">raconte</span>.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <p className="text-ngo-slate text-[15px] leading-relaxed max-w-md lg:ml-auto mb-5">
                Récits, portraits, partenariats. Une fenêtre éditoriale sur ce que le programme construit chaque semaine dans la région de Kara.
              </p>
              <Link
                to="/impact"
                className="inline-flex items-center gap-2 text-ngo-navy font-bold text-[12px] uppercase tracking-widest hover:text-ngo-gold hover:gap-3 transition-all"
              >
                Toutes les histoires <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Magazine grid — asymétrique */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* WIDE — récit principal */}
            <article className="md:col-span-8 group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-7">
                <img
                  src={EDITORIAL_NEWS[0].img}
                  alt={EDITORIAL_NEWS[0].title}
                  className="size-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy/80 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 px-3 py-1.5 bg-white text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold rounded">
                  {EDITORIAL_NEWS[0].category}
                </span>
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] font-semibold">
                    <span className="flex items-center gap-1.5"><Calendar size={11} className="text-ngo-gold" /> {EDITORIAL_NEWS[0].date}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={11} className="text-ngo-gold" /> {EDITORIAL_NEWS[0].location}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] font-semibold">
                    <Clock size={11} className="text-ngo-gold" /> {EDITORIAL_NEWS[0].readTime}
                  </span>
                </div>
              </div>
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.28em] font-bold">{EDITORIAL_NEWS[0].kicker}</span>
              <h3 className="font-extrabold text-3xl md:text-4xl text-ngo-navy mt-3 leading-[1.1] tracking-tight group-hover:text-ngo-gold transition-colors">
                {EDITORIAL_NEWS[0].title}
              </h3>
              <p className="text-[16px] text-ngo-slate leading-relaxed mt-4 max-w-2xl">{EDITORIAL_NEWS[0].excerpt}</p>
              <span className="inline-flex items-center gap-2 mt-6 text-ngo-navy font-bold text-[12px] uppercase tracking-widest group-hover:text-ngo-gold group-hover:gap-3 transition-all">
                Lire le récit <ChevronRight size={14} />
              </span>
            </article>

            {/* TALL — portrait éditorial */}
            <article className="md:col-span-4 group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                <img
                  src={EDITORIAL_NEWS[1].img}
                  alt={EDITORIAL_NEWS[1].title}
                  className="size-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/40 to-transparent" />
                <span className="absolute top-5 left-5 px-3 py-1.5 bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold rounded">
                  {EDITORIAL_NEWS[1].category}
                </span>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-ngo-gold text-[10px] uppercase tracking-[0.28em] font-bold">{EDITORIAL_NEWS[1].kicker}</span>
                  <h3 className="font-extrabold text-2xl leading-tight tracking-tight mt-2 mb-4">
                    {EDITORIAL_NEWS[1].title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold text-white/70 pt-3 border-t border-white/20">
                    <span>{EDITORIAL_NEWS[1].date}</span>
                    <span>·</span>
                    <span>{EDITORIAL_NEWS[1].readTime}</span>
                  </div>
                </div>
              </div>
            </article>

            {/* SQUARE × 2 */}
            {EDITORIAL_NEWS.slice(2).map((n) => (
              <article key={n.title} className="md:col-span-6 group cursor-pointer">
                <div className="grid sm:grid-cols-5 gap-5 items-stretch p-5 border border-ngo-navy/10 rounded-2xl hover:border-ngo-gold/40 hover:shadow-xl transition-all duration-500">
                  <div className="sm:col-span-2 relative aspect-[4/3] sm:aspect-auto overflow-hidden rounded-xl">
                    <img loading="lazy" decoding="async" src={n.img} alt={n.title} className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="sm:col-span-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-ngo-pearl text-ngo-navy text-[9px] uppercase tracking-[0.22em] font-bold rounded">
                        {n.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-ngo-slate font-semibold">{n.date}</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-ngo-navy leading-snug tracking-tight mb-3 group-hover:text-ngo-gold transition-colors">
                      {n.title}
                    </h3>
                    <p className="text-[13px] text-ngo-slate leading-relaxed line-clamp-2 mb-auto">{n.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-ngo-navy/8 text-[10px] uppercase tracking-[0.2em] text-ngo-slate font-semibold">
                      <span className="flex items-center gap-1.5"><MapPin size={10} className="text-ngo-gold" /> {n.location}</span>
                      <ArrowUpRight size={14} className="text-ngo-navy group-hover:text-ngo-gold group-hover:rotate-12 transition-all" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── OPPORTUNITÉS PREMIUM — programmes d'excellence ───────────────────── */}
      <section className="relative bg-ngo-navy py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 right-0 size-[28rem] rounded-full bg-ngo-gold/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 size-[28rem] rounded-full bg-ngo-gold/5 blur-[120px]" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-3">
                <span className="h-px w-10 bg-ngo-gold" /> Programmes ouverts
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-5 leading-[1.02] tracking-tight">
                Des parcours <span className="italic font-light text-ngo-gold">transformateurs</span>.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-white/65 text-[15px] leading-relaxed max-w-md lg:ml-auto">
                Cohortes d'excellence, mentorat individuel, bourses complètes.
                Le programme couvre l'intégralité des frais : ne candidate que la motivation.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {OPPORTUNITIES.map((o) => {
              const urgencyClr =
                o.urgency === "high"
                  ? "bg-red-500/20 text-red-200 border-red-400/30"
                  : "bg-amber-500/20 text-amber-100 border-amber-400/30";
              const urgencyLabel = o.urgency === "high" ? "Urgent · clôture bientôt" : "Bientôt clos";

              return (
                <article
                  key={o.title}
                  className="group relative bg-white/[0.04] backdrop-blur border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.07] hover:border-ngo-gold/40 transition-all duration-500"
                >
                  {/* Image cohorte */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={o.img}
                      alt={`Cohorte ${o.title}`}
                      className="size-full object-cover group-hover:scale-[1.05] transition-transform duration-[1000ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/40 to-transparent" />
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold rounded">
                        <Award size={11} className="inline -mt-0.5 mr-1" /> {o.type}
                      </span>
                    </div>
                    <span className={`absolute top-5 right-5 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] font-bold rounded border backdrop-blur ${urgencyClr}`}>
                      <Flame size={10} className="inline -mt-0.5 mr-1" /> {urgencyLabel}
                    </span>
                  </div>

                  <div className="p-8 md:p-10 text-white">
                    <h3 className="font-extrabold text-2xl md:text-3xl leading-tight tracking-tight mb-4">
                      {o.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-[15px] mb-7 font-light">{o.pitch}</p>

                    {/* Meta line */}
                    <div className="grid grid-cols-3 gap-4 py-5 border-y border-white/10 mb-7">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.25em] text-white/45 font-semibold mb-1.5">Durée</div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Clock size={12} className="text-ngo-gold" /> {o.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.25em] text-white/45 font-semibold mb-1.5">Clôture</div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Calendar size={12} className="text-ngo-gold" /> {o.deadline}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.25em] text-white/45 font-semibold mb-1.5">Lieu</div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <MapPin size={12} className="text-ngo-gold" /> Kara
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-7">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-ngo-gold font-bold mb-3">Inclus dans le programme</div>
                      <div className="flex flex-wrap gap-2">
                        {o.benefits.map((b) => (
                          <span key={b} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/85 font-medium">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Progress + CTA */}
                    <div className="flex items-center justify-between mb-3 text-[11px] uppercase tracking-[0.22em] font-semibold">
                      <span className="text-white/50">Capacité de la cohorte</span>
                      <span className="text-ngo-gold">{o.spots}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-7">
                      <div
                        className="h-full bg-gradient-to-r from-ngo-gold to-amber-200 rounded-full"
                        style={{ width: `${o.progress}%` }}
                      />
                    </div>

                    <Link
                      to="/opportunites"
                      className="group/cta w-full inline-flex items-center justify-between gap-3 bg-ngo-gold text-ngo-navy px-6 py-4 font-bold uppercase tracking-widest text-xs rounded-md hover:scale-[1.02] transition-transform"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen size={14} /> Candidater à la cohorte
                      </span>
                      <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Link
              to="/opportunites"
              className="inline-flex items-center gap-2 text-white/70 hover:text-ngo-gold text-[12px] uppercase tracking-widest font-bold transition-colors"
            >
              Voir toutes les opportunités ouvertes <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────── STORYTELLING HUMAIN — portraits éditoriaux ───────────────────── */}
      <section className="bg-ngo-pearl py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-3">
              <span className="h-px w-10 bg-ngo-gold" /> Voix de la promotion
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-ngo-navy mt-5 leading-[1.02] tracking-tight">
              Trois trajectoires. Une <span className="italic font-light">méthode</span>.
            </h2>
            <p className="text-ngo-slate text-[16px] leading-relaxed mt-7 max-w-2xl">
              Derrière chaque chiffre, une histoire. Derrière chaque histoire, des mentors, des nuits courtes
              et la conviction qu'un savoir-faire local mérite d'être structuré, financé et célébré.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STORIES.map((s, i) => (
              <article
                key={s.name}
                className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  i === 1 ? "md:translate-y-8" : ""
                }`}
              >
                <div className="relative aspect-[3/4]">
                  <img loading="lazy" decoding="async" src={s.img} alt={s.name} className="absolute inset-0 size-full object-cover group-hover:scale-[1.06] transition-transform duration-[1200ms] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/60 to-transparent" />

                  <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-navy bg-ngo-gold px-3 py-1.5 rounded">
                    {s.metric}
                  </span>

                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <Quote size={32} className="text-ngo-gold mb-5 opacity-90" />
                    <p className="text-[16px] leading-relaxed mb-6 font-light italic">
                      "{s.quote}"
                    </p>
                    <div className="pt-5 border-t border-white/20">
                      <div className="font-extrabold text-lg leading-tight">{s.name}</div>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-ngo-gold font-semibold mt-1.5">{s.program}</div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/60 font-semibold mt-1">{s.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── FIELD DISPATCHES — timeline + bande de visuels ───────────────────── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-3">
                <span className="h-px w-10 bg-ngo-gold" /> Field dispatches
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-5 mb-7 leading-[1.05] tracking-tight">
                Le pouls du <span className="italic font-light">terrain</span>.
              </h2>
              <p className="text-ngo-slate leading-relaxed text-[15px] mb-10">
                Missions, annonces, rencontres et avancées des cohortes. Une chronique vivante,
                tenue par les coordinateurs CMEP semaine après semaine.
              </p>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img loading="lazy" decoding="async" src={challengeYouth} alt="Jeunes en action sur le terrain" className="size-full object-cover" />
              </div>
            </div>

            <div className="lg:col-span-8">
              <ol className="space-y-6">
                {FIELD_DISPATCHES.map((u) => (
                  <li key={u.date} className="group">
                    <article className="grid sm:grid-cols-12 gap-6 items-center p-5 bg-ngo-pearl/50 hover:bg-ngo-pearl border border-transparent hover:border-ngo-gold/30 rounded-2xl transition-all duration-500">
                      <div className="sm:col-span-4">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                          <img loading="lazy" decoding="async" src={u.img} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      </div>
                      <div className="sm:col-span-8">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 bg-ngo-navy text-white text-[9px] uppercase tracking-[0.25em] font-bold rounded">
                            {u.tag}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.22em] text-ngo-slate font-semibold flex items-center gap-1.5">
                            <Calendar size={11} className="text-ngo-gold" /> {u.date} 2025
                          </span>
                        </div>
                        <p className="text-ngo-navy font-bold text-lg leading-snug tracking-tight mb-3">{u.text}</p>
                        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-ngo-navy font-bold group-hover:text-ngo-gold group-hover:gap-2 transition-all">
                          Suivre le dossier <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── CTA NEWSLETTER ÉDITORIALE ───────────────────── */}
      <section className="bg-ngo-pearl pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-ngo-navy">
            <img loading="lazy" decoding="async" src={heroStudent} alt="" className="absolute inset-0 size-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-ngo-navy via-ngo-navy/90 to-ngo-navy/50" />
            <div className="absolute -top-32 -left-32 size-80 rounded-full bg-ngo-gold/15 blur-3xl" />

            <div className="relative grid lg:grid-cols-12 gap-10 p-12 md:p-16 lg:p-20 items-center">
              <div className="lg:col-span-7 text-white">
                <Users className="text-ngo-gold mb-6" size={32} />
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-[1.05] tracking-tight">
                  Une lecture <span className="italic font-light text-ngo-gold">mensuelle</span>. Sans bruit.
                </h2>
                <p className="text-white/70 max-w-xl leading-relaxed text-[15px] font-light">
                  Récits de terrain, opportunités, annonces de partenariat. Une newsroom institutionnelle
                  soignée, livrée le premier lundi de chaque mois.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between gap-3 bg-ngo-gold text-ngo-navy px-7 py-5 font-bold uppercase tracking-widest text-xs rounded-md hover:scale-[1.02] transition-transform"
                >
                  S'inscrire à la newsroom
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-between gap-3 text-white border border-white/20 px-7 py-5 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-white/10 transition-colors"
                >
                  Devenir partenaire éditorial
                  <ArrowUpRight size={14} />
                </Link>
                <p className="text-white/40 text-[11px] mt-2 text-center">
                  Aucun spam. Désinscription en un clic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
