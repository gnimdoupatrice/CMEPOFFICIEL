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

import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref } from "@/lib/contact";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Coalition partenaire — CMEP Togo" },
      {
        name: "description",
        content:
          "Une coalition institutionnelle pour la jeunesse togolaise : universités, ONG, mouvements citoyens et partenaires internationaux engagés aux côtés du CMEP.",
      },
      { property: "og:title", content: "Coalition de collaboration — CMEP Togo" },
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
      { name: "Université de Kara", logo: CMEP_MEDIA.partners.universiteKara, role: "Partenaire scientifique principal" },
      { name: "Centre de formation Don Bosco", logo: CMEP_MEDIA.partners.donBosco, role: "Formation technique & professionnelle" },
    ],
  },
  {
    key: "international",
    icon: Globe2,
    label: "Partenaires internationaux",
    desc: "Coopération technique, programmes structurants et mobilisation de la jeunesse à l'échelle régionale.",
    partners: [
      { name: "France Volontaires", logo: CMEP_MEDIA.partners.franceVolontaires, role: "Mobilité & engagement volontaire" },
      { name: "Plan International — Youth Panel", logo: CMEP_MEDIA.partners.youthPanel, role: "Plateforme jeunesse internationale" },
    ],
  },
  {
    key: "civil",
    icon: HeartHandshake,
    label: "Société civile & ONG",
    desc: "Ancrage communautaire, expertise sectorielle et déploiement opérationnel sur le terrain.",
    partners: [
      { name: "ONG A3E", logo: CMEP_MEDIA.partners.ongA3e, role: "Éducation, environnement, emploi" },
      { name: "ONG STADD", logo: CMEP_MEDIA.partners.ongStadd, role: "Action territoriale & développement durable" },
      { name: "ANLP — À Nous La Planète", logo: CMEP_MEDIA.partners.anlp, role: "Plaidoyer écologique" },
      { name: "ANJPED-CHE", logo: CMEP_MEDIA.partners.anjpedChe, role: "Jeunesse, paix, éducation" },
    ],
  },
  {
    key: "youth",
    icon: Sparkles,
    label: "Mouvements citoyens & jeunesse",
    desc: "Pairs, réseaux étudiants et clubs qui portent l'élan communautaire du programme.",
    partners: [
      { name: "K-EMPIRE", logo: CMEP_MEDIA.partners.kEmpire, role: "Culture & créativité jeunesse" },
      { name: "Club CEPHAL", logo: CMEP_MEDIA.partners.clubCephal, role: "Leadership citoyen" },
      { name: "BEGE SHOOT", logo: CMEP_MEDIA.partners.begeShoot, role: "Récit, image & narration de terrain" },
      { name: "Rotaract Club — Université de Kara", logo: CMEP_MEDIA.partners.rotaractKara, role: "Engagement étudiant" },
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
      "Une coalition lucide, ancrée au Togo, qui pose les bases d'un modèle utile à toute la jeunesse togolaise.",
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
          alt="Coalition de partenaires CMEP mobilisés autour de la jeunesse togolaise"
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ngo-navy via-ngo-navy/85 to-ngo-navy/40" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-28">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold mb-8">
            <Network size={11} /> Coalition partenaire
          </span>
          <h1 className="text-h1 font-extrabold max-w-4xl">
            Une coalition institutionnelle pour la <span className="text-ngo-gold">jeunesse togolaise</span>.
          </h1>
          <p className="mt-8 text-lg text-white/75 leading-relaxed max-w-2xl">
            Universités, ONG, mouvements citoyens, plateformes jeunesse et acteurs internationaux.
            Une alliance plurielle qui structure, finance et amplifie ce que le CMEP construit.
          </p>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST.map((t) => (
              <div
                key={t.l}
                className="p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:border-ngo-gold/40 transition-colors"
              >
                <t.icon size={20} className="text-ngo-gold mb-4" strokeWidth={2.2} />
                <div className="text-h2 font-extrabold leading-none">{t.v}</div>
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
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-3 leading-tight tracking-tight">
              Un écosystème de douze institutions partenaires.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-ngo-navy/8 border border-ngo-navy/8 rounded-2xl overflow-hidden">
            {CATEGORIES.flatMap((c) => c.partners).map((p) => (
              <div
                key={p.name}
                className="group relative aspect-square bg-white flex flex-col items-center justify-center p-5 md:p-6 hover:bg-ngo-pearl transition-all duration-300"
                title={p.name}
              >
                <div className="flex-1 w-full flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={`Logo ${p.name}`}
                    className="max-h-20 md:max-h-24 max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="mt-3 text-center text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-ngo-navy/70 font-semibold leading-tight line-clamp-2">
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
              <h2 className="text-h2 font-extrabold text-ngo-navy mt-3 leading-[1.05] tracking-tight">
                Quatre familles d'engagement. Une seule mission.
              </h2>
            </div>
            <p className="lg:col-span-4 text-ngo-slate leading-relaxed text-[15px]">
              Chaque Collaboration occupe une fonction précise dans la chaîne d'autonomisation : recherche,
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
                    <h3 className="font-extrabold text-h3 mb-5">
                      {cat.label}
                    </h3>
                    <p className="text-white/65 text-body leading-relaxed">{cat.desc}</p>
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
                        <img loading="lazy" decoding="async" src={p.logo} alt={p.name} className="max-h-12 max-w-12 object-contain" />
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
      

      {/* La section « Alignement ODD » a été déplacée vers /programmes (page Axes) */}


      {/* QUOTES from partners */}
      

      {/* CTA — devenir partenaire */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 items-center p-10 md:p-16 bg-ngo-navy rounded-3xl text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-ngo-gold/10 blur-3xl" />
            <div className="md:col-span-8 relative">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Rejoindre la coalition</span>
              <h2 className="text-h2 font-extrabold mt-3 mb-5 leading-tight tracking-tight">
                Co-construisez avec nous le prochain chapitre.
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                Vous représentez une institution, une fondation, un acteur du développement ?
                Engageons une conversation structurée autour d'un partenariat à votre mesure.
              </p>
            </div>
            <div className="md:col-span-4 relative md:text-right">
              <a
                href={createWhatsAppHref("Bonjour CMEP, je souhaite échanger sur un partenariat.")}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-7 py-4 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-md"
              >
                Devenir partenaire <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
