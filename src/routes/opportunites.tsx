import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Sparkles,
  Clock,
  Users,
  Flame,
  Check,
  FileText,
  MessageCircle,
  Compass,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react";
import heroImg from "@/assets/opportunities-hero.jpg";
import featuredImg from "@/assets/hero-mentorship.jpg";
import bootcampImg from "@/assets/axis-digital.jpg";
import stageImg from "@/assets/entrepreneur.jpg";
import bourseImg from "@/assets/solidarity.jpg";

export const Route = createFileRoute("/opportunites")({
  head: () => ({
    meta: [
      { title: "Opportunités — Promotion 2025 · CMEP Togo" },
      {
        name: "description",
        content:
          "Mentorat entrepreneurial, bootcamp tech, stages conventionnés, bourses de leadership — quatre parcours d'excellence ouverts aux jeunes togolais. Région pilote : Kara.",
      },
      { property: "og:title", content: "Opportunités — Promotion 2025 · CMEP Togo" },
      {
        property: "og:description",
        content:
          "Quatre parcours d'excellence intégralement financés pour la jeunesse togolaise — région de Kara.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:url", content: "/opportunites" },
    ],
    links: [{ rel: "canonical", href: "/opportunites" }],
  }),
  component: OpportunitiesPage,
});

const FEATURED = {
  badge: "Programme phare",
  type: "Appel à candidatures",
  title: "Promotion 2025 — Mentorat Entrepreneurial",
  duration: "6 mois · Janvier → Juin",
  seats: "12 places restantes",
  deadline: "30 juin 2025",
  location: "Kara, Togo",
  urgency: "Clôture imminente",
  excerpt:
    "Un parcours intensif de six mois pour douze entrepreneurs en devenir. Mentor dédié, fonds de micro-amorçage, accès au réseau international des partenaires CMEP — tout pour transformer une idée en activité durable.",
  perks: [
    "Mentor 1:1 dédié (4 h/mois)",
    "Fonds de micro-amorçage jusqu'à 500 000 FCFA",
    "Accès au réseau international des partenaires",
    "Suivi post-programme de 12 mois",
  ],
};

const OTHERS = [
  {
    image: bootcampImg,
    type: "Formation intensive",
    title: "Bootcamp Innovation Numérique",
    excerpt:
      "Quatre semaines pour maîtriser les fondamentaux du développement web, du design produit et de la data — clôturées par un hackathon devant un jury d'employeurs.",
    duration: "4 semaines",
    seats: "20 places",
    deadline: "15 juillet 2025",
    location: "Kara, Togo",
    urgency: "Inscriptions ouvertes",
    accent: "from-ngo-navy/85",
  },
  {
    image: stageImg,
    type: "Stage conventionné",
    title: "Programme d'insertion 2025",
    excerpt:
      "Une mise en stage rémunérée chez nos partenaires régionaux, avec un suivi de six mois pour transformer la mission en premier emploi.",
    duration: "3 à 6 mois",
    seats: "Cohortes rolling",
    deadline: "Candidature continue",
    location: "Région de la Kara",
    urgency: "Toute l'année",
    accent: "from-ngo-navy/80",
  },
  {
    image: featuredImg,
    type: "Bourse de leadership",
    title: "Bourse Leadership Communautaire",
    excerpt:
      "Pour les jeunes engagés dans la transformation sociale de leur localité — financement de projet, mentorat citoyen et tribune publique.",
    duration: "12 mois",
    seats: "8 lauréats",
    deadline: "01 septembre 2025",
    location: "Togo",
    urgency: "Sélection annuelle",
    accent: "from-ngo-navy/85",
  },
];

const STEPS = [
  { n: "01", title: "Dépôt du dossier", desc: "Formulaire en ligne + lettre de motivation. 15 minutes suffisent.", time: "5 jours" },
  { n: "02", title: "Entretien individuel", desc: "Échange de 45 minutes avec un membre de la coordination — à Kara ou en visio.", time: "10 jours" },
  { n: "03", title: "Journée d'intégration", desc: "Rencontre collective avec les mentors et la cohorte.", time: "1 journée" },
  { n: "04", title: "Onboarding & démarrage", desc: "Engagement réciproque signé, premier rendez-vous mentor.", time: "Semaine 1" },
];

function OpportunitiesPage() {
  return (
    <Layout>
      {/* HERO — immersive editorial */}
      <section className="relative overflow-hidden bg-ngo-navy text-white">
        <img src={heroImg} alt="Jeunes de la cohorte CMEP en session de travail" className="absolute inset-0 size-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-ngo-navy via-ngo-navy/90 to-ngo-navy/40" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-ngo-gold/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold mb-7">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ngo-gold opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-ngo-gold" />
              </span>
              Candidatures ouvertes — Promotion 2025
            </span>
            <h1 className="font-extrabold text-5xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
              Quatre <span className="text-ngo-gold">parcours d'excellence</span> pour propulser votre génération.
            </h1>
            <p className="mt-8 text-lg text-white/75 max-w-2xl leading-relaxed">
              Mentorat entrepreneurial, bootcamp numérique, stages conventionnés et bourses de leadership.
              Frais intégralement couverts par le CMEP et ses partenaires institutionnels.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#programme-phare"
                className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-6 py-3.5 font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-transform rounded-md"
              >
                Voir le programme phare <ArrowRight size={13} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur text-white px-6 py-3.5 font-bold uppercase tracking-widest text-[11px] hover:bg-white/15 transition-colors rounded-md"
              >
                Parler à la coordination
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {[
              { v: "04", l: "Parcours ouverts" },
              { v: "60+", l: "Places disponibles" },
              { v: "100%", l: "Frais couverts" },
              { v: "48 h", l: "Réponse coordination" },
            ].map((s) => (
              <div key={s.l} className="p-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:border-ngo-gold/40 transition-colors">
                <div className="text-2xl font-extrabold leading-none">{s.v}</div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-white/55 mt-3 font-semibold leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED — programme phare */}
      <section id="programme-phare" className="bg-white py-24 px-6 scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
                <Award size={11} /> Programme phare
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
                Le parcours emblématique de la promotion.
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-ngo-gold/15 text-ngo-navy border border-ngo-gold/30 rounded-full text-[10px] uppercase tracking-[0.25em] font-extrabold">
              <Flame size={11} /> {FEATURED.urgency}
            </span>
          </div>

          <article className="grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden group">
              <img loading="lazy" decoding="async" src={featuredImg} alt="Mentor et jeune entrepreneur en session de travail" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy/70 via-ngo-navy/10 to-transparent" />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-3 py-1.5 bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold rounded">
                  {FEATURED.badge}
                </span>
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-bold rounded">
                  {FEATURED.type}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] uppercase tracking-[0.25em] text-ngo-gold font-bold">Cohorte 2025</div>
                <div className="font-extrabold text-xl mt-2">12 entrepreneurs · 1 mentor dédié chacun</div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <h3 className="font-extrabold text-3xl md:text-4xl text-ngo-navy leading-[1.1] tracking-tight">
                {FEATURED.title}
              </h3>
              <p className="text-ngo-slate leading-relaxed text-[15px] mt-6">
                {FEATURED.excerpt}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { icon: Clock, label: "Durée", val: FEATURED.duration },
                  { icon: Users, label: "Places", val: FEATURED.seats },
                  { icon: Calendar, label: "Deadline", val: FEATURED.deadline },
                  { icon: MapPin, label: "Lieu", val: FEATURED.location },
                ].map((m) => (
                  <div key={m.label} className="p-4 bg-ngo-pearl border border-ngo-navy/8 rounded-xl">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ngo-slate font-bold">
                      <m.icon size={12} className="text-ngo-gold" /> {m.label}
                    </div>
                    <div className="font-extrabold text-ngo-navy text-sm mt-2 leading-snug">{m.val}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {FEATURED.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[14px] text-ngo-navy">
                    <span className="size-5 rounded-full bg-ngo-gold/20 text-ngo-gold grid place-items-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="font-semibold">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-ngo-navy text-white px-6 py-3.5 font-bold uppercase tracking-widest text-[11px] hover:bg-ngo-gold hover:text-ngo-navy transition-colors rounded-md"
                >
                  Candidater maintenant <ArrowUpRight size={13} />
                </Link>
                <Link
                  to="/programmes"
                  className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-6 py-3.5 font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold transition-colors rounded-md"
                >
                  Lire le programme
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* AUTRES OPPORTUNITÉS — grille éditoriale */}
      <section className="bg-ngo-pearl py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Compass size={11} /> Autres parcours
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Trois portes d'entrée supplémentaires.
            </h2>
            <p className="text-ngo-slate leading-relaxed text-[15px] mt-5">
              Bootcamp intensif, insertion professionnelle ou bourse de leadership — choisissez le parcours
              qui correspond à votre étape de vie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {OTHERS.map((o) => (
              <article
                key={o.title}
                className="group bg-white border border-ngo-navy/8 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:border-ngo-gold/40 transition-all flex flex-col"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img loading="lazy" decoding="async" src={o.image} alt={o.title} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${o.accent} via-ngo-navy/20 to-transparent`} />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-2.5 py-1 bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold rounded">
                      {o.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-ngo-navy text-[10px] uppercase tracking-[0.18em] font-bold rounded">
                      {o.urgency}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-extrabold text-xl text-ngo-navy leading-tight tracking-tight">
                    {o.title}
                  </h3>
                  <p className="text-ngo-slate text-[14px] leading-relaxed mt-3 flex-1">
                    {o.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-ngo-slate font-semibold mt-6 pt-5 border-t border-ngo-navy/8">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-ngo-gold" /> {o.deadline}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-ngo-gold" /> {o.location}
                    </span>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-between gap-2 mt-6 text-ngo-navy font-bold text-[11px] uppercase tracking-widest group-hover:text-ngo-gold transition-colors"
                  >
                    <span>Candidater</span>
                    <span className="size-9 rounded-full bg-ngo-pearl group-hover:bg-ngo-gold grid place-items-center transition-colors">
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS — 4 étapes */}
      <section className="bg-ngo-navy py-24 px-6 text-white relative overflow-hidden">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-ngo-gold/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-ngo-gold/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <FileText size={11} /> Processus de candidature
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4 leading-[1.05] tracking-tight">
              De votre candidature à votre première session : <span className="text-ngo-gold">moins de 4 semaines</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="relative p-7 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:border-ngo-gold/40 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-ngo-gold font-bold mb-4">Étape {s.n}</div>
                <h3 className="font-extrabold text-xl leading-tight tracking-tight mb-3">{s.title}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed mb-6">{s.desc}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
                  <Clock size={11} className="text-ngo-gold" /> Délai · {s.time}
                </div>
                {i < STEPS.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-3 size-6 rounded-full bg-ngo-gold/20 text-ngo-gold grid place-items-center">
                    <ArrowRight size={12} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILS — qui peut candidater */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
              <Users size={11} /> À qui s'adressent ces parcours
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Trois profils accompagnés.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: GraduationCap, title: "Jeunes diplômés (18–28 ans)", desc: "À la recherche d'un premier ancrage professionnel ou d'un saut entrepreneurial.", to: "#programme-phare" },
              { icon: Briefcase, title: "Porteurs de projet (22–35 ans)", desc: "Une idée structurée, un besoin d'accompagnement technique et financier ciblé.", to: "#programme-phare" },
              { icon: Award, title: "Leaders communautaires", desc: "Engagés localement, prêts à passer à l'échelle avec une bourse dédiée.", to: "#programme-phare" },
            ].map((p) => (
              <a
                key={p.title}
                href={p.to}
                className="group p-7 border border-ngo-navy/8 rounded-2xl hover:border-ngo-gold hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="size-12 rounded-xl bg-ngo-pearl text-ngo-navy grid place-items-center mb-5 group-hover:bg-ngo-gold transition-colors">
                  <p.icon size={20} strokeWidth={2.2} />
                </div>
                <h3 className="font-extrabold text-ngo-navy text-lg leading-tight tracking-tight mb-3">{p.title}</h3>
                <p className="text-[14px] text-ngo-slate leading-relaxed">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL — premium */}
      <section className="bg-ngo-pearl py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ngo-navy/5 border border-ngo-navy/10 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-navy mb-7">
            <Sparkles size={11} className="text-ngo-gold" /> Une question avant de candidater ?
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-ngo-navy leading-[1.05] tracking-tight">
            La coordination CMEP répond <span className="text-ngo-gold">personnellement</span> sous 48 h.
          </h2>
          <p className="text-ngo-slate leading-relaxed text-[15px] mt-7 max-w-2xl mx-auto">
            Pas de chatbot, pas de tickets impersonnels. Un échange direct, en français comme en anglais,
            avec un membre de l'équipe.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-8 py-4 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-md"
            >
              Contacter la coordination <ArrowRight size={14} />
            </Link>
            <a
              href="mailto:chrismentorshipempowermentprog@gmail.com"
              className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-6 py-4 font-bold uppercase tracking-widest text-xs hover:border-ngo-gold transition-colors rounded-md"
            >
              <Mail size={13} /> Email
            </a>
            <a
              href="https://wa.me/22896898717"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-6 py-4 font-bold uppercase tracking-widest text-xs hover:border-ngo-gold transition-colors rounded-md"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
