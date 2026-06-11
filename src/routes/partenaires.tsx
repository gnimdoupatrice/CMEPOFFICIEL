import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  GraduationCap,
  HeartHandshake,
  Globe2,
  ShieldCheck,
  Quote,
  Sparkles,
  Network,
} from "lucide-react";
import partnersHero from "@/assets/partners-hero.jpg";
import solidarity from "@/assets/solidarity.jpg";
import workshop from "@/assets/workshop.jpg";

import univKara from "@/assets/partners/universite-kara.jpg.asset.json";
import franceVol from "@/assets/partners/france-volontaires.jpg.asset.json";
import youthPanel from "@/assets/partners/youth-panel.jpg.asset.json";
import a3e from "@/assets/partners/ong-a3e.jpg.asset.json";
import kEmpire from "@/assets/partners/k-empire.jpg.asset.json";
import stadd from "@/assets/partners/ong-stadd.jpg.asset.json";
import cephal from "@/assets/partners/club-cephal.jpg.asset.json";
import bege from "@/assets/partners/bege-shoot.jpg.asset.json";
import anjped from "@/assets/partners/anjped-che.jpg.asset.json";
import donBosco from "@/assets/partners/don-bosco.jpg.asset.json";
import rotaract from "@/assets/partners/rotaract-kara.jpg.asset.json";
import anlp from "@/assets/partners/anlp.jpg.asset.json";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Coalition partenaire — CMEP Togo" },
      {
        name: "description",
        content:
          "Une coalition institutionnelle pour la jeunesse togolaise : universités, ONG, mouvements citoyens et partenaires internationaux engagés aux côtés du CMEP.",
      },
      { property: "og:title", content: "Coalition partenaire — CMEP Togo" },
      {
        property: "og:description",
        content:
          "Institutions académiques, mouvements citoyens et partenaires internationaux qui structurent l'écosystème CMEP.",
      },
      { property: "og:image", content: partnersHero },
      { property: "og:url", content: "/partenaires" },
    ],
    links: [{ rel: "canonical", href: "/partenaires" }],
  }),
  component: PartnersPage,
});

const CATEGORIES = [
  {
    key: "academic",
    icon: GraduationCap,
    label: "Institutions académiques",
    desc: "Encadrement scientifique, ancrage universitaire et accompagnement pédagogique des cohortes.",
    partners: [
      { name: "Université de Kara", logo: univKara.url, role: "Partenaire scientifique principal" },
      { name: "Centre de formation Don Bosco", logo: donBosco.url, role: "Formation technique & professionnelle" },
    ],
  },
  {
    key: "international",
    icon: Globe2,
    label: "Partenaires internationaux",
    desc: "Coopération technique, programmes structurants et mobilisation de la jeunesse à l'échelle régionale.",
    partners: [
      { name: "France Volontaires", logo: franceVol.url, role: "Mobilité & engagement volontaire" },
      { name: "Plan International — Youth Panel", logo: youthPanel.url, role: "Plateforme jeunesse internationale" },
    ],
  },
  {
    key: "civil",
    icon: HeartHandshake,
    label: "Société civile & ONG",
    desc: "Ancrage communautaire, expertise sectorielle et déploiement opérationnel sur le terrain.",
    partners: [
      { name: "ONG A3E", logo: a3e.url, role: "Éducation, environnement, emploi" },
      { name: "ONG STADD", logo: stadd.url, role: "Action territoriale & développement durable" },
      { name: "ANLP — À Nous La Planète", logo: anlp.url, role: "Plaidoyer écologique" },
      { name: "ANJPED-CHE", logo: anjped.url, role: "Jeunesse, paix, éducation" },
    ],
  },
  {
    key: "youth",
    icon: Sparkles,
    label: "Mouvements citoyens & jeunesse",
    desc: "Pairs, réseaux étudiants et clubs qui portent l'élan communautaire du programme.",
    partners: [
      { name: "K-EMPIRE", logo: kEmpire.url, role: "Culture & créativité jeunesse" },
      { name: "Club CEPHAL", logo: cephal.url, role: "Leadership citoyen" },
      { name: "BEGE SHOOT", logo: bege.url, role: "Récit, image & narration de terrain" },
      { name: "Rotaract Club — Université de Kara", logo: rotaract.url, role: "Engagement étudiant" },
    ],
  },
];

const SDGS = [
  { num: "04", label: "Éducation de qualité" },
  { num: "05", label: "Égalité entre les sexes" },
  { num: "08", label: "Travail décent & croissance" },
  { num: "10", label: "Inégalités réduites" },
  { num: "13", label: "Mesures climatiques" },
  { num: "17", label: "Partenariats" },
];

const TRUST = [
  { v: "12+", l: "Partenaires actifs", icon: Network },
  { v: "06", l: "Catégories d'institutions", icon: Building2 },
  { v: "03", l: "Conventions pluriannuelles", icon: ShieldCheck },
  { v: "100%", l: "Ancrage Togo", icon: Globe2 },
];

const QUOTES = [
  {
    quote:
      "Le CMEP comble un vide structurel : celui de l'accompagnement réel des jeunes vers l'autonomie économique. Une organisation crédible et porteuse d'un véritable impact.",
    name: "Pr. K. Tchassona",
    role: "Université de Kara",
    img: workshop,
  },
  {
    quote:
      "Une coalition lucide, ancrée dans la région, qui pose les bases d'un modèle reproductible pour la jeunesse togolaise.",
    name: "M. Yawo D.",
    role: "Partenaire institutionnel",
    img: solidarity,
  },
];

function PartnersPage() {
  return (
    <Layout>
      {/* HERO — institutional */}
      <section className="relative overflow-hidden bg-ngo-navy text-white">
        <img
          src={partnersHero}
          alt="Coalition de partenaires CMEP réunis lors d'une rencontre institutionnelle à Kara"
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ngo-navy via-ngo-navy/85 to-ngo-navy/40" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-28">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold mb-8">
            <Network size={11} /> Coalition partenaire
          </span>
          <h1 className="font-extrabold text-5xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
            Une coalition institutionnelle pour la <span className="text-ngo-gold">jeunesse togolaise</span>.
          </h1>
          <p className="mt-8 text-lg text-white/75 leading-relaxed max-w-2xl">
            Universités, ONG, mouvements citoyens, plateformes jeunesse et acteurs internationaux.
            Une alliance plurielle qui structure, finance et amplifie ce que le CMEP construit dans la région de Kara.
          </p>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST.map((t) => (
              <div
                key={t.l}
                className="p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:border-ngo-gold/40 transition-colors"
              >
                <t.icon size={20} className="text-ngo-gold mb-4" strokeWidth={2.2} />
                <div className="text-3xl md:text-4xl font-extrabold leading-none">{t.v}</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/55 mt-3 font-semibold">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO WALL — grille responsive avec images réelles du PowerPoint */}
      <section className="bg-white py-20 md:py-28 px-6 border-b border-ngo-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Ils nous accompagnent</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-ngo-navy mt-3 leading-tight tracking-tight">
              Un écosystème de douze institutions partenaires.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
            {CATEGORIES.flatMap((c) => c.partners).map((p) => (
              <div
                key={p.name}
                className="group relative aspect-[4/3] bg-ngo-pearl border border-ngo-navy/8 rounded-xl flex items-center justify-center p-4 md:p-5 hover:bg-white hover:border-ngo-gold/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                title={p.name}
              >
                <img
                  src={p.logo}
                  alt={`Logo ${p.name}`}
                  className="max-h-14 md:max-h-16 max-w-[85%] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <span className="absolute inset-x-0 bottom-0 text-center text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-ngo-slate font-semibold opacity-0 group-hover:opacity-100 transition-opacity px-2 py-2 bg-gradient-to-t from-white/90 to-transparent truncate">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIZED ECOSYSTEM */}
      <section className="bg-ngo-pearl py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-8">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Écosystème structuré</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-ngo-navy mt-3 leading-[1.05] tracking-tight">
                Quatre familles d'engagement. Une seule mission.
              </h2>
            </div>
            <p className="lg:col-span-4 text-ngo-slate leading-relaxed text-[15px]">
              Chaque partenaire occupe une fonction précise dans la chaîne d'autonomisation : recherche,
              opérationnel, mobilisation, plaidoyer.
            </p>
          </div>

          <div className="space-y-5">
            {CATEGORIES.map((cat) => (
              <article
                key={cat.key}
                className="grid lg:grid-cols-12 gap-0 bg-white border border-ngo-navy/8 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="lg:col-span-4 p-9 md:p-10 bg-ngo-navy text-white flex flex-col justify-between">
                  <div>
                    <div className="size-12 rounded-xl bg-ngo-gold text-ngo-navy grid place-items-center mb-7">
                      <cat.icon size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-extrabold text-2xl md:text-3xl leading-tight tracking-tight mb-5">
                      {cat.label}
                    </h3>
                    <p className="text-white/65 text-[14px] leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] font-semibold">
                    <span className="text-white/55">Membres</span>
                    <span className="text-ngo-gold">{String(cat.partners.length).padStart(2, "0")} institution{cat.partners.length > 1 ? "s" : ""}</span>
                  </div>
                </div>

                <div className="lg:col-span-8 p-6 md:p-8 grid sm:grid-cols-2 gap-4">
                  {cat.partners.map((p) => (
                    <div
                      key={p.name}
                      className="group p-5 border border-ngo-navy/8 rounded-xl hover:border-ngo-gold/40 hover:bg-ngo-pearl transition-all flex items-center gap-5"
                    >
                      <div className="size-16 rounded-lg bg-white border border-ngo-navy/8 flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={p.logo} alt={p.name} className="max-h-12 max-w-12 object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-extrabold text-ngo-navy text-[15px] leading-tight truncate">{p.name}</div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-ngo-slate font-semibold mt-1.5">{p.role}</div>
                      </div>
                      <ArrowUpRight size={16} className="text-ngo-slate/40 group-hover:text-ngo-gold group-hover:rotate-12 transition-all" />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PARTNERSHIP SPOTLIGHT */}
      <section className="relative overflow-hidden bg-ngo-navy text-white py-24 px-6">
        <img src={workshop} alt="" className="absolute inset-0 size-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-br from-ngo-navy via-ngo-navy/95 to-ngo-navy/70" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ngo-gold/15 border border-ngo-gold/30 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold mb-7">
              <Sparkles size={11} /> Partenariat phare
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Université de Kara&nbsp;: <span className="text-ngo-gold">trois ans</span> d'ancrage scientifique.
            </h2>
            <p className="mt-7 text-white/75 text-[15px] leading-relaxed max-w-xl">
              Une convention pluriannuelle qui structure la recherche-action, accueille les cohortes
              de mentorat sur le campus et garantit la rigueur pédagogique de chaque parcours CMEP.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-5">
              {[
                { v: "3 ans", l: "Convention active" },
                { v: "450+", l: "Étudiants impliqués" },
                { v: "12", l: "Enseignants mobilisés" },
              ].map((s) => (
                <div key={s.l} className="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-3xl font-extrabold text-ngo-gold leading-none">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/55 mt-3 font-semibold leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden group">
            <img src={solidarity} alt="Coopération Université de Kara et CMEP" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-2.5 py-1 bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold rounded mb-3">Depuis 2022</span>
              <p className="text-white font-extrabold text-xl leading-tight">Une coalition académique au service de la jeunesse de Kara.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SDG ALIGNMENT */}
      <section className="bg-white py-24 px-6">

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Alignement ODD</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-ngo-navy mt-3 leading-[1.05] tracking-tight mb-6">
                Six Objectifs de développement durable au cœur de l'action.
              </h2>
              <p className="text-ngo-slate leading-relaxed text-[15px] mb-8">
                Le CMEP structure ses programmes selon le référentiel ONU 2030. Chaque axe stratégique
                est explicitement ancré dans un ou plusieurs ODD prioritaires pour le Togo.
              </p>
              <Link
                to="/impact"
                className="inline-flex items-center gap-2 text-ngo-navy font-bold text-[13px] uppercase tracking-widest hover:text-ngo-gold transition-colors"
              >
                Voir notre rapport d'impact <ArrowRight size={14} />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SDGS.map((s) => (
                <div
                  key={s.num}
                  className="group aspect-square p-5 bg-ngo-pearl border border-ngo-navy/8 rounded-xl flex flex-col justify-between hover:bg-ngo-navy hover:border-ngo-navy transition-all"
                >
                  <span className="text-4xl font-extrabold text-ngo-gold tabular-nums leading-none">{s.num}</span>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-ngo-navy group-hover:text-white leading-snug">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES from partners */}
      <section className="bg-ngo-pearl py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Voix des partenaires</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ngo-navy mt-3 leading-[1.05] tracking-tight">
              Ce qu'ils disent du CMEP.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {QUOTES.map((q) => (
              <article
                key={q.name}
                className="group grid sm:grid-cols-12 gap-0 bg-white border border-ngo-navy/8 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="sm:col-span-4 relative min-h-[200px]">
                  <img src={q.img} alt={q.name} className="absolute inset-0 size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ngo-navy/60 to-transparent" />
                </div>
                <div className="sm:col-span-8 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <Quote size={28} className="text-ngo-gold mb-5" />
                    <p className="text-ngo-navy text-[15px] leading-relaxed font-medium">“{q.quote}”</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-ngo-navy/8">
                    <div className="font-extrabold text-ngo-navy">{q.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ngo-slate font-semibold mt-1.5">{q.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — devenir partenaire */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 items-center p-10 md:p-16 bg-ngo-navy rounded-3xl text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-ngo-gold/10 blur-3xl" />
            <div className="md:col-span-8 relative">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Rejoindre la coalition</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-5 leading-tight tracking-tight">
                Co-construisez avec nous le prochain chapitre.
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                Vous représentez une institution, une fondation, un acteur du développement ?
                Engageons une conversation structurée autour d'un partenariat à votre mesure.
              </p>
            </div>
            <div className="md:col-span-4 relative md:text-right">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-7 py-4 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-md"
              >
                Devenir partenaire <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
